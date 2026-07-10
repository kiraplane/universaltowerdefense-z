/**
 * Video utilities for generation tools
 * Extract video duration and validate video files
 */

interface VideoMetadata {
  duration: number; // in seconds
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Extract video duration from a URL using MP4 metadata parsing
 * This method fetches the video headers to extract duration without downloading the entire file
 */
export async function getVideoDuration(videoUrl: string): Promise<number> {
  try {
    console.log('[VideoUtils] Extracting duration from:', videoUrl);

    // Fetch video with range request to get metadata
    const response = await fetch(videoUrl, {
      method: 'HEAD',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status}`);
    }

    // Get content length
    const contentLength = response.headers.get('content-length');
    if (!contentLength) {
      throw new Error('Content-Length header not found');
    }

    // For MP4 files, we need to fetch the beginning of the file to read metadata
    // Try progressively larger ranges if mvhd atom is not in the first chunk
    let duration = 0;
    const ranges = [
      65536, // 64KB
      262144, // 256KB
      524288, // 512KB
      1048576, // 1MB
    ];

    for (const rangeSize of ranges) {
      console.log(`[VideoUtils] Trying to fetch ${rangeSize} bytes...`);

      const metadataResponse = await fetch(videoUrl, {
        headers: {
          Range: `bytes=0-${rangeSize - 1}`,
        },
      });

      if (!metadataResponse.ok && metadataResponse.status !== 206) {
        throw new Error(
          `Failed to fetch video metadata: ${metadataResponse.status}`
        );
      }

      const buffer = await metadataResponse.arrayBuffer();
      try {
        duration = parseMP4Duration(new Uint8Array(buffer));
        if (duration && duration > 0) {
          console.log(`[VideoUtils] Found duration in ${rangeSize} bytes`);
          break;
        }
      } catch (error) {
        console.log(
          `[VideoUtils] mvhd not found in ${rangeSize} bytes, trying larger range...`
        );
        if (rangeSize === ranges[ranges.length - 1]) {
          throw error; // Last attempt failed
        }
      }
    }

    if (!duration || duration <= 0) {
      throw new Error('Could not extract valid duration from video');
    }

    console.log('[VideoUtils] Extracted duration:', duration, 'seconds');
    return Math.round(duration);
  } catch (error) {
    console.error('[VideoUtils] Error extracting duration:', error);
    throw new Error(
      `Failed to extract video duration: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Parse MP4 duration from buffer
 * Simplified parser for 'mvhd' atom which contains duration and timescale
 */
function parseMP4Duration(buffer: Uint8Array): number {
  try {
    // Look for 'mvhd' atom (movie header)
    const mvhdIndex = findAtom(buffer, 'mvhd');
    if (mvhdIndex === -1) {
      throw new Error('mvhd atom not found');
    }

    // mvhd structure (after atom header):
    // 1 byte version
    // 3 bytes flags
    // If version = 0:
    //   4 bytes creation time
    //   4 bytes modification time
    //   4 bytes timescale
    //   4 bytes duration
    const view = new DataView(buffer.buffer, buffer.byteOffset + mvhdIndex);
    const version = view.getUint8(0);

    let timescale: number;
    let duration: number;

    if (version === 0) {
      timescale = view.getUint32(12, false); // Big-endian
      duration = view.getUint32(16, false);
    } else {
      // version 1 uses 64-bit values
      timescale = view.getUint32(20, false);
      // Duration is 64-bit, but we'll read it as 32-bit for simplicity
      duration = view.getUint32(28, false);
    }

    if (!timescale || timescale === 0) {
      throw new Error('Invalid timescale');
    }

    return duration / timescale;
  } catch (error) {
    console.error('[VideoUtils] Error parsing MP4:', error);
    throw error;
  }
}

/**
 * Find atom in MP4 buffer
 * Searches for the atom in the entire buffer
 */
function findAtom(buffer: Uint8Array, atomName: string): number {
  const atomBytes = new TextEncoder().encode(atomName);

  // Search through the entire buffer
  for (let i = 0; i < buffer.length - atomBytes.length - 8; i++) {
    let match = true;
    for (let j = 0; j < atomBytes.length; j++) {
      if (buffer[i + j] !== atomBytes[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      // Found the atom name, return position after atom name (where data starts)
      console.log(`[VideoUtils] Found '${atomName}' atom at position ${i}`);
      return i + atomBytes.length;
    }
  }

  console.log(`[VideoUtils] '${atomName}' atom not found in buffer`);
  return -1;
}

/**
 * Validate video constraints for generation tools
 */
export function validateVideoConstraints(
  duration: number,
  minDuration = 3,
  maxDuration = 30
): { valid: boolean; error?: string } {
  if (duration < minDuration) {
    return {
      valid: false,
      error: `Video is too short. Minimum duration is ${minDuration} seconds.`,
    };
  }

  if (duration > maxDuration) {
    return {
      valid: false,
      error: `Video is too long. Maximum duration is ${maxDuration} seconds.`,
    };
  }

  return { valid: true };
}

/**
 * Calculate credits required for video generation
 */
export function calculateVideoCredits(
  duration: number,
  resolution: '720p' | '1080p'
): number {
  const pricePerSecond = resolution === '720p' ? 6 : 9;
  return Math.ceil(duration) * pricePerSecond;
}

/**
 * Format credit description for transaction
 */
export function formatVideoCreditDescription(
  resolution: '720p' | '1080p',
  duration: number,
  credits: number
): string {
  return `AI Video ${resolution} · ${duration}s · -${credits} credits`;
}
