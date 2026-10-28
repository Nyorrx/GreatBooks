import type { RealmId, TravelerProfile, UserPreferences } from '../types/atlas';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

const PREFERENCES_STORAGE_KEY = 'celestial_atlas_preferences_v1';

/**
 * Returns the portfolio's centralized static traveler profile.
 * The shared data file in src/data/portfolioData.ts is the source of truth;
 * browser localStorage is no longer used for primary portfolio content.
 */
export function loadTravelerProfile(): TravelerProfile {
  return { ...PORTFOLIO_PROFILE };
}

/**
 * Retained for backward-compatibility with existing callers;
 * portfolio content is now static and read-only.
 */
export function saveTravelerProfile(_profile: TravelerProfile): { ok: boolean; error?: string } {
  return { ok: true };
}

export function resetTravelerProfile(): TravelerProfile {
  return { ...PORTFOLIO_PROFILE };
}

export function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function loadUserPreferences(): UserPreferences {
  const defaultPrefs: UserPreferences = {
    audioMuted: false,
    reducedMotion: getInitialReducedMotion(),
    showConstellationLines: true,
    visitedRealms: [],
  };
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return {
      ...defaultPrefs,
      ...parsed,
      visitedRealms: Array.isArray(parsed.visitedRealms) ? (parsed.visitedRealms as RealmId[]) : [],
    };
  } catch {
    return defaultPrefs;
  }
}

export function saveUserPreferences(prefs: UserPreferences): void {
  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota or private browsing errors
  }
}
