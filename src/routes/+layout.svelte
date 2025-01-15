<script lang="ts">
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    let { children } = $props();
</script>

<main>
    <BaseNav/>
    <section class="tab-container">
        {@render children()}
    </section>
    <BaseFooter/>
</main>

<style>
    main {
        max-width: 1000px;
        margin: auto;
        min-height: 95vmin;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tab-container {
        flex-grow: 10;
    }
</style>