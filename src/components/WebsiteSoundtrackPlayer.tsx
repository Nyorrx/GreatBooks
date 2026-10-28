import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Music, ChevronDown } from 'lucide-react';
import { WEBSITE_SOUNDTRACK } from '../data/islandAudio';

interface WebsiteSoundtrackPlayerProps {
  audioMuted?: boolean;
  onToggleAudio?: () => void;
  className?: string;
  defaultMinimized?: boolean;
}

export const WebsiteSoundtrackPlayer: React.FC<WebsiteSoundtrackPlayerProps> = ({
  audioMuted = false,
  onToggleAudio,
  className = '',
  defaultMinimized = true,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMinimized, setIsMinimized] = useState<boolean>(defaultMinimized);
  const [hasError, setHasError] = useState<boolean>(false);

  // Persistent playback tracking across map interactions
  const playbackSecondsRef = useRef<number>(0);
  const fadedRef = useRef<boolean>(false);
  const userOverrodeVolumeRef = useRef<boolean>(false);
  const autoplayAttemptedRef = useRef<boolean>(false);

  // Set initial 50% volume and load soundtrack on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    if (!audio.src || (!audio.src.includes('The%20Odyssey%20Soundtrack') && !audio.src.includes('soundtrack.mp3'))) {
      audio.src = WEBSITE_SOUNDTRACK.filePath;
      if (typeof audio.load === 'function') {
        try {
          audio.load();
        } catch {
          // Ignore
        }
      }
    }
  }, []);

  // Sync volume and audioMuted prop with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = audioMuted;
      audio.volume = volume;
    }
  }, [audioMuted, volume]);

  // Autoplay after 3 seconds with graceful fallback on browser restriction
  useEffect(() => {
    if (autoplayAttemptedRef.current) return;

    const timer = setTimeout(async () => {
      autoplayAttemptedRef.current = true;
      const audio = audioRef.current;
      if (!audio || audioMuted) return;

      try {
        audio.volume = volume;
        if (typeof audio.play === 'function') {
          await audio.play();
          setIsPlaying(true);
          setHasError(false);
        }
      } catch {
        // Autoplay policy prevented playback. Attach one-time interaction listener to window.
        const startOnUserAction = async () => {
          ['pointerdown', 'click', 'keydown', 'touchstart'].forEach((evt) => {
            window.removeEventListener(evt, startOnUserAction);
          });
          const currentAudio = audioRef.current;
          if (currentAudio && !audioMuted) {
            try {
              currentAudio.volume = volume;
              if (typeof currentAudio.play === 'function') {
                await currentAudio.play();
                setIsPlaying(true);
                setHasError(false);
              }
            } catch {
              // Ignore
            }
          }
        };

        ['pointerdown', 'click', 'keydown', 'touchstart'].forEach((evt) => {
          window.addEventListener(evt, startOnUserAction, { once: true });
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [audioMuted, volume]);

  // Track 3 minutes of actual playback and smoothly fade volume to 10% of initial level (0.05)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      playbackSecondsRef.current += 1;

      // After approximately 3 minutes (180s) of playback, smoothly fade volume to 10% (0.05)
      if (playbackSecondsRef.current >= 180 && !fadedRef.current && !userOverrodeVolumeRef.current) {
        fadedRef.current = true;
        const initialVol = volume;
        const targetVol = 0.05;
        const fadeDuration = 10000; // 10-second smooth transition
        const fadeStartTime = performance.now();

        const fadeTimer = setInterval(() => {
          if (userOverrodeVolumeRef.current) {
            clearInterval(fadeTimer);
            return;
          }
          const elapsed = performance.now() - fadeStartTime;
          const progress = Math.min(elapsed / fadeDuration, 1);
          const currentVal = initialVol + (targetVol - initialVol) * progress;
          const rounded = Math.round(currentVal * 100) / 100;
          setVolume(rounded);
          if (audioRef.current) {
            audioRef.current.volume = rounded;
          }
          if (progress >= 1) {
            clearInterval(fadeTimer);
          }
        }, 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio && typeof audio.pause === 'function') {
        try {
          audio.pause();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      setHasError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    const audio = audioRef.current;
    if (audio && WEBSITE_SOUNDTRACK.fallbackPath && !audio.src.includes('soundtrack.mp3')) {
      audio.src = WEBSITE_SOUNDTRACK.fallbackPath;
      if (typeof audio.load === 'function') {
        try {
          audio.load();
          return;
        } catch {
          // Fall through
        }
      }
    }
    setHasError(true);
    setIsPlaying(false);
  };

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (typeof audio.pause === 'function') {
        try {
          audio.pause();
        } catch {
          // Ignore
        }
      }
      setIsPlaying(false);
    } else {
      try {
        audio.volume = volume;
        if (typeof audio.play === 'function') {
          await audio.play();
        }
        setIsPlaying(true);
        setHasError(false);
      } catch {
        setHasError(true);
        setIsPlaying(false);
      }
    }
  }, [isPlaying, volume]);

  const handleStop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (typeof audio.pause === 'function') {
        try {
          audio.pause();
        } catch {
          // Ignore
        }
      }
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    userOverrodeVolumeRef.current = true;
    setVolume(newVol);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVol;
      if (newVol > 0 && (audio.muted || audioMuted)) {
        audio.muted = false;
        if (onToggleAudio && audioMuted) {
          onToggleAudio();
        }
      }
    }
  };

  const toggleMute = () => {
    if (onToggleAudio) {
      onToggleAudio();
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = !audio.muted;
      }
    }
  };

  return (
    <aside
      aria-label="Website Soundtrack Player"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className={`no-print fixed ${
        isMinimized
          ? 'bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]'
          : 'bottom-[calc(env(safe-area-inset-bottom,0px)+3.5rem)] sm:bottom-3'
      } left-3 sm:left-4 z-30 transition-all duration-300 ${className}`}
    >
      {/* Global Background Audio Element */}
      <audio
        ref={audioRef}
        src={WEBSITE_SOUNDTRACK.filePath}
        loop={true}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleAudioError}
      >
        <source src={WEBSITE_SOUNDTRACK.filePath} type="audio/mpeg" />
        {WEBSITE_SOUNDTRACK.fallbackPath && (
          <source src={WEBSITE_SOUNDTRACK.fallbackPath} type="audio/mpeg" />
        )}
      </audio>

      {isMinimized ? (
        /* Minimized Music Button - Default closed, expands when clicked */
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          title="Soundtrack • Click to expand music controls"
          aria-label="Expand Website Soundtrack Player"
          className="group flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#A98545] bg-[#24160E] text-[#F3C879] shadow-2xl transition-all duration-300 hover:border-[#F3C879] hover:bg-[#3B261A] hover:scale-105 hover:shadow-[0_0_16px_rgba(243,200,121,0.35)]"
        >
          <Music className={`h-5 w-5 ${isPlaying ? 'animate-pulse text-[#F3C879]' : 'text-[#D8B978]'}`} />
        </button>
      ) : (
        /* Full Tactile Soundtrack Console */
        <div className="flex max-w-[calc(100vw-1.5rem)] sm:max-w-md items-center gap-2.5 rounded-full border-2 border-[#A98545] bg-[#24160E]/95 px-3 py-1.5 text-[#F4ECD8] shadow-2xl backdrop-blur-md">
          {/* Music Icon & Title */}
          <div className="flex items-center gap-2 pr-1 border-r border-[#A98545]/40 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A98545] bg-[#3B261A] text-[#F3C879]">
              <Music className={`h-4 w-4 ${isPlaying ? 'animate-pulse text-[#F3C879]' : 'text-[#D8B978]'}`} />
            </div>
            <div className="hidden xs:flex flex-col">
              <span className="font-display text-[11px] sm:text-xs font-bold text-[#F4ECD8] truncate max-w-[130px] sm:max-w-[160px]">
                {WEBSITE_SOUNDTRACK.properTitle}
              </span>
              <span className="font-serif text-[10px] italic text-[#E6D7BE]/80 truncate max-w-[130px] sm:max-w-[160px]">
                {WEBSITE_SOUNDTRACK.subtitle} • {WEBSITE_SOUNDTRACK.composer}
              </span>
            </div>
          </div>

          {/* Controls: Play/Pause and Stop */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
              title={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
              className="flex h-8 items-center gap-1 rounded-full border border-[#873B35] bg-[#873B35] px-2.5 font-display text-[11px] font-bold text-[#F4ECD8] shadow-sm transition hover:bg-[#6E2E29]"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-[#F3C879]" aria-hidden="true" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-[#F3C879]" aria-hidden="true" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleStop}
              aria-label="Stop soundtrack"
              title="Stop soundtrack"
              disabled={!isPlaying}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#59432E]/60 bg-[#3B261A] text-[#E6D7BE] transition hover:border-[#873B35] hover:text-[#873B35] disabled:opacity-40"
            >
              <Square className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          {/* Audio Bar (Volume Level Slider starting at 50%) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={audioMuted ? 'Unmute website soundtrack' : 'Mute website soundtrack'}
              title={audioMuted ? 'Unmute website soundtrack' : 'Mute website soundtrack'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#59432E]/60 bg-[#3B261A] text-[#E6D7BE] transition hover:border-[#F3C879] hover:text-[#F3C879]"
            >
              {audioMuted || volume === 0 ? (
                <VolumeX className="h-3.5 w-3.5 text-[#873B35]" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#F3C879]" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={audioMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Soundtrack audio bar"
                title={`Sound volume: ${Math.round((audioMuted ? 0 : volume) * 100)}%`}
                className="h-1.5 w-16 sm:w-20 cursor-pointer appearance-none rounded-full bg-[#59432E] accent-[#F3C879] transition"
              />
              <span className="font-mono text-[9px] font-semibold text-[#F3C879] w-6 text-right">
                {Math.round((audioMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimize soundtrack player"
            title="Minimize soundtrack player"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#E6D7BE]/70 transition hover:text-[#F3C879]"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
};
