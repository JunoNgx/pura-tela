<script lang="ts">
    import { geminiKey } from "src/states/geminiKeyState.svelte.js";
    import { openaiKey } from "src/states/openaiKeyState.svelte.js";

    let geminiInputValue = $state(geminiKey.val);
    let openaiInputValue = $state(openaiKey.val);

    const saveGeminiKey = () => {
        geminiKey.set(geminiInputValue.trim());
    };

    const clearGeminiKey = () => {
        geminiInputValue = "";
        geminiKey.set("");
    };

    const saveOpenaiKey = () => {
        openaiKey.set(openaiInputValue.trim());
    };

    const clearOpenaiKey = () => {
        openaiInputValue = "";
        openaiKey.set("");
    };
</script>

<h2>Config</h2>

<section class="ConfigSection">
    <h3>AI API Keys</h3>
    <p class="RouteInstruction">
        API keys are stored locally in your browser and never sent anywhere except
        the respective AI provider's API. At least one key is required for AI
        palette generation.
    </p>

    <h4>OpenAI</h4>
    <p class="RouteInstruction">
        <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer">Get a key from OpenAI.</a
        >
    </p>

    <div class="ConfigSection__InputRow">
        <input
            class="ConfigSection__Input"
            type="password"
            placeholder="Enter your OpenAI API key"
            bind:value={openaiInputValue}
        />
        <button
            class="IconButtonWithLabel"
            onclick={saveOpenaiKey}
            disabled={openaiInputValue.trim() === openaiKey.val}
        >
            Save
        </button>
        {#if openaiKey.val}
            <button class="IconButtonWithLabel" onclick={clearOpenaiKey}>
                Clear
            </button>
        {/if}
    </div>

    <p class="ConfigSection__Status">
        {#if openaiKey.val}
            OpenAI key is configured.
        {:else}
            No OpenAI key set.
        {/if}
    </p>

    <h4>Gemini</h4>
    <p class="RouteInstruction">
        <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer">Get a key from Google AI Studio.</a
        >
    </p>

    <div class="ConfigSection__InputRow">
        <input
            class="ConfigSection__Input"
            type="password"
            placeholder="Enter your Gemini API key"
            bind:value={geminiInputValue}
        />
        <button
            class="IconButtonWithLabel"
            onclick={saveGeminiKey}
            disabled={geminiInputValue.trim() === geminiKey.val}
        >
            Save
        </button>
        {#if geminiKey.val}
            <button class="IconButtonWithLabel" onclick={clearGeminiKey}>
                Clear
            </button>
        {/if}
    </div>

    <p class="ConfigSection__Status">
        {#if geminiKey.val}
            Gemini key is configured.
        {:else}
            No Gemini key set.
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
