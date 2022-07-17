<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	import { variables } from '$lib/env';
	import {
		getAllItems,
		getAllItemsSingleParam,
		getAllItemsTwoParam,
		getAllItemsSorted,
		deleteItemById,
		toggleItemById
	} from '$lib/dao/ToDoItemsDao';
	import ToDoItemCard from '$lib/components/ToDoItemCard.svelte';
	import ToDoItemFormCompact from '$lib/components/ToDoItemFormCompact.svelte';
	import ToDoItemFormWide from '$lib/components/ToDoItemFormWide.svelte';
	import type { ToDoItem } from '$lib/models/ToDoItem';

	console.log('Using Server: ' + variables.SERVER_URL);

	// Available Attributes to sort / filter by:
	const attribs = ['createdAt', 'deadline'];

	let attrib = '';
	let params = '';

	// Set Default sorting order
	let sort = 'asc';

	let date = new Date();

	let start = new Date();
	let end = new Date();

	let compactView = true;

	let toDoItems: ToDoItem[] = [];

	// Reset Filters to default values
	function resetFilter() {
		attrib = '';
		params = '';
		sort = 'asc';
		compactView = true;
	}

	// Detes an Item, given its ID and redreshed the data
	async function deleteItem(id: string) {
		await deleteItemById(id);
		refreshData();
	}

	// Refreshes the data from the DB, while apply any active filters
	async function refreshData(): Promise<void> {
		console.log('Refreshing data...');

		if (attrib) {
			if (params) {
				switch (params) {
					case 'b':
						toDoItems = await getAllItemsSingleParam(attrib, 'before', date.getTime(), sort);
						break;
					case 'a':
						toDoItems = await getAllItemsSingleParam(attrib, 'after', date.getTime(), sort);
						break;
					case 'bw':
						toDoItems = await getAllItemsTwoParam(attrib, start.getTime(), end.getTime(), sort);
						break;
				}
			} else {
				toDoItems = await getAllItemsSorted(attrib, sort);
			}
		} else {
			toDoItems = await getAllItems();
		}
	}

	refreshData();
</script>

