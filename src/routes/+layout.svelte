<script lang="ts">
    import BaseNav from "../components/BaseNav.svelte";
    import BaseFooter from "../components/BaseFooter.svelte";

    let { children } = $props();
</script>

<BaseNav/>

{@render children()}

<BaseFooter/>