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
        <div class="Header__LogoContainer">
            <img class="Header__LogoIcon"
                src="/logo-vector.svg"
                alt="Pura Tela logo"
            />
            <h1 class="Header__LogoText">Pura Tela</h1>
        </div>
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
        width: calc(100% + 3rem);
        padding: 1rem;
        background-color: red;
        color: var(--colBg);
        background-color: var(--colPri);
    }

    .Header__Left {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
    }

    .Header__LogoContainer {
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        align-items: center;
    }

    .Header__LogoIcon {
        width: 2rem;
        height: 2rem;   
    }

    .Header__LogoText {
        font-size: var(--fontSizeXl);
    }

    .Header__HelpBtn,
    .Header__HelpBtn:hover {
        border: none;
        background-color: none;
        color: var(--colBg);
    }

    @media screen and (width < 850px) {
        .Header {
            width: calc(100% + 1rem);
            padding: 0.5rem;
        }

        .Header__Left {
            gap: 0.5rem;
        }

        .Header__LogoIcon {
            width: 1.5rem;
            height: 1.5rem;   
        }

        .Header__LogoText {
            font-size: var(--fontSizeLg);
        }

        .Header__HelpBtn {
            transition: none;
        }
    }
</style>