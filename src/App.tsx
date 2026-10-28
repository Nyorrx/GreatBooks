import { useState, useEffect, useCallback } from 'react';
import type { ExperienceSection, RealmId, UserPreferences } from './types/atlas';
import { REALM_MAP } from './data/realms';
import { PORTFOLIO_PROFILE } from './data/portfolioData';
import {
  loadUserPreferences,
  saveUserPreferences,
} from './utils/storage';
import { soundEngine } from './utils/soundEngine';
import { CelestialAtlasCanvas } from './three/CelestialAtlasCanvas';
import { ObservatoryConsole } from './components/ObservatoryConsole';
import { NavigatorsChart } from './components/NavigatorsChart';
import { NavigatorsCompass } from './components/NavigatorsCompass';
import { WebsiteSoundtrackPlayer } from './components/WebsiteSoundtrackPlayer';
import { HomeOverlay } from './components/HomeOverlay';
import { TravelerJournalModal } from './components/TravelerJournalModal';
import { OdysseySpotlightModal } from './components/OdysseySpotlightModal';
import { ConstellationsModal } from './components/ConstellationsModal';
import { ReflectionModal } from './components/ReflectionModal';
import { Compass, Map, BookOpen } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<ExperienceSection>('home');
  const [selectedRealmId, setSelectedRealmId] = useState<RealmId | null>(null);
  const [hoveredRealmId, setHoveredRealmId] = useState<RealmId | null>(null);
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'map' | 'dashboard' | 'chart'>('map');

  const profile = PORTFOLIO_PROFILE;
  const [prefs, setPrefs] = useState<UserPreferences>(() => loadUserPreferences());

  // Persist user preferences whenever they change
  useEffect(() => {
    saveUserPreferences(prefs);
  }, [prefs]);

  // Sync reduced-motion accessibility preference with OS media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefs((prev) => ({ ...prev, reducedMotion: e.matches }));
    };
    mq.addEventListener?.('change', handleChange);
    return () => mq.removeEventListener?.('change', handleChange);
  }, []);

  const handleCloseRealm = useCallback(() => {
    setSelectedRealmId(null);
    setIsChartOpen(false);
    setMobileTab('map');
  }, []);

  const handleSelectRealm = useCallback(
    (realmId: RealmId) => {
      // Toggle behavior: Clicking the same selected island again returns it to its original coordinates
      if (selectedRealmId === realmId && activeSection === 'atlas' && isChartOpen) {
        soundEngine.playNavigationTick(prefs.audioMuted);
        handleCloseRealm();
        return;
      }
      soundEngine.playRealmChime(realmId, prefs.audioMuted);
      setSelectedRealmId(realmId);
      setActiveSection('atlas');
      setIsChartOpen(true);
      setMobileTab('chart');
      setPrefs((prev) => ({
        ...prev,
        visitedRealms: prev.visitedRealms.includes(realmId)
          ? prev.visitedRealms
          : [...prev.visitedRealms, realmId],
      }));
    },
    [prefs.audioMuted, selectedRealmId, activeSection, isChartOpen, handleCloseRealm]
  );

  const handleSelectSection = useCallback(
    (section: ExperienceSection) => {
      soundEngine.playNavigationTick(prefs.audioMuted);
      setActiveSection(section);
      if (section !== 'atlas') {
        setSelectedRealmId(null);
        setIsChartOpen(false);
      }
    },
    [prefs.audioMuted]
  );

  const handleBeginJourney = useCallback(() => {
    soundEngine.playNavigationTick(prefs.audioMuted);
    setActiveSection('atlas');
    setSelectedRealmId(null);
    setIsChartOpen(false);
    setMobileTab('map');
  }, [prefs.audioMuted]);

  const handleResetCameraOverview = useCallback(() => {
    soundEngine.playNavigationTick(prefs.audioMuted);
    setSelectedRealmId(null);
    setIsChartOpen(false);
    setActiveSection('atlas');
    setMobileTab('map');
  }, [prefs.audioMuted]);

  const handleToggleChart = useCallback(() => {
    soundEngine.playNavigationTick(prefs.audioMuted);
    setIsChartOpen((prev) => !prev);
  }, [prefs.audioMuted]);

  const handleCloseChart = useCallback(() => {
    setIsChartOpen(false);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setPrefs((prev) => ({ ...prev, audioMuted: !prev.audioMuted }));
  }, []);

  const handleToggleReducedMotion = useCallback(() => {
    setPrefs((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const cameraPresetMode =
    selectedRealmId !== null
      ? 'realm'
      : activeSection === 'odyssey-spotlight'
        ? 'odyssey-spotlight'
        : activeSection === 'home'
          ? 'home'
          : 'overview';

  return (
    <div className="relative h-screen h-[100dvh] w-screen overflow-hidden bg-[#1B110B] text-[#2C1E12]">
      {/* Living 3D Navigator's Chart Table */}
      <main className="no-print relative h-full w-full overflow-hidden">
        {/* Center: Interactive 3D Island Map Canvas */}
        <CelestialAtlasCanvas
          selectedRealmId={selectedRealmId}
          hoveredRealmId={hoveredRealmId}
          visitedRealms={prefs.visitedRealms}
          onSelectRealm={handleSelectRealm}
          onCloseRealm={handleCloseRealm}
          onHoverRealm={setHoveredRealmId}
          reducedMotion={prefs.reducedMotion}
          showConstellationLines={prefs.showConstellationLines}
          cameraPresetMode={cameraPresetMode}
          isChartOpen={isChartOpen}
        />

        {/* Left: Floating Burger Menu & Click-Activated Dashboard Drawer */}
        <ObservatoryConsole
          activeSection={activeSection}
          selectedRealmId={selectedRealmId}
          hoveredRealmId={hoveredRealmId}
          visitedRealms={prefs.visitedRealms}
          audioMuted={prefs.audioMuted}
          reducedMotion={prefs.reducedMotion}
          onSelectSection={handleSelectSection}
          onSelectRealm={handleSelectRealm}
          onResetCameraOverview={handleResetCameraOverview}
          onToggleAudio={handleToggleAudio}
          onToggleReducedMotion={handleToggleReducedMotion}
          mobileTab={mobileTab}
        />

        {/* Top-Right: Interactive Medieval Navigator's Compass */}
        {activeSection === 'atlas' && (
          <NavigatorsCompass
            isOpen={isChartOpen || selectedRealmId !== null}
            onToggle={handleToggleChart}
            selectedRealmId={selectedRealmId}
            hoveredRealmId={hoveredRealmId}
            onSelectRealm={handleSelectRealm}
            reducedMotion={prefs.reducedMotion}
          />
        )}

        {/* Right: Expandable Navigator's Chart & Island Field Journal with Audio Player */}
        {activeSection === 'atlas' && (
          <NavigatorsChart
            isOpen={isChartOpen}
            selectedRealmId={selectedRealmId}
            hoveredRealmId={hoveredRealmId}
            visitedRealms={prefs.visitedRealms}
            onSelectRealm={handleSelectRealm}
            onCloseRealm={handleCloseRealm}
            onCloseChart={handleCloseChart}
            onOpenOdysseySpotlight={() => handleSelectSection('odyssey-spotlight')}
            mobileTab={mobileTab}
            reducedMotion={prefs.reducedMotion}
          />
        )}

        {/* Global Website Soundtrack Player: The Odyssey Music for the Whole Website */}
        <WebsiteSoundtrackPlayer
          audioMuted={prefs.audioMuted}
          onToggleAudio={handleToggleAudio}
        />

        {/* Mobile Viewport Section Switcher */}
        {activeSection === 'atlas' && (
          <div
            className="no-print fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#A98545] bg-[#24160E]/95 p-1 shadow-2xl sm:hidden"
            role="tablist"
            aria-label="Mobile Viewport Selection"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'dashboard'}
              onClick={() => setMobileTab('dashboard')}
              className={`flex min-h-[38px] items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                mobileTab === 'dashboard'
                  ? 'bg-[#873B35] text-[#F4ECD8]'
                  : 'text-[#E6D7BE] hover:text-[#F3C879]'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'map'}
              onClick={() => setMobileTab('map')}
              className={`flex min-h-[38px] items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                mobileTab === 'map'
                  ? 'bg-[#873B35] text-[#F4ECD8]'
                  : 'text-[#E6D7BE] hover:text-[#F3C879]'
              }`}
            >
              <Map className="h-3.5 w-3.5" />
              <span>3D Map</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'chart'}
              onClick={() => setMobileTab('chart')}
              className={`flex min-h-[38px] items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                mobileTab === 'chart'
                  ? 'bg-[#873B35] text-[#F4ECD8]'
                  : 'text-[#E6D7BE] hover:text-[#F3C879]'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Chart &amp; Audio</span>
            </button>
          </div>
        )}

        {/* Experience Overlays */}
        {activeSection === 'home' && (
          <HomeOverlay
            onBeginJourney={handleBeginJourney}
            onSelectSection={handleSelectSection}
            onSelectRealm={handleSelectRealm}
          />
        )}

        {activeSection === 'journal' && (
          <TravelerJournalModal
            profile={profile}
            onCloseToAtlas={() => handleSelectSection('atlas')}
          />
        )}

        {activeSection === 'odyssey-spotlight' && (
          <OdysseySpotlightModal
            profile={profile}
            onFlyToOdysseyMonument={(realmId) => handleSelectRealm(realmId)}
            onCloseToAtlas={() => handleSelectSection('atlas')}
          />
        )}

        {activeSection === 'constellations' && (
          <ConstellationsModal
            onSelectRealmFromMatrix={(realmId) => handleSelectRealm(realmId)}
            onCloseToAtlas={() => handleSelectSection('atlas')}
          />
        )}

        {activeSection === 'reflection' && (
          <ReflectionModal
            profile={profile}
            onCloseToAtlas={() => handleSelectSection('atlas')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
