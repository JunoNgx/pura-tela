<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	import { RgbChannel, type RgbColour } from "src/lib/types.js";
	import { convertHexToRgb, convertRgbToHex, getRandomHexCode, isHexCodeValid, parseRgbChannelValue } from "src/lib/utils.js";
    import { currHexCode, currRgbColour } from "src/lib/states.svelte.js";

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) {
            return;
        }

        currHexCode.set(hexStr);
        currRgbColour.set(convertHexToRgb(currHexCode.val));
    }

    const handleRgbChange = (channel: RgbChannel, value: string) => {
        switch (channel) {
        case RgbChannel.R:
            currRgbColour.set({
                ...currRgbColour.val,
                red: parseRgbChannelValue(value)
            });
            break;
        case RgbChannel.G:
            currRgbColour.set({
                ...currRgbColour.val,
                green: parseRgbChannelValue(value)
            });
            break;
        case RgbChannel.B:
            currRgbColour.set({
                ...currRgbColour.val,
                blue: parseRgbChannelValue(value)
            });
            break;
        }

        currHexCode.set(convertRgbToHex(currRgbColour.val));
    }

    const handleColorPickerChange = (hexCode: string) => {
        currHexCode.set(
            hexCode.replace("#", "").toUpperCase());
    }

    const handleRandomise = () => {
        currHexCode.set(getRandomHexCode());
    }

    let hex = "#968449"
</script>

<section class="ColourInput">

    <h3>Colour</h3>

    <div class="ColourInput__Top">
        <div class="ColourInput__Hex">
            <label for="hexCode">#</label>
            <input
                name="hexCode"
                type="text"
                minlength="3"
                maxlength="6"
                value={currHexCode.val}
                on:input={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
            />
        </div>
        <!-- <input
            type="color"
            value={currHexCode.val}
            on:input={e => handleColorPickerChange((e.target as HTMLInputElement).value)}
        /> -->
        <ColorPicker
            label=""
            hex={`#${currHexCode.val}`}
            isAlpha={false}
            position="responsive"
            on:input={e => handleColorPickerChange(e.detail.hex as string)}
            --input-size="24px"
            --focus-color="green"
            --slider-width="24px"
            --picker-indicator-size="10px"
            --picker-z-index="10"
        />
    </div>

    <div class="ColourInput__Rgb">
        <div class="ColourInput__RgbItem">
            <label for="red">R</label>
            <input
                name="red"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.red}
                on:input={e => handleRgbChange(RgbChannel.R, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="green">G</label>
            <input
                name="red"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.green}
                on:input={e => handleRgbChange(RgbChannel.G, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="blue">B</label>
            <input
                name="blue"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.blue}
                on:input={e => handleRgbChange(RgbChannel.B, (e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__Buttons">
        <button on:click={handleRandomise}>
            randomise
        </button>
        <button>save colour</button>
    </div>

</section>

<style>
    .ColourInput__Top,
    .ColourInput__Hex,
    .ColourInput__Rgb {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 16px;
    }

    .ColourInput__Top {
        justify-content: flex-start;
        gap: 15px;
    }
</style>