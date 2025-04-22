<script lang="ts">

    type CheckboxProps = {
        className?: string,
        domId: string,
        label: string,
        value: boolean,
        changeHandler: () => void,
    };

    let {
        className,
        domId,
        label,
        value,
        changeHandler
    }: CheckboxProps = $props();

</script>

<div class={`${className} Checkbox`}>
    <input class="Checkbox__Input"
        id="{domId}"
        type=checkbox
        checked={value}
        onclick={changeHandler}
    >
    <label class="Checkbox__Label"
        for="{domId}"
    >
        {label}
    </label>
</div>
