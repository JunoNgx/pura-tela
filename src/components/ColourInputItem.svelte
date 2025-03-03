<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    
    import MaterialSymbolsLightShuffle from "~icons/material-symbols-light/shuffle";
    import MaterialSymbolsLightSaveOutline from "~icons/material-symbols-light/save-outline";
    
	import { getCurrColourAtIndex, getCurrColourAtIndexAsHex, setCurrColourAtIndex } from 'src/lib/states.svelte.js';
	import { isHexCodeValid, getRandomHexCode } from 'src/lib/utils.js';

    let { index } = $props();

    const handleColorPickerChange = (hexCode: string) => {
        setCurrColourAtIndex(index, hexCode.replace("#", "").toUpperCase());
    };

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) return;
        setCurrColourAtIndex(index, hexStr.replace("#", "").toUpperCase());
    };

    const handleRandomise = () => {
        setCurrColourAtIndex(index, getRandomHexCode());
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
        <button class="ColourInput__ColourActionBtn"
            onclick={handleRandomise}
            title="Generate a randomised colour"
            aria-label="Create a random colour"
        >
            <MaterialSymbolsLightShuffle />
            <span class="ColourInput__BtnLabelText">Random</span>
        </button>
        <button class="ColourInput__ColourActionBtn"
            onclick={trySaveColour}
            title="Save colour to gallery"
            aria-label="Save colour to gallery"
        >
            <MaterialSymbolsLightSaveOutline/>
            <span class="ColourInput__BtnLabelText">Save</span>
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
        align-items: center;
        gap: 1.5rem;
    }

    .ColourInput__HexInputContainer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourInput__HexInput {
        width: 6rem;
    }

    .ColourInput__Buttons {
        display: flex;
        justify-content: flex-end;
        flex-wrap: nowrap;
        gap: 1rem;
    }

    .ColourInput__ColourActionBtn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--colPri);
    }

    .ColourInput__ColourActionBtn:hover {
        color: var(--colBg);
        background-color: var(--colPri);
    }

    @media screen and (width <= 500px) {
        .ColourInput__ColourActionBtn {
            padding: 0.5rem;
        }

        .ColourInput__BtnLabelText {
            display: none;
        }
    }
</style>