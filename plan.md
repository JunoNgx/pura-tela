# Style Scalability Refactor

Goal: reduce the number of files that need touching when adding a new wallpaper style.
Currently adding a style requires changes in 9 files. Target: 4–5 files (types, constants,
state file, canvas, config UI component — the irreducible minimum).

Five independent parts. Each leaves the app fully working when done.
Suggested order: 1 → 2 → 3 → 4 → 5.

---

## Part 1 — Consolidate style predicates

**Problem:** `wallGenState.svelte.ts` exports one `is*Style()` predicate per style
(currently 8). Every new style adds another. They are all one-liners with identical shape.
These predicates are also imported individually wherever a style check is needed.

**Fix:** Replace all of them with a single `isSelectedStyle(style: WallpaperStyle): boolean`.

### Tasks

- [x] In `src/states/wallGenState.svelte.ts`:
  - Add `export const isSelectedStyle = (style: WallpaperStyle) => wallGenStyle.val === style`
  - Delete `isSolidStyle`, `isGradientStyle`, `isPopArtSquareStyle`, `isColourSwatchStyle`,
    `isPaletteStyle`, `isHorizonStyle`, `isTwilightStyle`, `isPieManStyle`

- [x] In `src/routes/StyleConfigContainer.svelte`:
  - Replace all 8 predicate imports with a single `isSelectedStyle` import
  - Replace every `isSolidStyle()` etc. call with `isSelectedStyle(WallpaperStyle.X)`

- [x] Search for any other files importing the old predicates and update them
  - Run: `grep -r "isSolidStyle\|isGradientStyle\|isPopArtSquareStyle\|isColourSwatchStyle\|isPaletteStyle\|isHorizonStyle\|isTwilightStyle\|isPieManStyle" src/`

---

## Part 2 — Data-driven style selector buttons

**Problem:** `StyleConfigContainer.svelte` has 8 hand-written `<button>` blocks in the
selector grid, and a 7-branch `{#if}` chain for the config panel. Every new style
requires adding a button block + a new `{:else if}` branch.

**Fix:** Define styles as a data array; render buttons with `{#each}`. Replace the
`{#if}` chain with a component map + `<svelte:component>`.

### Tasks

- [ ] Create `src/lib/styleRegistry.ts`
  - Define and export `WALLPAPER_STYLES` array:
    ```ts
    export const WALLPAPER_STYLES: {
        style: WallpaperStyle;
        label: string;
        image: string;
    }[] = [
        { style: WallpaperStyle.SOLID,          label: "Solid Colour",   image: "/styleImages/style-solid.png" },
        { style: WallpaperStyle.GRADIENT,        label: "Gradient",       image: "/styleImages/style-gradient.png" },
        { style: WallpaperStyle.POP_ART_SQUARE,  label: "Pop Art Square", image: "/styleImages/style-popart.png" },
        { style: WallpaperStyle.HORIZON,         label: "Horizon",        image: "/styleImages/style-horizon.png" },
        { style: WallpaperStyle.PALETTE,         label: "Colour Palette", image: "/styleImages/style-palette.png" },
        { style: WallpaperStyle.COLOUR_SWATCH,   label: "Colour Swatch",  image: "/styleImages/style-swatch.png" },
        { style: WallpaperStyle.TWILIGHT,        label: "Twilight",       image: "/styleImages/style-twilight.png" },
        { style: WallpaperStyle.PIE_MAN,         label: "Pie-Man",        image: "/styleImages/style-pieman.png" },
    ];
    ```

- [ ] In `src/routes/StyleConfigContainer.svelte` — replace the button list:
  - Import `WALLPAPER_STYLES` from `src/lib/styleRegistry.js`
  - Import `isActiveStyle` from Part 1 (or `wallGenStyle` directly if Part 1 not done yet)
  - Replace the 8 `<button>` blocks with a single `{#each WALLPAPER_STYLES as item}` block
  - The button inside uses `item.style`, `item.label`, `item.image` and `isActiveStyle(item.style)`
  - Remove the 8 now-unused predicate imports (if Part 1 not done separately)

