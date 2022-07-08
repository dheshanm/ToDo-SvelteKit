<script lang="ts">
    import "../app.css";
    import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/nav.svelte';

	const app_name = 'To-Do List Management';
</script>

<svelte:head>
	<title>{app_name}</title>
</svelte:head>

<Nav />

<div class="m-8 p-8">
	<slot />
</div>

<Footer />
