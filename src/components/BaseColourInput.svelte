<script lang="ts">
    import { browser } from "$app/environment";
	import ColorPicker from 'svelte-awesome-color-picker';

    import MaterialSymbolsLightSaveOutline from '~icons/material-symbols-light/save-outline';
    import MaterialSymbolsLightShuffle from '~icons/material-symbols-light/shuffle';

	import { RgbChannel } from "src/lib/types.js";
	import { convertHexToRgb, convertRgbToHex, getRandomHexCode, isHexCodeValid, parseRgbChannelValue } from "src/lib/utils.js";
    import { colourGallery, currHexCode, currRgbColour } from "src/lib/states.svelte";

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) {
            return;
        }

        currHexCode.set(hexStr);
        currRgbColour.set(convertHexToRgb(currHexCode.val));
    };

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
    };

    const handleColorPickerChange = (hexCode: string) => {
        currHexCode.set(
            hexCode.replace("#", "").toUpperCase());
        currRgbColour.set(convertHexToRgb(currHexCode.val));
    };

    const handleRandomise = () => {
        currHexCode.set(getRandomHexCode());
    };

    const tryCreateNewColour = () => {
        if (!browser) {
            return;
        }

        const colourName = window.prompt("Enter name for new colour", `#${currHexCode.val}`)
        if (!colourName) {
            return;
        }

        try {
            const newColour = {
                name: colourName,
                hexCode: currHexCode.val
            }
    
            colourGallery.set([...colourGallery.val, newColour]);
        } catch(error) {
            console.error(error);
            window.alert("Error adding new colour to gallery. Please see the console for more info.")
        }
    };

</script>

<section class="ColourInput">

    <h3>Colour</h3>

    <div class="ColourInput__Top">
        <div class="ColourInput__TopLeft">
            <div class="ColourInput__Hex">
                <label for="hexCode">#</label>
                <input class="ColourInput__HexInput"
                    name="hexCode"
                    type="text"
                    minlength="3"
                    maxlength="6"
                    value={currHexCode.val}
                    oninput={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
                />
            </div>
            <!-- <input
                type="color"
                value={currHexCode.val}
                oninput={e => handleColorPickerChange((e.target as HTMLInputElement).value)}
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
        <div class="ColourInput__Buttons">
            <button class="ColourInput__ColourActionBtn"
                onclick={handleRandomise}
                title="Generate a randomised colour"
            >
                <MaterialSymbolsLightShuffle/>
            </button>
            <button class="ColourInput__ColourActionBtn"
                onclick={tryCreateNewColour}
                title="Save colour to gallery"
            >
                <MaterialSymbolsLightSaveOutline/>
            </button>
        </div>
    </div>

    <div class="ColourInput__Rgb">
        <div class="ColourInput__RgbItem">
            <label for="red">R</label>
            <input class="ColourInput__RgbInput"
                name="red"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.red}
                oninput={e => handleRgbChange(RgbChannel.R, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__RgbItem">
            <label for="green">G</label>
            <input class="ColourInput__RgbInput"
                name="red"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.green}
                oninput={e => handleRgbChange(RgbChannel.G, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__RgbItem">
            <label for="blue">B</label>
            <input class="ColourInput__RgbInput"
                name="blue"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.blue}
                oninput={e => handleRgbChange(RgbChannel.B, (e.target as HTMLInputElement).value)}
            />
        </div>
    </div>
</section>

<style>
    .ColourInput__Top,
    .ColourInput__TopLeft,
    .ColourInput__Rgb {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .ColourInput__Top,
    .ColourInput__TopLeft {
        gap: 1rem;
    }

    .ColourInput__HexInput {
        width: 5rem;
    }

    .ColourInput__Buttons {
        /* Hacky solution to align this with the colour picker button */
        margin-top: 4px;
    }

    .ColourInput__ColourActionBtn {
        font-size: 20px;
        line-height: 0;
        padding: 0;
    }

    .ColourInput__Rgb {
        justify-content: space-around;
        margin: 0.25rem 0;
        gap: 2rem;
    }

    .ColourInput__RgbInput {
        width: 2rem;
    }

    /* Colour picker customisation */
    :global(.color-picker .color) {
        border-radius: 0 !important;
    }

</style>