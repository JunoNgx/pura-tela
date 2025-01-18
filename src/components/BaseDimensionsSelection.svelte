<script>
    import { sizeOptions } from "src/lib/states.svelte";
</script>

<section class="SizeSelection">
    <h3>
        <label for="size">Dimensions</label>
    </h3>
    <select>
        {#each sizeOptions as sizeOptionItem}
            <option>{sizeOptionItem.name}</option>
        {/each}
    </select>
</section>