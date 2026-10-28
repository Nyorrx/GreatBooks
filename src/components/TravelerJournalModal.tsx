import React, { useState } from 'react';
import { User, BookOpen, Compass, Feather, X } from 'lucide-react';
import type { TravelerProfile } from '../types/atlas';

interface TravelerJournalModalProps {
  profile: TravelerProfile;
  onCloseToAtlas: () => void;
}

export const TravelerJournalModal: React.FC<TravelerJournalModalProps> = ({
  profile,
  onCloseToAtlas,
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = profile.fullName.trim()
    ? profile.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join('')
    : 'GB';

  return (
    <section
      aria-labelledby="traveler-journal-title"
      className="no-print fixed inset-x-0 top-14 bottom-3 sm:top-16 sm:bottom-12 lg:top-20 lg:bottom-20 z-30 flex items-center justify-center p-2.5 sm:p-4 lg:p-6"
    >
      <div className="leather-folio relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg p-1.5 sm:p-2.5">
        {/* Leather & Brass Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A98545]/50 bg-[#24160E] px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-[#F4ECD8] sm:rounded-t">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#F3C879] uppercase">
              Folio I • Opening Pages of the Navigator&apos;s Logbook
            </span>
            <h2
              id="traveler-journal-title"
              className="font-display text-xl font-bold text-[#F4ECD8] uppercase sm:text-2xl"
            >
              The Traveler&apos;s Identity
            </h2>
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

        {/* Aged Vellum Logbook Sheet */}
        <div className="vellum-sheet antique-scroll flex-1 overflow-y-auto p-5 sm:rounded-b sm:p-8">
          <div className="space-y-7">
            {/* Top Reader Identity Card */}
            <div className="vellum-card flex flex-col items-center gap-6 rounded p-6 sm:flex-row sm:items-start">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#A98545] bg-[#E6D5B2] shadow-md">
                {profile.photoDataUrl && !imageError ? (
                  <img
                    src={profile.photoDataUrl}
                    alt={profile.fullName || 'Student Traveler Portrait'}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="font-display text-2xl font-bold text-[#873B35]">
                    {initials}
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="font-mono text-xs font-bold tracking-wider text-[#873B35] uppercase">
                  Navigator&apos;s Logbook • Reader &amp; Chronicler of the Seven Realms
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-[#2C1E12] sm:text-3xl">
                  {profile.fullName.trim() || 'Student Chronicler'}
                </h3>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded border border-[#A98545] bg-[#F4ECD8] px-3 py-1 font-serif text-xs text-[#2C1E12]">
                    <strong className="font-bold text-[#873B35]">Course:</strong>{' '}
                    {profile.course.trim() || 'Great Books Program'}
                  </span>
                  <span className="rounded border border-[#A98545] bg-[#F4ECD8] px-3 py-1 font-serif text-xs text-[#2C1E12]">
                    <strong className="font-bold text-[#873B35]">Year &amp; Section:</strong>{' '}
                    {profile.yearAndSection.trim() || 'Colloquium'}
                  </span>
                  {profile.institution.trim() && (
                    <span className="rounded border border-[#A98545] bg-[#F4ECD8] px-3 py-1 font-serif text-xs text-[#2C1E12]">
                      <strong className="font-bold text-[#873B35]">Institution:</strong>{' '}
                      {profile.institution}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Three Integrated Narrative Areas */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <article className="vellum-card rounded p-5">
                <div className="flex items-center gap-2 border-b border-[#59432E]/25 pb-2 text-[#873B35]">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-display text-xs font-bold tracking-wider uppercase">
                    Personal Introduction
                  </h4>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-[#2C1E12]">
                  {profile.personalIntroduction}
                </p>
              </article>

              <article className="vellum-card rounded p-5">
                <div className="flex items-center gap-2 border-b border-[#59432E]/25 pb-2 text-[#59432E]">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-display text-xs font-bold tracking-wider uppercase">
                    Reading &amp; Literary Interests
                  </h4>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-[#2C1E12]">
                  {profile.readingInterestsAndExperiences}
                </p>
              </article>

              <article className="vellum-card rounded p-5">
                <div className="flex items-center gap-2 border-b border-[#59432E]/25 pb-2 text-[#68704A]">
                  <Feather className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-display text-xs font-bold tracking-wider uppercase">
                    Great Books Learning Journey
                  </h4>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-[#2C1E12]">
                  {profile.greatBooksExpectationsAndLearning}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
