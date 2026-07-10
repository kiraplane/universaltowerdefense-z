# Universal Tower Defense Z Wiki

English Roblox guide site for **Universal Tower Defense Z** at
`https://www.universaltowerdefense-z.wiki`.

The site covers active codes, Update 4, units, tier decisions, traits, relics,
team building, progression, and video-supported guides. It is built with
Next.js and deployed to Cloudflare Workers through OpenNext.

## Local development

```bash
pnpm install
pnpm dev
```

## Validation and deployment

```bash
pnpm next:build
pnpm cf:build
pnpm cf:deploy-only
```

Research, information architecture, source rules, and the implementation plan
live in `docs/universal-tower-defense-z-wiki-prd-and-implementation-plan.md`.
