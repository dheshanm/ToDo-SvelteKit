<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	import { createItem } from '$lib/dao/ToDoItemsDao';

	let title: string;
	let deadline: Date | null;
	let nodeRef;

	export let callback: () => void;

	function handleSubmit() {
		// nodeRef.parentNode.removeChild(nodeRef)
		if (title) {
			createItem({
				title: title,
				deadline: deadline ? deadline.getTime() : null
			}).then(() => {
				title = '';
				deadline = null;
				callback();
			});
		}
	}
</script>

<div class="flex-auto p-4 shadow-lg" bind:this={nodeRef}>
	<form>
		<ul class="pl-4">
			<input
				bind:value={title}
				class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="username"
				type="text"
				placeholder="Title"
			/>
			<span class="w-full text-sm"><DateInput bind:value={deadline} placeholder="deadline" /></span>
		</ul>
		<div class="text-right">
			<button
				type="button"
				on:click={handleSubmit}
				class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
			>
				<svg
					class="fill-current w-4 h-4 text-lime-800"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					id="Capa_1"
					x="0px"
					y="0px"
					viewBox="0 0 489.8 489.8"
					style="enable-background:new 0 0 489.8 489.8;"
					xml:space="preserve"
				>
					<g>
						<g>
							<path
								d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"
							/>
							<path
								d="M337.4,232.7h-80.3v-80.3c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v80.3h-80.3c-6.8,0-12.3,5.5-12.3,12.2    c0,6.8,5.5,12.3,12.3,12.3h80.3v80.3c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-80.3h80.3c6.8,0,12.3-5.5,12.3-12.3    C349.7,238.1,344.2,232.7,337.4,232.7z"
							/>
						</g>
					</g></svg
				>
			</button>
		</div>
	</form>
</div>
