<script lang="ts">
    import MaterialSymbolsLightKeyboardArrowDown from "~icons/material-symbols-light/keyboard-arrow-down";

	import { type Component } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

    type ActionItem = {
        id: string,
        label: string,
        tooltip?: string,
        action: () => void,
        icon?: Component<SVGAttributes<SVGSVGElement>>,
    }

    type DropdownProps = {
        actionItems: ActionItem[],
        isSplitBtnPart?: boolean,
    };
    type DropdownPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";

    let { actionItems, isSplitBtnPart }: DropdownProps = $props();
    let isOpen = $state(false);
    let buttonEl: HTMLButtonElement;
    let menuEl: HTMLUListElement;
    const defaultPosition: DropdownPosition = "bottom-left";
    let position: DropdownPosition = $state(defaultPosition);

    const toggleDropdown = () => {
        isOpen = !isOpen;
    }

    const executeAction = (actionItem: ActionItem) => {
        isOpen = false;
        setTimeout(() => {
            actionItem.action();
        })
    };

    const handleClickOutside = (event: MouseEvent) => {
        const isClickedOutside = !event.composedPath().includes(
            document.querySelector(".Dropdown") as EventTarget);
        if (isOpen && isClickedOutside) {
            isOpen = false;
        }
    }

    const tryAdjustPosition = () => {
        if (!buttonEl || !menuEl) return;

        const buttonRect = buttonEl.getBoundingClientRect();
        const menuRect = menuEl.getBoundingClientRect();

        const spaceBelow = window.innerHeight - buttonRect.bottom;
        // const spaceAbove = buttonRect.top;
        const spaceLeft = buttonRect.left;
        // const spaceRight = window.innerWidth - buttonRect.right;

        const menuHeight = menuRect.height;
        const menuWidth = menuRect.width;

        const isSpaceBottomSufficient = spaceBelow >= menuHeight;
        const isSpaceLeftSufficient = spaceLeft >= menuWidth;

        if (isSpaceBottomSufficient && isSpaceLeftSufficient) {
            position = "bottom-left";
            return;
        }

        if (isSpaceBottomSufficient && !isSpaceLeftSufficient) {
            position = "bottom-right";
            return;
        }

        if (!isSpaceBottomSufficient && isSpaceLeftSufficient) {
            position = "top-left";
            return;
        }

        if (!isSpaceBottomSufficient && !isSpaceLeftSufficient) {
            position = "top-right";
            return;
        }
    };

    $effect(() => {
        if (isOpen) {
            tryAdjustPosition();
            document.addEventListener("click", handleClickOutside);
            window.addEventListener("resize", tryAdjustPosition);
            window.addEventListener("scroll", tryAdjustPosition, true);

            return (() => {
                document.removeEventListener("click", handleClickOutside);
                window.removeEventListener("resize", tryAdjustPosition);
                window.removeEventListener("scroll", tryAdjustPosition, true);
            });
        }
    });

</script>

<div class="Dropdown"
    class:SplitBtn__Sec={isSplitBtnPart}
    class:Dropdown--TopLeft={position === "top-left"}
    class:Dropdown--TopRight={position === "top-right"}
    class:Dropdown--BottomLeft={position === "bottom-left"}
    class:Dropdown--BottomRight={position === "bottom-right"}
>
    <button class="Dropdown__ToggleBtn IconButton"
        class:SplitBtn__SecBtn={isSplitBtnPart}
        bind:this={buttonEl}
        aria-label="Toggle the dropdown"
        onclick={toggleDropdown}
    >
        <MaterialSymbolsLightKeyboardArrowDown/>
    </button>
    {#if isOpen}
        <ul class="Dropdown__Menu"
            bind:this={menuEl}
        >
            {#each actionItems as actionItem (actionItem.id)}
                <button
                    class="Dropdown__Item"
                    role={"listitem"}
                    title={actionItem.tooltip}
                    aria-label={actionItem.tooltip}
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
        /* top: 100%;
        right: 0; */
        margin: 0.5rem 0;
        padding: 0;
        background-color: var(--colBg);
        border: 1px solid var(--colPri);
        list-style: none;
        min-width: 10rem;
        z-index: 1000;
    }

    .Dropdown--TopLeft .Dropdown__Menu {
        bottom: 100%;
        right: 0;
    }

    .Dropdown--TopRight .Dropdown__Menu {
        bottom: 100%;
        left: 0;
    }

    .Dropdown--BottomLeft .Dropdown__Menu {
        top: 100%;
        right: 0;
    }

    .Dropdown--BottomRight .Dropdown__Menu {
        top: 100%;
        left: 0;
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