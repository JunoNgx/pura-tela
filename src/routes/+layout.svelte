<script lang="ts">
    import BaseHeader from "src/components/BaseHeader.svelte";
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    import "src/styles/global.css";
	import { handleThemeModeChange } from "src/lib/nightMode.js";

    let { children } = $props();

    handleThemeModeChange();
</script>

<main class="Wrapper">
    <BaseNav/>
    <div class="MainContent Card">
        <!-- <BaseHeader/> -->
            {@render children()}
    </div>
</main>
    
<BaseFooter/>
<style>
    @import "src/styles/vars.css";

    .Wrapper {
        min-height: 85dvh;
        max-width: 800px;
        margin: 1rem auto 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    .MainContent {
        flex-grow: 1;
        /* display: flex;
        flex-direction: column;
        align-items: center; */
    }

    @media screen and (width < 850px) {
        .Wrapper {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .TabContent {
            padding-top: 0;
        }
    }
</style>