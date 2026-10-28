import React from 'react';
import { Feather, Compass, X, ScrollText } from 'lucide-react';
import type { TravelerProfile } from '../types/atlas';
import { REFLECTION_PROMPTS } from '../data/portfolioData';

interface ReflectionModalProps {
  profile: TravelerProfile;
  onCloseToAtlas: () => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  profile,
  onCloseToAtlas,
}) => {
  return (
    <section
      aria-labelledby="reflection-heading"
      className="no-print fixed inset-x-0 top-14 bottom-3 sm:top-16 sm:bottom-12 lg:top-20 lg:bottom-20 z-30 flex items-center justify-center p-2.5 sm:p-4 lg:p-6"
    >
      <div className="leather-folio relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg p-1.5 sm:p-2.5">
        {/* Leather & Brass Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A98545]/50 bg-[#24160E] px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-[#F4ECD8] sm:rounded-t">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow">
              <Feather className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#F3C879] uppercase">
                Folio IV • Closing Pages of the Navigator&apos;s Logbook
              </span>
              <h2
                id="reflection-heading"
                className="font-display text-xl font-bold text-[#F4ECD8] uppercase sm:text-2xl"
              >
                The Last Page of the Journal
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onCloseToAtlas}
              className="flex min-h-[44px] items-center gap-1.5 rounded border border-[#A98545]/70 bg-[#3B261A] px-3.5 py-1.5 font-display text-xs font-semibold tracking-wider text-[#F4ECD8] uppercase transition hover:border-[#F3C879] hover:bg-[#4D3222]"
            >
              <Compass className="h-3.5 w-3.5 text-[#F3C879]" aria-hidden="true" />
              <span>Return to Chart Table</span>
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Aged Vellum Reflection Sheet */}
        <div className="vellum-sheet antique-scroll flex-1 space-y-6 overflow-y-auto p-5 sm:rounded-b sm:p-8">
          <div className="space-y-6">
            {REFLECTION_PROMPTS.map((item, idx) => (
              <article
                key={item.key}
                className="vellum-card rounded border-l-4 border-l-[#873B35] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2 border-b border-[#59432E]/25 pb-2">
                  <span className="rounded bg-[#873B35] px-2 py-0.5 font-mono text-xs font-bold text-[#F4ECD8]">
                    Question {item.numeral}
                  </span>
                  <span className="font-serif text-xs font-bold text-[#59432E] italic">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-base font-bold text-[#2C1E12] uppercase sm:text-lg">
                  {item.question}
                </h3>
                <p className="mt-3 font-serif text-[15px] leading-7 text-[#2C1E12] sm:text-base">
                  {idx === 0 ? (
                    <>
                      <span className="manuscript-dropcap">
                        {profile.reflections[item.key].charAt(0)}
                      </span>
                      {profile.reflections[item.key].slice(1)}
                    </>
                  ) : (
                    profile.reflections[item.key]
                  )}
                </p>
              </article>
            ))}

            {/* Concluding Colophon */}
            <div className="rounded border-2 border-[#A98545] bg-[#EFE3C6] p-6 text-center shadow-inner">
              <div className="mx-auto inline-flex items-center gap-1.5 text-[#873B35]">
                <ScrollText className="h-4 w-4" aria-hidden="true" />
                <span className="font-display text-xs font-bold tracking-widest uppercase">
                  Colophon • Beyond the Seventh Horizon
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-2xl font-serif text-base leading-relaxed font-semibold text-[#2C1E12] italic sm:text-lg">
                &ldquo;{profile.reflections.concludingPassage}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
