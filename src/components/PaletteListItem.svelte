<script lang="ts">
    let { paletteItem } = $props();
</script>

<ul class="PaletteListItem">
    <div class="PaletteListItem__PaletteBox">
        {#each paletteItem.colours as colourItem}
            <button class="PaletteListItem__PaletteColourItem"
                style="{`background-color: #${colourItem}`}"
            >
                <span class="PaletteListItem__PaletteColourCode">
                    {colourItem}
                </span>
            </button>
        {/each}
    </div>
    <div class="PaletteListItem__Name">{paletteItem.name}</div>
</ul>

<style>
    .PaletteListItem {
        list-style: none;
        border-bottom: 1px solid var(--colPri);
        min-width: 120px;
        padding-left: 0;
    }

    .PaletteListItem__PaletteBox {
        height: 200px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .PaletteListItem__PaletteColourItem {
        flex-grow: 1;
        border: none;
        transition: all var(--transTime) ease-in-out;
        padding: 0;
    }

    .PaletteListItem__PaletteColourCode {
        opacity: 0;
        padding: 0.25rem;
        color: var(--colWhite);
        background-color: rgba(var(--colBlackRgb), 0.5);
        transition: all var(--transTime) ease-in-out;
    }

    .PaletteListItem__PaletteColourItem:focus,
    .PaletteListItem__PaletteColourItem:hover {
        flex-grow: 5;
        z-index: 30;

        .PaletteListItem__PaletteColourCode {
            margin: 0 0.5rem;
            opacity: 1;
        }
    }
</style>