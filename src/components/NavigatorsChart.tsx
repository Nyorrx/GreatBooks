import React, { useEffect, useRef } from 'react';
import {
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
  Anchor,
  Hammer,
  BookMarked,
  BookOpen,
  MapPin,
  Layers,
} from 'lucide-react';
import type { LiteraryRealm, RealmId } from '../types/atlas';
import { REALM_MAP, REALM_ORDER, LITERARY_REALMS } from '../data/realms';

interface NavigatorsChartProps {
  isOpen?: boolean;
  selectedRealmId: RealmId | null;
  hoveredRealmId: RealmId | null;
  visitedRealms: RealmId[];
  onSelectRealm: (realmId: RealmId) => void;
  onCloseRealm: () => void;
  onCloseChart?: () => void;
  onOpenOdysseySpotlight: () => void;
  mobileTab?: 'map' | 'dashboard' | 'chart';
  reducedMotion?: boolean;
}

export const NavigatorsChart: React.FC<NavigatorsChartProps> = ({
  isOpen = false,
  selectedRealmId,
  hoveredRealmId,
  visitedRealms,
  onSelectRealm,
  onCloseRealm,
  onCloseChart,
  onOpenOdysseySpotlight,
  mobileTab,
  reducedMotion = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top whenever the selected realm changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedRealmId]);

  // Keyboard escape listener to close selected realm or chart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedRealmId) {
          onCloseRealm();
        } else if (onCloseChart) {
          onCloseChart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRealmId, onCloseRealm, onCloseChart]);

  const selectedRealm: LiteraryRealm | null = selectedRealmId
    ? REALM_MAP[selectedRealmId]
    : null;
  const hoveredRealm: LiteraryRealm | null = hoveredRealmId
    ? REALM_MAP[hoveredRealmId]
    : null;
  const activeDisplayRealm = hoveredRealm || selectedRealm || REALM_MAP.odyssey;

  // Previous / Next realm indices for sequential voyage
  const currentIdx = selectedRealm ? REALM_ORDER.indexOf(selectedRealm.id) : 0;
  const prevRealmId = REALM_ORDER[(currentIdx - 1 + REALM_ORDER.length) % REALM_ORDER.length];
  const nextRealmId = REALM_ORDER[(currentIdx + 1) % REALM_ORDER.length];
  const prevRealm = REALM_MAP[prevRealmId];
  const nextRealm = REALM_MAP[nextRealmId];

  const shouldShow =
    Boolean(isOpen) ||
    Boolean(selectedRealmId) ||
    mobileTab === 'chart';

  return (
    <aside
      aria-label="Navigator's Chart and Realm Folio"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className={`leather-folio no-print fixed ${
        selectedRealm ? 'max-sm:top-[42dvh]' : 'top-14'
      } sm:top-3 lg:top-4 right-3 sm:right-4 bottom-3 sm:bottom-4 z-30 flex w-[calc(100vw-1.5rem)] sm:w-[460px] md:w-[480px] lg:w-[54vw] xl:w-[56vw] max-w-[1100px] ${
        selectedRealm ? 'max-sm:max-h-[calc(58dvh-1rem)]' : 'max-h-[calc(100dvh-4.5rem)]'
      } sm:max-h-[calc(100vh-1.75rem)] lg:max-h-[calc(100vh-2rem)] flex-col rounded-sm border-2 border-[#A98545] bg-[#24160E] shadow-2xl transition-all duration-500 ease-in-out ${
        shouldShow
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-[120%] pointer-events-none'
      } ${mobileTab && mobileTab !== 'chart' ? 'max-sm:hidden' : ''}`}
    >
      {/* Top Leather Header Spine */}
      <div className="relative flex shrink-0 items-center justify-between gap-2.5 border-b border-[#A98545]/50 bg-[#24160E] px-4 py-3 sm:px-6 sm:py-3.5 text-[#F4ECD8]">
        {selectedRealm ? (
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-7 sm:h-8 shrink-0 items-center rounded-sm border border-[#F3C879]/50 bg-[#873B35] px-2.5 sm:px-3 font-display text-xs sm:text-sm font-bold tracking-wider text-[#F4ECD8] uppercase shadow-sm">
              Realm {selectedRealm.romanNumeral}
            </span>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-mono text-xs sm:text-sm font-bold tracking-wider text-[#F3C879] uppercase">
                {selectedRealm.celestialDesignation}
              </span>
              <span className="truncate font-mono text-xs sm:text-[13px] text-[#F4ECD8]/90">
                {selectedRealm.bearingLabel}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-sm border border-[#A98545] bg-[#3B261A] text-[#F3C879]">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 leading-tight">
              <h2 className="truncate font-display text-sm sm:text-base lg:text-lg font-bold tracking-widest text-[#F3C879] uppercase">
                Navigator&apos;s Chart
              </h2>
              <p className="truncate font-serif text-xs sm:text-sm italic text-[#F4ECD8]/90">
                Reading Notes &amp; Map Guide
              </p>
            </div>
          </div>
        )}

        {selectedRealm ? (
          <button
            type="button"
            onClick={onCloseRealm}
            className="flex min-h-[40px] shrink-0 items-center gap-1.5 rounded border border-[#A98545]/80 bg-[#3B261A] px-3.5 py-1.5 font-display text-xs sm:text-sm font-bold tracking-wider text-[#F4ECD8] uppercase whitespace-nowrap transition hover:border-[#F3C879] hover:bg-[#4D3222]"
          >
            <Compass className="h-4 w-4 text-[#F3C879]" aria-hidden="true" />
            <span>Return to Map</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          onCloseChart && (
            <button
              type="button"
              onClick={onCloseChart}
              aria-label="Close Navigator's Chart"
              className="flex min-h-[38px] min-w-[38px] shrink-0 items-center justify-center rounded-sm border border-[#A98545]/70 bg-[#3B261A] text-[#F4ECD8] transition hover:border-[#F3C879] hover:text-[#F3C879]"
            >
              <X className="h-4 w-4" />
            </button>
          )
        )}
      </div>

      {/* Scrollable Vellum Chart Sheet */}
      <div
        ref={scrollContainerRef}
        className="vellum-sheet antique-scroll flex-1 space-y-5 sm:space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-7"
      >
        {selectedRealm ? (
          /* ========================================================================= */
          /* SELECTED ISLAND STATE: Details, Scholarly Folio and Navigational Notes    */
          /* ========================================================================= */
          <div key={selectedRealm.id} className="space-y-5 sm:space-y-6">
            {/* Title, Civilization Badge & Attribution */}
            <div
              className={`border-b-2 border-double border-[#59432E]/40 pb-4 ${
                reducedMotion ? '' : 'floating-content-stagger-1'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded border px-3 py-1 font-mono text-xs sm:text-sm font-semibold leading-normal ${selectedRealm.badgeColorClass}`}
                >
                  {selectedRealm.civilizationRegion}
                </span>
                {selectedRealm.isFavoriteMasterpiece && (
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#873B35] bg-[#873B35] px-3 py-1 font-display text-xs sm:text-sm font-bold tracking-wider text-[#F4ECD8] uppercase">
                    <Anchor className="h-3.5 w-3.5 text-[#F3C879]" aria-hidden="true" />
                    Centerpiece Harbor
                  </span>
                )}
              </div>

              <p className="mt-2.5 font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#873B35] uppercase break-words">
                {selectedRealm.realmName}
              </p>
              <h3
                id="dossier-realm-title"
                className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#1C120C] break-words"
              >
                {selectedRealm.properTitle}
              </h3>
              <p className="mt-2.5 font-serif text-base sm:text-[17px] lg:text-lg leading-relaxed sm:leading-8 text-[#1C120C] break-words">
                <strong className="font-bold text-[#59432E]">Attribution:</strong>{' '}
                {selectedRealm.attribution}
              </p>
              <p className="mt-1.5 font-serif text-sm sm:text-[15px] lg:text-base leading-relaxed text-[#2C1E12] break-words">
                <strong className="font-bold text-[#1C120C]">Era:</strong>{' '}
                {selectedRealm.historicalContext}
              </p>
            </div>

            {/* Carved Miniature Diorama Survey Card */}
            <div
              className={`vellum-card rounded p-4 sm:p-5 lg:p-6 ${
                reducedMotion ? '' : 'floating-content-stagger-2'
              }`}
            >
              <div className="flex items-center gap-1.5 border-b border-[#59432E]/25 pb-2.5">
                <span className="flex items-center gap-2 font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#873B35] uppercase break-words">
                  <Hammer className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#873B35]" aria-hidden="true" />
                  <span>Diorama: {selectedRealm.monumentName}</span>
                </span>
              </div>

              <p className="mt-3 font-serif text-base sm:text-[17px] lg:text-[18px] leading-relaxed sm:leading-8 text-[#1C120C] break-words">
                {selectedRealm.monumentDescription}
              </p>

              <p className="mt-3 border-l-3 border-[#A98545] pl-3.5 font-serif text-sm sm:text-[15px] lg:text-base leading-relaxed sm:leading-7 text-[#2C1E12] italic break-words">
                Cartographer&apos;s Note: &ldquo;{selectedRealm.cartographicNote}&rdquo;
              </p>

              {selectedRealm.isFavoriteMasterpiece && (
                <button
                  type="button"
                  onClick={onOpenOdysseySpotlight}
                  className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded border border-[#873B35] bg-[#873B35] px-4 py-2 font-display text-xs sm:text-sm font-bold tracking-wider text-[#F4ECD8] uppercase shadow-sm transition hover:bg-[#6E2E29]"
                >
                  <Anchor className="h-4 w-4 text-[#F3C879]" aria-hidden="true" />
                  <span>The Favorite Voyage Folio</span>
                </button>
              )}
            </div>

            {/* Critical Lenses & Analytical Thesis */}
            <div
              className={`rounded border-2 border-[#A98545]/75 bg-[#EFE3C6]/90 p-4 sm:p-5 lg:p-6 shadow-inner ${
                reducedMotion ? '' : 'floating-content-stagger-2'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-xs sm:text-sm lg:text-[15px] font-bold tracking-wider text-[#3B261A] uppercase">
                  Critical Lenses:
                </span>
                {selectedRealm.literaryLenses.map((lens) => (
                  <span
                    key={lens}
                    className="rounded border border-[#59432E]/50 bg-[#F4ECD8] px-3 py-1 font-serif text-xs sm:text-sm font-bold text-[#1C120C]"
                  >
                    {lens}
                  </span>
                ))}
              </div>

              <p className="mt-3 font-serif text-base sm:text-[17px] lg:text-[18px] leading-relaxed sm:leading-8 text-[#1C120C] break-words">
                {selectedRealm.contextualIntroduction}
              </p>

              <div className="mt-4 border-t border-[#59432E]/35 pt-3">
                <p className="font-display text-xs sm:text-sm lg:text-[15px] font-bold tracking-widest text-[#873B35] uppercase">
                  Central Analytical Thesis
                </p>
                <p className="mt-2 font-serif text-base sm:text-[17px] lg:text-[18px] leading-relaxed sm:leading-8 font-semibold text-[#1C120C] italic break-words">
                  {selectedRealm.analyticalThesis}
                </p>
              </div>
            </div>

            {/* Multi-Section Literary Analysis with Illuminated Drop Caps */}
            <div
              className={`space-y-5 sm:space-y-6 ${
                reducedMotion ? '' : 'floating-content-stagger-3'
              }`}
            >
              {selectedRealm.analyticalSections.map((section, idx) => (
                <section key={section.heading} className="space-y-2.5 sm:space-y-3">
                  <h4 className="flex items-baseline gap-2 border-b border-[#59432E]/30 pb-1.5 font-display text-base sm:text-lg lg:text-[19px] font-bold tracking-wide text-[#873B35] uppercase">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#59432E] shrink-0">0{idx + 1}.</span>
                    <span className="break-words leading-snug">{section.heading}</span>
                  </h4>
                  {section.paragraphs.map((para, pIdx) => {
                    const isFirstParagraph = idx === 0 && pIdx === 0;
                    return (
                      <p
                        key={pIdx}
                        className="font-serif text-base sm:text-[17px] lg:text-[18px] leading-relaxed sm:leading-8 text-[#1C120C] break-words"
                      >
                        {isFirstParagraph ? (
                          <>
                            <span className="manuscript-dropcap" aria-hidden="true">
                              {para.charAt(0)}
                            </span>
                            <span>{para.slice(1)}</span>
                          </>
                        ) : (
                          para
                        )}
                      </p>
                    );
                  })}
                </section>
              ))}
            </div>

            {/* Scholarly Marginalia & Philosophical Concepts */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 border-b border-[#59432E]/35 pb-2">
                <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 text-[#873B35]" aria-hidden="true" />
                <h4 className="font-display text-base sm:text-lg font-bold tracking-wider text-[#1C120C] uppercase">
                  Key Terms &amp; Ideas
                </h4>
              </div>
              <div className="space-y-3">
                {selectedRealm.highlightedConcepts.map((concept) => (
                  <div
                    key={concept.term}
                    className="vellum-card rounded border-l-4 border-l-[#873B35] p-3.5 sm:p-4 lg:p-5 text-sm sm:text-base"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <span className="font-display text-base sm:text-lg font-bold text-[#1C120C] break-words">
                        {concept.term}
                      </span>
                      {concept.originalScriptOrRoot && (
                        <span className="font-serif text-xs sm:text-sm lg:text-[15px] font-semibold text-[#873B35] break-words">
                          ({concept.originalScriptOrRoot})
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-serif text-base sm:text-[17px] leading-relaxed sm:leading-7 text-[#1C120C] break-words">
                      {concept.definition}
                    </p>
                    <p className="mt-2 font-serif text-sm sm:text-[15px] lg:text-base leading-relaxed sm:leading-7 text-[#2C1E12] italic break-words">
                      Significance: {concept.analyticalSignificance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Quotes */}
            <div className="space-y-2.5 pt-1">
              <p className="font-display text-base sm:text-lg font-bold tracking-wider text-[#873B35] uppercase">
                Verified Quotes &amp; Citations
              </p>
              {selectedRealm.verifiedQuotes.map((q, qIdx) => (
                <blockquote
                  key={qIdx}
                  className="rounded border-l-4 border-[#A98545] bg-[#EFE3C6]/60 p-4 sm:p-5 font-serif text-base sm:text-[17px] lg:text-[18px] italic leading-relaxed sm:leading-8 text-[#1C120C] break-words"
                >
                  <p>{q.text}</p>
                  <cite className="mt-2.5 block font-serif text-sm sm:text-[15px] font-semibold text-[#873B35] not-italic leading-normal break-words">
                    - {q.citation} ({q.translationNote})
                  </cite>
                </blockquote>
              ))}
            </div>

            {/* Sequential Voyage Footer (Prev / Next) */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[#59432E]/30 pt-4">
              <button
                type="button"
                onClick={() => onSelectRealm(prevRealmId)}
                className="flex min-h-[42px] items-center gap-1.5 rounded border border-[#59432E]/40 bg-[#F4ECD8] px-3.5 py-2 font-display text-xs sm:text-sm font-semibold text-[#2C1E12] whitespace-nowrap transition hover:border-[#873B35]"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 text-[#873B35]" />
                <span>Prev • Realm {prevRealm.romanNumeral}</span>
              </button>

              <button
                type="button"
                onClick={onCloseRealm}
                className="font-mono text-xs sm:text-sm font-bold text-[#873B35] underline hover:text-[#2C1E12] whitespace-nowrap"
              >
                Return to Map
              </button>

              <button
                type="button"
                onClick={() => onSelectRealm(nextRealmId)}
                className="flex min-h-[42px] items-center gap-1.5 rounded border border-[#873B35] bg-[#873B35] px-3.5 py-2 font-display text-xs sm:text-sm font-semibold text-[#F4ECD8] shadow-sm whitespace-nowrap transition hover:bg-[#6E2E29]"
              >
                <span>Next • Realm {nextRealm.romanNumeral}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#F3C879]" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* DEFAULT STATE: Navigator's Chart Overview, Active Bearing & Gazetteer     */
          /* ========================================================================= */
          <div className="space-y-5 sm:space-y-6">
            {/* Active Bearing & Cartographic Coordinates */}
            <div className="rounded border-2 border-[#A98545] bg-[#EFE3C6]/95 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-[#59432E]/25 pb-2.5">
                <span className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#873B35] uppercase">
                  <MapPin className="h-4 w-4 text-[#873B35]" />
                  Active Chart Bearing
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#59432E]">
                  Sector {activeDisplayRealm.romanNumeral}
                </span>
              </div>
              <p className="mt-2 font-display text-lg sm:text-xl font-bold text-[#1C120C] break-words">
                {activeDisplayRealm.properTitle}
              </p>
              <p className="font-serif text-sm sm:text-[15px] italic text-[#2C1E12] break-words">
                {activeDisplayRealm.realmName} • {activeDisplayRealm.bearingLabel}
              </p>
              <p className="mt-1.5 font-mono text-xs sm:text-sm text-[#873B35] break-words">
                Coordinates: {activeDisplayRealm.celestialDesignation}
              </p>
            </div>

            {/* Cartographer's Illuminated Chart of the Seven Horizons */}
            <div className="vellum-card rounded p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#59432E]/30 pb-2.5">
                <span className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#873B35] uppercase">
                  Cartographer&apos;s Sea Chart
                </span>
                <span className="font-mono text-xs sm:text-sm text-[#59432E]">
                  Parchment Projection • 7 Horizons
                </span>
              </div>
              <div className="relative mt-2.5 flex items-center justify-center overflow-hidden rounded border border-[#A98545]/60 bg-[#EFE3C6]/90 p-2 shadow-inner">
                <svg
                  viewBox="0 0 540 320"
                  className="w-full h-auto select-none"
                  aria-label="The Literary Treasure Map - Seven Horizons Overview Chart"
                >
                  <defs>
                    <radialGradient id="miniChartVellum" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FAF4E6" />
                      <stop offset="80%" stopColor="#EAD8B8" />
                      <stop offset="100%" stopColor="#D9C298" />
                    </radialGradient>
                    <filter id="miniShadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#3B261A" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* Vellum Sea Surface */}
                  <rect x="4" y="4" width="532" height="312" rx="4" fill="url(#miniChartVellum)" stroke="#8C6E43" strokeWidth="1.5" />
                  <rect x="10" y="10" width="520" height="300" rx="2" fill="none" stroke="#A98545" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Central Compass Rose Backdrop */}
                  <g transform="translate(270, 150)" opacity="0.32">
                    <circle cx="0" cy="0" r="44" fill="none" stroke="#A98545" strokeWidth="0.8" strokeDasharray="2 3" />
                    <line x1="-54" y1="0" x2="54" y2="0" stroke="#873B35" strokeWidth="0.8" />
                    <line x1="0" y1="-54" x2="0" y2="54" stroke="#873B35" strokeWidth="0.8" />
                  </g>

                  {/* Connecting Red Sea Routes with Brass Waypoint Dots */}
                  <path
                    d="M 270 150 L 190 70 L 350 70 L 450 150 L 370 240 L 170 240 L 90 150 Z"
                    fill="none"
                    stroke="#873B35"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    strokeOpacity="0.85"
                  />
                  {[
                    [270, 150], [190, 70], [350, 70], [450, 150],
                    [370, 240], [170, 240], [90, 150],
                    [230, 110], [310, 70], [400, 110], [410, 195],
                    [270, 240], [130, 195], [180, 150]
                  ].map(([bx, by], i) => (
                    <circle key={i} cx={bx} cy={by} r="2.5" fill="#A98545" stroke="#3B261A" strokeWidth="0.6" />
                  ))}

                  {/* Island #1: The Odyssey (Exact Center) */}
                  <g
                    transform={`translate(270, ${selectedRealmId === 'odyssey' ? 150 - 20 : 150})`}
                    style={{
                      transition: reducedMotion ? 'none' : 'transform 450ms cubic-bezier(0, 0, 0.2, 1)',
                    }}
                    className="cursor-pointer"
                    onClick={() => onSelectRealm('odyssey')}
                    role="button"
                    tabIndex={0}
                    aria-label="Island 1: The Odyssey - The Harbor of Ithaca"
                  >
                    <circle cx="0" cy="0" r="25" fill="#873B35" stroke="#F3C879" strokeWidth="2.2" filter="url(#miniShadowFilter)" />
                    <text x="0" y="-3" textAnchor="middle" fill="#F4ECD8" fontSize="13" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
                      I
                    </text>
                    <text x="0" y="8" textAnchor="middle" fill="#F3C879" fontSize="7.5" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
                      ODYSSEY
                    </text>
                    <rect x="-46" y="28" width="92" height="16" rx="2" fill="#24160E" stroke="#A98545" strokeWidth="0.9" />
                    <text x="0" y="39.5" textAnchor="middle" fill="#F4ECD8" fontSize="8.5" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
                      1. The Odyssey
                    </text>
                  </g>

                  {/* Islands #2 to #7 Arranged Sequentially around The Odyssey */}
                  {[
                    { id: 'job', num: 'II', label: '2. The Book of Job', x: 190, y: 70 },
                    { id: 'panchatantra', num: 'III', label: '3. The Panchatantra', x: 350, y: 70 },
                    { id: 'ramayana', num: 'IV', label: '4. The Ramayana', x: 450, y: 150 },
                    { id: 'mahabharata', num: 'V', label: '5. The Mahabharata', x: 370, y: 240 },
                    { id: 'iliad', num: 'VI', label: '6. The Iliad', x: 170, y: 240 },
                    { id: 'roland', num: 'VII', label: '7. The Song of Roland', x: 90, y: 150 },
                  ].map((isle) => {
                    const isSelected = selectedRealmId === isle.id;
                    return (
                      <g
                        key={isle.id}
                        transform={`translate(${isle.x}, ${isSelected ? isle.y - 20 : isle.y})`}
                        style={{
                          transition: reducedMotion ? 'none' : 'transform 450ms cubic-bezier(0, 0, 0.2, 1)',
                        }}
                        className="cursor-pointer"
                        onClick={() => onSelectRealm(isle.id as RealmId)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${isle.label}`}
                      >
                        <circle cx="0" cy="0" r="19" fill="#3B261A" stroke="#A98545" strokeWidth="1.8" filter="url(#miniShadowFilter)" />
                        <text x="0" y="4.5" textAnchor="middle" fill="#F3C879" fontSize="10.5" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
                          {isle.num}
                        </text>
                        <rect x="-44" y="22" width="88" height="15" rx="2" fill="#24160E" stroke="#59432E" strokeWidth="0.8" />
                        <text x="0" y="32.5" textAnchor="middle" fill="#E6D7BE" fontSize="7.5" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
                          {isle.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Overview Instructions */}
            <div className="vellum-card rounded p-4 sm:p-5">
              <div className="flex items-center gap-2 border-b border-[#59432E]/25 pb-2.5">
                <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-[#873B35]" />
                <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#1C120C] uppercase">
                  How to Use the Map
                </h3>
              </div>
              <p className="mt-3 font-serif text-base sm:text-[17px] leading-relaxed sm:leading-7 text-[#1C120C] break-words">
                In the center of the table is The Literary Treasure Map, with seven miniature 3D
                islands representing the books from our course:
              </p>
              <ul className="mt-3 space-y-2 font-serif text-sm sm:text-base leading-relaxed sm:leading-7 text-[#2C1E12]">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#873B35]">•</span>
                  <span>Click any 3D island on the map to open my reading notes and analysis for that book.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#873B35]">•</span>
                  <span>Drag with your mouse or finger to rotate the view and look closer at the details.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#873B35]">•</span>
                  <span>Click the compass in the top-right corner anytime to open or close this panel.</span>
                </li>
              </ul>
            </div>

            {/* Seven Realms Quick Gazetteer / Enlarged Sectors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-[#59432E]/30 pb-2">
                <span className="flex items-center gap-2 font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#873B35] uppercase">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#873B35]" />
                  The Seven Horizons
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#59432E]">
                  ({visitedRealms.length}/7 Charted)
                </span>
              </div>

              <div className="space-y-2.5">
                {LITERARY_REALMS.map((r) => {
                  const isHovered = hoveredRealmId === r.id;
                  const isVisited = visitedRealms.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelectRealm(r.id)}
                      className={`flex w-full min-h-[64px] sm:min-h-[70px] items-center justify-between gap-3 rounded-sm border-2 p-3.5 sm:p-4 text-left transition-all duration-200 hover:scale-[1.015] active:scale-[0.99] ${
                        isHovered
                          ? 'border-[#873B35] bg-[#E6D4B2] shadow-md ring-1 ring-[#873B35]/40'
                          : r.isFavoriteMasterpiece
                            ? 'border-[#A98545] bg-[#EFE3C6] hover:border-[#873B35] shadow-sm'
                            : 'border-[#59432E]/35 bg-[#F4ECD8] hover:border-[#873B35]'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm sm:text-base font-bold text-[#873B35]">
                            {r.romanNumeral}.
                          </span>
                          <span className="font-display text-base sm:text-lg font-bold text-[#1C120C] break-words">
                            {r.properTitle}
                          </span>
                          {r.isFavoriteMasterpiece && (
                            <span className="rounded bg-[#873B35] px-2.5 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-[#F4ECD8] uppercase whitespace-nowrap">
                              Centerpiece
                            </span>
                          )}
                        </div>
                        <span className="font-serif text-sm sm:text-[15px] italic text-[#3B261A] truncate">
                          {r.realmName} • {r.civilizationRegion}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {isVisited && (
                          <span className="font-mono text-base font-bold text-[#873B35]" title="Charted">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
