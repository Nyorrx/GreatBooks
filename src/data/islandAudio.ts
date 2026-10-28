import type { RealmId } from '../types/atlas';

export interface SoundtrackTrack {
  fileName: string;
  filePath: string;
  fallbackPath?: string;
  title: string;
  properTitle: string;
  composer: string;
  subtitle: string;
}

export const SOUNDTRACK_FILE_NAME =
  'The Odyssey Soundtrack (2026) by Ludwig Göransson - Echoes of the Underworld.mp3';

export const SOUNDTRACK_FILE_PATH =
  '/audio/islands/' + encodeURI(SOUNDTRACK_FILE_NAME);

export const SOUNDTRACK_FALLBACK_PATH = '/audio/islands/soundtrack.mp3';

/**
 * Global website soundtrack for the entire digital portfolio.
 * Removed all per-island audio in favor of the unified Odyssey soundtrack.
 */
export const WEBSITE_SOUNDTRACK: SoundtrackTrack = {
  fileName: SOUNDTRACK_FILE_NAME,
  filePath: SOUNDTRACK_FILE_PATH,
  fallbackPath: SOUNDTRACK_FALLBACK_PATH,
  title: 'The Odyssey Soundtrack (2026)',
  properTitle: 'The Odyssey Soundtrack (2026)',
  composer: 'Ludwig Göransson',
  subtitle: 'Echoes of the Underworld',
};

export type IslandAudioTrack = SoundtrackTrack;
export const ATLAS_SOUNDTRACK = WEBSITE_SOUNDTRACK;

export const ISLAND_AUDIO_MAP: Record<RealmId, SoundtrackTrack> = {
  job: WEBSITE_SOUNDTRACK,
  panchatantra: WEBSITE_SOUNDTRACK,
  ramayana: WEBSITE_SOUNDTRACK,
  mahabharata: WEBSITE_SOUNDTRACK,
  iliad: WEBSITE_SOUNDTRACK,
  odyssey: WEBSITE_SOUNDTRACK,
  roland: WEBSITE_SOUNDTRACK,
};

export function getIslandAudio(_realmId?: RealmId): SoundtrackTrack {
  return WEBSITE_SOUNDTRACK;
}

export function getWebsiteSoundtrack(): SoundtrackTrack {
  return WEBSITE_SOUNDTRACK;
}
