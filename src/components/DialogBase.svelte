<script lang="ts">
    import type { Snippet } from "svelte";
    import MaterialSymbolsClose from "~icons/material-symbols/close";

    type DialogBaseProps = {
        shouldShowDialog: boolean;
        className?: string;
        children?: Snippet;
    };

    let {
        shouldShowDialog = $bindable(),
        className = "",
        children,
    }: DialogBaseProps = $props();

    let dialog: HTMLDialogElement | undefined = $state();

    $effect(() => {
        if (shouldShowDialog) dialog?.showModal();
    });

    export const closeDialog = () => {
        dialog?.close();
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Esc") {
            dialog?.close();
            event.preventDefault();
        }
    };
</script>

<!-- TODO: see if there is a better way to implement this -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    class={className}
    bind:this={dialog}
    onclose={() => {
        shouldShowDialog = false;
    }}
    onclick={(e) => {
        if (e.target === dialog) dialog.close();
    }}
    onkeydown={handleKeydown}
>
    <div class="MainDialogContent">
        <button
            class="DialogCloseBtn"
            aria-label="Close dialog"
            onclick={() => {
                dialog?.close();
            }}
        >
            <MaterialSymbolsClose />
        </button>
        {@render children?.()}
    </div>
</dialog>
