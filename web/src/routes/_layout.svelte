<script>
	import Nav from '../components/Nav.svelte';
</script>

<style>
	main {
		position: relative;
		max-width: 1100px;
		padding: 20px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav />
<main>
	<slot></slot>
</main>