export type SourceType =
  | 'official'
  | 'fandom'
  | 'guide_site'
  | 'community'
  | 'tested'
  | 'unknown';

export type Confidence = 'high' | 'medium' | 'low' | 'needs_verification';

export interface DataSource {
  type: SourceType;
  label: string;
  url?: string;
  checkedAt: string;
  confidence: Confidence;
  note?: string;
}

export interface GameCode {
  code: string;
  reward: string;
  status: 'working' | 'expired' | 'needs_check';
  firstSeen?: string;
  lastChecked: string;
  event?: 'universal-fest-p2' | 'general';
  levelRequirement?: number;
  sources: DataSource[];
  notes?: string;
}

export type UnitRarity =
  | 'Boundless'
  | 'Universal'
  | 'Unrivaled'
  | 'Synchro'
  | 'Secret'
  | 'Exclusive'
  | 'Mythic'
  | 'Legendary'
  | 'Epic'
  | 'Rare';

export type UnitRole =
  | 'DPS'
  | 'Support'
  | 'Farm'
  | 'Control'
  | 'Boss'
  | 'Utility'
  | 'Hybrid';

export type UnitPlacement =
  | 'Ground'
  | 'Hill'
  | 'Hybrid'
  | 'Support'
  | 'Unknown';
export type UnitTier = 'S' | 'A' | 'B' | 'C' | 'Watchlist';

export interface Unit {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  rarity: UnitRarity;
  placement: UnitPlacement;
  role: UnitRole;
  tier: UnitTier;
  element?: string;
  obtainment?: string;
  bestTraits: string[];
  bestRelics: string[];
  summary: string;
  strengths: string[];
  weaknesses: string[];
  upgradePriority: 'High' | 'Medium' | 'Low' | 'Situational';
  updateTag?: string;
  sources: DataSource[];
  lastChecked: string;
  confidence: Confidence;
}

export interface TierEntry {
  unitSlug: string;
  tier: Exclude<UnitTier, 'Watchlist'>;
  mode: 'overall' | 'story' | 'raid' | 'boss' | 'support' | 'early';
  reason: string;
  confidence: Confidence;
  sources: DataSource[];
}

export interface TeamBuild {
  id: string;
  name: string;
  purpose: string;
  core: string[];
  substitutes: string[];
  notes: string;
  confidence: Confidence;
}

export interface Trait {
  slug: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'Situational';
  rarity?: string;
  odds?: string;
  bestFor: UnitRole[];
  effect: string;
  rerollAdvice: string;
  sources: DataSource[];
  confidence: Confidence;
}

export interface Relic {
  slug: string;
  name: string;
  set: string;
  slot: 'Accessory' | 'Vest' | 'Pants' | 'Set' | 'Unknown';
  stage?: string;
  effect: string;
  bestFor: UnitRole[];
  enhanceAdvice: string;
  sources: DataSource[];
  confidence: Confidence;
}

export interface Guide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  category:
    | 'Start Here'
    | 'Codes'
    | 'Tier / Units'
    | 'Traits / Relics'
    | 'Updates'
    | 'Game Modes'
    | 'Boss / Raid';
  sourceStrategy: 'user_intent_youtube' | 'popular_youtube' | 'manual_data';
  videoSearchQueries?: string[];
  sourceNotes?: string;
  coverImageUrl?: string;
  video?: {
    id: string;
    title: string;
    channel?: string;
    url?: string;
    thumbnailUrl?: string;
    publishedAt?: string;
    viewCountLabel?: string;
  };
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  body: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedRoutes: string[];
}
