<script lang="ts">
    import BaseHeader from "src/components/BaseHeader.svelte";
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    let { children } = $props();
</script>

<main>
    <BaseHeader/>
    <BaseNav/>
    <div class="TabContent">
        {@render children()}
    </div>
    <BaseFooter/>
</main>

<style>
    main {
        max-width: 800px;
        margin: auto;
        min-height: 95vmin;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .TabContent {
        width: 100%;
        padding: 5px;
        flex-grow: 10;
    }
</style>