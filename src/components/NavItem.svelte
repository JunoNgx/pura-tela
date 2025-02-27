<script lang="ts">
    import { page } from '$app/state';

    const { route, label } = $props();
</script>

<a class="NavItem"
    class:NavItem--IsActive={ route === page.url.pathname }
    href={route}
>
    <div class="NavItem__Background"></div>
    <span class="NavItem__Text">
        {label}
    </span>
</a>

<style>
    .NavItem {
        position: relative;
        display: block;
        max-width: fit-content;
        text-decoration: none;
        /* font-size: var(--fontSizeLg); */
        transition: margin ease-in-out var(--transTimeFast);
    }

    .NavItem__Background {
        position: absolute;
        height: 100%;
        width: 0;
        background-color: var(--colPri);
        transition: width ease-in-out var(--transTimeFast);
    }

    .NavItem__Text {
        display: block;
        padding: 0.25rem 0;
        position: relative;
        transition: color ease-in-out var(--transTimeFast),
            padding ease-in-out var(--transTimeFast);
    }

    .NavItem:hover,
    .NavItem--IsActive {
        .NavItem__Text {
            padding: 0.25rem;
            color: var(--colBg);
        }

        .NavItem__Background {
            width: 100%;
        }
        /* border-bottom-color: var(--colPri); */
    }

    .NavItem--IsActive {
        margin-left: 1rem;
    }

</style>