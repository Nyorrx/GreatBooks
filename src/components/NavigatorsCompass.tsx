import React from 'react';
import type { LiteraryRealm, RealmId } from '../types/atlas';
import { REALM_MAP } from '../data/realms';

interface NavigatorsCompassProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedRealmId: RealmId | null;
  hoveredRealmId: RealmId | null;
  onSelectRealm: (realmId: RealmId) => void;
  reducedMotion: boolean;
}

export const NavigatorsCompass: React.FC<NavigatorsCompassProps> = ({
  isOpen,
  onToggle,
  selectedRealmId,
  hoveredRealmId,
  onSelectRealm,
  reducedMotion,
}) => {
  const activeRealm: LiteraryRealm =
    (hoveredRealmId && REALM_MAP[hoveredRealmId]) ||
    (selectedRealmId && REALM_MAP[selectedRealmId]) ||
    REALM_MAP.odyssey;

  // Destination waypoints placed on the compass ring with their radial coordinates
  const perimeterWaypoints: {
    id: RealmId;
    romanNumeral: string;
    angleDeg: number;
    title: string;
  }[] = [
    { id: 'job', romanNumeral: 'II', angleDeg: 315, title: 'The Book of Job (NNW)' },
    { id: 'panchatantra', romanNumeral: 'III', angleDeg: 45, title: 'The Panchatantra (NNE)' },
    { id: 'ramayana', romanNumeral: 'IV', angleDeg: 90, title: 'The Ramayana (East)' },
    { id: 'mahabharata', romanNumeral: 'V', angleDeg: 135, title: 'The Mahabharata (SSE)' },
    { id: 'iliad', romanNumeral: 'VI', angleDeg: 225, title: 'The Iliad (SSW)' },
    { id: 'roland', romanNumeral: 'VII', angleDeg: 270, title: 'The Song of Roland (West)' },
  ];

  const isOdysseySelected = selectedRealmId === 'odyssey';

  return (
    <div
      className={`no-print fixed top-3 right-3 z-30 flex flex-col items-center transition-all duration-300 ${
        selectedRealmId ? 'max-sm:hidden' : ''
      }`}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Clickable Medieval Compass Bezel with Enlarged Sectors */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="Interactive Navigator's Compass - Click to toggle chart"
        aria-expanded={isOpen}
        title="Interactive Navigator's Compass • Click to open or close the Navigator's Chart"
        className={`group relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#A98545] bg-[#24160E] p-1 shadow-2xl transition-all duration-300 hover:border-[#F3C879] hover:shadow-[0_0_24px_rgba(243,200,121,0.45)] ${
          isOpen
            ? 'ring-2 ring-[#F3C879] shadow-[0_0_24px_rgba(243,200,121,0.55)] scale-[1.03]'
            : 'hover:scale-[1.02]'
        }`}
      >
        {/* Antiqued Compass Dial Face SVG */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full select-none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="compassParchment" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F9F2E3" />
              <stop offset="70%" stopColor="#EAD8B8" />
              <stop offset="100%" stopColor="#D2B98E" />
            </radialGradient>
            <radialGradient id="compassPivot" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F3C879" />
              <stop offset="100%" stopColor="#5E3A1A" />
            </radialGradient>
          </defs>

          {/* Parchment dial surface */}
          <circle cx="50" cy="50" r="47" fill="url(#compassParchment)" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="#59432E" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="43" fill="none" stroke="#A98545" strokeWidth="0.8" strokeDasharray="1.5 2" />
          <circle cx="50" cy="50" r="39" fill="none" stroke="#59432E" strokeWidth="0.6" />

          {/* Active Sector Radial Glow Wedge */}
          {activeRealm && (
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#F3C879"
              strokeWidth="5"
              strokeOpacity="0.25"
            />
          )}

          {/* Degree ticks around outer perimeter */}
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * Math.PI * 2;
            const isMajor = i % 4 === 0;
            const isMedium = i % 2 === 0;
            const len = isMajor ? 5 : isMedium ? 3.5 : 2;
            const x1 = 50 + Math.cos(angle) * (43 - len);
            const y1 = 50 + Math.sin(angle) * (43 - len);
            const x2 = 50 + Math.cos(angle) * 43;
            const y2 = 50 + Math.sin(angle) * 43;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#873B35' : '#59432E'}
                strokeWidth={isMajor ? 1.2 : 0.7}
              />
            );
          })}

          {/* Cardinal & Ordinal Labels */}
          <text x="50" y="15" textAnchor="middle" fill="#873B35" fontSize="7" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
            N
          </text>
          <text x="86" y="52" textAnchor="middle" fill="#59432E" fontSize="6" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
            E
          </text>
          <text x="50" y="89" textAnchor="middle" fill="#59432E" fontSize="6" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
            S
          </text>
          <text x="14" y="52" textAnchor="middle" fill="#59432E" fontSize="6" fontWeight="bold" fontFamily="Cinzel, Georgia, serif">
            W
          </text>

          {/* Center concentric guide circle */}
          <circle cx="50" cy="50" r="16" fill="none" stroke="#A98545" strokeWidth="0.6" strokeDasharray="1 1.5" />

          {/* Rotating Compass Needle */}
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: `rotate(${activeRealm.compassAngleDeg}deg)`,
              transition: reducedMotion ? 'none' : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* North needle tip: Crimson */}
            <polygon points="50,15 53.5,50 50,47" fill="#873B35" />
            <polygon points="50,15 46.5,50 50,47" fill="#A84C44" />

            {/* South needle tip: Antique bronze */}
            <polygon points="50,85 53.5,50 50,53" fill="#8C6E43" />
            <polygon points="50,85 46.5,50 50,53" fill="#BFA169" />
          </g>

          {/* Center Brass Pivot Ring */}
          <circle cx="50" cy="50" r="10" fill="url(#compassPivot)" stroke="#3B261A" strokeWidth="0.8" opacity="0.6" />
        </svg>

        {/* Center Sector Button: Island #1 The Odyssey */}
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onSelectRealm('odyssey');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onSelectRealm('odyssey');
            }
          }}
          title="Sector I: The Odyssey (Centerpiece Harbor)"
          aria-label="Sector I: The Odyssey (Centerpiece Harbor)"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 ${
            isOdysseySelected
              ? 'border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow-[0_0_12px_#F3C879] ring-2 ring-[#F3C879] scale-110'
              : 'border-[#A98545] bg-[#24160E] text-[#F3C879] hover:bg-[#873B35] hover:text-[#F4ECD8] hover:scale-110'
          }`}
        >
          I
        </span>

        {/* Clickable Destination Waypoints (Sectors II - VII) around the compass ring */}
        {perimeterWaypoints.map((wp) => {
          const rad = ((wp.angleDeg - 90) * Math.PI) / 180;
          const r = 38.5; // percentage radius
          const leftPercent = 50 + Math.cos(rad) * r;
          const topPercent = 50 + Math.sin(rad) * r;
          const isSelected = selectedRealmId === wp.id;

          return (
            <span
              key={wp.id}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onSelectRealm(wp.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onSelectRealm(wp.id);
                }
              }}
              title={`Sector ${wp.romanNumeral}: ${wp.title}`}
              aria-label={`Sector ${wp.romanNumeral}: ${wp.title}`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border text-[9px] sm:text-[11px] font-bold font-mono transition-all duration-300 ${
                isSelected
                  ? 'z-30 border-[#F3C879] bg-[#873B35] text-[#F4ECD8] shadow-[0_0_14px_#F3C879] ring-2 ring-[#F3C879] scale-125'
                  : 'z-10 border-[#A98545] bg-[#24160E] text-[#F3C879] hover:bg-[#873B35] hover:text-[#F4ECD8] hover:scale-115 hover:border-[#F3C879]'
              }`}
            >
              {wp.romanNumeral}
            </span>
          );
        })}
      </button>

      {/* Tactile Status Cartouche Banner under Compass */}
      <div className="mt-1.5 flex items-center gap-1.5 rounded border border-[#A98545]/70 bg-[#24160E]/95 px-2.5 py-1 text-center shadow-lg backdrop-blur-sm">
        <span className="font-display text-[10px] sm:text-[11px] font-bold tracking-wider text-[#F3C879] uppercase">
          {isOpen ? 'Close Chart' : "Navigator's Chart"}
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] text-[#E6D7BE]/80">
          ({activeRealm.bearingLabel})
        </span>
      </div>
    </div>
  );
};