- [ ] In `src/routes/StyleConfigContainer.svelte` — replace the `{#if}` chain:
  - Import all `StyleConfig*.svelte` components (same as now)
  - Define a `configComponents` map:
    ```ts
    const configComponents: Partial<Record<WallpaperStyle, Component>> = {
        [WallpaperStyle.GRADIENT]:      StyleConfigGradient,
        [WallpaperStyle.COLOUR_SWATCH]: StyleConfigColourSwatch,
        [WallpaperStyle.PALETTE]:       StyleConfigPalette,
        [WallpaperStyle.HORIZON]:       StyleConfigHorizon,
        [WallpaperStyle.POP_ART_SQUARE]: StyleConfigColourPopArtSquare,
        [WallpaperStyle.TWILIGHT]:      StyleConfigTwilight,
        [WallpaperStyle.PIE_MAN]:       StyleConfigPieMan,
        // SOLID omitted — no config panel
    };
    ```
  - Replace the `{#if}...{/if}` section with:
    ```svelte
    <svelte:component this={configComponents[wallGenStyle.val] ?? null} />
    ```
  - After this, adding a new style's config panel = 1 import + 1 map entry

---

## Part 3 — Co-locate URL serialisation with each style's state

**Problem:** `Studio.svelte` has a `computeShareableUrl()` with an 8-case switch, and
`+page.svelte` has ~30 lines of `tryParseNumericConfig` calls, and `+page.ts` manually
lists every URL param. All three files need editing for every new style.

**Fix:** Each style state file owns its own URL param serialisation and parsing. The
central files become loops.

### Tasks

- [ ] Update `src/routes/+page.ts`:
  - Instead of manually extracting each param, return `url.searchParams` directly
    so downstream code can call `.get()` itself:
    ```ts
    export const load = ({ url }) => ({ searchParams: url.searchParams });
    ```
  - Remove the `WallGenQueryProps` return type annotation from this file
  - Keep `WallGenQueryProps` in `types.ts` for now (may be unused after Part 3)

- [ ] In each style state file that has URL config params, add two exports:
  `appendToUrl(url: URL): void` and `parseFromSearchParams(params: URLSearchParams): void`

  - [ ] `wallGenStyleConfigGradientState.svelte.ts`
    - `appendToUrl`: append `gradientAngle`
    - `parseFromSearchParams`: parse and call `setGradientStyleConfigAngle`

  - [ ] `wallGenStyleConfigColourSwatchState.svelte.ts`
    - `appendToUrl`: append `swatchPosX`, `swatchPosY`, `swatchDirection`,
      `swatchItemShape`, `swatchItemSize`, `swatchItemSpacing`
    - `parseFromSearchParams`: parse and call each setter (include enum validation
      for direction and itemShape — move that logic here from `+page.svelte`)

  - [ ] `wallGenStyleConfigPaletteState.svelte.ts`
    - `appendToUrl`: append `paletteAngle`, `paletteSize`, `palettePosition`
    - `parseFromSearchParams`: parse and call each setter

  - [ ] `wallGenStyleConfigHorizonState.svelte.ts`
    - `appendToUrl`: append `horizonShowCore`, `horizonSize`, `horizonPosition`
    - `parseFromSearchParams`: parse and call each setter (include boolean parsing
      for `horizonShowCore` — move that logic here from `+page.svelte`)

  - [ ] `wallGenStyleConfigPopArtSquareState.svelte.ts`
    - `appendToUrl`: append `popArtSquareSize`, `popArtSquarePositionX`, `popArtSquarePositionY`
    - `parseFromSearchParams`: parse and call each setter

  - [ ] `wallGenStyleConfigTwilightState.svelte.ts`
    - `appendToUrl`: append `twilightSize`, `twilightPosition`, `twilightRippleIntensity`
    - `parseFromSearchParams`: parse and call each setter

  - [ ] `wallGenStyleConfigPieManState.svelte.ts`
    - `appendToUrl`: append `pieManSize`, `pieManAngle`
    - `parseFromSearchParams`: parse and call each setter

  - Note: Solid style has no config params — no changes needed to its state

