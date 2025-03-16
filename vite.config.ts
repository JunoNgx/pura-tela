import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite'

export default defineConfig({
    plugins: [
        sveltekit(),
        Icons({
            compiler: 'svelte',
        }),
    ],

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    // Vite bug: https://github.com/vitejs/vite/discussions/17738
    // optimizeDeps: {
    //     exclude: ['node_modules/.cache']
    // },
});
