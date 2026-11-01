import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Award,
  Map,
  Feather,
  Volume2,
  VolumeX,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  Menu,
  X,
} from 'lucide-react';
import type { ExperienceSection, RealmId } from '../types/atlas';
import { LITERARY_REALMS, REALM_MAP } from '../data/realms';

interface ObservatoryConsoleProps {
  activeSection: ExperienceSection;
  selectedRealmId: RealmId | null;
  hoveredRealmId?: RealmId | null;
  visitedRealms: RealmId[];
  audioMuted: boolean;
  reducedMotion: boolean;
  onSelectSection: (section: ExperienceSection) => void;
  onSelectRealm: (realmId: RealmId) => void;
  onResetCameraOverview: () => void;
  onToggleAudio: () => void;
  onToggleReducedMotion: () => void;
  mobileTab?: 'map' | 'dashboard' | 'chart';
  isDashboardOpen?: boolean;
  onToggleDashboard?: () => void;
}

export const ObservatoryConsole: React.FC<ObservatoryConsoleProps> = ({
  activeSection,
  selectedRealmId,
  hoveredRealmId,
  visitedRealms,
  audioMuted,
  reducedMotion,
  onSelectSection,
  onSelectRealm,
  onResetCameraOverview,
  onToggleAudio,
  onToggleReducedMotion,
  mobileTab,
  isDashboardOpen,
  onToggleDashboard,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<boolean>(false);

  const isExpanded = isDashboardOpen !== undefined ? isDashboardOpen : internalExpanded;
  const isIslandSelected = selectedRealmId !== null;

  // The drawer is visible if expanded (or on mobile dashboard tab) AND no island is selected
  const showDrawer = (isExpanded || mobileTab === 'dashboard') && !isIslandSelected;

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleDashboard) {
      onToggleDashboard();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  const activeCompassRealm =
    (hoveredRealmId && REALM_MAP[hoveredRealmId]) ||
    (selectedRealmId && REALM_MAP[selectedRealmId]) ||
    REALM_MAP.odyssey;

  const navDestinations: {
    id: ExperienceSection;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    subtitle: string;
  }[] = [
    {
      id: 'atlas',
      label: 'The Seven Realms',
      shortLabel: 'Chart Map',
      icon: <Compass className="h-4 w-4" aria-hidden="true" />,
      subtitle: '3D Map & Reading Notes',
    },
    {
      id: 'journal',
      label: "The Traveler's Identity",
      shortLabel: 'Logbook',
      icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
      subtitle: 'About Me & Reading Background',
    },
    {
      id: 'odyssey-spotlight',
      label: 'The Favorite Voyage',
      shortLabel: 'Odyssey',
      icon: <Award className="h-4 w-4" aria-hidden="true" />,
      subtitle: 'Why I Chose The Odyssey',
    },
    {
      id: 'constellations',
      label: "The Navigator's Lessons",
      shortLabel: 'Lessons',
      icon: <Map className="h-4 w-4" aria-hidden="true" />,
      subtitle: 'Comparing All 7 Books',
    },
    {
      id: 'reflection',
      label: 'The Last Page of the Journal',
      shortLabel: 'Reflection',
      icon: <Feather className="h-4 w-4" aria-hidden="true" />,
      subtitle: 'Course Reflections',
    },
  ];

  return (
    <>
      {/* 1. Compact Click-Activated Burger Menu Trigger */}
      <div
        className="no-print fixed top-3 left-3 z-40"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleToggleClick}
          aria-label="Navigation Menu"
          aria-expanded={showDrawer}
          title="Navigation Menu • Click to explore the dashboard"
          className={`group flex items-center gap-2 rounded-sm border-2 border-[#A98545] bg-[#24160E] px-3.5 py-2 text-[#F3C879] shadow-2xl transition-all duration-300 hover:border-[#F3C879] hover:bg-[#3B261A] hover:shadow-[0_0_16px_rgba(243,200,121,0.35)] ${
            isIslandSelected ? 'opacity-70 hover:opacity-100' : 'opacity-100'
          } ${showDrawer ? 'ring-2 ring-[#F3C879] shadow-[0_0_18px_rgba(243,200,121,0.45)]' : ''}`}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="font-display text-xs font-bold tracking-wider uppercase text-[#F3C879]">
            Menu
          </span>
        </button>
      </div>

      {/* 2. Backdrop for Mobile & Tablet when Drawer is Open */}
      {showDrawer && (
        <div
          className="no-print fixed inset-0 z-35 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden"
          onClick={() => {
            if (onToggleDashboard) {
              onToggleDashboard();
            } else {
              setInternalExpanded(false);
            }
          }}
          aria-hidden="true"
        />
      )}

      {/* 3. Expandable Overlay Dashboard Drawer */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        className={`no-print fixed top-16 left-3 bottom-3 z-40 flex w-[calc(100vw-1.5rem)] sm:w-80 md:w-84 lg:w-92 max-h-[calc(100dvh-5rem)] flex-col gap-2.5 transition-all duration-300 ease-in-out ${
          showDrawer
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 -translate-x-[120%] pointer-events-none'
        }`}
      >
        {/* Main Dashboard Header */}
        <header
          className={`walnut-beam flex flex-col gap-3 rounded-sm border-2 border-[#A98545] p-3.5 shadow-2xl transition-opacity duration-300 ${
            isIslandSelected ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Brand Crest, Rotating Needle & Utilities */}
          <div className="flex items-center justify-between gap-2 border-b border-[#A98545]/40 pb-2.5">
            <button
              type="button"
              onClick={() => onSelectSection('home')}
              className="flex items-center gap-2.5 text-left transition hover:opacity-95"
            >
              <div
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#A98545] bg-[#24160E] text-[#F3C879] shadow-inner"
                title={`Compass Bearing: ${activeCompassRealm.bearingLabel}`}
              >
                <svg
                  viewBox="0 0 36 36"
                  className="h-7 w-7"
                  aria-hidden="true"
                  style={{
                    transform: `rotate(${activeCompassRealm.compassAngleDeg}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#A98545" strokeWidth="1.2" strokeDasharray="2 2" />
                  <polygon points="18,3 21.5,18 14.5,18" fill="#873B35" />
                  <polygon points="18,33 21.5,18 14.5,18" fill="#A98545" />
                  <circle cx="18" cy="18" r="2.4" fill="#F3C879" />
                </svg>
              </div>

              <div>
                <span className="block font-display text-sm font-bold tracking-widest text-[#F3C879] uppercase">
                  The Literary Treasure Map
                </span>
                <span className="block font-serif text-xs italic text-[#F4ECD8]/90">
                  Seven Works • {activeCompassRealm.bearingLabel}
                </span>
              </div>
            </button>

            {/* Quick Utility Controls & Close Button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onToggleAudio}
                aria-label={audioMuted ? 'Unmute parchment sounds' : 'Mute parchment sounds'}
                title={audioMuted ? 'Unmute parchment sounds' : 'Mute parchment sounds'}
                className="flex min-h-[38px] min-w-[38px] sm:min-h-[34px] sm:min-w-[34px] items-center justify-center rounded-sm border border-[#A98545]/60 bg-[#24160E] text-[#F4ECD8] transition hover:border-[#F3C879] hover:text-[#F3C879]"
              >
                {audioMuted ? (
                  <VolumeX className="h-3.5 w-3.5 text-[#D8B978]" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-[#F3C879]" />
                )}
              </button>

              <button
                type="button"
                onClick={onToggleReducedMotion}
                aria-pressed={reducedMotion}
                title={
                  reducedMotion
                    ? 'Reduced motion active'
                    : 'Click to reduce motion'
                }
                className={`flex min-h-[38px] min-w-[38px] sm:min-h-[34px] sm:min-w-[34px] items-center justify-center rounded-sm border transition ${
                  reducedMotion
                    ? 'border-[#F3C879] bg-[#873B35] text-[#F4ECD8]'
                    : 'border-[#A98545]/60 bg-[#24160E] text-[#F4ECD8] hover:border-[#F3C879]'
                }`}
              >
                {reducedMotion ? (
                  <PauseCircle className="h-3.5 w-3.5 text-[#F3C879]" aria-hidden="true" />
                ) : (
                  <PlayCircle className="h-3.5 w-3.5 text-[#D8B978]" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={onResetCameraOverview}
                title="Reset to Full Chart Table View"
                aria-label="Reset to Full Chart Table View"
                className="flex min-h-[38px] min-w-[38px] sm:min-h-[34px] sm:min-w-[34px] items-center justify-center rounded-sm border border-[#A98545]/60 bg-[#24160E] text-[#F4ECD8] transition hover:border-[#F3C879] hover:text-[#F3C879]"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#D8B978]" />
              </button>

              <button
                type="button"
                onClick={() => setInternalExpanded(false)}
                aria-label="Close Navigation Menu"
                title="Close Navigation Menu"
                className="flex min-h-[38px] min-w-[38px] sm:min-h-[34px] sm:min-w-[34px] items-center justify-center rounded-sm border border-[#A98545]/70 bg-[#3B261A] text-[#F4ECD8] transition hover:border-[#F3C879] hover:text-[#F3C879]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Primary 5 Portfolio Destinations Navigation */}
          <nav
            aria-label="Navigator's Portfolio Destinations"
            className="flex flex-col gap-1.5"
          >
            {navDestinations.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.id);
                    setInternalExpanded(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[42px] items-center justify-between rounded-sm border px-3 py-2 text-left transition-colors ${
                    isActive
                      ? 'border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow-sm'
                      : 'border-[#A98545]/40 bg-[#24160E]/80 text-[#F4ECD8] hover:border-[#F3C879] hover:bg-[#3B261A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#F3C879]' : 'text-[#D8B978]'}>
                      {item.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif text-[13px] sm:text-sm font-semibold tracking-wide">
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] text-[#E6D7BE]/80">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#F3C879]">
                    →
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Seven Carved Literary Landmarks Ledger */}
        <aside
          aria-label="Seven Carved Literary Landmarks"
          className={`walnut-beam antique-scroll flex flex-1 flex-col overflow-y-auto rounded-sm border-2 border-[#A98545] p-3 shadow-2xl transition-opacity duration-300 ${
            isIslandSelected ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between gap-1.5 border-b border-[#A98545]/40 pb-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#F3C879] uppercase">
              Seven Carved Landmarks ({visitedRealms.length}/7 Charted)
            </span>

            <span className="font-mono text-[10px] text-[#E6D7BE]/80">
              Reading Order
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-1.5">
            {LITERARY_REALMS.map((realm) => {
              const isSelected = selectedRealmId === realm.id;
              const isVisited = visitedRealms.includes(realm.id);
              return (
                <button
                  key={realm.id}
                  type="button"
                  onClick={() => {
                    onSelectRealm(realm.id);
                    setInternalExpanded(false);
                  }}
                  className={`flex min-h-[42px] items-center justify-between rounded-sm border px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? 'border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow-sm'
                      : realm.isFavoriteMasterpiece
                        ? 'border-[#A98545] bg-[#3B261A] text-[#F3C879] hover:border-[#F3C879]'
                        : 'border-[#A98545]/35 bg-[#24160E] text-[#F4ECD8] hover:border-[#A98545]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#F3C879]">
                      {realm.romanNumeral}.
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif text-[13px] sm:text-sm font-semibold">
                        {realm.properTitle}
                      </span>
                      <span className="font-mono text-[10px] text-[#E6D7BE]/80">
                        {realm.civilizationRegion}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {realm.isFavoriteMasterpiece && (
                      <span className="rounded-sm border border-[#F3C879]/50 bg-[#873B35] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#F4ECD8] uppercase">
                        Ithaca
                      </span>
                    )}
                    {isVisited && !isSelected && (
                      <span className="font-mono text-xs text-[#F3C879]" title="Visited">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
};
