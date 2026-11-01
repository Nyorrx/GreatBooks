import React from 'react';
import {
  Anchor,
  Compass,
  Quote,
  Feather,
  BookOpen,
  Users,
  X,
} from 'lucide-react';
import { ODYSSEY_SPOTLIGHT_DATA } from '../data/realms';
import type { RealmId, TravelerProfile } from '../types/atlas';

interface OdysseySpotlightModalProps {
  profile: TravelerProfile;
  onFlyToOdysseyMonument: (realmId: RealmId) => void;
  onCloseToAtlas: () => void;
}

export const OdysseySpotlightModal: React.FC<OdysseySpotlightModalProps> = ({
  profile,
  onFlyToOdysseyMonument,
  onCloseToAtlas,
}) => {
  return (
    <section
      aria-labelledby="odyssey-spotlight-heading"
      className="no-print fixed inset-x-0 top-14 bottom-3 sm:top-16 sm:bottom-12 lg:top-20 lg:bottom-20 z-30 flex items-center justify-center p-2.5 sm:p-4 lg:p-6"
    >
      <div className="leather-folio relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-lg p-1.5 sm:p-2.5">
        {/* Leather & Brass Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A98545]/50 bg-[#24160E] px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-[#F4ECD8] sm:rounded-t">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow">
              <Anchor className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#F3C879] uppercase">
                Folio II • My Favorite Work from the Course
              </span>
              <h2
                id="odyssey-spotlight-heading"
                className="font-display text-xl font-bold text-[#F4ECD8] uppercase sm:text-2xl"
              >
                {ODYSSEY_SPOTLIGHT_DATA.title}: The Harbor of Ithaca
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onFlyToOdysseyMonument('odyssey')}
              className="flex min-h-[44px] items-center gap-1.5 rounded border-2 border-[#F3C879] bg-[#873B35] px-4 py-1.5 font-display text-xs font-bold tracking-wider text-[#F4ECD8] uppercase shadow-sm transition hover:bg-[#6E2E29]"
            >
              <Compass className="h-4 w-4 text-[#F3C879]" aria-hidden="true" />
              <span>Locate Ithaca on the 3D Map</span>
            </button>

            <button
              type="button"
              onClick={onCloseToAtlas}
              className="flex min-h-[44px] items-center gap-1.5 rounded border border-[#A98545]/70 bg-[#3B261A] px-3.5 py-1.5 font-display text-xs font-semibold tracking-wider text-[#F4ECD8] uppercase transition hover:border-[#F3C879] hover:bg-[#4D3222]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Aged Vellum Spotlight Sheet */}
        <div className="vellum-sheet antique-scroll flex-1 space-y-8 overflow-y-auto p-5 sm:rounded-b sm:p-8">
          {/* Overview & Verified Book 20 Quotation */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              <p className="font-mono text-xs font-bold tracking-wider text-[#873B35] uppercase">
                Attribution: {ODYSSEY_SPOTLIGHT_DATA.attribution}
              </p>
              <h3 className="font-display text-xl font-bold text-[#2C1E12] uppercase sm:text-2xl">
                Why The Odyssey Sits at the Center of My Map
              </h3>
              <p className="font-serif text-[15px] leading-7 text-[#2C1E12] sm:text-base">
                <span className="manuscript-dropcap">
                  {ODYSSEY_SPOTLIGHT_DATA.overview.charAt(0)}
                </span>
                {ODYSSEY_SPOTLIGHT_DATA.overview.slice(1)}
              </p>
            </div>

            {/* Verified Book 20 Quotation Spotlight */}
            <blockquote className="flex flex-col justify-between rounded border-2 border-[#A98545] bg-[#EFE3C6] p-5 shadow-inner">
              <div>
                <div className="flex items-center justify-between text-[#873B35]">
                  <span className="font-display text-[11px] font-bold tracking-wider uppercase">
                    Inscribed Verse • Book 20
                  </span>
                  <Quote className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="mt-2 font-mono text-xs font-semibold text-[#59432E] italic">
                  {ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.greekTransliteration}
                </p>
                <p className="mt-2.5 font-serif text-base leading-relaxed font-semibold text-[#2C1E12] italic">
                  &ldquo;{ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.text}&rdquo;
                </p>
              </div>
              <footer className="mt-4 border-t border-[#59432E]/30 pt-2.5 text-xs text-[#59432E]">
                <strong className="font-display text-[#873B35]">
                  {ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.citation}
                </strong>
                <span className="mt-0.5 block font-serif text-[11px] text-[#59432E]">
                  {ODYSSEY_SPOTLIGHT_DATA.featuredBook20Quote.editionNote}
                </span>
              </footer>
            </blockquote>
          </div>

          {/* Reasons for Choosing It as My Favorite Masterpiece */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#59432E]/35 pb-2">
              <Feather className="h-4 w-4 text-[#873B35]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-wider text-[#2C1E12] uppercase">
                Why I Chose The Odyssey as My Favorite Work
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {ODYSSEY_SPOTLIGHT_DATA.reasonsForChoosing.map((reason, idx) => (
                <div
                  key={reason.title}
                  className="vellum-card rounded border-t-4 border-t-[#873B35] p-5"
                >
                  <span className="font-mono text-xs font-bold text-[#873B35] uppercase">
                    Reason 0{idx + 1}
                  </span>
                  <h4 className="mt-1 font-display text-sm font-bold text-[#2C1E12] uppercase">
                    {reason.title}
                  </h4>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-[#2C1E12]">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Characters of the Ithacan Voyage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#59432E]/35 pb-2">
              <Users className="h-4 w-4 text-[#873B35]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-wider text-[#2C1E12] uppercase">
                Main Characters &amp; What They Represent
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {ODYSSEY_SPOTLIGHT_DATA.importantCharacters.map((char) => (
                <div key={char.name} className="vellum-card rounded p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 border-b border-[#59432E]/20 pb-1.5">
                    <h4 className="font-display text-sm font-bold text-[#2C1E12] uppercase">
                      {char.name}
                    </h4>
                    <span className="font-serif text-xs font-semibold text-[#873B35] italic">
                      {char.role}
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-xs leading-relaxed text-[#2C1E12] sm:text-sm">
                    {char.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Three Structured Thematic Entries: Metis, Penelope, Nostos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#59432E]/35 pb-2">
              <BookOpen className="h-4 w-4 text-[#873B35]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-wider text-[#2C1E12] uppercase">
                Three Main Themes in The Odyssey
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {ODYSSEY_SPOTLIGHT_DATA.thematicExplorations.map((theme, idx) => (
                <article
                  key={theme.id}
                  className="vellum-card flex flex-col justify-between rounded p-5"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold text-[#873B35] uppercase">
                      Theme 0{idx + 1}
                    </span>
                    <h4 className="mt-1 font-display text-lg font-bold text-[#2C1E12] uppercase">
                      {theme.title}
                    </h4>
                    <p className="font-serif text-xs font-bold text-[#59432E] italic">
                      {theme.subtitle}
                    </p>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-[#2C1E12]">
                      {theme.analysis}
                    </p>
                  </div>

                  <div className="mt-4 rounded border border-[#68704A]/60 bg-[#E6E4D2] p-3.5">
                    <span className="font-display text-[10px] font-bold tracking-wider text-[#42482D] uppercase">
                      How This Connects to College &amp; Everyday Life
                    </span>
                    <p className="mt-1 font-serif text-xs leading-relaxed text-[#2C1E12]">
                      {theme.collegeAndLifeConnection}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Personal Connection & Academic Reflection on The Odyssey */}
          <div className="rounded border-2 border-[#A98545] bg-[#EFE3C6] p-5 sm:p-6">
            <div>
              <span className="font-mono text-[11px] font-bold tracking-wider text-[#873B35] uppercase">
                Personal Reflection
              </span>
              <h3 className="font-display text-lg font-bold text-[#2C1E12] uppercase">
                What Odysseus&apos; Trip Home Means to Me
              </h3>
            </div>

            <p className="mt-3 font-serif text-sm leading-7 text-[#2C1E12] sm:text-base">
              {profile.odysseyPersonalConnection}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
