# Pura Tela — Claude Notes

Minimalist wallpaper generator at pura.blue. SvelteKit 5 + TypeScript, Svelte 5 runes, plain CSS, Canvas API rendering. No backend — local-first, localStorage only.

## Commands

```
yarn dev          # dev server
yarn check        # type check
yarn test:unit    # vitest
yarn lint         # prettier + eslint
yarn format       # prettier write
```

## Architecture

### Rendering

All wallpaper drawing lives in `src/lib/canvas.ts`. Entry point is `renderWallpaper(CanvasRenderOptions)`, which dispatches to a style-specific renderer (e.g. `renderPieMan`, `renderHorizon`). Raw Canvas API — no SVG.

### Wallpaper styles

8 styles: Solid, Gradient, Palette, Pop-Art Square, Colour Swatch, Horizon, Twilight, Pie-Man.

Each style follows the same pattern — adding a new style means touching all of these:

1. `src/lib/types.ts` — add to `WallpaperStyle` enum, add `*StyleConfigProps` type, add to `RenderStyleConfig`
2. `src/lib/constants.ts` — add min/max constants
3. `src/lib/styleButtonList.ts` — add one entry to `WALLPAPER_STYLES` (label + image)
4. `src/states/wallGenStyleConfig<Name>State.svelte.ts` — new state file: state, setters, resetters, `appendToUrl`, `parseFromSearchParams`
5. `src/states/wallGenState.svelte.ts` — add case to `currStyleInfo`, import config
6. `src/routes/StyleConfig<Name>.svelte` — config UI component (use `StyleConfigFieldset` + `StyleConfigItemSlider`)
7. `src/routes/StyleConfigContainer.svelte` — 1 import + 1 entry in `configComponents` map
8. `src/routes/Studio.svelte` — 1 import + 1 entry in `urlAppenders` map
9. `src/routes/+page.svelte` — 1 import, 1 entry in `allParsers` array
10. `src/lib/canvas.ts` — implement the render function

### State management

Svelte 5 runes only (`$state`, `$derived`). State files use a `createState<T>()` factory from `src/states/createState.svelte.ts`. One file per feature. No Svelte stores.

### URL serialization

Full wallpaper config is encoded in query params — enables shareable links. `+page.ts` passes `url.searchParams` through directly. `+page.svelte` runs each style's `parseFromSearchParams` in a loop. Each style state file owns its own `appendToUrl` and `parseFromSearchParams`.

## Key files

| File                                     | Purpose                                                    |
| ---------------------------------------- | ---------------------------------------------------------- |
| `src/lib/canvas.ts`                      | All rendering logic                                        |
| `src/lib/types.ts`                       | All TypeScript types                                       |
| `src/lib/constants.ts`                   | All min/max config values                                  |
| `src/lib/styleButtonList.ts`             | Style selector data (label, image) for each style          |
| `src/states/wallGenState.svelte.ts`      | Central wallpaper state + style info                       |
| `src/routes/Studio.svelte`               | Main UI: canvas preview, controls, download, shareable URL |
| `src/routes/StyleConfigContainer.svelte` | Style selector with thumbnails + config panel dispatcher   |
| `src/data/colours.json`                  | Curated colour gallery                                     |
| `src/data/palettes.json`                 | Curated palette gallery                                    |
| `src/data/sizes.json`                    | Device size presets                                        |

## Conventions

- Spelling: British English — `colour` not `color`
- State files: named `wallGenStyleConfig<StyleName>State.svelte.ts`
- Style images: `static/styleImages/style-<name>.png`
- Config state defaults: each state file has sensible defaults and uses `isValueWithinRange` for validation
- Each style state file exports `appendToUrl(url: URL): void` and `parseFromSearchParams(params: URLSearchParams): void`
- Use `isSelectedStyle(style: WallpaperStyle)` from `wallGenState` for style checks — no per-style predicates
- Pie-Man angle: stored in degrees, converted to radians with `+Math.PI` offset at render time
