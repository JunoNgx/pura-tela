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
        margin-top: 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    @media screen and (width < 500px) {
        nav {
            margin-top: 1rem;
        }
    }
</style>