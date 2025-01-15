<script lang="ts">
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";

    let { children } = $props();
</script>

<BaseNav/>

{@render children()}

<BaseFooter/>