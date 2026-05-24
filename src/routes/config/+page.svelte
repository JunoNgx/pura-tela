<script lang="ts">
    import { geminiKey } from "src/states/geminiKeyState.svelte.js";
    import { openaiKey } from "src/states/openaiKeyState.svelte.js";
    import {
        aiMode,
        AI_MODE_OPENAI,
        AI_MODE_GEMINI,
        hasAiProvider,
    } from "src/states/aiProviderState.svelte.js";

    let geminiInputValue = $state(geminiKey.val);
    let openaiInputValue = $state(openaiKey.val);
    let aiModeVal = $state(aiMode.val);

    $effect(() => {
        aiMode.set(aiModeVal);
    });

    const isOpenaiActive = $derived(
        openaiKey.val && aiModeVal === AI_MODE_OPENAI
    );
    const isGeminiActive = $derived(
        geminiKey.val && aiModeVal === AI_MODE_GEMINI
    );

    const aiSetupSummary = $derived.by(() => {
        if (isOpenaiActive) return "Using OpenAI";
        if (isGeminiActive) return "Using Gemini";
        if (hasAiProvider.val)
            return "Key configured, choose one service to activate";
        return "No API key configured";
    });

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

    const useOpenai = () => {
        aiModeVal = AI_MODE_OPENAI;
    };

    const useGemini = () => {
        aiModeVal = AI_MODE_GEMINI;
    };
</script>

<h2>Config</h2>

<section class="ConfigSection">
    <h3>AI API Keys</h3>

    <p
        class="ConfigSection__Status"
        class:ConfigSection__Setup={hasAiProvider.val}
    >
        {aiSetupSummary}
    </p>

    <h4>
        OpenAI
        {#if isOpenaiActive}
            <span class="ConfigSection__Active">(active)</span>
        {/if}
    </h4>
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
            <button
                class="IconButtonWithLabel"
                onclick={useOpenai}
                disabled={aiModeVal === AI_MODE_OPENAI}
            >
                Use
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

    <h4>
        Gemini
        {#if isGeminiActive}
            <span class="ConfigSection__Active">(active)</span>
        {/if}
    </h4>
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
            <button
                class="IconButtonWithLabel"
                onclick={useGemini}
                disabled={aiModeVal === AI_MODE_GEMINI}
            >
                Use
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

    <p class="ConfigSection__Info">Get your keys:</p>

    <ul class="ConfigSection__InfoList">
        <li>
            <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer">OpenAI</a
            >
            — needs chat completions access (model <code>gpt-4o-mini</code>)
        </li>
        <li>
            <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer">Gemini</a
            >
            — free tier (model <code>gemini-flash-latest</code>)
        </li>
    </ul>

    <p class="ConfigSection__InfoPrivacy">
        Keys are stored locally and only sent to the respective API.
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

    .ConfigSection__Active {
        color: var(--colInfo);
        font-weight: normal;
    }

    .ConfigSection__Setup {
        color: var(--colInfo);
    }

    .ConfigSection__Info {
        margin-top: 2rem;
        color: var(--colTxtSec);
    }

    .ConfigSection__InfoList {
        color: var(--colTxtSec);
        margin-top: 0.5rem;
        padding-left: 1.5rem;
    }

    .ConfigSection__InfoList li {
        margin-bottom: 0.5rem;
    }

    .ConfigSection__InfoPrivacy {
        color: var(--colTxtSec);
        margin-top: 0.5rem;
    }
</style>
