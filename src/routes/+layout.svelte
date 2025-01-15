<script lang="ts">
    let { children } = $props();
</script>

<nav>
    <a href="/">Studio</a>
    <a href="/gallery">Gallery</a>
    <a href="/sizes">Sizes</a>
</nav>

{@render children()}

<footer>Made by Juno Nguyen</footer>