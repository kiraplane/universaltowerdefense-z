import { sources } from './sources';
import type { Relic } from './types';

export const relics: Relic[] = [
  {
    slug: 'fusion-accessory',
    name: 'Fusion Accessory',
    set: 'Fusion Relic Set',
    slot: 'Accessory',
    stage: 'Otherworld Disturbance Legendary Stage',
    effect: 'Any ally cleansed by this unit gains +50% Damage for 10 seconds.',
    bestFor: ['Support', 'DPS', 'Hybrid'],
    enhanceAdvice:
      'Prioritize when the team can reliably trigger the cleanse-related buff.',
    sources: [sources.bloxInformerRelics],
    confidence: 'medium',
  },
  {
    slug: 'fusion-vest',
    name: 'Fusion Vest',
    set: 'Fusion Relic Set',
    slot: 'Vest',
    stage: 'Otherworld Disturbance Story Stage',
    effect:
      'Every Neutral Type hit on an enemy grants 5% damage per hit, up to 70%.',
    bestFor: ['DPS', 'Hybrid'],
    enhanceAdvice:
      'Best for units that can repeatedly hit and maintain the stacking damage window.',
    sources: [sources.bloxInformerRelics],
    confidence: 'medium',
  },
  {
    slug: 'fusion-pants',
    name: 'Fusion Pants',
    set: 'Fusion Relic Set',
    slot: 'Pants',
    stage: 'Otherworld Disturbance Story Stage',
    effect:
      'Every Neutral Type hit on an enemy grants 5% damage per hit, up to 70%.',
    bestFor: ['DPS', 'Hybrid'],
    enhanceAdvice:
      'Pair with other Fusion pieces when building around late-X Universal Fest P2 units.',
    sources: [sources.bloxInformerRelics],
    confidence: 'medium',
  },
  {
    slug: 'fused-warrior-accessory',
    name: 'Fused Warrior Accessory',
    set: 'Fused Warrior Relic Set',
    slot: 'Accessory',
    stage: 'Corrupted Absorption Raid',
    effect:
      'If a unit can synchro or fuse, non-synchro form gains damage; synchro form gains range and damage.',
    bestFor: ['DPS', 'Hybrid'],
    enhanceAdvice:
      'High priority for fusion or synchro-focused accounts after the right unit core is confirmed.',
    sources: [sources.bloxInformerRelics],
    confidence: 'medium',
  },
  {
    slug: 'karakuri-relic-set',
    name: 'Karakuri Relic Set',
    set: 'Karakuri Relic Set',
    slot: 'Set',
    effect:
      'A named relic set worth tracking for mode and unit fit as data improves.',
    bestFor: ['Support', 'Utility'],
    enhanceAdvice:
      'Do not over-invest until the exact unit fit and stage farming route are clear.',
    sources: [sources.bloxInformerRelics],
    confidence: 'needs_verification',
  },
  {
    slug: 'monarch-relic-set',
    name: 'Monarch Relic Set',
    set: 'Monarch Relic Set',
    slot: 'Set',
    effect:
      'Likely relevant to Monarch-themed unit planning and premium DPS comparisons.',
    bestFor: ['DPS', 'Boss'],
    enhanceAdvice:
      'Treat as a planning target for Jinoo-style units; verify the current drop and effect before committing.',
    sources: [sources.bloxInformerRelics],
    confidence: 'needs_verification',
  },
  {
    slug: 'strongest-sorcerer-relic-set',
    name: 'Strongest Sorcerer Relic Set',
    set: 'Strongest Sorcerer Relic Set',
    slot: 'Set',
    effect: 'A named relic set connected to high-end sorcerer unit planning.',
    bestFor: ['DPS', 'Boss'],
    enhanceAdvice:
      'Best evaluated alongside The Strongest of Today and The Strongest in History profiles.',
    sources: [sources.bloxInformerRelics],
    confidence: 'needs_verification',
  },
  {
    slug: 'reanimated-ninja-relic-set',
    name: 'Reanimated Ninja Relic Set',
    set: 'Reanimated Ninja Relic Set',
    slot: 'Set',
    effect: 'A named relic set for shinobi-related unit planning.',
    bestFor: ['DPS', 'Hybrid'],
    enhanceAdvice:
      'Use as a planning target for shinobi synchro paths after unit prerequisites are known.',
    sources: [sources.bloxInformerRelics],
    confidence: 'needs_verification',
  },
];
