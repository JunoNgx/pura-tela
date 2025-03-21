<script lang="ts">
	import { MAX_COLOUR_COUNT, MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";
</script>

<article class="AboutArticle">
    <h2 class="H2WithMargin">Help</h2>

    <h3>Overview</h3>
    <p>This is <strong>Pura Tela</strong>, a simple web application to play with colours and generate wallpapers from them.</p>

    <h3>Wallpaper</h3>
    <p>The application starts from the <code>Wallpaper Generator</code> route, where a wallpaper can be generated from a set of data.</p>

    <p>The <code>Wallpaper Style</code> is the most important setting here. This defines the output of your wallpaper. This is represented in the preview block. You can also enable text samples for to check for the best contrast for your screen (which is only for checking, and will not be rendered in the final image).</p>

    <h3>Colours</h3>
    <p>The data input to the wallpaper are made up of colours. Pura Tela is mainly <strong>hex codes</strong>-driven, though an alternative colour picker can be used (represented by a square coloured block). From the <code>Wallpaper Generator</code> route, colours can be saved.</p>

    <p>A list of saved colours can be accessed from the <code>Colour Gallery</code> route. This list can be modified or loaded to the <code>Wallpaper Generator</code>.</p>

    <p>Colours can also be removed. This process is permanent and irreversible. At any point of time, to reset the gallery to the default original state, use the <code>Reset gallery</code> button at the bottom of the list. In the event that this pre-created curated list changes in the future, this is also how you get access to new items.</p>

    <h3>Palettes</h3>
    <p>A combination of colours is called a palette. While colour theory is a complex matter, the application starts with a number of default palette presets you can start using. A palette is limited to have a minimum of {MIN_COLOUR_COUNT_PALETTE} and maximum of {MAX_COLOUR_COUNT} colours.</p>

    <p>Pura Tela comes with a dedicated <code>Palette Generator</code> route to assist with the composing process.</p>

    <p>From the <code>Palette Gallery</code> route, palettes can be passed to either the <code>Wallpaper Generator</code> or the <code>Palette Generator</code>. Like the <code>Colour Gallery</code>, paletes can also be removed or reset to default.</p>


    <h3>Sizes</h3>

    <p>The output size (width and height) of <code>Wallpaper Generator</code> can be adjusted at the bottom of the panel. While these can be fine tune as you want or need, the <code>Size gallery</code> provides a list of common presets to get you started.</p>

    <p>In the event of doubt, the preset <code>Mobile</code> and <code>Desktop 2K</code> are applicable to the overwhelming amount of cases.</p>

    <h3>Downloading</h3>

    <p>Once satisfied with the settings, tapping on the <code>Download</code> button will create the ouput wallpaper image and should be downloaded to your device. The image file will be in the PNG format and named according to the mode and colours you used.</p>

    <p>The save location varies according to your device configuration, but is typically your designated <code>Download</code> directory and should be accessible from your Photo browser app. This image is free for you to keep forever as you see fit, without the need for this app again.</p>

    <h3 id="import">Importing palette from external sources</h3>
    <p>From <code>Palette Generator</code>, it is possible to import colour palettes from an external source as a string. The format is required to follow the following rules:</p>
    <ul>
        <li>Each colour is represented by a hex code.</li>
        <li>Colours is to be separated by either comma or dash. Whitespaces don't matter.</li>
        <li>Colours can be surrounded by either single quote or doublequotes.</li>
        <li>Colours either be preceeded by a hash sign or not.</li>
        <li>The amount of colours must be at least {MIN_COLOUR_COUNT_PALETTE}. If more than {MAX_COLOUR_COUNT} is provided, the excessive colours will be ignored.</li>
    </ul>

    <p>It should be noted that the separating character/delimited must either be consistently all dashes or all commas. Otherwise, the presentation of hex colour codes can be mixed, as long as they follow the rules above.</p>

    <p>The following are valid data to be imported:</p>
    <ul>
        <li><code>"#04AE9C", "#CCA5C6", "#CD4173", "#7BFFB0", "#99E343", "#235646"</code></li>
        <li><code>04AE9C-CCA5C6-CD4173-7BFFB0-99E343-235646</code></li>
        <li><code>04AE9C-"CCA5C6"- #CD4173-'7BFFB0'</code></li>
    </ul>

    <p>There is a pleathora amount of free resources on the internet, where these palettes can be generated to be imported into Pura Tela. Among my favourite are the web application <strong>Coolors</strong> and any <i>Large Language Model</i> of your choice.</p>

    <h3>Sharing</h3>
    <p>To restore the exact preset of settings for the <code>Wallpaper Generator</code>, store the URL provided at the bottom of the page at a safe place and re-access. You are encourage to do so for either your own personal storage, or sharing with friends.</p>

    <h3 id="ai">Generate with AI</h3>
    <p>From <code>Wallpaper Generator</code> and the <code>Palette Generator</code>, from the dropdown menu, it is possible to generate a colour palette via a Google's <code>Large language model</code> <code>Gemini</code>. You will prompted to enter the theme of the output, which should return a {MAX_COLOUR_COUNT}-colour palette.</p>

    <p>This is meant to be a fun, experimental, and entirely optional feature of the app. It is expected that queries made via these endpoints are used to further train Google's Gemini. If privacy or related political believes are concerned, you are advised to refrain from using this option. This is also the only operation of the app where data is transmitted away from your device.</p>

    <p>It is also recommended that you try out your own prompts in your own Large Language Model of choice and import the output into this app (<a href="#import">see above</a>).</p>

    <h3>Installing</h3>
    <p>Pura Tela is deployed as a <code>Progressive Web App</code>, and is installable to your device to be launched in a manner similar to a native app. If you do not see a prompt, check your browser guide for the appropriate steps.</p>

    <h3>Privacy and tracking</h3>
    <p>Pura Tela does not track your usage and activities in any way. Your changes and states are entirely stored via the web <code>localStorage</code> API. Your data is your data, and nothing is collected more than the hosting platform (Vercel) requires for minimum functioning.</p>

    <p>The use of <a href="#ai">AI Generation</a> is the only possible data operation where data might be collected (by Google), and you are advised to refrain from using this option, if it is a concern.</p>

    <h3>Contribution</h3>
    <p>For questions, bug reports, suggestions, and contributions, please create an issue in the <a href="https://github.com/JunoNgx/pura-tela/" target="_blank" rel="noopener noreferrer">project's repository on GitHub</a>.</p>

</article>

<style>
    h3 {
        margin: 2rem 0 1rem;
    }
</style>