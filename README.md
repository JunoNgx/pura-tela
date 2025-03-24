# Pura Tela
A minimalist wallpaper generator and a simple colour toolkit, created for the web.

## Origin
This is a spin-off/enhanced remake of [Pura](https://github.com/JunoNgx/flutter-pura), a native Android app made with Flutter, which was delisted shortly before this project started.

## Feature
- Creating wallpapers with multiple styles and configurations
- Starting curated gallery of colours and palettes
- Saving of colours and palettes for future use
- Dedicated palette generator
- Size presets for multiple device form factors
- Data persistence with localStorage
- Generate palette with AI
- Progressive Web App deployment

## Deployment
The project is deployed at [pura.blue](https://pura.blue) and [pura-tela.vercel.app](https://pura-tela.vercel.app/) via Vercel.

## Tech Stack
The application is made with a minimal stack, including **SvelteKit 5** and **TypeScript**. No CSS preprocessor is used. [Svelte Awesome Color Picker](https://svelte-awesome-color-picker.vercel.app/) is used to supplement the user interface. [Google AI SDK for JavaScript](https://www.npmjs.com/package/@google/generative-ai) is used for interface with Gemini API.

## Running locally
`yarn && yarn dev`

## Contribution
For bug reports, suggestions, and contributions, please open new issues.