- [ ] Update `src/routes/Studio.svelte` — replace `computeShareableUrl()` switch:
  - Import all `appendToUrl` functions from each style state file
  - Define an `urlAppenders` map:
    ```ts
    const urlAppenders: Partial<Record<WallpaperStyle, (url: URL) => void>> = {
        [WallpaperStyle.GRADIENT]:      appendToUrl as imported from gradient state,
        // ... one entry per style with config
    };
    ```
  - Replace the entire `switch` block with:
    ```ts
    urlAppenders[wallGenStyle.val]?.(url);
    ```
  - Remove the now-unused individual config state imports
    (`gradientStyleConfig`, `paletteStyleConfig`, etc.)

- [ ] Update `src/routes/+page.svelte` — replace all `tryParseNumericConfig` calls:
  - Change `export let data: WallGenQueryProps` to `export let data: { searchParams: URLSearchParams }`
  - Import all `parseFromSearchParams` functions from each style state file
  - Replace the ~30 lines of parse calls with:
    ```ts
    const allParsers = [
        parseFromSearchParams as imported from gradient state,
        parseFromSearchParams as imported from swatch state,
        // ... one per style with config
    ];
    allParsers.forEach(parse => parse(data.searchParams));
    ```
  - Remove all the now-unused constant and setter imports
    (`PALETTE_CONFIG_ANGLE_MAX_VALUE`, `setPaletteStyleAngle`, etc.)

---

## Part 4 — Extract shared slider change handler

**Problem:** The slider input handler is copy-pasted into every config component with
minor signature variations. New components must copy it again.

**Fix:** Extract to a shared utility.

Current variants:
- Canonical (Palette, Horizon, Twilight, PieMan): positional `(e, setter, label, min, max)`
- Object params (PopArtSquare): `({ event, setter, minValue, maxValue, valueLabel })`
- Hardcoded min/max (ColourSwatch): `(e, setter, label)` — range captured from outer scope
- Fully inline (Gradient): not worth migrating (custom number input, no `isValueWithinRange`)

### Tasks

- [ ] Create `src/lib/styleConfigUtils.ts`
  - Export `handleSliderChange(e: InputEvent, setter: (v: number) => void, label: string, min: number, max: number): void`
  - Copy the body from `StyleConfigPieMan` (the cleanest existing version)

- [ ] Update `StyleConfigPieMan.svelte`
  - Import `handleSliderChange` from `src/lib/styleConfigUtils.js`
  - Remove local `handleDataChange` function and `InputEvent` import
  - Update both `changeHandler` props to call `handleSliderChange`

- [ ] Update `StyleConfigHorizon.svelte` — same changes as PieMan

- [ ] Update `StyleConfigTwilight.svelte` — same changes as PieMan

- [ ] Update `StyleConfigPalette.svelte` — same changes as PieMan

- [ ] Update `StyleConfigColourPopArtSquare.svelte`
  - Import `handleSliderChange` from `src/lib/styleConfigUtils.js`
  - Remove local `handleNumericDataChange` function and its type definition
  - Remove `InputEvent` import
  - Update three `changeHandler` props — flatten from object params to positional

- [ ] Update `StyleConfigColourSwatch.svelte`
  - Import `handleSliderChange` from `src/lib/styleConfigUtils.js`
  - Remove local `handleDataChange` function
  - Update four `changeHandler` props — pass `SWATCH_CONFIG_MIN_VALUE` and
    `SWATCH_CONFIG_MAX_VALUE` explicitly (currently captured from closure)

---

## Part 5 — Extract `StyleConfigFieldset` component

**Problem:** Each config component has fieldset boilerplate (legend, content area, reset
button, matching CSS) repeated for every fieldset. New config components must copy-paste
all of it.