<div>
	<div class="w-full flex flex-col flex-wrap md:flex-row">
		<div class="m-2 p-2 flex-1 max-w-sm">
			<div class="md:w-1/3">
				<label
					class="block text-black text-lg font-bold md:text-center mb-1 md:mb-0 pr-4"
					for="inline-type"
				>
					Filter By
				</label>
			</div>
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
						for="inline-attribute"
					>
						Attributes
					</label>
				</div>
				<div class="md:w-2/3">
					<div class="flex items-center mb-1">
						<input
							id="attributes"
							type="radio"
							bind:group={attrib}
							value={''}
							name="attributes"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label for="attributes" class="ml-2 text-sm font-medium text-gray-900 ">None</label>
					</div>
					{#each attribs as atrib_vals}
						<div class="flex items-center mb-1">
							<input
								id="attributes"
								type="radio"
								bind:group={attrib}
								value={atrib_vals}
								name="attributes"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="attributes" class="ml-2 text-sm font-medium text-gray-900 "
								>{atrib_vals}</label
							>
						</div>
					{/each}
				</div>
			</div>
			{#if attrib}
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							for="inline-type"
						>
							Params
						</label>
					</div>
					<div class="md:w-2/3">
						<div class="flex items-center mb-1">
							<input
								id="params"
								type="radio"
								bind:group={params}
								value={''}
								name="params"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="params" class="ml-2 text-sm font-medium text-gray-900 ">None</label>
						</div>
						<div class="flex items-center mb-1">
							<input
								id="params"
								type="radio"
								bind:group={params}
								value={'bw'}
								name="params"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="params" class="ml-2 text-sm font-medium text-gray-900 "
								>Start and End</label
							>
						</div>
						<div class="flex items-center mb-1">
							<input
								id="params"
								type="radio"
								bind:group={params}
								value={'b'}
								name="params"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="params" class="ml-2 text-sm font-medium text-gray-900 ">Before</label>
						</div>
						<div class="flex items-center mb-1">
							<input
								id="params"
								type="radio"
								bind:group={params}
								value={'a'}
								name="params"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="params" class="ml-2 text-sm font-medium text-gray-900 ">After</label>
						</div>
						<!-- <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"> -->
					</div>
				</div>
			{/if}

			{#if attrib && (params == 'b' || params == 'a')}
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							for="inline-date"
						>
							Date
						</label>
					</div>
					<div class="md:w-2/3">
						<DateInput bind:value={date} />
					</div>
				</div>
			{/if}

			{#if attrib && params == 'bw'}
				<div class="md:flex md:items-center mb-2">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							for="inline-start-date"
						>
							Start
						</label>
					</div>
					<div class="md:w-2/3">
						<DateInput bind:value={start} />
					</div>
				</div>
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							for="inline-end-date"
						>
							End
						</label>
					</div>
					<div class="md:w-2/3">
						<DateInput bind:value={end} />
					</div>
				</div>
			{/if}

			{#if attrib}
				<div class="md:flex md:items-center mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							for="inline-sort"
						>
							Sort
						</label>
					</div>
					<div class="md:w-2/3">
						<div class="flex items-center mb-1">
							<input
								id="sort-by"
								type="radio"
								bind:group={sort}
								value={'asc'}
								name="sort-by"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="sort-by" class="ml-2 text-sm font-medium text-gray-900 ">Ascending</label>
						</div>
						<div class="flex items-center mb-1">
							<input
								id="sort-by"
								type="radio"
								bind:group={sort}
								value={'desc'}
								name="sort-by"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label for="sort-by" class="ml-2 text-sm font-medium text-gray-900 ">Descending</label
							>
						</div>
					</div>
				</div>
			{/if}

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
						for="inline-view"
					>
						View
					</label>
				</div>
				<div class="md:w-2/3">
					<div class="flex items-center mb-1">
						<input
							id="view"
							type="radio"
							bind:group={compactView}
							value={false}
							name="view"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label for="view" class="ml-2 text-sm font-medium text-gray-900 ">Relaxed</label>
					</div>
					<div class="flex items-center mb-1">
						<input
							id="view"
							type="radio"
							bind:group={compactView}
							value={true}
							name="sview"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label for="viewy" class="ml-2 text-sm font-medium text-gray-900 ">Compact</label>
					</div>
				</div>
			</div>

			<div class="md:flex md:items-center">
				<div class="md:w-1/3" />
				<div class="md:w-2/3">
					<button
						on:click={refreshData}
						class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
						type="button"
					>
						Filter
					</button>
					<button
						on:click={resetFilter}
						class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
						type="button"
					>
						Reset
					</button>
				</div>
			</div>
		</div>

		{#if !compactView}
			<div class="m-2 p-2 flex-1 max-w-4xl">
				<div class="md:flex md:items-center mb-6 flex-col">
					<div class="pl-2 flex flex-col md:flex-row flex-wrap">
						<ToDoItemFormCompact callback={refreshData} />
						{#each toDoItems as item, index}
							<ToDoItemCard bind:data={item} />
							{#if index % 3 == 0}
								<div class="break" />
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/if}

		{#if compactView}
			<div class="w-2/3">
				<ToDoItemFormWide callback={refreshData} />
				<!-- <div class="m-2 p-2 flex-1 max-w-sm"> -->
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="p-4">
									<div class="flex items-center">
										<input
											id="checkbox-all"
											type="checkbox"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label for="checkbox-all" class="sr-only">checkbox</label>
									</div>
								</th>
								<th scope="col" class="px-6 py-3"> Title </th>
								<th scope="col" class="px-6 py-3"> Created At </th>
								<th scope="col" class="px-6 py-3"> Deadline </th>
								<th scope="col" class="px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
								<th scope="col" class="px-6 py-3">
									<span class="sr-only">Delete</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{#each toDoItems as item, index}
								<tr
									class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<td class="w-4 p-4">
										<div class="flex items-center">
											<input
												bind:checked={item.completed}
												on:change={ () => toggleItemById(item._id, item.completed)}
												type="checkbox"
												class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											/>
										</div>
									</td>
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
									>
										{item.title}
									</th>
									<td class="px-6 py-4">
										{new Date(item.createdAt).toLocaleString()}
									</td>
									<td class="px-6 py-4">
										{item.deadline ? new Date(item.deadline).toLocaleString() : ''}
									</td>

									<td class="px-6 py-4 text-right">
										<a
											href="/{item._id}"
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a
										>
									</td>
									<td class="px-6 py-4 text-right">
										<span
											on:click={() => deleteItem(item._id)}
											class="font-medium text-red-600 dark:text-red-500 hover:underline"
											>Delete</span
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.break {
		flex-basis: 100%;
		height: 0;
	}
</style>
