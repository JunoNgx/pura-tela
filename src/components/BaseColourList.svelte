<script lang="ts">
    import { colourGallery } from "src/lib/states.svelte.js";
</script>

<ul class="ColourList">
    {#each colourGallery.val as colourItem}
        <li class="ColourItem">
            <div class="ColourItem__Preview"
                style={`background-color: #${colourItem.hexCode};`}
            ></div>
            <div class="ColourItem__Name">
                {colourItem.name}
            </div>
            <div class="ColourItem__HexCode">
                {`#${colourItem.hexCode}`}
            </div>
            <div class="ColourItem__Buttons">
                <button>pick</button>
                <button>delete</button>
            </div>
        </li>
    {/each}
</ul>

<style>
    .ColourList {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .ColourItem {
        list-style: none;
        border: 1px solid #000;
        width: 20%;
        padding: 4px;
    }

    .ColourItem__Preview {
        aspect-ratio: 1/1;
        width: 100%;
    }

    .ColourItem__Buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>