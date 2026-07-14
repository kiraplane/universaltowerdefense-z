import { sources } from './sources';
import type { TierEntry } from './types';

export const updateFourMetaWatch = [
  {
    name: 'Yhwach',
    role: 'Premium carry / late-wave pressure',
    decision:
      'Compare the evolved form and live placement limits before replacing an already-built Boundless carry.',
  },
  {
    name: 'Ichigo',
    role: 'Main damage / progression carry',
    decision:
      'Use current obtainment and evolution requirements as the gate; do not spend rerolls before the final form is reachable.',
  },
  {
    name: 'Gremmy',
    role: 'Utility damage / control watch',
    decision:
      'Test whether the utility changes a real mode clear before treating the unit as a universal S-tier slot.',
  },
  {
    name: 'Yamamoto',
    role: 'Boss and burn-pressure watch',
    decision:
      'Prioritize only when the account needs sustained boss pressure and can complete the current upgrade route.',
  },
  {
    name: 'Asura',
    role: 'High-investment damage watch',
    decision:
      'Keep on the build-next list until trait, relic, and team support costs are clear in the live client.',
  },
  {
    name: 'Rukia',
    role: 'Control / freeze support watch',
    decision:
      'Value the control slot by mode coverage, not raw rarity; keep the carry slot funded first.',
  },
  {
    name: 'Yoruichi',
    role: 'Update 4 event unit / speed utility',
    decision:
      'Claim current Yoruichi-era codes first, then confirm the event and evolution route before committing premium materials.',
  },
] as const;

export const tierEntries: TierEntry[] = [
  {
    unitSlug: 'merciless-god',
    tier: 'S',
    mode: 'overall',
    reason:
      'Merciless God is the late-X headline Universal Fest P2 unit, so it deserves top-priority tracking for players deciding where to spend event resources.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits, sources.bloxInformer],
  },
  {
    unitSlug: 'ultimate-fused-warrior',
    tier: 'S',
    mode: 'overall',
    reason:
      'Ultimate Fused Warrior has top-rarity placement and clear fusion/relic synergy, making it one of the safest premium DPS pages to prioritize.',
    confidence: 'medium',
    sources: [sources.fandomUnits],
  },
  {
    unitSlug: 'angel-born-in-hell-unrivaled',
    tier: 'S',
    mode: 'story',
    reason:
      'The Unrivaled form is a late-X premium unit and remains a useful transition comparison before spending on lower forms.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
  {
    unitSlug: 'jinoo-shadow-monarch',
    tier: 'S',
    mode: 'overall',
    reason:
      'Jinoo, Shadow Monarch is a Boundless unit and a clean benchmark for comparing newer carries against established premium units.',
    confidence: 'medium',
    sources: [sources.fandomUnits],
  },
  {
    unitSlug: 'the-strongest-of-today',
    tier: 'S',
    mode: 'boss',
    reason:
      'The Strongest of Today belongs in the top comparison set for players evaluating late-game DPS and premium trait investment.',
    confidence: 'medium',
    sources: [sources.fandomUnits],
  },
  {
    unitSlug: 'the-strongest-in-history',
    tier: 'S',
    mode: 'boss',
    reason:
      'The Strongest in History is best treated as a high-end boss and late-game unit until current patch testing suggests otherwise.',
    confidence: 'medium',
    sources: [sources.fandomUnits],
  },
  {
    unitSlug: 'revolutionary-chief-spade',
    tier: 'A',
    mode: 'support',
    reason:
      'Revolutionary Chief (Spade) is valuable as a synchro planning example and support-profile unit, but requires prerequisites.',
    confidence: 'medium',
    sources: [sources.fandomTierList],
  },
  {
    unitSlug: 'unparalleled-armor',
    tier: 'A',
    mode: 'story',
    reason:
      'Unparalleled Armor is a synchro target worth building around when the account already has the source units.',
    confidence: 'medium',
    sources: [sources.fandomTierList],
  },
  {
    unitSlug: 'majestic-armor',
    tier: 'A',
    mode: 'story',
    reason:
      'Majestic Armor is useful for explaining the synchro path and should sit below more direct premium carries until more evidence is available.',
    confidence: 'medium',
    sources: [sources.fandomTierList],
  },
  {
    unitSlug: 'fused-warrior',
    tier: 'A',
    mode: 'early',
    reason:
      'Fused Warrior is update-relevant and ties into Fused Warrior relics, but should be compared with stronger fusion forms before heavy spending.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
  {
    unitSlug: 'fused-warrior-earrings',
    tier: 'A',
    mode: 'early',
    reason:
      'Fused Warrior (Earrings) supports the same fusion build cluster and is likely useful when top-rarity options are missing.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
  {
    unitSlug: 'limit-breaker-prince-marked',
    tier: 'A',
    mode: 'boss',
    reason:
      'Limit Breaker Prince (Marked) is a late-X boss/DPS candidate; its current placement should stay conservative until Update 4 evidence is available.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
  {
    unitSlug: 'super-roku-third-ascension',
    tier: 'A',
    mode: 'overall',
    reason:
      'Super Roku (Third Ascension) is relevant to the Universal Fest P2 Saiyan cluster and deserves A-tier watch coverage.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
  {
    unitSlug: 'the-drink-super-rage',
    tier: 'A',
    mode: 'overall',
    reason:
      'The Drink (Super Rage) is a late-X event unit preserved for comparison and still needs current meta validation.',
    confidence: 'medium',
    sources: [sources.fandomHome, sources.fandomUnits],
  },
];
