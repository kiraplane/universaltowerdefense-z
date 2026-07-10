import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const isCloudflareBuild =
  process.env.CF_PAGES === '1' ||
  Boolean(process.env.CF_DEPLOYMENT_ID) ||
  Boolean(process.env.CF_BUILD_ID) ||
  Boolean(process.env.CLOUDFLARE_DEPLOYMENT_ID) ||
  process.env.HOME?.includes('/opt/buildhome') ||
  process.cwd().includes('/opt/buildhome');

const isCi = process.env.CI === '1' || process.env.CI === 'true';

if (!isCloudflareBuild && !isCi) {
  console.log('[postinstall] Skipping OpenNext build outside CI/Cloudflare.');
  process.exit(0);
}

if (existsSync('.open-next/worker.js')) {
  console.log('[postinstall] Existing OpenNext build found; rebuilding for deploy freshness.');
}

const env = { ...process.env };
delete env.npm_lifecycle_event;
delete env.npm_lifecycle_script;

console.log('[postinstall] Building OpenNext output for Cloudflare deploy...');
const result = spawnSync('pnpm', ['run', 'cf:build'], {
  stdio: 'inherit',
  env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
