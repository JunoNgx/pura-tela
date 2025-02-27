<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import MaterialSymbolsLightViewSidebarOutlineSharp from "~icons/material-symbols-light/view-sidebar-outline-sharp";
    import NavItem from "src/components/NavItem.svelte";
	import BaseThemeModeContainer from "./BaseThemeModeContainer.svelte";

    let isExpanded = $state(false);

    const toggleSidebar = () => {
        isExpanded = !isExpanded;
    };

    afterNavigate(({ to }) => {
        isExpanded = false;
    })
</script>

<div class="Nav"
    class:Nav--IsExpanded={isExpanded}
>
    <div class="Nav__OverlayBg"
        role="region"
        onclick={() => isExpanded = false}
    ></div>
    <div class="Nav__SwitchContainer">
        <button class="IconButton"
            onclick={toggleSidebar}
        >
            <MaterialSymbolsLightViewSidebarOutlineSharp/>
        </button>
    </div>

    <nav class="Nav__Content Card">
        <div class="Nav__LogoContainer">
            <img class="Nav__LogoIcon"
                src="/logo-vector.svg"
                alt="Pura Tela logo"
            />
            <h1 class="Nav__LogoText">Pura Tela</h1>
        </div>

        <div class="Nav__Router">
            <NavItem route={"/"} label={"Studio"} />
            <NavItem route={"/gallery"} label={"Gallery"} />
            <NavItem route={"/sizes"} label={"Sizes"} />
        </div>

        <div class="Nav__ThemeModeSettings">
            <BaseThemeModeContainer/>
        </div>
    </nav>
</div>

<style>
    .Nav {
        position: sticky;
        top: 1rem;
        z-index: 20;
    }

    .Nav__Content {
        display: flex;
        flex-direction: column;
        /* justify-content: flex-end; */
        /* align-items: flex-end; */
        gap: 2rem;
    }

    .Nav__OverlayBg {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background-color: var(--colPri);
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
    }

    .Nav__SwitchContainer {
        display: none;
        position: absolute;
        bottom: 1.5rem;
        left: 1.5rem;
        padding: 0.5rem;
        background-color: var(--colBrand1);
    }

    .Nav__LogoContainer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        align-items: center;
        border-bottom: 1px solid var(--colPri);
        padding-bottom: 1rem;
    }

    .Nav__LogoIcon {
        width: 2rem;
        height: 2rem;   
    }

    .Nav__LogoText {
        white-space: nowrap;
        font-size: var(--fontSizeXl);
    }

    .Nav__Router {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-left: 0.5rem;
    }

    .Nav__ThemeModeSettings {
        border-top: 1px solid var(--colPri);
        padding-top: 1rem;
    }

    @media screen and (width < 850px) {
        .Nav {
            position: static;
        }

        .Nav__Content {
            position: absolute;
            top: 0;
            left: -100%;
            height: 100dvh;
            /* left: -100%; */
            /* width: 75vh; */
            /* margin-top: 1rem; */
        }

        .Nav--IsExpanded {
            .Nav__Content {
                left: 0;
            }

            .Nav__OverlayBg {
                display: block;
            }
        }

        .Nav__SwitchContainer {
            display: block;
        }
    }
</style>