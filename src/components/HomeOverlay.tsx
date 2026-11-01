import React from 'react';
import { Compass, BookOpen, Anchor, Map, Feather, Hand } from 'lucide-react';
import type { ExperienceSection, RealmId } from '../types/atlas';

interface HomeOverlayProps {
  onBeginJourney: () => void;
  onSelectSection: (section: ExperienceSection) => void;
  onSelectRealm: (realmId: RealmId) => void;
}

export const HomeOverlay: React.FC<HomeOverlayProps> = ({
  onBeginJourney,
  onSelectSection,
  onSelectRealm,
}) => {
  return (
    <section
      aria-labelledby="homeworld-heading"
      className="no-print pointer-events-none fixed inset-0 z-20 flex w-full max-w-full items-center justify-center p-2 pt-12 sm:p-4 md:p-6 overflow-hidden"
    >
      <div className="leather-folio pointer-events-auto relative max-h-[calc(100dvh-3.75rem)] sm:max-h-[88vh] lg:max-h-[84vh] w-full max-w-3xl min-w-0 overflow-y-auto overflow-x-hidden rounded-lg p-1.5 sm:p-2.5 md:p-3 shadow-2xl">
        <div className="vellum-sheet antique-scroll relative w-full min-w-0 rounded border border-[#A98545]/70 px-3 py-4 sm:px-6 sm:py-6 md:px-9 md:py-8 text-center overflow-x-hidden">
          {/* Brass Corner Ornaments */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 left-1.5 sm:top-2 sm:left-2 h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-l-2 border-[#873B35]/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-r-2 border-[#873B35]/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-l-2 border-[#873B35]/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 h-3 w-3 sm:h-4 sm:w-4 border-r-2 border-b-2 border-[#873B35]/70"
          />

          {/* Sealing-Wax Stamp Header */}
          <div className="mx-auto inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-[#873B35]/60 bg-[#873B35] px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider sm:tracking-widest text-[#F4ECD8] uppercase shadow-sm">
            <span className="hidden sm:inline">Cabin of Ithaca • Navigator&apos;s Chart Table</span>
            <span className="sm:hidden">Cabin of Ithaca • Chart Table</span>
          </div>

          <h1
            id="homeworld-heading"
            className="mt-2.5 sm:mt-4 font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-normal sm:tracking-wider text-[#2C1E12] uppercase break-words"
          >
            The Literary Treasure Map
          </h1>

          <p className="mt-1 sm:mt-1.5 font-serif text-sm sm:text-xl md:text-2xl font-semibold text-[#873B35] italic">
            My Literary Journey: An Interactive 3D Atlas of the Seven Realms
          </p>

          <div className="mx-auto my-3 sm:my-4 h-0.5 max-w-md border-t border-b border-[#59432E]/30" />

          <p className="mx-auto max-w-2xl text-left font-serif text-xs sm:text-base leading-relaxed sm:leading-relaxed text-[#2C1E12]">
            <span className="manuscript-dropcap">O</span>n this walnut table sits a parchment map
            I built for our Great Books course, with Ithaca right at the center. Around the map are
            seven miniature 3D landmarks representing the books we read this semester: the harbor of
            Ithaca, the desert storm of Uz, the banyan tree of the Panchatantra, the stone bridge to
            Lanka, the war chariot at Kurukshetra, the walls of Troy, and the mountain pass of
            Roncevaux.
          </p>

          {/* Primary Action & Ithaca Centerpiece Shortcut */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBeginJourney}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded border-2 border-[#873B35] bg-[#873B35] px-4 py-2 sm:px-5 sm:py-2.5 font-display text-[11px] sm:text-xs font-bold tracking-normal sm:tracking-wider text-[#F4ECD8] uppercase shadow-md transition hover:bg-[#6E2E29] focus-visible:outline-2 focus-visible:outline-[#2C1E12]"
            >
              <Compass className="h-4 w-4 shrink-0 text-[#F3C879]" aria-hidden="true" />
              <span>Explore the Chart Table</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectRealm('odyssey')}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded border-2 border-[#59432E] bg-[#EFE3C6] px-3 sm:px-4 py-2 sm:py-2.5 font-display text-[11px] sm:text-xs font-bold tracking-normal sm:tracking-wider text-[#2C1E12] uppercase shadow-sm transition hover:border-[#873B35] hover:bg-[#E6D5B2]"
            >
              <Anchor className="h-4 w-4 shrink-0 text-[#873B35]" aria-hidden="true" />
              <span className="hidden sm:inline">Sail to the Harbor of Ithaca</span>
              <span className="sm:hidden">Sail to Ithaca Harbor</span>
            </button>
          </div>

          {/* Direct Folio Portals to the Four Companion Portfolio Sections */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-2 sm:gap-2.5 border-t border-[#59432E]/30 pt-3.5 sm:pt-5 text-left sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => onSelectSection('journal')}
              className="vellum-card group flex min-h-[76px] sm:min-h-[88px] flex-col justify-between rounded p-2.5 sm:p-3 transition hover:border-[#873B35]"
            >
              <div className="flex items-center justify-between text-[#873B35]">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  Folio I
                </span>
                <BookOpen className="h-4 w-4 transition group-hover:scale-110" />
              </div>
              <div className="mt-1 sm:mt-2">
                <p className="font-display text-xs font-bold text-[#2C1E12] uppercase">
                  The Traveler&apos;s Identity
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-[#59432E] leading-snug">
                  About me, what I like to read, and my thoughts on the class
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectSection('odyssey-spotlight')}
              className="vellum-card group flex min-h-[76px] sm:min-h-[88px] flex-col justify-between rounded p-2.5 sm:p-3 transition hover:border-[#873B35]"
            >
              <div className="flex items-center justify-between text-[#873B35]">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  Folio II
                </span>
                <Anchor className="h-4 w-4 transition group-hover:scale-110" />
              </div>
              <div className="mt-1 sm:mt-2">
                <p className="font-display text-xs font-bold text-[#2C1E12] uppercase">
                  The Favorite Voyage
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-[#59432E] leading-snug">
                  Why Homer&apos;s Odyssey was my favorite reading this semester
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectSection('constellations')}
              className="vellum-card group flex min-h-[76px] sm:min-h-[88px] flex-col justify-between rounded p-2.5 sm:p-3 transition hover:border-[#873B35]"
            >
              <div className="flex items-center justify-between text-[#68704A]">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  Folio III
                </span>
                <Map className="h-4 w-4 transition group-hover:scale-110" />
              </div>
              <div className="mt-1 sm:mt-2">
                <p className="font-display text-xs font-bold text-[#2C1E12] uppercase">
                  The Navigator&apos;s Lessons
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-[#59432E] leading-snug">
                  Comparing all seven books across cultures and literary lenses
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectSection('reflection')}
              className="vellum-card group flex min-h-[76px] sm:min-h-[88px] flex-col justify-between rounded p-2.5 sm:p-3 transition hover:border-[#873B35]"
            >
              <div className="flex items-center justify-between text-[#59432E]">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  Folio IV
                </span>
                <Feather className="h-4 w-4 transition group-hover:scale-110" />
              </div>
              <div className="mt-1 sm:mt-2">
                <p className="font-display text-xs font-bold text-[#2C1E12] uppercase">
                  The Last Page of the Journal
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-[#59432E] leading-snug">
                  Five personal reflections on what I learned from these books
                </p>
              </div>
            </button>
          </div>

          {/* Interactive Cartographer Hint */}
          <div className="mt-3.5 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-[#59432E]">
            <Hand className="h-3.5 w-3.5 shrink-0 text-[#873B35]" aria-hidden="true" />
            <span className="leading-snug">
              Drag to look around • Scroll or pinch to zoom • Click any island to read my notes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
