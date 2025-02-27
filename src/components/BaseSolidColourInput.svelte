<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

    import MaterialSymbolsLightSaveOutline from '~icons/material-symbols-light/save-outline';
    import MaterialSymbolsLightShuffle from '~icons/material-symbols-light/shuffle';

	import { RgbChannel } from "src/lib/types.js";
	import { convertHexToRgb, convertRgbToHex, getRandomHexCode, isHexCodeValid, parseRgbChannelValue } from "src/lib/utils.js";
    import { colourGallery, getSolidColour, setSolidColour, currRgbColour } from "src/lib/states.svelte";

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) return;

        setSolidColour(hexStr);
        currRgbColour.set(convertHexToRgb(getSolidColour()));
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

        setSolidColour(convertRgbToHex(currRgbColour.val));
    };

    const handleColorPickerChange = (hexCode: string) => {
        setSolidColour(hexCode.replace("#", "").toUpperCase());
        currRgbColour.set(convertHexToRgb(getSolidColour()));
    };

    const handleRandomise = () => {
        setSolidColour(getRandomHexCode());
    };

    const tryCreateNewColour = () => {
        const colourName = window.prompt("Enter name for new colour", `#${getSolidColour()}`)
        if (!colourName) return;

        try {
            const newColour = {
                name: colourName,
                hexCode: getSolidColour()
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
        <!-- <input
            type="color"
            value={getSolidColour()}
            oninput={e => handleColorPickerChange((e.target as HTMLInputElement).value)}
        /> -->
        <ColorPicker
            label=""
            texts={{
                changeTo: "to",
            }}
            hex={`#${getSolidColour()}`}
            isAlpha={false}
            position="responsive"
            on:input={e => handleColorPickerChange(e.detail.hex as string)}
        />
        <div class="ColourInput__Hex">
            <label for="hexCode">#</label>
            <input class="ColourInput__HexInput"
                id="hexCode"
                name="hexCode"
                type="text"
                minlength="3"
                maxlength="6"
                spellcheck="false"
                title="Requires a valid hex code"
                value={getSolidColour()}
                oninput={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__Rgb">
        <div class="ColourInput__RgbItem">
            <label class="ColourInput__RgbLabel"
                for="red"
            >
                R
            </label>
            <input class="ColourInput__RgbInput"
                id="red"
                name="red"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.red}
                oninput={e => handleRgbChange(RgbChannel.R, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__RgbItem">
            <label class="ColourInput__RgbLabel"
                for="green"
            >
                G
            </label>
            <input class="ColourInput__RgbInput"
                id="green"
                name="green"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.green}
                oninput={e => handleRgbChange(RgbChannel.G, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__RgbItem">
            <label class="ColourInput__RgbLabel"
                for="blue"
            >
                B
            </label>
            <input class="ColourInput__RgbInput"
                id="blue"
                name="blue"
                type="number"
                min="0"
                max="255"
                value={currRgbColour.val.blue}
                oninput={e => handleRgbChange(RgbChannel.B, (e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__Buttons">
        <button class="ColourInput__ColourActionBtn"
            onclick={handleRandomise}
            title="Generate a randomised colour"
            aria-label="Create a random colour"
    >
            Randomise
        </button>
        <button class="ColourInput__ColourActionBtn"
            onclick={tryCreateNewColour}
            title="Save colour to gallery"
            aria-label="Save colour to gallery"
        >
            Save to Gallery
        </button>
    </div>
</section>

<style>
    .ColourInput__Top,
    .ColourInput__Rgb {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .ColourInput__Top {
        margin-top: 1rem;
        gap: 1rem;
    }

    .ColourInput__Hex {
        flex-grow: 5;
        display: flex;
        gap: 1rem;
    }

    .ColourInput__HexInput {
        flex-grow: 5;
    }

    .ColourInput__Buttons {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .ColourInput__Rgb {
        justify-content: space-between;
        margin: 1rem 0 0.25rem;
        padding-left: 0.75rem;
        gap: 1rem;
    }

    .ColourInput__RgbItem {
        display: flex;
        gap: 1rem;

        label {
            font-weight: 700;
        }
    }

    .ColourInput__RgbInput {
        width: 2.5rem;
        text-align: center;
    }

    @media screen and (width < 850px) {

    }

</style>