<script lang="ts">
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    let { children } = $props();
</script>

<main>
    <BaseNav/>
    <div class="tab-content">
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

    .tab-content {
        width: 100%;
        flex-grow: 10;
    }
</style>