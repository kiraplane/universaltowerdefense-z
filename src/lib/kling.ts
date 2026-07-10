/**
 * Kling AI Video Generation Client
 * https://docs.kie.ai/market/kling/motion-control
 */

interface KlingConfig {
  apiKey: string;
  baseUrl: string;
}

interface KlingCreateTaskInput {
  prompt: string;
  input_urls: string[]; // Image URL
  video_urls: string[]; // Reference video URL
  mode: '720p' | '1080p';
  character_orientation?: 'image';
}

interface KlingCreateTaskRequest {
  model: 'kling-2.6/motion-control';
  callBackUrl?: string;
  input: KlingCreateTaskInput;
}

interface KlingCreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

interface KlingTaskStatus {
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
 * Kling AI Client
 */
export class KlingClient {
  private config: KlingConfig;

  constructor(config?: KlingConfig) {
    this.config = config || {
      apiKey: process.env.KLING_API_KEY || '',
      baseUrl: process.env.KLING_API_BASE_URL || 'https://api.kie.ai/api/v1',
    };

    if (!this.config.apiKey) {
      throw new Error('KLING_API_KEY is required');
    }
  }

  /**
   * Create a new video generation task
   */
  async createTask(params: {
    imageUrl: string;
    videoUrl: string;
    resolution: '720p' | '1080p';
    prompt?: string;
    callbackUrl?: string;
  }): Promise<KlingCreateTaskResponse> {
    const requestBody: KlingCreateTaskRequest = {
      model: 'kling-2.6/motion-control',
      callBackUrl: params.callbackUrl,
      input: {
        prompt: params.prompt || 'Follow the reference motion naturally.',
        input_urls: [params.imageUrl],
        video_urls: [params.videoUrl],
        mode: params.resolution,
        character_orientation: 'image',
      },
    };

    console.log('[Kling] Creating task:', {
      imageUrl: params.imageUrl,
      videoUrl: params.videoUrl,
      resolution: params.resolution,
    });

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
      console.error('[Kling] Create task failed:', errorText);
      throw new Error(`Kling API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('[Kling] Task created:', result);

    return result as KlingCreateTaskResponse;
  }

  /**
   * Query task status
   * https://docs.kie.ai/market/common/get-task-detail
   */
  async getTaskStatus(taskId: string): Promise<KlingTaskStatus> {
    console.log('[Kling] Querying task status:', taskId);

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
      console.error('[Kling] Get task status failed:', errorText);
      throw new Error(`Kling API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('[Kling] Task status:', result);

    return result as KlingTaskStatus;
  }

  /**
   * Map Kling status to our internal status
   */
  static mapStatus(
    klingStatus: string
  ): 'pending' | 'running' | 'succeeded' | 'failed' {
    switch (klingStatus) {
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
   * Parse error message from Kling response
   */
  static parseError(response: KlingTaskStatus): string {
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
 * Get singleton Kling client instance
 */
let klingClientInstance: KlingClient | null = null;

export function getKlingClient(): KlingClient {
  if (!klingClientInstance) {
    klingClientInstance = new KlingClient();
  }
  return klingClientInstance;
}
