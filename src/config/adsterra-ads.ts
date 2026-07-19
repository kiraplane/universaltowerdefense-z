import { getCloudflareContext } from '@opennextjs/cloudflare';

export type AdsterraDisplaySlotId =
  | 'banner-320x50'
  | 'banner-728x90'
  | 'banner-300x250'
  | 'banner-468x60'
  | 'sidebar-160x600'
  | 'sidebar-160x300';

export type AdsterraSlotId = AdsterraDisplaySlotId | 'native-banner';

export interface AdsterraSlotConfig {
  id: AdsterraSlotId;
  key: string;
  width: number;
  height: number;
  title: string;
  kind: 'display' | 'native';
  enabled: boolean;
}

const DISPLAY_SLOTS: Record<
  AdsterraDisplaySlotId,
  Omit<AdsterraSlotConfig, 'enabled' | 'key' | 'kind'> & { envKey: string }
> = {
  'banner-320x50': {
    id: 'banner-320x50',
    envKey: 'ADSTERRA_BANNER_320X50_KEY',
    width: 320,
    height: 50,
    title: 'Adsterra 320x50 Banner',
  },
  'banner-728x90': {
    id: 'banner-728x90',
    envKey: 'ADSTERRA_BANNER_728X90_KEY',
    width: 728,
    height: 90,
    title: 'Adsterra 728x90 Banner',
  },
  'banner-300x250': {
    id: 'banner-300x250',
    envKey: 'ADSTERRA_BANNER_300X250_KEY',
    width: 300,
    height: 250,
    title: 'Adsterra 300x250 Banner',
  },
  'banner-468x60': {
    id: 'banner-468x60',
    envKey: 'ADSTERRA_BANNER_468X60_KEY',
    width: 468,
    height: 60,
    title: 'Adsterra 468x60 Banner',
  },
  'sidebar-160x600': {
    id: 'sidebar-160x600',
    envKey: 'ADSTERRA_SIDEBAR_160X600_KEY',
    width: 160,
    height: 600,
    title: 'Adsterra 160x600 Sidebar',
  },
  'sidebar-160x300': {
    id: 'sidebar-160x300',
    envKey: 'ADSTERRA_SIDEBAR_160X300_KEY',
    width: 160,
    height: 300,
    title: 'Adsterra 160x300 Sidebar',
  },
};

const NATIVE_SLOT = {
  id: 'native-banner' as const,
  envKey: 'ADSTERRA_NATIVE_BANNER_KEY',
  width: 728,
  height: 280,
  title: 'Adsterra Native Banner',
};

function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^['"]+|['"]+$/g, '') ?? '';
}

function readCloudflareEnv(name: string) {
  try {
    const env = getCloudflareContext().env as Record<string, unknown>;
    const value = env[name];

    return typeof value === 'string' ? cleanEnvValue(value) : '';
  } catch {
    return '';
  }
}

function readEnv(name: string) {
  return readCloudflareEnv(name) || cleanEnvValue(process.env[name]);
}

export function isAdsterraEnabled() {
  return readEnv('ADSTERRA_ADS_ENABLED').toLowerCase() === 'true';
}

export function getAdsterraSlot(id: AdsterraSlotId): AdsterraSlotConfig {
  if (id === 'native-banner') {
    const key = readEnv(NATIVE_SLOT.envKey);

    return {
      id,
      key,
      width: NATIVE_SLOT.width,
      height: NATIVE_SLOT.height,
      title: NATIVE_SLOT.title,
      kind: 'native',
      enabled: isAdsterraEnabled() && key.length > 0,
    };
  }

  const slot = DISPLAY_SLOTS[id];
  const key = readEnv(slot.envKey);

  return {
    id,
    key,
    width: slot.width,
    height: slot.height,
    title: slot.title,
    kind: 'display',
    enabled: isAdsterraEnabled() && key.length > 0,
  };
}

export function getAdsterraDisplayScriptBaseUrl() {
  return (
    readEnv('ADSTERRA_DISPLAY_SCRIPT_BASE_URL') ||
    'https://www.highperformanceformat.com'
  ).replace(/\/+$/, '');
}

export function getAdsterraNativeScriptBaseUrl() {
  return (
    readEnv('ADSTERRA_NATIVE_SCRIPT_BASE_URL') ||
    'https://pl30372609.effectivecpmnetwork.com'
  ).replace(/\/+$/, '');
}

export const adsterraSlotIds: AdsterraSlotId[] = [
  'banner-320x50',
  'banner-728x90',
  'banner-300x250',
  'banner-468x60',
  'sidebar-160x600',
  'sidebar-160x300',
  'native-banner',
];
