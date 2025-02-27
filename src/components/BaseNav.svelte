<script lang="ts">
	import NavItem from "src/components/NavItem.svelte";
	import BaseThemeModeContainer from "./BaseThemeModeContainer.svelte";
</script>

<div class="Nav">
    <div class="Nav__OverlayBg"></div>
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
            /* position: absolute;
            top: 0;
            height: 100dvh; */
            /* left: -100%; */
            /* width: 75vh; */
            /* margin-top: 1rem; */
        }
    }
</style>