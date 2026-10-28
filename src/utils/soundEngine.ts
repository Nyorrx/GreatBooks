import type { RealmId } from '../types/atlas';

/**
 * Tactile, user-initiated Web Audio synthesizer for parchment page-turns,
 * warm wooden clicks, and muted antique brass chimes.
 */
class NavigatorSoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
        } catch {
          return null;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Plays a soft parchment page-rustle paired with a warm, muted antique brass chime
   * when opening a landmark's Field Journal.
   */
  public playRealmChime(realmId: RealmId, muted: boolean): void {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.playPageRustle(ctx, 0.16);

    const realmPitchMap: Record<RealmId, [number, number]> = {
      job: [220.0, 329.63],         // Warm low A3 - E4
      panchatantra: [246.94, 369.99], // B3 - F#4
      ramayana: [261.63, 392.0],    // C4 - G4
      mahabharata: [196.0, 293.66], // G3 - D4
      iliad: [207.65, 311.13],      // G#3 - D#4
      odyssey: [293.66, 440.0],     // D4 - A4 (Ithaca brass bell)
      roland: [233.08, 349.23],     // Bb3 - F4
    };

    const [rootFreq, fifthFreq] = realmPitchMap[realmId] || [261.63, 392.0];
    const now = ctx.currentTime;

    [rootFreq, fifthFreq].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.045);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(920, now + idx * 0.045);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.032 / (idx + 1), now + idx * 0.045 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.045);
      osc.stop(now + idx * 0.045 + 0.7);
    });
  }

  /**
   * Plays a gentle walnut wooden tap when operating chart table controls.
   */
  public playNavigationTick(muted: boolean): void {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(185, now);
    osc.frequency.exponentialRampToValueAtTime(92, now + 0.045);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.038, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.065);
  }

  /**
   * Plays a subtle parchment page-turn rustle.
   */
  public playPageTurn(muted: boolean): void {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    this.playPageRustle(ctx, 0.14);
  }

  private playPageRustle(ctx: AudioContext, durationSec: number): void {
    try {
      const sampleRate = ctx.sampleRate;
      const frameCount = Math.floor(sampleRate * durationSec);
      const buffer = ctx.createBuffer(1, frameCount, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < frameCount; i++) {
        const env = Math.sin((i / frameCount) * Math.PI);
        data[i] = (Math.random() * 2 - 1) * env * 0.18;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1350, ctx.currentTime);
      filter.Q.setValueAtTime(1.4, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Ignore buffer creation errors in headless test environments
    }
  }
}

export const soundEngine = new NavigatorSoundEngine();
