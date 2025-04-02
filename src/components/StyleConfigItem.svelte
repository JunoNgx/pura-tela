<script lang="ts">
    type StyleConfigItemProps = {
        domId: string,
        label: string,
        minVal: number,
        maxVal: number,
        val: number,
        step: number,
        changeHandler: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {}
    };

    let {
        domId,
        label,
        minVal,
        maxVal,
        val,
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
            min="{minVal}"
            max="{maxVal}"
            value="{val}"
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
            min="{minVal}"
            max="{maxVal}"
            step="{step}"
            value="{val}"
            oninput={changeHandler}
        />
    </div>
</div>

<style>

</style>