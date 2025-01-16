<section class="ColourInput">

    <h3>Colour</h3>

    <div class="ColourInput__Top">
        <div class="ColourInput__Hex">
            <label for="hexCode">#</label>
            <input
                name="hexCode"
                type="text"
                minlength="3"
                maxlength="6"
            />
        </div>
        <button>pick</button>
    </div>

    <div class="ColourInput__Rgb">
        <div class="ColourInput__RgbItem">
            <label for="red">R</label>
            <input
                name="red"
                type="number"
                min="0"
                max="255"
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="green">G</label>
            <input
                name="red"
                type="number"
                min="0"
                max="255"
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="blue">B</label>
            <input
                name="blue"
                type="number"
                min="0"
                max="255"
            />
        </div>
    </div>

    <div class="ColourInput__Buttons">
        <button>randomise</button>
        <button>save colour</button>
    </div>

</section>

<style>
    .ColourInput__Top,
    .ColourInput__Hex,
    .ColourInput__Rgb {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .ColourInput__Top {
        justify-content: flex-start;
        gap: 15px;
    }
</style>