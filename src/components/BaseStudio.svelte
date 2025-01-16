<script lang="ts">
    import BaseHexCodeInput from "./BaseHexCodeInput.svelte";
</script>

<div class="studio">
    <div class="studio__canvas-container">
        <canvas id="preview-canvas"></canvas>
    </div>
    <div class="studio__control">
        <div class="studio__colour">
            <BaseHexCodeInput/>
        </div>
        <div class="studio__size">
            <h3>
                <label for="size">Dimensions</label>
            </h3>
            <select>
                <option>mobile</option>
                <option>desktop</option>
                <option>square</option>
            </select>
        </div>
        <div class="studio__buttons">
            <button>download</button>
            <button>save colour to gallery</button>
        </div>
    </div>
</div>

<style>
    .studio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .studio__canvas-container {
        flex-grow: 1;
        background-color: aqua;
    }

    .studio__control {
        flex-grow: 1;
    }

    .studio__colour {

    }
</style>
