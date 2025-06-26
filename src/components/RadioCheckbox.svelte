<script lang="ts">
    import type { MouseInputEvent } from "src/lib/types.js";
    import type { Snippet } from "svelte";

    type CustomRadioCheckboxProps = {
        onclick: (e: MouseInputEvent) => void;
        className?: string;
        value: string;
        checked: boolean;
        children?: Snippet;
    };

    let {
        onclick,
        className = "",
        value,
        checked,
        children,
    }: CustomRadioCheckboxProps = $props();
</script>

<label class={`${className} CustomRadioCheckbox`}>
    <input
        class="CustomRadioCheckbox__Input"
        type="radio"
        {value}
        {checked}
        {onclick}
    />
    <span class="CustomRadioCheckbox__Checkmark" aria-hidden="true"></span>
    {@render children?.()}
</label>

<style>
    .CustomRadioCheckbox {
        display: flex;
        gap: 0.5rem;
        position: relative;
        cursor: pointer;
    }

    .CustomRadioCheckbox .CustomRadioCheckbox__Input {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    .CustomRadioCheckbox__Checkmark {
        box-sizing: border-box;
        width: 1rem;
        height: 1rem;
        border: var(--lineWeight) solid var(--colPri);
    }

    .CustomRadioCheckbox__Checkmark:after {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
    }

    .CustomRadioCheckbox
        .CustomRadioCheckbox__Input:checked
        ~ .CustomRadioCheckbox__Checkmark:after {
        background-color: var(--colPri);
    }
</style>
