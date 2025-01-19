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
        min-height: 90vh;
        max-width: 800px;
        margin: 1rem auto;
    }

    .CardWrapper {
        margin: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--colBg);
        box-shadow: 4px 8px 16px 0px rgba(0, 0, 0, 0.2)   
    }

    .TabContent {
        width: 100%;
        padding-top: 1rem;
        flex-grow: 10;
        border-top: 1px solid var(--colPri);
    }
</style>