import { describe, it, expect, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import App from '../App';
import { loadUserPreferences, saveUserPreferences } from '../utils/storage';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("The Navigator's Chart Table: Interactive User Flows", () => {
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

  it('renders the Cabin Charter, navigates across all 5 portfolio folios, opens the Field Journal for landmarks, and presents polished read-only portfolio content', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(<App />);
    });

    // 1. Verify Cabin Charter heading and subtitle
    expect(container.textContent).toContain('My Literary Journey');
    expect(container.textContent).toContain('An Interactive 3D Atlas of the Seven Realms');

    // 2. Click "Explore the Chart Table" to enter the 3D Navigator's Chart Table
    const beginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    );
    expect(beginBtn).toBeDefined();
    await act(async () => {
      beginBtn!.click();
    });
    // 2b. Verify print functions are removed
    expect(container.textContent).not.toContain('Print Folio');

    // 2c. Verify all seven works appear in exact sequence in the bottom Landmark Ledger dock without circle indicators
    const dockNav = container.querySelector('aside[aria-label="Seven Carved Literary Landmarks"]');
    expect(dockNav).toBeDefined();
    const dockButtons = Array.from(dockNav!.querySelectorAll('button'));
    const expectedTitles = [
      'I.The Odyssey',
      'II.The Book of Job',
      'III.The Panchatantra',
      'IV.The Ramayana',
      'V.The Mahabharata',
      'VI.The Iliad',
      'VII.The Song of Roland',
    ];
    dockButtons.forEach((btn, idx) => {
      const cleanText = btn.textContent?.replace(/\s+/g, '') || '';
      expect(cleanText).toContain(expectedTitles[idx].replace(/\s+/g, ''));
      // Verify no circle indicator element exists inside the button
      expect(btn.querySelector('.rounded-full')).toBeNull();
    });

    // 3. Select Realm I (The Odyssey) from the bottom ledger dock and verify its Field Journal opens
    const odysseyDockBtn = dockButtons.find(
      (b) => b.textContent?.includes('I.') && b.textContent?.includes('The Odyssey')
    );
    expect(odysseyDockBtn).toBeDefined();
    await act(async () => {
      odysseyDockBtn!.click();
    });
    expect(container.textContent).toContain('The Harbor of Ithaca');
    expect(container.textContent).toContain('Central Analytical Thesis');

    // Verify main dashboard is completely hidden when island is selected
    const headerElem = container.querySelector('header');
    expect(headerElem?.className).toContain('opacity-0');
    expect(dockNav?.className).toContain('opacity-0');

    // 4. Navigate to adjacent realms using Next button in the Field Journal
    const nextBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Next • Realm II')
    );
    expect(nextBtn).toBeDefined();
    await act(async () => {
      nextBtn!.click();
    });
    expect(container.textContent).toContain('The Book of Job');
    expect(container.textContent).toContain('The Whirlwind of Uz');
    expect(headerElem?.className).toContain('opacity-0');

    // Close the Field Journal via Return to Map and verify main dashboard is restored
    const returnToMapBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Return to Map')
    );
    expect(returnToMapBtn).toBeDefined();
    await act(async () => {
      returnToMapBtn!.click();
    });
    expect(headerElem?.className).toContain('opacity-100');
    expect(dockNav?.className).toContain('opacity-100');

    // 5. Open The Favorite Voyage (The Odyssey Spotlight)
    const spotlightNavBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('The Favorite Voyage')
    );
    expect(spotlightNavBtn).toBeDefined();
    await act(async () => {
      spotlightNavBtn!.click();
    });
    expect(container.textContent).toContain('Metis Over Brute Force');
    expect(container.textContent).toContain('Penelope and Equal Minds');
    expect(container.textContent).toContain('Nostos and Humility');
    expect(container.textContent).toContain('Locate Ithaca on the 3D Map');

    // 6. Open The Navigator's Lessons (Synthesis & Comparative Matrix)
    const synthesisNavBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes("The Navigator's Lessons")
    );
    expect(synthesisNavBtn).toBeDefined();
    await act(async () => {
      synthesisNavBtn!.click();
    });
    expect(container.textContent).toContain("Comparative Cartographer's Matrix");

    // 7. Open The Last Page of the Journal and verify all 5 reflection questions
    const reflectionNavBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('The Last Page of the Journal')
    );
    expect(reflectionNavBtn).toBeDefined();
    await act(async () => {
      reflectionNavBtn!.click();
    });
    expect(container.textContent).toContain('Question I');
    expect(container.textContent).toContain('Question V');

    // 8. Open The Traveler's Identity and verify polished, read-only content
    const journalNavBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes("The Traveler's Identity")
    );
    expect(journalNavBtn).toBeDefined();
    await act(async () => {
      journalNavBtn!.click();
    });

    // Verify student profile rendered from centralized source of truth
    expect(container.textContent).toContain('Wilson Dl. Mayao Jr.');
    expect(container.textContent).toContain('Bachelor of Science in Computer Science');
    expect(container.textContent).toContain('4th Year & GB-NRn - 1454');
    expect(container.textContent).toContain('UNC School of Computer and Information Sciences');
    expect(container.textContent).toContain('Personal Introduction');
    expect(container.textContent).toContain('Reading & Literary Interests');
    expect(container.textContent).toContain('Great Books Learning Journey');

    // Verify all editing inputs, upload forms, and save buttons are absent
    expect(container.querySelector('#traveler-fullname')).toBeNull();
    expect(container.querySelector('#traveler-photo-input')).toBeNull();
    expect(container.querySelector('input[type="text"]')).toBeNull();
    expect(container.querySelector('textarea')).toBeNull();
    const editBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Inscribe Identity') || b.textContent?.includes('Personalize')
    );
    expect(editBtn).toBeUndefined();
    const saveBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Save Journal Entries')
    );
    expect(saveBtn).toBeUndefined();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it('animates each of the 7 islands to the floating stage beside the Navigator’s Chart and returns cleanly on Back', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(<App />);
    });

    const beginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    );
    await act(async () => {
      beginBtn!.click();
    });

    const dockNav = container.querySelector('aside[aria-label="Seven Carved Literary Landmarks"]')!;
    const dockButtons = Array.from(dockNav.querySelectorAll('button'));
    expect(dockButtons).toHaveLength(7);

    for (let i = 0; i < dockButtons.length; i++) {
      // 1. Click island to float beside the chart
      await act(async () => {
        dockButtons[i].click();
      });

      // The redundant floating landmark card is removed to avoid overlapping with the island's carved nameplate
      expect(container.querySelector('[data-testid="floating-island-stage"]')).toBeNull();

      // Verify literary content stagger classes are rendered in the Navigator's Chart
      expect(container.querySelector('.floating-content-stagger-1')).not.toBeNull();
      expect(container.querySelector('.floating-content-stagger-2')).not.toBeNull();
      expect(container.querySelector('.floating-content-stagger-3')).not.toBeNull();

      // 2. Re-clicking the SAME selected island reverses animation and returns it to the map
      await act(async () => {
        dockButtons[i].click();
      });
      expect(dockNav.className).toContain('opacity-100');

      // 3. Reopening the island after returning works normally
      await act(async () => {
        dockButtons[i].click();
      });
      expect(container.querySelector('.floating-content-stagger-1')).not.toBeNull();

      // 4. Click Return to Map in the Navigator's Chart
      const backBtn = Array.from(container.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Return to Map')
      )!;
      expect(backBtn).toBeDefined();

      await act(async () => {
        backBtn.click();
      });

      // Dashboard is restored so another island can be selected
      expect(dockNav.className).toContain('opacity-100');
    }

    // Verify rapid switching between islands and rapid Back navigation
    await act(async () => {
      dockButtons[0].click(); // Odyssey
      dockButtons[3].click(); // Ramayana
      dockButtons[6].click(); // Song of Roland
    });
    expect(container.querySelector('[data-testid="floating-island-stage"]')).toBeNull();
    expect(container.textContent).toContain('The Pass of Roncevaux');

    // Verify reduced-motion accessibility preference disables staggered content animations
    await act(async () => {
      root.unmount();
    });

    saveUserPreferences({ ...loadUserPreferences(), reducedMotion: true });
    const reducedRoot = createRoot(container);
    await act(async () => {
      reducedRoot.render(<App />);
    });
    const reducedBeginBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Explore the Chart Table')
    )!;
    await act(async () => {
      reducedBeginBtn.click();
    });
    const reducedDockBtns = Array.from(
      container.querySelectorAll('aside[aria-label="Seven Carved Literary Landmarks"] button')
    ) as HTMLButtonElement[];
    await act(async () => {
      reducedDockBtns[0].click();
    });
    expect(container.querySelector('.floating-content-stagger-1')).toBeNull();

    await act(async () => {
      reducedRoot.unmount();
    });
    container.remove();
  });
});
