<script>
	import Nav from '../components/Nav.svelte';
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.container {
		max-width: 1200px;
		padding: 0 20px;
		box-sizing: border-box;
		margin: 0 auto;
	}
</style>

<Nav />
<main>
	<slot></slot>
</main>