<section class="ModeSelect">
    <h3>Wallpaper Style</h3>
    <div class="ModeSelect__Container">
        <button class="ModeSelect__ModeItem">
            Solid wallpaper
        </button>
        <button class="ModeSelect__ModeItem">
            Gradient wallpaper
        </button>
    </div>
</section>

<style>
    .ModeSelect {
        margin-top: 1.5rem;
    }

    .ModeSelect__Container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
    }

    .ModeSelect__ModeItem {
        flex-grow: 1;
    }
</style>