<script lang="ts">
	import { MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";
	import { sizeGallery } from "src/states/sizeGalleryState.svelte.js";
	import { setWallGenSizeHeight, setWallGenSizeWidth, wallGenSize, wallGenSizeOptionIndex } from "src/states/wallGenState.svelte.js";


    const handleSizeOptionChange = (rawNewIndex: string) => {
        let newIndex;

        try {
            newIndex = parseInt(rawNewIndex);
        } catch (error) {
            console.error("ERROR: invalid index value for size option")
            return;
        }

        wallGenSizeOptionIndex.set(newIndex);
    };

    const onWidthChange = (newValue: string) => {
        setWallGenSizeWidth(newValue);
    }

    const onHeightChange = (newValue: string) => {
        setWallGenSizeHeight(newValue);
    }
</script>

<section class="SizeInput">
    <h3>
        <label for="size">Dimensions</label>
    </h3>

    <div class="SizeInput__MainContent">
        <div class="SizeInput__LeftSide">
            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label"
                    for="wallGenWidth"
                >
                    Width
                </label>
                <input class="SizeInput__Input"
                    id="wallGenWidth"
                    name="sizeWidth"
                    type="number"
                    min=0
                    max={MAX_WIDTH}
                    title="Width of the wallpaper"
                    aria-label="Width of the wallpaper"
                    value={wallGenSize.val.width}
                    oninput={e => onWidthChange((e.target as HTMLInputElement).value)}
                />
            </div>

            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label"
                    for="wallGenHeight"
                >
                    Height
                </label>
                <input class="SizeInput__Input"
                    id="wallGenWidth"
                    name="sizeHeight"
                    type="number"
                    min=0
                    max={MAX_HEIGHT}
                    title="Height of the wallpaper"
                    aria-label="Height of the wallpaper"
                    value={wallGenSize.val.height}
                    oninput={e => onHeightChange((e.target as HTMLInputElement).value)}
                />
            </div>
        </div>


    </div>
</section>

<style>
    .SizeInput__MainContent {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin: 1rem 0;
    }

    .SizeInput__LeftSide {
        display: flex;
        flex-direction: row;
        gap: 3rem;
    }

    .SizeInput__InputItem {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .SizeInput__Input {
        width: 4rem;
    }
</style>