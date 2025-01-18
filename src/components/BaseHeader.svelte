<script lang="ts">
    import BaseThemeModeContainer from "src/components/BaseThemeModeContainer.svelte";
</script>

<header class="Header">
    <div class="Header__Left">
        <h1>Pura Tela</h1>
    </div>
    <div class="Header_Right">
        <BaseThemeModeContainer/>
    </div>
</header>

<style>
    .Header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
</style>