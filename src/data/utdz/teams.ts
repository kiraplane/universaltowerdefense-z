import type { TeamBuild } from './types';

export const teams: TeamBuild[] = [
  {
    id: 'universal-fest-carry-core',
    name: 'Late-X Carry Baseline',
    purpose: 'Transition comparison',
    core: [
      'merciless-god',
      'ultimate-fused-warrior',
      'angel-born-in-hell-unrivaled',
    ],
    substitutes: [
      'Any S-tier Boundless carry you already own',
      'Fused Warrior if premium fusion units are missing',
      'A support or farm unit that keeps the carry online',
    ],
    notes:
      'Use this late-X shape as a baseline after Update 4. Do not force every slot into new units if an upgraded carry is still stronger.',
    confidence: 'medium',
  },
  {
    id: 'boundless-benchmark',
    name: 'Boundless Benchmark Team',
    purpose: 'Late-game comparison',
    core: [
      'jinoo-shadow-monarch',
      'the-strongest-of-today',
      'the-strongest-in-history',
    ],
    substitutes: [
      'Your strongest S-tier DPS',
      'Revolutionary Chief (Spade) for utility',
      'A farm slot if the map rewards economy',
    ],
    notes:
      'Use this template as a comparison point before chasing new Update 4 pulls. Existing premium units may still be the better spend.',
    confidence: 'medium',
  },
  {
    id: 'synchro-planning',
    name: 'Synchro Planning Core',
    purpose: 'Prerequisite and fusion planning',
    core: ['revolutionary-chief-spade', 'unparalleled-armor', 'majestic-armor'],
    substitutes: [
      'Any source unit needed for your target synchro',
      'A stable DPS while farming prerequisites',
      'A support unit with a practical trait already rolled',
    ],
    notes:
      'Synchro units are not just pulls; they are build paths. Make sure the prerequisite route is realistic before spending rerolls.',
    confidence: 'medium',
  },
  {
    id: 'event-watchlist',
    name: 'Event Watchlist Team',
    purpose: 'Testing new units safely',
    core: [
      'fused-warrior',
      'limit-breaker-prince-marked',
      'super-roku-third-ascension',
    ],
    substitutes: [
      'The Drink (Super Rage)',
      'Fused Warrior (Earrings)',
      'Any older carry with better traits',
    ],
    notes:
      'Use this shape for testing new units without dismantling the whole account. Keep premium rerolls until a unit proves it belongs.',
    confidence: 'needs_verification',
  },
];
