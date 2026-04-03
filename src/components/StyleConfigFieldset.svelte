<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title,
        onReset,
        children,
    }: {
        title: string;
        onReset: () => void;
        children: Snippet;
    } = $props();
</script>

<fieldset class="StyleConfigFieldset">
    <legend>
        <h4 class="StyleConfigFieldset__Title">{title}</h4>
    </legend>
    {@render children()}
    <div class="StyleConfigFieldset__Actions">
        <button
            class="TertBtn"
            title="Reset {title} to default"
            aria-label="Reset {title} to default"
            onclick={onReset}
        >
            Reset
        </button>
    </div>
</fieldset>

<style>
    .StyleConfigFieldset {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .StyleConfigFieldset__Title {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .StyleConfigFieldset__Actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
    }
</style>