**Fix:** Extract the shell — fieldset border, legend title, reset button — to a shared
component that accepts its content as a Svelte 5 snippet. Content is not the component's
concern, so it works for any combination of controls: one slider, two sliders, radio
buttons, dropdowns, or a mix.

Props:
```ts
let { title, onreset, children } = $props();
```

Applies to 15 fieldset instances across 6 files:
Palette (3), Horizon (2), Twilight (3), PieMan (2), PopArtSquare (3), ColourSwatch (2).
Not applicable: Gradient — its fieldset has no reset button.

Note: `StyleConfigItemSlider` stays independent and is passed as a child, not bundled
into `StyleConfigFieldset`. This keeps both components usable on their own.

### Tasks

- [ ] Create `src/components/StyleConfigFieldset.svelte`
  - Props: `title: string`, `onreset: () => void`, `children: Snippet`
  - Render: `<fieldset>` → `<legend><h4>{title}</h4></legend>` → `{@render children()}`
    → reset button div
  - Use generic class names: `StyleConfigFieldset`, `StyleConfigFieldset__Title`,
    `StyleConfigFieldset__Actions`
  - CSS: fieldset border, legend style, reset button alignment — everything currently
    duplicated as `.XxxConfig__Item`, `.XxxConfig__ItemTitle`, `.XxxConfig__ActionsContainer`
    across all files

- [ ] Update `StyleConfigPieMan.svelte` (2 fieldsets)
  - Import `StyleConfigFieldset`
  - Replace both `<fieldset>` blocks — pass `<StyleConfigItemSlider>` as children:
    ```svelte
    <StyleConfigFieldset title="Size" onreset={resetPieManStyleSize}>
        <StyleConfigItemSlider ... />
    </StyleConfigFieldset>
    ```
  - Remove the now-redundant `__Item`, `__ItemTitle`, `__ActionsContainer` CSS rules

- [ ] Update `StyleConfigHorizon.svelte` (2 fieldsets) — same approach as PieMan

- [ ] Update `StyleConfigTwilight.svelte` (3 fieldsets) — same approach as PieMan

- [ ] Update `StyleConfigPalette.svelte` (3 fieldsets) — same approach as PieMan

- [ ] Update `StyleConfigColourPopArtSquare.svelte` (3 fieldsets) — same approach as PieMan

- [ ] Update `StyleConfigColourSwatch.svelte` (2 fieldsets)
  - Import `StyleConfigFieldset`
  - Position fieldset: pass both `<StyleConfigItemSlider>` elements as children,
    `onreset={resetPosition}`
  - Item settings fieldset: pass the radiogroup, dropdown, and both sliders as children,
    `onreset={resetItemSettings}`
  - Remove the now-redundant `__Fieldset`, `__FieldsetLegend`, `__FieldsetButtonsContainer`
    CSS rules (keep the ColourSwatch-specific rules for the radiogroup and dropdown layout)

---

## Net result

After all five parts, adding a new style requires changes to:

1. `src/lib/types.ts` — enum value, config props type (no URL params needed in `WallGenQueryProps`)
2. `src/lib/constants.ts` — min/max values
3. `src/lib/styleRegistry.ts` — one entry in `WALLPAPER_STYLES` (button + image)
4. `src/states/wallGenStyleConfig<Name>State.svelte.ts` — new file: state, setters, resetters,
   `appendToUrl`, `parseFromSearchParams`
5. `src/states/wallGenState.svelte.ts` — `currStyleInfo` case, derived config
6. `src/routes/StyleConfig<Name>.svelte` — new file: config UI (small, using `StyleConfigFieldset`)
7. `src/routes/StyleConfigContainer.svelte` — 1 import + 1 map entry
8. `src/routes/Studio.svelte` — 1 import + 1 map entry
9. `src/routes/+page.svelte` — 1 import, 1 entry in `allParsers` array
10. `src/lib/canvas.ts` — render function

Down from 9 files with open-ended additions to 10 files with bounded, single-line additions
in the integration points (3–5 of those 10 files).
