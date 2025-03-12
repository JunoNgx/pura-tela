<script lang="ts">
	import { sizeGallery } from "src/states/sizeGalleryState.svelte.js";
	import { wallGenSizeOptionIndex } from "src/states/wallGenState.svelte.js";


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
</script>

<section class="SizeInput">
    <h3>
        <label for="size">Dimensions</label>
    </h3>
    <select class="SizeInput__Select"
        id="size"
        value={wallGenSizeOptionIndex.val}
        oninput={(e) => handleSizeOptionChange((e.target as HTMLSelectElement).value)}
    >
        {#each sizeGallery as sizeOptionItem, index}
            <option value={index}>{sizeOptionItem.name}</option>
        {/each}
    </select>
</section>

<style>
    .SizeInput__Select {
        padding: 0.25rem 0;
        margin-top: 1rem;
    }
</style>