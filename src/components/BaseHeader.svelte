<script lang="ts">
    import MaterialSymbolsLightHelpOutline from "~icons/material-symbols-light/help-outline";
    import BaseThemeModeContainer from "src/components/BaseThemeModeContainer.svelte";
	import BaseHelpDialog from "src/components/BaseHelpDialog.svelte";

    const getHelpDialog = () => {
        return document.getElementById("helpDialog") as HTMLDialogElement;
    };

    const showDialog = () => {
        const helpDialog = getHelpDialog();
        helpDialog?.showModal();
    };

    const hideDialog = () => {
        const helpDialog = getHelpDialog();
        helpDialog?.close();
    };
</script>

<header class="Header">
    <div class="Header__Left">
        <h1>Pura Tela</h1>
        <button class="Header__HelpBtn IconButton"
            onclick={showDialog}
        >
            <MaterialSymbolsLightHelpOutline/>
        </button>
        <BaseHelpDialog closeDialog={hideDialog}/>
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

    .Header__Left {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .Header__HelpBtn {
        border: none;
    }

    @media screen and (width < 600px) {
        h1 {
            font-size: 24px;
        }
    }
</style>