<script lang="ts">

    type CheckboxProps = {
        className?: string,
        domId: string,
        label: string,
        checked: boolean,
        changeHandler: () => void,
    };

    let {
        className,
        domId,
        label,
        checked,
        changeHandler
    }: CheckboxProps = $props();

</script>

<div class={`${className} Checkbox`}>
    <input class="Checkbox__Input"
        id="{domId}"
        type=checkbox
        checked={checked}
        onclick={changeHandler}
    >
    <label class="Checkbox__Label"
        for="{domId}"
    >
        {label}
    </label>
</div>
