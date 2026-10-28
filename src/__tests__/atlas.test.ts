import { describe, it, expect, beforeEach } from 'vitest';
import {
  LITERARY_REALMS,
  REALM_MAP,
  REALM_ORDER,
  ODYSSEY_SPOTLIGHT_DATA,
  CONSTELLATIONS_OF_UNDERSTANDING,
} from '../data/realms';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { DEFAULT_TRAVELER_PROFILE, REFLECTION_PROMPTS } from '../data/defaultProfile';
import {
  loadTravelerProfile,
  saveTravelerProfile,
  resetTravelerProfile,
  loadUserPreferences,
  saveUserPreferences,
} from '../utils/storage';
import { buildRealmMonument } from '../three/monuments';
import { buildNavigatorChartTable } from '../three/tableProps';
import {
  computeFloatingDestination,
  OUTWARD_FLOAT_DURATION_MS,
  RETURN_FLOAT_DURATION_MS,
  ISLAND_FLOAT_UP_OFFSET_Y,
} from '../three/CelestialAtlasCanvas';

describe("The Navigator's Chart Table: Data, 3D Dioramas & Integrity Suite", () => {
  beforeEach(() => {
    window.localStorage.clear();
    HTMLCanvasElement.prototype.getContext = (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  it('defines all seven literary realms in the required sequence with complete Field Journal analyses and carved diorama specs', () => {
    expect(LITERARY_REALMS).toHaveLength(7);
    expect(REALM_ORDER).toEqual([
      'odyssey',
      'job',
      'panchatantra',
      'ramayana',
      'mahabharata',
      'iliad',
      'roland',
    ]);

    for (const realm of LITERARY_REALMS) {
      expect(realm.properTitle.length).toBeGreaterThan(3);
      expect(realm.realmName.length).toBeGreaterThan(3);
      expect(realm.monumentName.length).toBeGreaterThan(3);
      expect(realm.materialsUsed.length).toBeGreaterThan(5);
      expect(realm.cartographicNote.length).toBeGreaterThan(10);
      expect(realm.bearingLabel.length).toBeGreaterThan(5);
      expect(realm.literaryLenses.length).toBeGreaterThanOrEqual(2);
      expect(realm.analyticalThesis.length).toBeGreaterThan(50);
      expect(realm.analyticalSections.length).toBeGreaterThanOrEqual(3);
      expect(realm.highlightedConcepts.length).toBeGreaterThanOrEqual(3);
      expect(realm.verifiedQuotes.length).toBeGreaterThanOrEqual(2);
      expect(realm.contemporaryReflection.length).toBeGreaterThan(40);
    }
  });

  it('constructs distinct 3D miniature dioramas for all seven landmarks and places The Harbor of Ithaca at the center of the chart', () => {
    const odyssey = REALM_MAP.odyssey;
    expect(odyssey).toBeDefined();
    expect(odyssey.coordinates).toEqual([0, 0.25, 0]);
    expect(odyssey.isFavoriteMasterpiece).toBe(true);
    expect(odyssey.monumentName).toBe('The Harbor of Ithaca');

    for (const realm of LITERARY_REALMS) {
      const built = buildRealmMonument(realm);
      expect(built.root).toBeDefined();
      expect(built.root.children.length).toBeGreaterThan(2);
      expect(built.hitMesh).toBeDefined();
      expect(typeof built.animate).toBe('function');
    }
  });

  it('includes the verified Book 20 quotation, important characters, and all three required thematic explorations in The Favorite Voyage', () => {
    expect(ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.citation).toContain('Book 20');
    expect(ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.text).toContain('Endure, my heart');
    expect(ODYSSEY_SPOTLIGHT_DATA.importantCharacters.length).toBeGreaterThanOrEqual(4);
    const titles = ODYSSEY_SPOTLIGHT_DATA.thematicExplorations.map((t) => t.title);
    expect(titles).toEqual([
      'Metis Over Brute Force',
      'Penelope and Equal Minds',
      'Nostos and Humility',
    ]);
  });

  it('synthesizes four navigator lessons and five personal reflection questions', () => {
    expect(CONSTELLATIONS_OF_UNDERSTANDING.pillars).toHaveLength(4);
    expect(REFLECTION_PROMPTS).toHaveLength(5);
    for (const prompt of REFLECTION_PROMPTS) {
      const responseText = DEFAULT_TRAVELER_PROFILE.reflections[prompt.key];
      expect(responseText.length).toBeGreaterThan(150);
    }
  });

  it('serves the centralized static portfolio profile as source of truth and persists session preferences', () => {
    const profile = loadTravelerProfile();
    expect(profile.isCustomized).toBe(true);
    expect(profile.fullName).toBe('Wilson Dl. Mayao Jr.');
    expect(profile.photoDataUrl).toBeTruthy();
    expect(profile.personalIntroduction).not.toContain('Editable draft');
    expect(profile.readingInterestsAndExperiences).not.toContain('Editable draft');
    expect(profile.odysseyPersonalConnection).not.toContain('Editable draft');

    // Attempting localStorage modification does not alter the source of truth profile
    saveTravelerProfile({
      ...profile,
      fullName: 'Different Visitor',
    });
    const reloaded = loadTravelerProfile();
    expect(reloaded.fullName).toBe('Wilson Dl. Mayao Jr.');

    const reset = resetTravelerProfile();
    expect(reset.fullName).toBe('Wilson Dl. Mayao Jr.');

    // User preferences (audio mute and navigation history) persist for the session
    const prefs = loadUserPreferences();
    expect(prefs.audioMuted).toBe(false);
    saveUserPreferences({
      ...prefs,
      audioMuted: true,
      visitedRealms: ['odyssey', 'job'],
    });
    const reloadedPrefs = loadUserPreferences();
    expect(reloadedPrefs.audioMuted).toBe(true);
    expect(reloadedPrefs.visitedRealms).toEqual(['odyssey', 'job']);
  });

  it('constructs navigator chart table with clean parchment mesh clearance preventing underbed clipping', () => {
    const tableHandles = buildNavigatorChartTable();
    expect(tableHandles.tableGroup).toBeDefined();

    const children = tableHandles.tableGroup.children;
    expect(children.length).toBeGreaterThan(5);

    const parchmentMesh = children.find(
      (c) => (c as { geometry?: { type?: string } }).geometry?.type === 'PlaneGeometry'
    ) as { geometry: { attributes: { position: { count: number; getY: (i: number) => number } } } } | undefined;
    expect(parchmentMesh).toBeDefined();

    if (parchmentMesh) {
      const posAttr = parchmentMesh.geometry.attributes.position;
      let minY = Infinity;
      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i);
        if (y < minY) minY = y;
      }
      expect(minY).toBeGreaterThanOrEqual(0.039);
    }
  });

  it('computes viewport-aware floating island destinations beside the Navigator’s Chart for all seven islands across desktop, tablet, and mobile viewports', () => {
    expect(OUTWARD_FLOAT_DURATION_MS).toBeGreaterThanOrEqual(700);
    expect(OUTWARD_FLOAT_DURATION_MS).toBeLessThanOrEqual(1600);
    expect(RETURN_FLOAT_DURATION_MS).toBeGreaterThanOrEqual(600);
    expect(RETURN_FLOAT_DURATION_MS).toBeLessThanOrEqual(1300);

    const viewports = [
      { width: 1920, height: 1080, isMobile: false },
      { width: 1280, height: 720, isMobile: false },
      { width: 768, height: 1024, isMobile: false },
      { width: 390, height: 844, isMobile: true },
    ];

    for (const vp of viewports) {
      for (const realm of LITERARY_REALMS) {
        const dest = computeFloatingDestination(realm, vp.width, vp.height);

        // Elevated well above the flat parchment map
        expect(dest.position.y).toBeGreaterThan(realm.coordinates[1] + 5);
        // Enlarged scale on desktop/tablet, adapted scale on mobile, and 3D inspection tilt
        expect(dest.scale).toBeGreaterThan(vp.isMobile ? 0.7 : 1.1);
        expect(dest.rotation.x).toBeGreaterThan(0);

        // Title card placement: Clear visible gap between island's bottom edge and card top edge
        const islandBottomEdgePx = dest.screenY + dest.visualRadiusPx;
        expect(dest.cardTopPx - islandBottomEdgePx).toBeCloseTo(dest.cardGapPx, 0);
        expect(dest.cardGapPx).toBe(vp.isMobile ? 18 : 28);
        expect(dest.cardTopPx).toBeGreaterThan(islandBottomEdgePx + 15);

        if (!vp.isMobile) {
          // On desktop and tablet, floating island sits in the left display area beside the Navigator's Chart
          expect(dest.screenX).toBeGreaterThan(100);
          expect(dest.screenX).toBeLessThan(dest.chartLeftPx - 80);
          expect(dest.screenY).toBeGreaterThan(80);
          expect(dest.cardTopPx).toBeLessThan(vp.height - 20);
        } else {
          // On mobile, floating island sits in the upper 42% viewport stage above the lower sheet
          expect(dest.screenX).toBeCloseTo(vp.width * 0.5, 1);
          expect(dest.screenY).toBeLessThan(vp.height * 0.42);
          expect(dest.cardTopPx).toBeLessThan(vp.height * 0.42 + 20);
        }
      }

      // The Book of Job island is positioned slightly lower than standard islands to ensure the entire whirlwind is visible
      const jobDest = computeFloatingDestination(REALM_MAP.job, vp.width, vp.height);
      const panchaDest = computeFloatingDestination(REALM_MAP.panchatantra, vp.width, vp.height);
      expect(jobDest.screenY).toBeGreaterThan(panchaDest.screenY);
      expect(jobDest.position.y).toBeLessThan(panchaDest.position.y);
    }
  });

  it('animates the floating shadow and 3D title cartouche plaque smoothly with liftProgress on all seven islands', () => {
    for (const realm of LITERARY_REALMS) {
      const built = buildRealmMonument(realm);
      // At rest (liftProgress = 0)
      built.animate(1.0, false, false, 0);
      const shadowAtRest = built.root.children.find((c) => c.name === 'floating-shadow') as
        | { visible: boolean; material: { opacity: number } }
        | undefined;
      const cartouchePlaque = built.root.children.find((c) => c.name === 'cartouche-plaque');
      expect(shadowAtRest).toBeDefined();
      expect(cartouchePlaque).toBeDefined();
      expect(shadowAtRest!.visible).toBe(false);
      expect(shadowAtRest!.material.opacity).toBeCloseTo(0, 3);
      expect(cartouchePlaque!.rotation.x).toBeCloseTo(0, 3);

      // Fully lifted (liftProgress = 1)
      built.animate(1.5, false, true, 1);
      expect(shadowAtRest!.visible).toBe(true);
      expect(shadowAtRest!.material.opacity).toBeGreaterThan(0.7);
      expect(cartouchePlaque!.rotation.x).toBeCloseTo(0.36, 2);
    }
  });

  it('verifies cinematic floating glide animation metrics for all seven islands including The Odyssey in the center', () => {
    // 1. Verify outward and return cinematic durations are set within 1.0s - 1.6s
    expect(OUTWARD_FLOAT_DURATION_MS).toBe(1400);
    expect(RETURN_FLOAT_DURATION_MS).toBe(1100);

    // 2. Verify all seven islands (including Odyssey at center) animate with title cartouche intact
    for (const realm of LITERARY_REALMS) {
      const built = buildRealmMonument(realm);
      // Selected state with lift
      built.animate(1.0, false, true, 1);

      // Cartouche title plaque is present and correctly attached
      const plaque = built.root.children.find((c) => c.name === 'cartouche-plaque');
      expect(plaque).toBeDefined();
      expect(plaque!.position.y).toBeCloseTo(-0.12, 2);
    }
  });

  it('scopes interactive rotation directly to the active island diorama and preserves stationary orientation for other islands and table', () => {
    // Build dioramas for all seven islands
    const dioramas: Record<string, ReturnType<typeof buildRealmMonument>> = {};
    for (const realm of LITERARY_REALMS) {
      dioramas[realm.id] = buildRealmMonument(realm);
      expect(dioramas[realm.id].root.rotation.x).toBe(0);
      expect(dioramas[realm.id].root.rotation.y).toBe(0);
      expect(dioramas[realm.id].root.rotation.z).toBe(0);
    }

    // Simulate selecting each island, applying user drag rotation offsets, and verifying only that island rotates
    for (const activeRealm of LITERARY_REALMS) {
      const activeDiorama = dioramas[activeRealm.id];

      // Simulated user drag: 45 degrees yaw (0.785 rad), 15 degrees pitch (0.26 rad)
      const userYaw = 0.785;
      const userPitch = 0.26;
      activeDiorama.root.rotation.set(userPitch, userYaw, 0);

      // Active island has rotated
      expect(activeDiorama.root.rotation.x).toBeCloseTo(userPitch, 3);
      expect(activeDiorama.root.rotation.y).toBeCloseTo(userYaw, 3);

      // All other islands remain strictly stationary at (0, 0, 0)
      for (const otherRealm of LITERARY_REALMS) {
        if (otherRealm.id === activeRealm.id) continue;
        const otherDiorama = dioramas[otherRealm.id];
        expect(otherDiorama.root.rotation.x).toBe(0);
        expect(otherDiorama.root.rotation.y).toBe(0);
        expect(otherDiorama.root.rotation.z).toBe(0);
      }

      // Deselect and return to map: resets to original position and (0, 0, 0) orientation
      activeDiorama.root.rotation.set(0, 0, 0);
      expect(activeDiorama.root.rotation.x).toBe(0);
      expect(activeDiorama.root.rotation.y).toBe(0);
      expect(activeDiorama.root.rotation.z).toBe(0);
    }
  });
});

