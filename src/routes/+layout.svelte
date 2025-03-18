<script lang="ts">
    import BaseHeader from "src/components/BaseHeader.svelte";
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    import "src/styles/global.css";
	import { handleThemeModeChange } from "src/lib/nightMode.js";

    let { children } = $props();

    handleThemeModeChange();
</script>

<main>
    <div class="CardWrapper">
        <BaseHeader/>
        <BaseNav/>
        <div class="TabContent">
            {@render children()}
        </div>
    </div>
</main>
    
<BaseFooter/>
<style>
    @import "src/styles/vars.css";

    main {
        min-height: 85dvh;
        max-width: 800px;
        margin: 1rem auto 2rem;
    }

    .CardWrapper {
        margin: 1rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--colBg);
        box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.1)   
    }

    .TabContent {
        width: 100%;
        flex-grow: 10;
        border-top: 1px solid var(--colPri);
    }

    @media screen and (width < 600px) {
        main {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .CardWrapper {
            margin: 0;
            padding: 1rem;
            box-shadow: none;
        }

        .TabContent {
            padding-top: 0;
        }
    }
</style>