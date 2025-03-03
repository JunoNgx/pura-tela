<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    
    import MaterialSymbolsLightShuffle from "~icons/material-symbols-light/shuffle";
    import MaterialSymbolsLightSaveOutline from "~icons/material-symbols-light/save-outline";
    
	import { getCurrColourAtIndex, getCurrColourAtIndexAsHex, setCurrColourAtIndex } from 'src/lib/states.svelte.js';
	import { isHexCodeValid } from 'src/lib/utils.js';

    let { index } = $props();

    const handleColorPickerChange = (hexCode: string) => {
        setCurrColourAtIndex(index, hexCode.replace("#", "").toUpperCase());
    };

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) return;

        // setSolidColour(hexStr);
        // currRgbColour.set(convertHexToRgb(getSolidColour()));
    };

    const handleRandomise = () => {
        // setSolidColour(getRandomHexCode());
    };

    const trySaveColour = () => {
        // const colourName = window.prompt("Enter name for new colour", `#${getSolidColour()}`)
        // if (!colourName) return;

        // try {
        //     const newColour = {
        //         name: colourName,
        //         hexCode: getSolidColour()
        //     }
    
        //     colourGallery.set([...colourGallery.val, newColour]);
        // } catch(error) {
        //     console.error(error);
        //     window.alert("Error adding new colour to gallery. Please see the console for more info.")
        // }
    };

</script>

<li class="ColourInput">
    <div class="ColourInput__LeftSide">
        <div class="ColourInput__Picker">
            <ColorPicker
                label=""
                texts={{
                    changeTo: "to",
                }}
                hex={getCurrColourAtIndexAsHex(index)}
                isAlpha={false}
                position="responsive"
                on:input={e => {
                    const newValue = e.detail.hex?.replace("#", "") as string;
                    setCurrColourAtIndex(index, newValue);
                }}
            />
        </div>
        <div class="ColourInput__HexInputContainer">
            <label class="ColourInput__HexLabel"
                for="hexCode"
                aria-label="Hex colour code"
            >
                #
            </label>
            <input class="ColourInput__HexInput"
                id="hexCode"
                name="hexCode"
                type="text"
                minlength="3"
                maxlength="6"
                spellcheck="false"
                title="Requires a valid hex code"
                value={getCurrColourAtIndex(index)}
                oninput={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__Buttons">
        <button class="ColourInput__ColourActionBtn IconButton"
            onclick={handleRandomise}
            title="Generate a randomised colour"
            aria-label="Create a random colour"
        >
            <MaterialSymbolsLightShuffle />
        </button>
        <button class="ColourInput__ColourActionBtn IconButton"
            onclick={trySaveColour}
            title="Save colour to gallery"
            aria-label="Save colour to gallery"
        >
            <MaterialSymbolsLightSaveOutline/>
        </button>
    </div>
</li>

<style>
    .ColourInput {
        display: flex;
        justify-content: space-between;
        list-style: none;
        padding-left: none;
    }

    .ColourInput__LeftSide {
        display: flex;
        gap: 1.5rem;
    }

    .ColourInput__HexInputContainer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourInput__ColourActionBtn {
        border: 1px solid var(--colPri);
    }

    .ColourInput__ColourActionBtn:hover {
        color: var(--colBg);
        background-color: var(--colPri);
    }
</style>