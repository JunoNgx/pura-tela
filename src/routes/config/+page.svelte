<script lang="ts">
    import { geminiKey } from "src/states/geminiKeyState.svelte.js";

    let inputValue = $state(geminiKey.val);

    const saveKey = () => {
        geminiKey.set(inputValue.trim());
    };

    const clearKey = () => {
        inputValue = "";
        geminiKey.set("");
    };
</script>

<h2>Config</h2>

<section class="ConfigSection">
    <h3>Gemini API Key</h3>
    <p class="RouteInstruction">
        Required for AI palette generation. Your key is stored locally in your
        browser and never sent anywhere except Google's API.
        <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
        >Get a key from Google AI Studio.</a>
    </p>

    <div class="ConfigSection__InputRow">
        <input
            class="ConfigSection__Input"
            type="password"
            placeholder="Enter your Gemini API key"
            bind:value={inputValue}
        />
        <button
            class="IconButtonWithLabel"
            onclick={saveKey}
            disabled={inputValue.trim() === geminiKey.val}
        >
            Save
        </button>
        {#if geminiKey.val}
            <button class="IconButtonWithLabel" onclick={clearKey}>
                Clear
            </button>
        {/if}
    </div>

    <p class="ConfigSection__Status">
        {#if geminiKey.val}
            API key is configured.
        {:else}
            No API key set.
        {/if}
    </p>
</section>

<style>
    .ConfigSection {
        margin-top: 2rem;
    }

    .ConfigSection__InputRow {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
    }

    .ConfigSection__Input {
        flex: 1;
        min-width: 16rem;
    }

    .ConfigSection__Status {
        color: var(--colPri);
        margin-top: 1rem;
    }
</style>
