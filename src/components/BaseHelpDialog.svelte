<script lang="ts">
    import MaterialSymbolsLightClose from '~icons/material-symbols-light/close';

    let { closeDialog } = $props();
</script>

<dialog class="HelpDialog"
    id="helpDialog"
>
    <article class="HelpDialog__Article">
        <button class="HelpDialog__CloseBtn IconButton"
            onclick={() => { closeDialog() }}
        >
            <MaterialSymbolsLightClose/>
        </button>

        <h2>Welcome to PuraTela</h2>

        <h3>What is this?</h3>
        <p>You are looking at <strong>PuraTela</strong>, a simple web application to generate wallpaper of solid colours of your choice.</p>

        <h3>How?</h3>
        <p>Generate a wallpaper is a simple three-step process:</p>
        <ul>
            <li>Choose a colour</li>
            <li>Choose a size</li>
            <li>Hit the Download button</li>
        </ul>

        <h3>Choosing a colour</h3>
        <p><strong>Studio</strong> is where app starts and the magic happens. Make your choice of colour with multiple available tools:</p>
        <ul>
            <li>A hex code</li>
            <li>A colour picker (triggered by the colour block next to the hex input)</li>
            <li>RGB colour elements</li>
            <li>A colour randomiser</li>
            <li>A pre-created gallery (more on this later)</li>
        </ul>

        <h3>Saving a colour</h3>
        <p>From the <strong>Studio</strong> tab, use any one of the tools above to get your colour displayed in the preview block.</p>

        <p>You may also display sample text against this colour to make sure that a desireable contrast readability is achieved.</p>

        <p>Once satisfied, click on the "Save to Gallery" button. Once a name is entered, the colour will be appended to the Gallery (see below).</p>

        <h3>Gallery and loading colours</h3>
        <p>PuraTela starts with a list of pre-created and curated colours for you to start with. The list is displayed in the <strong>Gallery</strong> tab.

        <p>To load a colour, tap on the "eyedropper" icon on the bottom right of the colour card. This colour will then be loaded into the Studio. Upon returning to the Gallery, you will be brought back to your last scroll position.</p>

        <p>Colours can also be removed. This process is permanent and irreversible.</p>

        <p>At any point of time, to reset the gallery to the default original state, use the "Reset gallery" button at the bottom of the list. In the event that this pre-created curated list changes in the future, this is also how you get access to new items.</p>

        <h3>Sizes</h3>

        <p>From the Studio tab, choose the screen size appropriate to your device from the dropdown in the middle of the control panel. The third tab provides a more detail information of each size preset.</p>

        <p>In the event of doubt, the preset "Mobile" and "Desktop 2K" are applicable to the overwhelming amount of cases.</p>

        <h3>Downloading</h3>

        <p>After tapping on the <strong>Download</strong> button in the Studio tab, the image will be generated and passed to your device. The image file will be in the PNG format and named after either the colour name (if available) or the hex code used.</p>

        <p>The save location varies according to your device configuration, but is typically your designated Download directory and should be accessible from your Photo browser app. This image is free for you to keep forever as you see fit, without the need for this app again.</p>

        <h3>Installing</h3>
        <p>PuraTela is deployed as a <strong>Progressive Web App</strong>, and is installable to your device to be launched in a manner similar to a native app. If you do not see a prompt, check your browser guide for the appropriate steps.</p>

        <h3>Privacy and tracking</h3>
        <p>PuraTela does not track your usage and activities in any way. Your changes and states are entirely stored via the web <code>localStorage</code> API. Your data is your data, and nothing is collected more than the hosting platform (Vercel) requires for minimum functioning.</p>

        <h3>Authors</h3>
        <p>PuraTela is developed by <a href="https://www.junongx.com/" target="_blank" rel="noopener noreferrer">Juno Nguyen</a> with much design input from <a href="https://caseykwokdinata.webflow.io/" target="_blank" rel="noopener noreferrer">Casey Kwokdinata</a>.</p>

        <p>The project is made for personal use following the delisting of a similarly-functioned Android native app.</p>

        <h3>Acknowledgement and contribution</h3>
        <p>PuraTela is made with a minimal stack of tools, including <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">SvelteKit</a>, TypeScript, and <a href="https://svelte-awesome-color-picker.vercel.app/" target="_blank" rel="noopener noreferrer">Svelte Awesome Color Picker</a> (yes, not even SASS).</p>

        <p>The project is <a href="https://github.com/JunoNgx/pura-tela/" target="_blank" rel="noopener noreferrer">open-source</a> and released under <strong>MIT License</strong>.</p>

        <p>For questions, bug reports, suggestions, and contributions, please create an issue in the repository linked above on GitHub.</p>

    </article>
</dialog>

<style>
    .HelpDialog {
        border: none;
        background-color: transparent;
        padding: 0;
    }

    .HelpDialog__Article {
        position: relative;
        font-size: var(--fontSizeSm);
        overflow-y: scroll;
        scrollbar-width: thin;
        border: 1px solid var(--colPri);
        color: var(--colPri);
        background-color: var(--colBg);
        max-width: 480px;
        max-height: 85dvh;
        padding: 1rem;
    }

    .HelpDialog__CloseBtn {
        position: sticky;
        top: 0;
        left: 100%;
        /* Mildly hacky fix to move it beyond the container */
        transform: translate(0.5rem, -0.5rem);
        padding: 0.1rem;
        border: none;
        z-index: 2;
    }
</style>