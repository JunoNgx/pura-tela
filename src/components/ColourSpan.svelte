<script lang="ts">
    type ColourSpanProps = {
        colour: string;
    };

    let { colour }: ColourSpanProps = $props();
</script>

<span class="ColourSpan">
    <div class="ColourSpan__Block" style={`background-color: #${colour}`}></div>
    <span class="ColourSpan__HexCode">#{colour}</span>
</span>

<style>
    .ColourSpan {
        display: inline-flex;
        flex-direction: row;
        justify-content: baseline;
        align-items: baseline;
        gap: 0.5rem;
        vertical-align: baseline;
        margin-left: 0.25rem;
    }

    .ColourSpan__Block {
        display: inline-block;
        width: 1rem;
        height: 1rem;
    }

    .ColourSpan__HexCode {
        font-family: var(--fontFamilyMono);
        display: inline-block;
    }
</style>
