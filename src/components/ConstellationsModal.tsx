import React, { useState } from 'react';
import { Map, Compass, X, Filter, ExternalLink } from 'lucide-react';
import { CONSTELLATIONS_OF_UNDERSTANDING, LITERARY_REALMS } from '../data/realms';
import type { RealmId } from '../types/atlas';

interface ConstellationsModalProps {
  onSelectRealmFromMatrix: (realmId: RealmId) => void;
  onCloseToAtlas: () => void;
}

export const ConstellationsModal: React.FC<ConstellationsModalProps> = ({
  onSelectRealmFromMatrix,
  onCloseToAtlas,
}) => {
  const [regionFilter, setRegionFilter] = useState<string>('ALL');

  const regions = ['ALL', 'Ancient Near East', 'Ancient India', 'Archaic Greece', 'Medieval Europe'];

  const filteredRealms =
    regionFilter === 'ALL'
      ? LITERARY_REALMS
      : LITERARY_REALMS.filter((r) => r.civilizationRegion === regionFilter);

  return (
    <section
      aria-labelledby="constellations-heading"
      className="no-print fixed inset-x-0 top-14 bottom-3 sm:top-16 sm:bottom-12 lg:top-20 lg:bottom-20 z-30 flex items-center justify-center p-2.5 sm:p-4 lg:p-6"
    >
      <div className="leather-folio relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg p-1.5 sm:p-2.5">
        {/* Leather & Brass Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A98545]/50 bg-[#24160E] px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-[#F4ECD8] sm:rounded-t">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F3C879] bg-[#68704A] text-[#F4ECD8] shadow">
              <Map className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#F3C879] uppercase">
                Folio III • Comparing the Seven Works
              </span>
              <h2
                id="constellations-heading"
                className="font-display text-xl font-bold text-[#F4ECD8] uppercase sm:text-2xl"
              >
                The Navigator&apos;s Lessons
              </h2>
            </div>
          </div>

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

        {/* Scrollable Aged Vellum Comparative Chart Sheet */}
        <div className="vellum-sheet antique-scroll flex-1 space-y-8 overflow-y-auto p-5 sm:rounded-b sm:p-8">
          {/* Four Synthesizing Pillars */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {CONSTELLATIONS_OF_UNDERSTANDING.pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="vellum-card flex flex-col justify-between rounded border-t-4 border-t-[#873B35] p-5 sm:p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#59432E]/25 pb-2">
                    <span className="rounded bg-[#873B35] px-2 py-0.5 font-mono text-xs font-bold text-[#F4ECD8]">
                      Lesson {pillar.roman}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#59432E] italic">
                      {pillar.summary}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-bold text-[#2C1E12] uppercase sm:text-lg">
                    {pillar.title}
                  </h3>
                  <div className="mt-3 space-y-2.5">
                    {pillar.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className="font-serif text-sm leading-relaxed text-[#2C1E12]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Comparative Cartographic Matrix of All Seven Masterpieces */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-double border-[#59432E]/40 pt-6">
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#873B35] uppercase">
                  Comparative Cartographer&apos;s Matrix
                </span>
                <h3 className="font-display text-lg font-bold text-[#2C1E12] uppercase sm:text-xl">
                  Comparing All Seven Books by Culture, Lens &amp; Main Theme
                </h3>
              </div>

              {/* Region Filter Pills */}
              <div
                className="flex flex-wrap items-center gap-1.5"
                role="group"
                aria-label="Filter matrix by civilization"
              >
                <Filter className="mr-1 h-3.5 w-3.5 text-[#59432E]" aria-hidden="true" />
                {regions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setRegionFilter(region)}
                    className={`min-h-[38px] rounded border px-3 py-1 font-display text-xs font-bold uppercase transition ${
                      regionFilter === region
                        ? 'border-[#873B35] bg-[#873B35] text-[#F4ECD8]'
                        : 'border-[#A98545] bg-[#EFE3C6] text-[#2C1E12] hover:border-[#873B35]'
                    }`}
                  >
                    {region === 'ALL' ? 'All Traditions (7)' : region}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Ledger Table View */}
            <div className="hidden overflow-x-auto rounded border-2 border-[#A98545] bg-[#FAF4E6] shadow-sm lg:block">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-[#A98545] bg-[#24160E] font-display text-[11px] font-bold tracking-wider text-[#F3C879] uppercase">
                    <th className="py-3.5 pr-3 pl-4">Book &amp; Landmark</th>
                    <th className="px-3 py-3.5">Time Period &amp; Culture</th>
                    <th className="px-3 py-3.5">Literary Lenses Used</th>
                    <th className="px-3 py-3.5">Main Themes</th>
                    <th className="px-3 py-3.5">Key Takeaway</th>
                    <th className="py-3.5 pr-4 pl-3 text-right">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#A98545]/50 font-serif text-[#2C1E12]">
                  {filteredRealms.map((realm) => (
                    <tr
                      key={realm.id}
                      className={`transition hover:bg-[#EFE3C6] ${
                        realm.isFavoriteMasterpiece ? 'bg-[#EBD9B7]' : ''
                      }`}
                    >
                      <td className="py-4 pr-3 pl-4 align-top">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#873B35]">
                            Realm {realm.romanNumeral}
                          </span>
                          <p className="font-display text-xs font-bold text-[#2C1E12] uppercase">
                            {realm.properTitle}
                          </p>
                          <p className="font-serif text-xs font-semibold text-[#873B35] italic">
                            {realm.realmName}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#59432E]">
                            {realm.bearingLabel}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-4 align-top text-xs leading-relaxed text-[#2C1E12]">
                        {realm.comparativeSummary.culturalContext}
                      </td>
                      <td className="px-3 py-4 align-top text-xs font-bold text-[#873B35]">
                        {realm.comparativeSummary.primaryLenses}
                      </td>
                      <td className="px-3 py-4 align-top text-xs leading-relaxed text-[#2C1E12]">
                        {realm.comparativeSummary.centralHumanConcern}
                      </td>
                      <td className="px-3 py-4 align-top text-xs leading-relaxed text-[#2C1E12]">
                        {realm.comparativeSummary.enduringInsight}
                      </td>
                      <td className="py-4 pr-4 pl-3 text-right align-top">
                        <button
                          type="button"
                          onClick={() => onSelectRealmFromMatrix(realm.id)}
                          className="inline-flex min-h-[38px] items-center gap-1 rounded border border-[#873B35] bg-[#873B35] px-3 py-1.5 font-display text-[11px] font-bold text-[#F4ECD8] uppercase transition hover:bg-[#6E2E29]"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="h-3 w-3 text-[#F3C879]" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Responsive Ledger Cards View */}
            <div className="grid grid-cols-1 gap-3.5 lg:hidden">
              {filteredRealms.map((realm) => (
                <div
                  key={realm.id}
                  className="vellum-card space-y-2.5 rounded p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#873B35]">
                      Realm {realm.romanNumeral} • {realm.civilizationRegion}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectRealmFromMatrix(realm.id)}
                      className="min-h-[38px] rounded border border-[#873B35] bg-[#873B35] px-3 py-1 font-display text-xs font-bold text-[#F4ECD8] uppercase"
                    >
                      Open Journal →
                    </button>
                  </div>
                  <h4 className="font-display text-base font-bold text-[#2C1E12] uppercase">
                    {realm.properTitle} ({realm.realmName})
                  </h4>
                  <p className="font-serif text-xs text-[#873B35]">
                    <strong>Lenses:</strong> {realm.comparativeSummary.primaryLenses}
                  </p>
                  <p className="font-serif text-xs text-[#2C1E12]">
                    <strong>Central Concern:</strong> {realm.comparativeSummary.centralHumanConcern}
                  </p>
                  <p className="font-serif text-xs text-[#2C1E12]">
                    <strong>Enduring Insight:</strong> {realm.comparativeSummary.enduringInsight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
