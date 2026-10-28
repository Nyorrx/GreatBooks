# DESIGN.md: The Navigator's Chart Table

## Identity & Direction
- **Title**: My Literary Journey: An Interactive 3D Atlas of the Seven Realms
- **Subtitle**: The Navigator's Chart Table & Illuminated Field Journal
- **Archetype**: Antique Maritime Cartography, Carved Miniature Landscape Dioramas, Illuminated Travel Manuscript, Navigator's Cabin in Ithaca
- **Dial**: ENERGY 3 / RHYTHM 3 / MOTION 2

## Color & Material Palette (R-01, R-25, R-29)
- **Aged Vellum (`#F4ECD8` / `#EADBC0`)**: Dominant surface for the weathered parchment chart and illuminated field journal pages.
- **Dark Walnut (`#3B261A` / `#24160E`)**: Structural framing for the captain's chart table, beveled timber rails, and leather-bound logbook covers.
- **Antique Brass (`#A98545` / `#C8A45D`)**: Navigational instruments, compass rose inlays, corner mounts, dividers, and miniature markers.
- **Sepia & Iron-Gall Ink (`#59432E` / `#2C1E12`)**: Primary typographic and cartographic ink, delivering 7.87:1 to 13.70:1 WCAG AA+ contrast on aged vellum.
- **Warm Candlelight (`#F3C879`)**: Implied chamberstick flame, directional highlights on brass and carved wood, and active warm accents on dark walnut (9.03:1 to 11.16:1 contrast).
- **Sealing-Wax Crimson (`#873B35`)**: Wax seals, ribbon bookmarks, selected landmark pins, and primary interactive calls to action (6.59:1 contrast with vellum).
- **Muted Moss Green (`#68704A`) & Weathered Stone (`#8E8575`)**: Handcrafted diorama foliage, olive groves, and carved limestone/slate fortifications.

## Purpose-Driven Decisions (R-31)
1. **Color Palette**: Aged vellum (`#F4ECD8`), dark walnut (`#3B261A`), sepia ink (`#59432E`), and sealing-wax crimson (`#873B35`) replace futuristic dark-mode neon with the warm physical materiality of an antique chart table while maintaining 6.59:1 to 13.70:1 WCAG AA+ contrast.
2. **Typography**: Classical serif display (`Cinzel` and `Cormorant Garamond`) evokes engraved cartographic cartouches and manuscript chapter titles; scholarly book serif (`Crimson Pro` / Georgia) with illuminated drop caps supports long-form literary reading at a comfortable 62ch-68ch measure; tabular coordinates (`JetBrains Mono` / monospace) record nautical bearings and map leagues.
3. **Layout & Spatial Hierarchy**: The 3D walnut chart table and weathered parchment map occupy the primary viewport as a coherent navigational artifact, while selecting a landmark unfolds a physical leather-and-vellum Field Journal on the right (or a full-height folio sheet on mobile) so the selected miniature remains in view.
4. **Solid Tactile Surfaces (R-10, R-12, R-13)**: Zero futuristic glassmorphism or neon glow is used; hierarchy is established through layered vellum paper, double-sepia ruled borders, brass corner brackets, and directional candlelight shadows.
5. **Motion & Choreography (R-19)**: Smooth cubic-in-out camera glides across the parchment surface, subtle candle flicker, gentle diorama animations (spiraling desert wind ribbons, turning chariot wheel, rocking Ithacan trireme), and a responsive compass needle guide attention without endless UI pulsing, while honoring `prefers-reduced-motion`.
6. **Bespoke Cartographic Ornaments & Icons (R-04)**: Custom SVG compass roses, wax seals, manuscript flourishes, and navigation glyphs directly reinforce the maritime cartography identity.
7. **Print Architecture**: Dedicated `@media print` stylesheet formats the Navigator's Logbook, all seven complete literary analyses, The Favorite Voyage (The Odyssey), The Navigator's Lessons comparative chart, and The Last Page of the Journal into a multi-page scholarly folio without 3D chrome.
