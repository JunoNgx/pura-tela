<script lang="ts">
	import { MAX_COLOUR_COUNT, MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";
</script>

<article class="AboutArticle">
    <h2>Help</h2>

    <h3>Overview</h3>
    <p>This is <strong>Pura Tela</strong>, a simple web application to play with colours and generate wallpapers from them.</p>

    <h3>Wallpaper</h3>
    <p>The application starts from the <strong>Wallpaper Generator</strong> route, where a wallpaper can be generated from a set of data.</p>

    <p>The <strong>Wallpaper mode</strong> is the most important setting here. This defines the output of your wallpaper. This is represented in the preview block. You can also enable text samples for to check for the best contrast for your screen.</p>

    <h3>Colours</h3>
    <p>The data input to the wallpaper are made up of colours. Pura Tela is mainly <strong>hex codes</strong>-driven, though an alternative colour picker can be used (represented by a square block). From the <strong>Wallpaper Generator</strong> route, colours can be saved.</p>

    <p>A list of saved colours can be accessed from the <strong>Colour Gallery</strong> route. This list can be modified or loaded to the <strong>Wallpaper Generator</strong>.</p>

    <p>Colours can also be removed. This process is permanent and irreversible. At any point of time, to reset the gallery to the default original state, use the "Reset gallery" button at the bottom of the list. In the event that this pre-created curated list changes in the future, this is also how you get access to new items.</p>

    <h3>Palettes</h3>
    <p>A combination of colours is called a palette. While colour theory is a complex matter, the application starts with a number of default palette presets you can start using. A palette is limited to have a minimum of {MIN_COLOUR_COUNT_PALETTE} and maximum of {MAX_COLOUR_COUNT} colours.</p>

    <p>Pura Tela comes with a dedicated <strong>Palette Generator</strong> route to assist with the composing process.</p>

    <p>From the <strong>Palette Gallery</strong> route, palettes can be passed to either the <strong>Wallpaper Generator</strong> or the <strong>Palette Generator</strong>. Like the <strong>Colour Gallery</strong>, paletes can also be removed or reset to default.</p>


    <h3>Sizes</h3>

    <p>While working with the <strong>Wallpaper Generator</strong>, you may choose the screen size appropriate to your device from the dropdown at the bottom of the panel. The <strong>Size gallery</strong> tab provides a more detail information of each size preset.</p>

    <p>In the event of doubt, the preset "Mobile" and "Desktop 2K" are applicable to the overwhelming amount of cases.</p>

    <h3>Downloading</h3>

    <p>Once satisfied with the settings, tapping on the <strong>Download</strong> button will create the ouput wallpaper image and should be downloaded to your device. The image file will be in the PNG format and named according to the mode and colours you used.</p>

    <p>The save location varies according to your device configuration, but is typically your designated <strong>Download</strong> directory and should be accessible from your Photo browser app. This image is free for you to keep forever as you see fit, without the need for this app again.</p>

    <h3>Importing palette from external sources</h3>
    <p>From certain screen in the app, it is possible to import colour palettes from an external source as a string. The format is required to follow the following rules:</p>
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

    <h3>Installing</h3>
    <p>Pura Tela is deployed as a <strong>Progressive Web App</strong>, and is installable to your device to be launched in a manner similar to a native app. If you do not see a prompt, check your browser guide for the appropriate steps.</p>

    <h3>Privacy and tracking</h3>
    <p>Pura Tela does not track your usage and activities in any way. Your changes and states are entirely stored via the web <code>localStorage</code> API. Your data is your data, and nothing is collected more than the hosting platform (Vercel) requires for minimum functioning.</p>

    <h3>Contribution</h3>
    <p>For questions, bug reports, suggestions, and contributions, please create an issue in the <a href="https://github.com/JunoNgx/pura-tela/" target="_blank" rel="noopener noreferrer">project's repository on GitHub</a>.</p>

</article>
