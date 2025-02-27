<script lang="ts">
	import NavItem from "src/components/NavItem.svelte";
</script>

<nav class="Nav Card">
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
</nav>

<style>
    .Nav {
        /* margin-top: 1.5rem; */
        /* width: 100%; */
        display: flex;
        flex-direction: column;
        /* justify-content: flex-end; */
        /* align-items: flex-end; */
    }

    .Nav__LogoContainer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        align-items: center;
    }

    .Nav__LogoIcon {
        width: 2rem;
        height: 2rem;   
    }

    .Nav__LogoText {
        white-space: nowrap;
        font-size: var(--fontSizeXl);
    }

    @media screen and (width < 600px) {
        .Nav {
            margin-top: 1rem;
        }
    }
</style>