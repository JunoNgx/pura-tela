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
    }
</script>

<section class="SizeSelection">
    <h3>
        <label for="size">Dimensions</label>
    </h3>
    <select
        value={currSizeOptionIndex.val}
        on:input={(e) => handleSizeOptionChange((e.target as HTMLSelectElement).value)}
    >
        {#each sizeOptions as sizeOptionItem, index}
            <option value={index}>{sizeOptionItem.name}</option>
        {/each}
    </select>
</section>