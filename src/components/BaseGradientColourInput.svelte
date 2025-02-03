<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	import { getRandomHexCode } from "src/lib/utils.js";
    import { getCurrColoursAtIndex, setCurrColoursAtIndex } from "src/lib/states.svelte";

    const handleColourChangeAtIndex = (index: number, hexCode: string) => {
        setCurrColoursAtIndex(index, hexCode.replace("#", "").toUpperCase());
    };

    const handleRandomise = () => {
        setCurrColoursAtIndex(0, getRandomHexCode());
        setCurrColoursAtIndex(1, getRandomHexCode());
    };
</script>

<section class="ColourInput">

    <h3>Colours</h3>

    <div class="ColourInput__Main">
        <div class="ColourInput__ColourItem">
            <ColorPicker
                label=""
                texts={{
                    changeTo: "to",
                }}
                hex={`#${getCurrColoursAtIndex(0)}`}
                isAlpha={false}
                position="responsive"
                on:input={e => handleColourChangeAtIndex(0, e.detail.hex as string)}
            />
        </div>
        <div class="ColourInput__ColourItem">
            <ColorPicker
                label=""
                texts={{
                    changeTo: "to",
                }}
                hex={`#${getCurrColoursAtIndex(1)}`}
                isAlpha={false}
                position="responsive"
                on:input={e => handleColourChangeAtIndex(1, e.detail.hex as string)}
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
    </div>
</section>

<style>
    .ColourInput__Main {
        margin-top: 1rem;
    }

    .ColourInput__Buttons {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        margin-top: 1.5rem;
    }
</style>