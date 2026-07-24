import { sources } from './sources';
import type { GameCode } from './types';

export const CODE_CHECKED_AT = '2026-07-24';

export const codes: GameCode[] = [
  {
    code: 'Football11!',
    reward: '100 Trait Rerolls, 20,000 Gems, 100,000 Gold',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-22',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes:
      'Newest football-event code in the July 23 active list. Copy the trailing exclamation mark exactly.',
  },
  {
    code: 'UniversalFootball!',
    reward:
      '25 Trait Rerolls, 25 Relic Rerolls, 25 Stat Rerolls, 25 Stat Locks, and 100,000 Universal Gems Season 1 Part 2',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-22',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes:
      'Football-event progression package from the current ten-code active list.',
  },
  {
    code: 'NewBlitzPass!',
    reward: '50 Trait Rerolls and 5,000 Gems',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-22',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Blitz Pass launch code from the July 23 active list.',
  },
  {
    code: 'WeLoveYoruichi2!',
    reward: '250 Trait Rerolls',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-14',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.destructoidCodes],
    notes:
      'Newest Yoruichi-era code from the July 14 public code pass. Copy the trailing exclamation mark exactly.',
  },
  {
    code: 'WeLoveYoruichi!',
    reward:
      'Yoruichi, evolution items, 250 Trait Rerolls, 6 Etherealization Shards, and 5 Summer Crates',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-14',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.destructoidCodes],
    notes:
      'High-value unit/evolution package from the newest July code refresh. Redeem before spending rerolls or Summer Crates elsewhere.',
  },
  {
    code: 'UTDZApologyForBugs!',
    reward: '1,500 Trait Rerolls and 1 Boundless Orb',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-14',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.destructoidCodes],
    notes:
      'Bug-compensation code from the latest UTDZ code surface. The Boundless Orb makes this a priority redeem.',
  },
  {
    code: 'WeLoveUTDZ!',
    reward:
      'Fern, Fern evolution items, 12 Mythic Etherealization Shards, and Kenpachi EVO',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-14',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.destructoidCodes],
    notes:
      'Current high-value UTDZ celebration code. Treat reward text as source-checked until the in-game popup confirms exact item names.',
  },
  {
    code: 'SrryForWhoopsie!',
    reward: '1 Ruler Ticket',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Newest code in the July 9 Update 4.0 snapshot.',
  },
  {
    code: 'TheGuyFromSmash!',
    reward: '50 Trait Rerolls and 100,000 Universal Gems Part 2',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes:
      'Moved to inactive after the July 17 check against the current seven-code Update 4 list.',
  },
  {
    code: 'SpectacularSpider!',
    reward: '50 Trait Rerolls and 100,000 Universal Gems',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes: 'Current Spider-themed Update 4 code.',
  },
  {
    code: 'ReapersVsHollowDestroyers',
    reward: '50 Trait Rerolls and 10,000 Gems',
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes:
      'Use the plural Reapers spelling from the strongest current source overlap.',
  },
  {
    code: 'Summer2026!',
    reward: '50 Trait Rerolls and 10,000 Summer Currency',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes:
      'Moved to inactive after the July 17 check against the current seven-code Update 4 list.',
  },
  {
    code: 'UTDPhase3!',
    reward: 'Former Phase 3 unit, material, reroll, and Universal Gem rewards',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-07',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Moved to the inactive list after Update 4.0.',
  },
  {
    code: 'UTDXRulerIncident!',
    reward: '2 Ruler Tickets',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-06',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Former-name code now listed inactive.',
  },
  {
    code: 'UniversalTowerDefenseZ!',
    reward: 'Former evolved-unit, reroll, fragment, and Universal Gem rewards',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-06',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes:
      'The name matches the current brand, but the code itself is now inactive.',
  },
  {
    code: 'UniversalDelayDefense!',
    reward: 'Former delay compensation package',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-06',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Inactive after the Update 4 transition.',
  },
  {
    code: 'StoryReworked',
    reward: 'Former story-rework rewards',
    status: 'expired',
    event: 'general',
    firstSeen: '2026-06',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes],
    notes: 'Inactive archive entry. Do not keep retrying it.',
  },
];

export const activeCodes = codes.filter((code) => code.status === 'working');
export const eventCodes = activeCodes;
export const expiredCodes = codes.filter((code) => code.status === 'expired');
