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

- [x] Create `src/lib/styleButtonList.ts`
    - Define a `WallpaperStyleButtonProps` type and export `WALLPAPER_STYLES` array

- [x] In `src/routes/StyleConfigContainer.svelte` — replace the button list:
    - Import `WALLPAPER_STYLES` from `src/lib/styleButtonList.js`
    - Replace the 8 `<button>` blocks with a single `{#each WALLPAPER_STYLES as item}` block

- [x] In `src/routes/StyleConfigContainer.svelte` — replace the `{#if}` chain:
    - Define a `configComponents: Partial<Record<WallpaperStyle, Component>>` map
    - Replace the `{#if}...{/if}` section with `<svelte:component this={configComponents[wallGenStyle.val] ?? null} />`

---

## Part 3 — Co-locate URL serialisation with each style's state

**Problem:** `Studio.svelte` has a `computeShareableUrl()` with an 8-case switch, and
`+page.svelte` has ~30 lines of `tryParseNumericConfig` calls, and `+page.ts` manually
lists every URL param. All three files need editing for every new style.

**Fix:** Each style state file owns its own URL param serialisation and parsing. The
central files become loops.

### Tasks

- [x] Update `src/routes/+page.ts`:
    - Return `url.searchParams` directly; removed `WallGenQueryProps` type annotation
    - Removed `WallGenQueryProps` from `types.ts`

- [x] In each style state file, add `appendToUrl(url: URL): void` and `parseFromSearchParams(params: URLSearchParams): void`
    - [x] `wallGenStyleConfigGradientState.svelte.ts`
    - [x] `wallGenStyleConfigColourSwatchState.svelte.ts`
    - [x] `wallGenStyleConfigPaletteState.svelte.ts`
    - [x] `wallGenStyleConfigHorizonState.svelte.ts`
    - [x] `wallGenStyleConfigPopArtSquareState.svelte.ts`
    - [x] `wallGenStyleConfigTwilightState.svelte.ts`
    - [x] `wallGenStyleConfigPieManState.svelte.ts`

- [x] Update `src/routes/Studio.svelte` — replaced switch with `urlAppenders` map + `urlAppenders[wallGenStyle.val]?.(url)`

- [x] Update `src/routes/+page.svelte` — replaced ~60 lines of parse calls with `allParsers.forEach(parse => parse(data.searchParams))`

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

- [x] Create `src/lib/styleConfigUtils.ts` — exports `handleSliderChange(e, setter, label, min, max)`

- [x] Update `StyleConfigPieMan.svelte`, `StyleConfigHorizon.svelte`, `StyleConfigTwilight.svelte`, `StyleConfigPalette.svelte` — removed local handler; import and call `handleSliderChange`

- [x] Update `StyleConfigColourPopArtSquare.svelte` — removed `handleNumericDataChange` and its type; flattened 3 call sites to positional

- [x] Update `StyleConfigColourSwatch.svelte` — removed `handleDataChange`; updated 4 call sites to pass min/max explicitly

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
