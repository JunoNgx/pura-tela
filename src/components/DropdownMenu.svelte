<script lang="ts">
    import MaterialSymbolsLightKeyboardArrowDown from "~icons/material-symbols-light/keyboard-arrow-down";

	import { onDestroy, onMount, type Component } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

    type ActionItem = {
        id: string,
        label: string,
        action: () => void,
        icon?: Component<SVGAttributes<SVGSVGElement>>,
    }

    type DropdownProps = {
        actionItems: ActionItem[],
    }

    let { actionItems }: DropdownProps = $props();
    let isOpen = $state(false);

    const toggleDropdown = () => {
        isOpen = !isOpen;
    }

    const executeAction = (actionItem: ActionItem) => {
        actionItem.action();
    };

    const handleClickOutside = (event: MouseEvent) => {
        const isClickedOutside = !event.composedPath().includes(
            document.querySelector(".Dropdown") as EventTarget);
        if (isOpen && isClickedOutside) {
            isOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener("click", handleClickOutside);
    })

</script>

<div class="Dropdown">
    <button class="Dropdown__ToggleBtn IconButton"
        aria-label="Toggle the dropdown"
        onclick={toggleDropdown}
    >
        <MaterialSymbolsLightKeyboardArrowDown/>
    </button>
    {#if isOpen}
        <ul class="Dropdown__Menu">
            {#each actionItems as actionItem (actionItem.id)}
                <button
                    class="Dropdown__Item"
                    role={"listitem"}
                    onclick={() => executeAction(actionItem)}
                >
                    <span class="Dropdown__ItemIcon"><actionItem.icon/></span>
                    <span class="Dropdown__ItemLabel">{actionItem.label}</span>
                </button>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .Dropdown {
        position: relative;
        display: inline-block;
    }
    
    .Dropdown__ToggleBtn {
        border: 1px solid var(--colPri);
    }

    .Dropdown__ToggleBtn:hover {
        color: var(--colBg);
        background-color: var(--colPri);
    }
    
    .Dropdown__Menu {
        position: absolute;
        top: 100%;
        right: 0;
        margin: 0.5rem 0 0;
        padding: 0;
        background-color: var(--colBg);
        border: 1px solid var(--colPri);
        list-style: none;
        min-width: 10rem;
        z-index: 1000;
    }
    
    .Dropdown__Item {
        display: flex;
        align-items: center;
        gap: 1rem;
        border: none;
        width: 100%;
        white-space: nowrap;
    }

    .Dropdown__ItemIcon {
        display: grid;
        place-items: center;
    }
</style>