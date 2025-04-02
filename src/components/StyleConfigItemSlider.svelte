<script lang="ts">
	import type { InputEvent } from "src/lib/types.js";

    type StyleConfigItemProps = {
        className?: string,
        domId: string,
        label: string,
        min: number,
        max: number,
        value: number,
        step?: number,
        changeHandler: (e: InputEvent) => void
    };

    let {
        className,
        domId,
        label,
        min,
        max,
        value,
        step = 1,
        changeHandler
    }: StyleConfigItemProps = $props();
</script>

<div class={`${className} StyleConfigItem`}>
    <div class="StyleConfigItem__Label">
        {label}
    </div>

    <div class="StyleConfigItem__InputContainer">
        <label class="VisuallyHidden" for={`${domId}-input`}>
            {`${label} as number input`}
        </label>
        <input class="StyleConfigItem__Input"
            id="{domId}"
            type="number"
            min="{min}"
            max="{max}"
            value="{value}"
            oninput={changeHandler}
        />
    </div>

    <div class="StyleConfigItem__SliderContainer">
        <label class="VisuallyHidden" for={`${domId}-input`}>
            {`${label} as slider`}
        </label>
        <input class="StyleConfigItem__Slider"
            id="gradientAngleSlider"
            type="range"
            min="{min}"
            max="{max}"
            step="{step}"
            value="{value}"
            oninput={changeHandler}
        />
    </div>
</div>

<style>
    .StyleConfigItem {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
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
</style>