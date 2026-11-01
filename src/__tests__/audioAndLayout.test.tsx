import { describe, it, expect, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import App from '../App';
import { ISLAND_AUDIO_MAP, getIslandAudio, getWebsiteSoundtrack } from '../data/islandAudio';
import { LITERARY_REALMS } from '../data/realms';
import { WebsiteSoundtrackPlayer } from '../components/WebsiteSoundtrackPlayer';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('Website Redesign: Three-Part Layout, Navigator Chart, and Island Audio', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    window.localStorage.clear();
    HTMLCanvasElement.prototype.getContext = (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    HTMLMediaElement.prototype.load = () => {};
    HTMLMediaElement.prototype.play = async () => {};
    HTMLMediaElement.prototype.pause = () => {};
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('binds the unified soundtrack pasted by the user in public/audio/islands/', () => {
    expect(Object.keys(ISLAND_AUDIO_MAP)).toHaveLength(7);

    const soundtrack = getWebsiteSoundtrack();
    expect(soundtrack.fileName).toContain('The Odyssey Soundtrack (2026)');
    expect(soundtrack.composer).toBe('Ludwig Göransson');
    expect(soundtrack.title).toContain('The Odyssey Soundtrack (2026)');

    LITERARY_REALMS.forEach((realm) => {
      const audioTrack = getIslandAudio(realm.id);
      expect(audioTrack).toBeDefined();
      expect(audioTrack.fileName).toContain('The Odyssey Soundtrack (2026)');
      expect(audioTrack.composer).toBe('Ludwig Göransson');
      expect(audioTrack.title).toContain('The Odyssey Soundtrack (2026)');
    });
  });

  it('renders WebsiteSoundtrackPlayer as default closed music tab, expands on click, and provides play, pause, stop controls', async () => {
    const root = createRoot(container);

    await act(async () => {
      root.render(<WebsiteSoundtrackPlayer />);
    });

    // 1. Verify default closed / minimized circular music icon button is rendered
    const expandBtn = container.querySelector('button[aria-label="Expand Website Soundtrack Player"]') as HTMLButtonElement;
    expect(expandBtn).toBeDefined();

    // 2. Click the music icon button to expand the console
    await act(async () => {
      expandBtn.click();
    });

    // Check Soundtrack title, subtitle and composer
    expect(container.textContent).toContain('The Odyssey Soundtrack (2026)');
    expect(container.textContent).toContain('Echoes of the Underworld');
    expect(container.textContent).toContain('Ludwig Göransson');

    // Controls: Play and Stop buttons
    const playBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Play')
    );
    expect(playBtn).toBeDefined();

    const stopBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.getAttribute('aria-label')?.includes('Stop')
    );
    expect(stopBtn).toBeDefined();

    // Verify audio source path is bound to user's soundtrack
    const audioElem = container.querySelector('audio');
    expect(audioElem).toBeDefined();
    expect(audioElem?.getAttribute('src')).toMatch(/(soundtrack\.mp3|The%20Odyssey%20Soundtrack)/);

    // Verify audio bar starts at 50% and progress scrubber is removed
    const volumeSlider = container.querySelector('input[aria-label="Soundtrack audio bar"]') as HTMLInputElement | null;
    expect(volumeSlider).toBeDefined();
    expect(volumeSlider?.value).toBe('0.5');
    expect(container.textContent).toContain('50%');

    // Verify track progress scrubber is removed
    const progressScrubber = container.querySelector('input[aria-label="Scrub website soundtrack"]');
    expect(progressScrubber).toBeNull();
    expect(audioElem?.volume).toBe(0.5);

    // 3. Click minimize button to collapse back to closed music tab
    const minimizeBtn = container.querySelector('button[aria-label="Minimize soundtrack player"]') as HTMLButtonElement;
    expect(minimizeBtn).toBeDefined();
    await act(async () => {
      minimizeBtn.click();
    });
    expect(container.querySelector('button[aria-label="Expand Website Soundtrack Player"]')).toBeDefined();
  });

  it('renders the three-part layout: Left Dashboard, Center Map, and Right Navigator Chart', async () => {
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    // Enter atlas view
    const beginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    );
    await act(async () => {
      beginBtn!.click();
    });

    // 1. Verify Left Dashboard is present
    const leftDashboard = container.querySelector('aside[aria-label="Seven Carved Literary Landmarks"]');
    expect(leftDashboard).toBeDefined();
    expect(leftDashboard?.className).toContain('opacity-100');

    // 2. Verify Right Navigator's Chart is present in default overview state
    const rightChart = container.querySelector('aside[aria-label="Navigator\'s Chart and Realm Folio"]');
    expect(rightChart).toBeDefined();
    expect(rightChart?.textContent).toContain("Navigator's Chart");
    expect(rightChart?.textContent).toContain('The Seven Horizons');

    // 3. Select an island (e.g. Realm I: The Book of Job)
    const jobBtn = Array.from(leftDashboard!.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('The Book of Job')
    );
    expect(jobBtn).toBeDefined();

    await act(async () => {
      jobBtn!.click();
    });

    // 4. Verify Left Dashboard hides completely
    expect(leftDashboard?.className).toContain('opacity-0');

    // 5. Verify Right Navigator's Chart adapts to show selected island details without by-island audio
    expect(rightChart?.textContent).toContain('The Book of Job');
    expect(rightChart?.textContent).toContain('Central Analytical Thesis');
    expect(rightChart?.textContent).not.toContain('Island Audio Narration');

    // 5b. Verify global Odyssey soundtrack player is present for the whole website, default closed with music icon, and expands on click
    const globalSoundtrack = container.querySelector('aside[aria-label="Website Soundtrack Player"]');
    expect(globalSoundtrack).toBeDefined();
    const musicTabBtn = globalSoundtrack?.querySelector('button[aria-label="Expand Website Soundtrack Player"]') as HTMLButtonElement;
    expect(musicTabBtn).toBeDefined();
    await act(async () => {
      musicTabBtn.click();
    });
    expect(globalSoundtrack?.textContent).toContain('The Odyssey Soundtrack (2026)');
    expect(globalSoundtrack?.textContent).toContain('Play');

    // 6. Close the island details via "Return to Map"
    const returnBtn = Array.from(rightChart!.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Return to Map')
    );
    expect(returnBtn).toBeDefined();

    await act(async () => {
      returnBtn!.click();
    });

    // 7. Verify Left Dashboard is restored
    expect(leftDashboard?.className).toContain('opacity-100');
    expect(rightChart?.textContent).toContain("Navigator's Chart");
  });

  it('toggles dashboard via burger menu and toggles Navigator Chart via interactive compass', async () => {
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    // Enter atlas view
    const beginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    );
    await act(async () => {
      beginBtn!.click();
    });

    // 1. Verify burger menu button is present and collapsed by default
    const burgerBtn = container.querySelector('button[aria-label="Navigation Menu"]');
    expect(burgerBtn).toBeDefined();
    expect(burgerBtn?.getAttribute('aria-expanded')).toBe('false');

    // 1b. Verify mouseenter does NOT expand the menu (hover activation removed in favor of click)
    await act(async () => {
      burgerBtn?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    });
    expect(burgerBtn?.getAttribute('aria-expanded')).toBe('false');

    // 2. Click burger menu button to expand dashboard
    await act(async () => {
      (burgerBtn as HTMLButtonElement).click();
    });
    expect(burgerBtn?.getAttribute('aria-expanded')).toBe('true');

    // 3. Verify Interactive Navigator's Compass is present
    const compassBtn = container.querySelector(
      'button[aria-label="Interactive Navigator\'s Compass - Click to toggle chart"]'
    );
    expect(compassBtn).toBeDefined();

    // 4. Click compass to toggle chart open
    await act(async () => {
      (compassBtn as HTMLButtonElement).click();
    });
    const rightChart = container.querySelector('aside[aria-label="Navigator\'s Chart and Realm Folio"]');
    expect(rightChart).toBeDefined();
    expect(rightChart?.className).toContain('opacity-100');

    // 5. Click compass again to toggle chart closed
    await act(async () => {
      (compassBtn as HTMLButtonElement).click();
    });
    expect(rightChart?.className).toContain('opacity-0');

    // 6. Navigate to a realm directly via compass waypoint (e.g. Roland: VII)
    const rolandWaypoint = Array.from(container.querySelectorAll('span[role="button"]')).find(
      (s) => s.getAttribute('aria-label')?.includes('The Song of Roland')
    );
    expect(rolandWaypoint).toBeDefined();

    await act(async () => {
      (rolandWaypoint as HTMLElement).click();
    });

    // 7. Verify Roland's field journal is opened cleanly without by-island audio
    expect(rightChart?.className).toContain('opacity-100');
    expect(rightChart?.textContent).toContain('The Song of Roland');
    expect(rightChart?.textContent).toContain('The Pass of Roncevaux');
    expect(rightChart?.textContent).not.toContain('Island Audio Narration');
  });

  it('renders all seven sectors on the enlarged Navigator Compass and displays The Literary Treasure Map title', async () => {
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    // 1. Verify The Literary Treasure Map is the primary heading
    expect(container.textContent).toContain('The Literary Treasure Map');

    // 2. Enter atlas view
    const beginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    );
    await act(async () => {
      beginBtn!.click();
    });

    // 3. Verify all seven sector waypoints exist on the Navigator's Compass
    const waypoints = Array.from(container.querySelectorAll('span[role="button"]'));
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

    romanNumerals.forEach((numeral) => {
      const found = waypoints.find((wp) => wp.textContent?.trim() === numeral);
      expect(found).toBeDefined();
    });

    // 4. Verify Centerpiece Sector I (The Odyssey) is clickable and emphasizes cleanly
    const odysseyCenterSector = waypoints.find((wp) => wp.textContent?.trim() === 'I');
    expect(odysseyCenterSector).toBeDefined();
    expect(odysseyCenterSector?.getAttribute('aria-label')).toContain('The Odyssey');

    await act(async () => {
      (odysseyCenterSector as HTMLElement)!.click();
    });

    const rightChart = container.querySelector('aside[aria-label="Navigator\'s Chart and Realm Folio"]');
    expect(rightChart?.className).toContain('opacity-100');
    expect(rightChart?.textContent).toContain('The Odyssey');
    expect(rightChart?.textContent).toContain('The Harbor of Ithaca');
  });
});


