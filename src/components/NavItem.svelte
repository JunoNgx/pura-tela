<script lang="ts">
    import { page } from '$app/state';

    const { route, label } = $props();
</script>

<a class="NavItem"
    class:NavItem--IsActive={ route === page.url.pathname }
    href={route}
>
    {label}
</a>

<style>
    .NavItem {
        flex-grow: 10;
        display: block;
        text-align: center;
        padding: 0.75rem;
        padding-top: 1rem;
        border-bottom: 0.25rem solid transparent;
    }

    .NavItem {
        text-decoration: none;
        transition: border ease-in-out var(--transTime);
    }

    .NavItem:hover,
    .NavItem--IsActive {
        border-bottom-color: var(--colPri);
    }

</style>