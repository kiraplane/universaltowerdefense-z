/**
 * Sora2 Client for Image to Video and Text to Video
 * https://docs.kie.ai/market/sora2/sora-2-image-to-video
 * https://docs.kie.ai/market/sora2/sora-2-text-to-video
 */

interface Sora2Config {
  apiKey: string;
  baseUrl: string;
}

// Image to Video types
interface Sora2ImageToVideoInput {
  prompt: string;
  image_urls: string[];
  aspect_ratio: 'landscape' | 'portrait' | 'square';
  n_frames: string; // "10" or "15"
  remove_watermark?: boolean;
}

interface Sora2ImageToVideoRequest {
  model: 'sora-2-image-to-video';
  callBackUrl?: string;
  input: Sora2ImageToVideoInput;
}

// Text to Video types
interface Sora2TextToVideoInput {
  prompt: string;
  aspect_ratio: 'landscape' | 'portrait';
  n_frames: string; // "10" or "15"
  remove_watermark?: boolean;
}

interface Sora2TextToVideoRequest {
  model: 'sora-2-text-to-video';
  callBackUrl?: string;
  input: Sora2TextToVideoInput;
}

// Common types
type Sora2CreateTaskInput = Sora2ImageToVideoInput | Sora2TextToVideoInput;
type Sora2CreateTaskRequest =
  | Sora2ImageToVideoRequest
  | Sora2TextToVideoRequest;

interface Sora2CreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

interface Sora2TaskStatus {
  code: number;
  message: string;
  data: {
    taskId: string;
    model: string;
    state: 'waiting' | 'queuing' | 'generating' | 'success' | 'fail';
    param: string; // JSON string of original request
    resultJson: string; // JSON string containing resultUrls
    failCode: string;
    failMsg: string;
    completeTime: number;
    createTime: number;
    updateTime: number;
  };
}

/**
 * Sora2 AI Client for Image to Video
 */
export class Sora2Client {
  private config: Sora2Config;

  constructor(config?: Sora2Config) {
    this.config = config || {
      apiKey: process.env.KLING_API_KEY || '', // Using same KIE API key
      baseUrl: process.env.KLING_API_BASE_URL || 'https://api.kie.ai/api/v1',
    };

    if (!this.config.apiKey) {
      throw new Error('KLING_API_KEY is required for Sora2');
    }
  }

  /**
   * Create a new image-to-video task
   */
  async createImageToVideoTask(params: {
    imageUrl: string;
    prompt: string;
    duration: 10 | 15;
    aspectRatio?: 'landscape' | 'portrait' | 'square';
    removeWatermark?: boolean;
    callbackUrl?: string;
  }): Promise<Sora2CreateTaskResponse> {
    const requestBody: Sora2ImageToVideoRequest = {
      model: 'sora-2-image-to-video',
      callBackUrl: params.callbackUrl,
      input: {
        prompt: params.prompt,
        image_urls: [params.imageUrl],
        aspect_ratio: params.aspectRatio || 'portrait',
        n_frames: params.duration.toString(),
        remove_watermark: params.removeWatermark !== false,
      },
    };

    console.log('[Sora2] Creating image-to-video task:', {
      imageUrl: params.imageUrl,
      duration: params.duration,
      aspectRatio: params.aspectRatio,
    });

    return this.createTask(requestBody);
  }

  /**
   * Create a new text-to-video task
   */
  async createTextToVideoTask(params: {
    prompt: string;
    duration: 10 | 15;
    aspectRatio?: 'landscape' | 'portrait';
    removeWatermark?: boolean;
    callbackUrl?: string;
  }): Promise<Sora2CreateTaskResponse> {
    const requestBody: Sora2TextToVideoRequest = {
      model: 'sora-2-text-to-video',
      callBackUrl: params.callbackUrl,
      input: {
        prompt: params.prompt,
        aspect_ratio: params.aspectRatio || 'portrait',
        n_frames: params.duration.toString(),
        remove_watermark: params.removeWatermark !== false,
      },
    };

    console.log('[Sora2] Creating text-to-video task:', {
      prompt: params.prompt.substring(0, 50) + '...',
      duration: params.duration,
      aspectRatio: params.aspectRatio,
    });

    return this.createTask(requestBody);
  }

  /**
   * Internal method to create a task
   */
  private async createTask(
    requestBody: Sora2CreateTaskRequest
  ): Promise<Sora2CreateTaskResponse> {
    const response = await fetch(`${this.config.baseUrl}/jobs/createTask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sora2] Create task failed:', errorText);
      throw new Error(`Sora2 API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('[Sora2] Task created:', result);

    return result as Sora2CreateTaskResponse;
  }

  /**
   * Query task status
   */
  async getTaskStatus(taskId: string): Promise<Sora2TaskStatus> {
    console.log('[Sora2] Querying task status:', taskId);

    const response = await fetch(
      `${this.config.baseUrl}/jobs/recordInfo?taskId=${taskId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sora2] Get task status failed:', errorText);
      throw new Error(`Sora2 API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('[Sora2] Task status:', result);

    return result as Sora2TaskStatus;
  }

  /**
   * Map Sora2 status to our internal status
   */
  static mapStatus(
    sora2Status: string
  ): 'pending' | 'running' | 'succeeded' | 'failed' {
    switch (sora2Status) {
      case 'waiting':
      case 'queuing':
        return 'pending';
      case 'generating':
        return 'running';
      case 'success':
        return 'succeeded';
      case 'fail':
        return 'failed';
      default:
        return 'pending';
    }
  }

  /**
   * Parse error message from Sora2 response
   */
  static parseError(response: Sora2TaskStatus): string {
    if (response.data.failMsg) {
      return response.data.failMsg;
    }
    if (response.data.failCode) {
      return `Error ${response.data.failCode}`;
    }
    return response.message || 'Unknown error';
  }
}

/**
 * Get singleton Sora2 client instance
 */
let sora2ClientInstance: Sora2Client | null = null;

export function getSora2Client(): Sora2Client {
  if (!sora2ClientInstance) {
    sora2ClientInstance = new Sora2Client();
  }
  return sora2ClientInstance;
}
