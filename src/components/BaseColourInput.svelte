<script lang="ts">
	import { RgbChannel, type RgbColour } from "src/lib/types.js";
	import { convertHexToRgb, convertRgbToHex, isHexCodeValid, parseRgbChannelValue } from "src/lib/utils.js";
    import { currHexCode, currRgbColour } from "src/lib/stores.js";

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) {
            return;
        }

        $currHexCode = hexStr;
        $currRgbColour = convertHexToRgb($currHexCode);
    }

    const handleRgbChange = (channel: RgbChannel, value: string) => {
        switch (channel) {
        case RgbChannel.R:
            $currRgbColour = {
                ...$currRgbColour,
                red: parseRgbChannelValue(value)
            };
            break;
        case RgbChannel.G:
            $currRgbColour = {
                ...$currRgbColour,
                green: parseRgbChannelValue(value)
            };
            break;
        case RgbChannel.B:
            $currRgbColour = {
                ...$currRgbColour,
                blue: parseRgbChannelValue(value)
            };
            break;
        }

        $currHexCode = convertRgbToHex($currRgbColour);
    }

</script>

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
                bind:value={$currHexCode}
                on:input={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
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
                bind:value={$currRgbColour.red}
                on:input={e => handleRgbChange(RgbChannel.R, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="green">G</label>
            <input
                name="red"
                type="number"
                min="0"
                max="255"
                bind:value={$currRgbColour.green}
                on:input={e => handleRgbChange(RgbChannel.G, (e.target as HTMLInputElement).value)}
            />
        </div>
        <div class="ColourInput__Rgb">
            <label for="blue">B</label>
            <input
                name="blue"
                type="number"
                min="0"
                max="255"
                bind:value={$currRgbColour.blue}
                on:input={e => handleRgbChange(RgbChannel.B, (e.target as HTMLInputElement).value)}
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