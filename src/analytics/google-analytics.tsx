import { getCloudflareContext } from '@opennextjs/cloudflare';
import Script from 'next/script';

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

function getGoogleAnalyticsId() {
  return (
    cleanEnvValue(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) ||
    readCloudflareEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID')
  );
}

export default function GoogleAnalytics() {
  const googleAnalyticsId = getGoogleAnalyticsId();

  if (process.env.NODE_ENV !== 'production' || !googleAnalyticsId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-js"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="beforeInteractive"
      />
      <Script
        id="google-tag-init"
        strategy="beforeInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Google Analytics requires an inline bootstrap snippet.
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
          `.trim(),
        }}
      />
    </>
  );
}
