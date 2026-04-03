<script lang="ts">
    import type { InputEvent } from "src/lib/types.js";

    type StyleConfigItemProps = {
        className?: string;
        domId: string;
        label: string;
        min: number;
        max: number;
        value: number;
        step?: number;
        unit?: string;
        shouldHideLabel?: boolean;
        changeHandler: (e: InputEvent) => void;
    };

    let {
        className = "",
        domId,
        label,
        min,
        max,
        value,
        step = 1,
        unit = "",
        shouldHideLabel = false,
        changeHandler,
    }: StyleConfigItemProps = $props();

    let inputError = $state<string | null>(null);

    $effect(() => {
        if (value >= min && value <= max) inputError = null;
    });

    const handleNumberInput = (e: InputEvent) => {
        const parsed = parseInt(e.currentTarget.value);
        if (isNaN(parsed) || parsed < min || parsed > max) {
            inputError = `Enter a value between ${min} and ${max}`;
            return;
        }
        inputError = null;
        changeHandler(e);
    };
</script>

<div
    class={`${className} StyleConfigItem`}
    class:StyleConfigItem--IsLabeless={shouldHideLabel}
>
    {#if !shouldHideLabel}
        <div class="StyleConfigItem__Label">
            {label}
        </div>
    {/if}

    <div class="StyleConfigItem__InputContainer">
        <label class="VisuallyHidden" for={`${domId}-input`}>
            {`${label} as number input`}
        </label>
        <input
            class="StyleConfigItem__Input"
            class:StyleConfigItem__Input--HasError={inputError}
            id={domId}
            type="number"
            {min}
            {max}
            {value}
            oninput={handleNumberInput}
        />
        {#if unit}
            <span class="StyleConfigItem__Unit">{unit}</span>
        {/if}
    </div>

    <div class="StyleConfigItem__SliderContainer">
        <label class="VisuallyHidden" for={`${domId}-input`}>
            {`${label} as slider`}
        </label>
        <input
            class="StyleConfigItem__Slider"
            id="gradientAngleSlider"
            type="range"
            {min}
            {max}
            {step}
            {value}
            oninput={changeHandler}
        />
    </div>

    {#if inputError}
        <p class="StyleConfigItem__Error" role="alert">{inputError}</p>
    {/if}
</div>

<style>
    .StyleConfigItem {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
        align-items: center;
    }

    .StyleConfigItem__InputContainer {
        display: flex;
        flex-wrap: nowrap;
    }

    .StyleConfigItem__Label {
        grid-column: 1/3;
        text-transform: lowercase;
    }

    .StyleConfigItem__SliderContainer {
        grid-column-start: 4;
        grid-column-end: 8;
    }

    .StyleConfigItem__Slider {
        width: 100%;
    }

    .StyleConfigItem--IsLabeless {
        grid-template-columns: repeat(5, 1fr);
    }

    .StyleConfigItem--IsLabeless .StyleConfigItem__Input {
        margin-left: 1rem;
    }
    .StyleConfigItem--IsLabeless .StyleConfigItem__SliderContainer {
        margin-right: 1rem;
        grid-column-start: 2;
        grid-column-end: 6;
    }

    .StyleConfigItem__Error {
        grid-column: 1 / -1;
        color: var(--colDanger);
        font-size: 0.75rem;
        margin: 0;
    }

    .StyleConfigItem__Input--HasError {
        outline: 2px solid var(--colDanger);
    }
</style>
