<script lang="ts">
    import BaseColourInput from "src/components/BaseColourInput.svelte";
    import BaseDimensionSelection from "src/components/BaseDimensionSelection.svelte";
</script>

<div class="Studio">
    <div class="Studio__Canvas">
        <canvas id="PreviewCanvas"></canvas>
    </div>
    <div class="Studio__Control">
        <div class="Studio__Colour">
            <BaseColourInput/>
        </div>
        <div class="Studio__Size">
            <BaseDimensionSelection/>
        </div>
        <div class="Studio__Buttons">
            <button>download</button>
        </div>
    </div>
</div>

<style>
    .Studio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .Studio__Canvas {
        flex-grow: 1;
        background-color: aqua;
    }

    .Studio__Control {
        flex-grow: 1;
    }
</style>
