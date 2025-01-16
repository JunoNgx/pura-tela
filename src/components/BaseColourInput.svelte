<script lang="ts">
	import { RgbChannel, type RgbColour } from "src/lib/types.js";
	import { convertHexToRgb, convertRgbToHex, isHexCodeValid, parseRgbChannelValue } from "src/lib/utils.js";

    let hexCode: string = "FFFFFF";
    // TODO: implement derived state
    // let isHexCodeValid = true;
    let rgb: RgbColour = {
        red: 255,
        green: 255,
        blue: 255
    };

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) {
            return;
        }

        hexCode = hexStr;
        rgb = convertHexToRgb(hexCode);
    }

    const handleRgbChange = (channel: RgbChannel, value: string) => {
        switch (channel) {
        case RgbChannel.R:
            rgb = {
                ...rgb,
                red: parseRgbChannelValue(value)
            };
            break;
        case RgbChannel.G:
            rgb = {
                ...rgb,
                green: parseRgbChannelValue(value)
            };
            break;
        case RgbChannel.B:
            rgb = {
                ...rgb,
                blue: parseRgbChannelValue(value)
            };
            break;
        }

        hexCode = convertRgbToHex(rgb);
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
                bind:value={hexCode}
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
                bind:value={rgb.red}
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
                bind:value={rgb.green}
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
                bind:value={rgb.blue}
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