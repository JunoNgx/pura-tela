<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import MaterialSymbolsLightViewSidebarOutlineSharp from "~icons/material-symbols-light/view-sidebar-outline-sharp";
    import MaterialSymbolsLightClose from '~icons/material-symbols-light/close';

    import NavItem from "src/components/NavItem.svelte";
	import BaseThemeModeContainer from "./BaseThemeModeContainer.svelte";
	import AppLogo from "./AppLogo.svelte";

    let isExpanded = $state(false);

    const openSidebar = () => {
        isExpanded = true;
    };

    const closeSidebar = () => {
        isExpanded = false;
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            closeSidebar();
            event.preventDefault();
        }
    };

    afterNavigate(({ to }) => {
        isExpanded = false;
    })
</script>

<div class="Nav"
    class:Nav--IsExpanded={isExpanded}
>
    <div class="Nav__OverlayBg"
        role="button"
        aria-label="Close sidebar"
        tabindex="0"
        onkeydown={handleKeydown}
        onclick={closeSidebar}
    ></div>
    <button class="Nav__OpenSidebarBtn IconButton"
        aria-label="Open navigation sidebar"
        onclick={openSidebar}
    >
        <MaterialSymbolsLightViewSidebarOutlineSharp/>
    </button>

    <nav class="Nav__Content Card">
        <AppLogo/>

        <hr class="Nav__Separator">

        <div class="Nav__Router">
            <span class="Nav__CategoryTitle">Generate</span>
            <NavItem route={"/"} label={"wallpaper"} />
            <NavItem route={"/generate"} label={"palette"} />
            <span class="Nav__CategoryTitle">Gallery</span>
            <NavItem route={"/colours"} label={"colours"} />
            <NavItem route={"/palettes"} label={"palettes"} />
            <NavItem route={"/sizes"} label={"sizes"} />
            <span class="Nav__CategoryTitle">Info</span>
            <NavItem route={"/help"} label={"help"} />
            <NavItem route={"/about"} label={"about"} />
        </div>

        <hr class="Nav__Separator">

        <div class="Nav__ThemeModeSettings">
            <BaseThemeModeContainer/>
        </div>

        <button class="Nav__CloseSidebarBtn IconButton"
            aria-label="Close navigation sidebar"
            onclick={closeSidebar}
        >
            <MaterialSymbolsLightClose/>
        </button>
    </nav>
</div>

<style>
    .Nav {
        position: sticky;
        top: 1rem;
        z-index: 50;
    }

    .Nav__Content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
    }

    .Nav__OpenSidebarBtn,
    .Nav__CloseSidebarBtn {
        display: none;
    }

    .Nav__Separator {
        /* flex-grow: 1; */
        width: 100%;
        margin: 0 0 1rem;
    }

    .Nav__Router {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        width: 8rem;
    }

    .Nav__CategoryTitle {
        color: var(--colSec);
        text-transform: uppercase;
        align-self: flex-start;
        margin-top: 1rem;
    }

    @media screen and (width < 850px) {
        .Nav {
            position: fixed;
            top: 0;
            overflow: visible;
        }

        .Nav__OverlayBg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100dvh;
            background-color: var(--colPri);
            background-color: rgba(var(--colBlackRgb) 0.5);
            backdrop-filter: blur(10px);
            opacity: 0;
            visibility: hidden;
            transition: all ease-in-out var(--transTimeFast);
        }


        .Nav__OpenSidebarBtn {
            display: block;
            position: fixed;
            bottom: 1.5rem;
            left: 1.5rem;
            background-color: var(--colBrand1);
            width: 3rem;
            height: 3rem;
            font-size: 32px;
        }

        .Nav__OpenSidebarBtn:hover {
            background-color: var(--colBrand1);
        }

        .Nav__CloseSidebarBtn {
            display: block;
            position: absolute;
            bottom: 1rem;
            right: 1rem;
        }

        .Nav__Content {
            position: fixed;
            box-sizing: border-box;
            top: 0;
            left: -100%;
            height: 100dvh;
            min-width: 60vw;
            padding-top: 3rem;
            padding-bottom: 0;
            border-right: 1px solid var(--colPri);
            transition: left ease-in-out var(--transTimeFast);
        }

        .Nav--IsExpanded {
            .Nav__Content {
                left: 0;
            }

            .Nav__OverlayBg {
                opacity: 1;
                visibility: visible;
            }
        }
    }
</style>