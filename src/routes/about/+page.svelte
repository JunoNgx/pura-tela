<script lang="ts">
    import LogoIconColoured from "src/components/LogoIconColoured.svelte";
</script>

<article class="HelpArticle">
    <div class="HelpArticle__LogoContainer">
        <LogoIconColoured />
    </div>

    <h2 class="H2WithMargin">Welcome to Pura Tela</h2>

    <h3>What is this?</h3>
    <p>
        You are looking at <strong>Pura Tela</strong>, a minimalist wallpaper
        generator and a simple colour toolkit.
    </p>

    <h3>Goals</h3>
    <p>
        Pura Tela aims to provide user with a streamlined and but potent toybox
        of colours. With multiple tools to record preferences and pass data,
        users are encouraged to iterate, explore, store, and share.
        Randomisations also allow a degree of unpredictable happenstance and
        serendipity.
    </p>

    <h3>Philosophy and Values</h3>
    <ul>
        <li>Simplicity</li>
        <li>Ease of use and inter-operability</li>
        <li>Self-containment and respect for privacy</li>
    </ul>

    <h3>Authors</h3>
    <p>
        This application is made by <a
            href="https://www.junongx.com/"
            target="_blank"
            rel="noopener noreferrer">Juno Nguyen</a
        >
        with design input from
        <a
            href="https://caseykwokdinata.webflow.io/"
            target="_blank"
            rel="noopener noreferrer">Casey Kwokdinata</a
        >. The project is
        <a
            href="https://github.com/JunoNgx/pura-tela/"
            target="_blank"
            rel="noopener noreferrer">open-source</a
        >
        and released under the <strong>MIT License</strong>.
    </p>
    <h3>Tech stack</h3>
    <p>
        The project was developed with a minimal stack of tools, including <a
            href="https://svelte.dev/"
            target="_blank"
            rel="noopener noreferrer">SvelteKit</a
        >, TypeScript,
        <a
            href="https://svelte-awesome-color-picker.vercel.app/"
            target="_blank"
            rel="noopener noreferrer">Svelte Awesome Color Picker</a
        >, and
        <a
            href="https://github.com/isaacHagoel/svelte-dnd-action/"
            target="_blank"
            rel="noopener noreferrer">Svelte Dnd Action</a
        >.
    </p>

    <h3>Acknowledgement</h3>
    <p>
        This project uses <a
            href="https://www.oliviaking.com/inclusivesans/feature"
            target="_blank"
            rel="noopener noreferrer">Inclusive Sans by Olivia King</a
        >
        as the primary font and icons from
        <a
            href="https://iconify.design/"
            target="_blank"
            rel="noopener noreferrer">Vjacheslav Trushkin's Iconify project</a
        >.
    </p>
    <p>
        Several palettes from the initial gallery are from <a
            href="https://colours.cafe/"
            target="_blank"
            rel="noopener noreferrer">colours.cafe</a
        >
        and
        <a
            href="https://www.behance.net/gallery/32154055/Minimalist-Color-Palettes-2015"
            target="_blank"
            rel="noopener noreferrer">Dumma Branding</a
        > (whom you should check out; they have a lot of beautiful palettes to be
        imported into this app).
    </p>
</article>

<style>
    h3 {
        margin: 2rem 0 1rem;
    }

    .HelpArticle__LogoContainer {
        max-width: 16rem;
        display: block;
        margin: 3rem auto;
    }

    @media screen and (width <= 550px) {
        .HelpArticle__LogoContainer {
            max-width: 8rem;
        }
    }
</style>
