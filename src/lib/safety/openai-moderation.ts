type ModerationInputPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } };

type ModerationResponse = {
  results?: Array<{
    flagged?: boolean;
  }>;
};

export type ModerationDecision =
  | {
      ok: true;
      skippedReason?:
        | 'empty_input'
        | 'timeout'
        | 'rate_limited'
        | 'moderation_unavailable'
        | 'request_failed'
        | 'malformed_response';
    }
  | { ok: false; reason: 'blocked' }
  | { ok: false; reason: 'temporary_unavailable' }
  | { ok: false; reason: 'failed' };

export type ModerationFailureResponse = {
  status: number;
  body: {
    code:
      | 'content_not_allowed'
      | 'moderation_temporarily_unavailable'
      | 'moderation_failed';
    message: string;
    error: string;
  };
};

const OPENAI_MODERATION_URL = 'https://api.openai.com/v1/moderations';
const OPENAI_MODERATION_MODEL = 'omni-moderation-latest';
const DEFAULT_TIMEOUT_MS = 8000;

class ModerationTimeoutError extends Error {
  constructor() {
    super('OpenAI moderation request timed out');
    this.name = 'ModerationTimeoutError';
  }
}

function normalizeText(text: string | undefined) {
  const trimmed = String(text ?? '').trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeImageUrls(imageUrls: string[] | undefined) {
  return Array.from(
    new Set(
      (imageUrls ?? [])
        .map((url) => String(url ?? '').trim())
        .filter((url) => url.length > 0)
    )
  );
}

function buildModerationInput(input: {
  text?: string;
  imageUrls?: string[];
}): string | ModerationInputPart[] | undefined {
  const text = normalizeText(input.text);
  const imageUrls = normalizeImageUrls(input.imageUrls);

  if (!text && imageUrls.length === 0) {
    return undefined;
  }

  if (imageUrls.length === 0) {
    return text;
  }

  const parts: ModerationInputPart[] = [];

  if (text) {
    parts.push({ type: 'text', text });
  }

  for (const url of imageUrls) {
    parts.push({
      type: 'image_url',
      image_url: { url },
    });
  }

  return parts;
}

async function fetchModeration(
  moderationInput: string | ModerationInputPart[],
  apiKey: string,
  timeoutMs: number
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(OPENAI_MODERATION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODERATION_MODEL,
        input: moderationInput,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ModerationTimeoutError();
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function isTemporaryStatus(status: number) {
  return status >= 500;
}

function isTimeoutStatus(status: number) {
  return status === 408 || status === 504 || status === 524;
}

function parseTimeoutMs(timeoutMs: number | undefined) {
  if (timeoutMs && Number.isFinite(timeoutMs) && timeoutMs > 0) {
    return timeoutMs;
  }

  const configuredTimeout = Number(process.env.OPENAI_MODERATION_TIMEOUT_MS);
  if (
    Number.isFinite(configuredTimeout) &&
    configuredTimeout > 0 &&
    configuredTimeout <= 30000
  ) {
    return configuredTimeout;
  }

  return DEFAULT_TIMEOUT_MS;
}

export async function moderateInput(input: {
  text?: string;
  imageUrls?: string[];
  timeoutMs?: number;
}): Promise<ModerationDecision> {
  const moderationInput = buildModerationInput(input);

  if (!moderationInput) {
    return { ok: true, skippedReason: 'empty_input' };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('[Moderation] OPENAI_API_KEY is not configured');
    return { ok: false, reason: 'failed' };
  }

  const timeoutMs = parseTimeoutMs(input.timeoutMs);

  try {
    const response = await fetchModeration(moderationInput, apiKey, timeoutMs);

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('[Moderation] Rate limited; allowing request', {
          status: response.status,
        });
        return { ok: true, skippedReason: 'rate_limited' };
      }

      if (isTimeoutStatus(response.status)) {
        console.warn('[Moderation] Timeout response; allowing request', {
          status: response.status,
        });
        return { ok: true, skippedReason: 'timeout' };
      }

      if (isTemporaryStatus(response.status)) {
        console.warn('[Moderation] Temporarily unavailable; allowing request', {
          status: response.status,
        });
        return { ok: true, skippedReason: 'moderation_unavailable' };
      }

      console.error('[Moderation] Non-retryable OpenAI response', {
        status: response.status,
      });
      return { ok: false, reason: 'failed' };
    }

    const data = (await response.json()) as ModerationResponse;
    const flagged = data.results?.[0]?.flagged;

    if (typeof flagged !== 'boolean') {
      console.warn('[Moderation] Malformed OpenAI response; allowing request');
      return { ok: true, skippedReason: 'malformed_response' };
    }

    return flagged ? { ok: false, reason: 'blocked' } : { ok: true };
  } catch (error) {
    if (error instanceof ModerationTimeoutError) {
      console.warn('[Moderation] Request timed out; allowing request');
      return { ok: true, skippedReason: 'timeout' };
    }

    console.warn('[Moderation] Request failed; allowing request:', error);
    return { ok: true, skippedReason: 'request_failed' };
  }
}

export function getModerationFailureResponse(
  decision: ModerationDecision
): ModerationFailureResponse | null {
  if (decision.ok) {
    return null;
  }

  if (decision.reason === 'blocked') {
    const message =
      'Content did not pass the safety check. Please revise and try again.';

    return {
      status: 422,
      body: {
        code: 'content_not_allowed',
        message,
        error: message,
      },
    };
  }

  if (decision.reason === 'temporary_unavailable') {
    const message =
      'Safety check is temporarily unavailable. Please try again shortly.';

    return {
      status: 503,
      body: {
        code: 'moderation_temporarily_unavailable',
        message,
        error: message,
      },
    };
  }

  const message = 'Safety check failed. Please try again later.';

  return {
    status: 500,
    body: {
      code: 'moderation_failed',
      message,
      error: message,
    },
  };
}
