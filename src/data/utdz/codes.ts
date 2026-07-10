import { sources } from './sources';
import type { GameCode } from './types';

export const CODE_CHECKED_AT = '2026-07-10';

export const codes: GameCode[] = [
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
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes: 'Current Update 4 code. Preserve capitalization and punctuation.',
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
    status: 'working',
    event: 'general',
    firstSeen: '2026-07-09',
    lastChecked: CODE_CHECKED_AT,
    sources: [sources.proGameGuidesCodes, sources.redditCodes],
    notes:
      'Current Summer Event code. Spend Summer Currency only after checking the live event shop.',
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
