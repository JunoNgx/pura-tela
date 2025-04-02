<script lang="ts">
    type StyleConfigItemProps = {
        domId: string,
        label: string,
        min: number,
        max: number,
        value: number,
        step: number,
        changeHandler: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void
    };

    let {
        domId,
        label,
        min,
        max,
        value,
        step,
        changeHandler
    }: StyleConfigItemProps = $props();
</script>

<div class="StyleConfigItem">
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

</style>