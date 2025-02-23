<script lang="ts">
	import NavItem from "src/components/NavItem.svelte";
</script>

<nav>
    <NavItem route={"/"} label={"Studio"} />
    <NavItem route={"/gallery"} label={"Gallery"} />
    <NavItem route={"/sizes"} label={"Sizes"} />
</nav>

<style>
    nav {
        margin-top: 6rem;
        /* width: 100%; */
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }

    @media screen and (width < 600px) {
        nav {
            margin-top: 1rem;
        }
    }
</style>