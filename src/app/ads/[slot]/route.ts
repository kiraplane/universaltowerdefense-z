import {
  type AdsterraSlotId,
  adsterraSlotIds,
  getAdsterraDisplayScriptBaseUrl,
  getAdsterraNativeScriptBaseUrl,
  getAdsterraSlot,
} from '@/config/adsterra-ads';

export const dynamic = 'force-dynamic';

const VALID_ADSTERRA_KEY = /^[a-z0-9]+$/i;
const AD_FRAME_BACKGROUND = '#080607';

function normalizeSlot(value: string): AdsterraSlotId | null {
  const slot = value.replace(/\.html$/, '') as AdsterraSlotId;

  return adsterraSlotIds.includes(slot) ? slot : null;
}

function isValidScriptBaseUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function renderShell({
  body,
  height,
  title,
  width,
}: {
  body: string;
  height: number;
  title: string;
  width: number;
}) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      max-width: ${width}px;
      min-height: ${height}px;
      overflow: hidden;
      background: ${AD_FRAME_BACKGROUND};
    }
    body { display: flex; align-items: center; justify-content: center; }
    body > * { max-width: ${width}px !important; }
    iframe { background: ${AD_FRAME_BACKGROUND}; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

function renderDisplayAd(slot: ReturnType<typeof getAdsterraSlot>) {
  const baseUrl = getAdsterraDisplayScriptBaseUrl();

  if (!isValidScriptBaseUrl(baseUrl)) {
    return null;
  }

  const key = JSON.stringify(slot.key);
  const scriptUrl = `${baseUrl}/${slot.key}/invoke.js`;

  return `
  <script type="text/javascript">
    var atOptions = {
      key: ${key},
      format: 'iframe',
      height: ${slot.height},
      width: ${slot.width},
      params: {}
    };
  </script>
  <script data-cfasync="false" type="text/javascript" src="${scriptUrl}"></script>`;
}

function renderNativeAd(slot: ReturnType<typeof getAdsterraSlot>) {
  const baseUrl = getAdsterraNativeScriptBaseUrl();

  if (!isValidScriptBaseUrl(baseUrl)) {
    return null;
  }

  return `
  <script async data-cfasync="false" src="${baseUrl}/${slot.key}/invoke.js"></script>
  <div id="container-${slot.key}"></div>`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slot: string }> }
) {
  const { slot: rawSlot } = await context.params;
  const slotId = normalizeSlot(rawSlot);

  if (!slotId) {
    return new Response('Unknown ad slot', { status: 404 });
  }

  const slot = getAdsterraSlot(slotId);

  if (!slot.enabled || !VALID_ADSTERRA_KEY.test(slot.key)) {
    return new Response('Ad slot is not configured', { status: 404 });
  }

  const body =
    slot.kind === 'native' ? renderNativeAd(slot) : renderDisplayAd(slot);

  if (!body) {
    return new Response('Invalid ad script URL', { status: 500 });
  }

  return new Response(
    renderShell({
      body,
      height: slot.height,
      title: slot.title,
      width: slot.width,
    }),
    {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex,nofollow',
      },
    }
  );
}
