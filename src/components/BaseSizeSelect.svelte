<script lang="ts">
    import { currSizeOptionIndex, sizeOptions } from "src/lib/states.svelte";

    const handleSizeOptionChange = (rawNewIndex: string) => {
        let newIndex;

        try {
            newIndex = parseInt(rawNewIndex);
        } catch (error) {
            console.error("ERROR: invalid index value for size option")
            return;
        }

        currSizeOptionIndex.set(newIndex);
    };
</script>

<section class="SizeSelection">
    <h3>
        <label for="size">Dimensions</label>
    </h3>
    <select class="SizeSelection__Select"
        id="size"
        value={currSizeOptionIndex.val}
        oninput={(e) => handleSizeOptionChange((e.target as HTMLSelectElement).value)}
    >
        {#each sizeOptions as sizeOptionItem, index}
            <option value={index}>{sizeOptionItem.name}</option>
        {/each}
    </select>
</section>

<style>
    .SizeSelection {
        margin-top: 3rem;
    }

    .SizeSelection__Select {
        width: 100%;
        padding: 0.25rem 0;
        margin-top: 0.5rem;
    }
</style>