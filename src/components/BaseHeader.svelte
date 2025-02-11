<script lang="ts">
    import MaterialSymbolsLightHelp from "~icons/material-symbols-light/help";
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
        <h1>PuraTela</h1>
        <button class="Header__HelpBtn IconButton"
            onclick={showDialog}
        >
            <div class="IconButton__RegularIcon">
                <MaterialSymbolsLightHelpOutline/>
            </div>
            <div class="IconButton__HoverIcon">
                <MaterialSymbolsLightHelp/>
            </div>
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
        gap: 0.5rem;
        width: 100%;
    }

    .Header__Left {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
    }

    h1 {
        font-size: var(--fontSizeXl);
    }

    .Header__HelpBtn {
        border: none;
    }

    @media screen and (width < 600px) {
        .Header__Left {
            gap: 0.5rem;
        }

        .Header__HelpBtn {
            transition: none;
        }

        .Header__HelpBtn:hover {
            color: var(--colPri);
            background-color: var(--colBg);
        }
    }
</style>