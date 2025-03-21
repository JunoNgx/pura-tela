<script lang="ts">
    // import BaseHeader from "src/components/BaseHeader.svelte";
    import BaseNav from "src/components/BaseNav.svelte";
    import BaseFooter from "src/components/BaseFooter.svelte";
	import AppLogo from "src/components/AppLogo.svelte";

    import "src/styles/global.css";
	import { handleThemeModeChange } from "src/lib/nightMode.js";

    let { children } = $props();

    handleThemeModeChange();
</script>

<main class="OuterWrapper">
    <div class="InnerWrapper">
        <BaseNav/>
        <div class="MainContent Card">
            <!-- <BaseHeader/> -->
                <div class="MobileLogoWrapper">
                    <AppLogo isMono={false}/>
                </div>
                {@render children()}
        </div>
    </div>
</main>
    
<BaseFooter/>
<style>
    @import "src/styles/vars.css";

    .OuterWrapper {
        min-height: 85dvh;
        max-width: 1200px;
        margin: auto;
    }

    .InnerWrapper {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    .MainContent {
        flex-grow: 1;
        /* This one means "Don't use any more space than available". Sly. */
        min-width: 0;
    }

    .MobileLogoWrapper {
        display: none;
    }

    @media screen and (width < 850px) {
        .OuterWrapper {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .InnerWrapper {
            margin: 0;
        }

        .MainContent {
            max-width: calc(100% - 2* var(--outerPaddingMobile));
        }

        .MobileLogoWrapper {
            display: flex;
            justify-content: center;
            margin: 0.5rem 0 3rem;
        }
    }
</style>