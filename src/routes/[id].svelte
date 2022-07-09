<script context="module">
	export async function load({ params }) {
		const id = params.id;
		const item = await getItemById(id);

		return {
			props: {
				item
			}
		};
	}
</script>

<script lang="ts">
	import { getItemById } from '$lib/dao/ToDoItemsDao';
	import { DatePicker } from 'date-picker-svelte';
	import type { ToDoItem } from '$lib/models/ToDoItem';
	import ToDoItemCard from '$lib/components/ToDoItemCard.svelte';
	import { updateItemById } from '$lib/dao/ToDoItemsDao';

	export let item: ToDoItem;

	let title: string =  item ? item.title : '';
	let deadline: Date | null = item && item.deadline ? new Date(item.deadline) : null;

	function handleSubmit() {
		updateItemById(item._id, {
			title,
			deadline: deadline ? deadline.getTime() : null
		});
		location.reload();
	}
</script>

{#if item}
	<div class="mb-4">
		<span class="font-bold ">Current Item:</span>
		<ToDoItemCard bind:data={item} />
	</div>

	<div>
		<span class="font-bold">Updated Item:</span>

		<div class="flex-auto p-4 shadow-lg">
			<form>
				<!-- <span class="text-lg font-mono pt-2 font-medium">{title}</span> -->

				<ul class="pl-4">
					<div>
						<label
							class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
							for="inline-title"
						>
							Title
						</label>
						<input
							bind:value={title}
							class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Title"
						/>
					</div>
					<div>
						<label
							class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
							for="inline-title"
						>
							Deadline
						</label>
						<span class="w-full text-sm"><DatePicker bind:value={deadline} /></span>
					</div>
				</ul>
				<div class="text-right">
					<button
						type="button"
						on:click={handleSubmit}
						class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
					>
						<svg
							class="fill-current w-4 h-4 text-lime-800 mr-2 text-base"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							id="Capa_1"
							x="0px"
							y="0px"
							viewBox="0 0 221 221"
							style="enable-background:new 0 0 221 221;"
							xml:space="preserve"
						>
							<g>
								<rect x="108" width="35" height="35" />
								<path d="M154,0v46H67V0H10v221h201V0H154z M171,188H49v-43h122V188z" />
							</g></svg
						>
						Update
					</button>
				</div>
			</form>
		</div>
	</div>
{:else}
	404 No Such Item
{/if}
