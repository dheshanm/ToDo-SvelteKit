<script lang="ts">
	import type { ToDoItem } from '$lib/models/ToDoItem';
	import { deleteItemById, toggleItemById } from '$lib/dao/ToDoItemsDao';
	import { goto } from '$app/navigation';

	function routeToPage(route: string, replaceState: boolean) {
		goto(`/${route}`, { replaceState });
	}

	function routeToDetails() {
		routeToPage(`${data._id}`, false);
	}

	export let data: ToDoItem;
	let nodeRef: Node;

	let prevStatus = data.completed;

	function handleDelete() {
		deleteItemById(data._id);
		nodeRef.parentNode ? nodeRef.parentNode.removeChild(nodeRef) : null;
	}

	$: if (prevStatus != data.completed) {
		toggleItemById(data._id, data.completed);
		prevStatus = data.completed;
	}
</script>

<div class="flex-auto p-4 shadow-lg" bind:this={nodeRef}>
	<input bind:checked={data.completed} type="checkbox" />
	<span on:click={routeToDetails} class="text-lg font-mono pt-2 font-medium">{data.title}</span>
	<ul on:click={routeToDetails} class="pl-4">
		<li>
			Created: <span class="text-lime-600 pr-4">{new Date(data.createdAt).toDateString()}</span>
		</li>
		{#if data.deadline}
			<li>Deadline: <span class="text-red-600">{new Date(data.deadline).toDateString()}</span></li>
		{/if}
	</ul>
	<div class="text-right">
		<button
			on:click={handleDelete}
			class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
		>
			<svg
				class="fill-current w-4 h-4 text-red-800"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				id="Layer_1"
				x="0px"
				y="0px"
				viewBox="0 0 330 330"
				style="enable-background:new 0 0 330 330;"
				xml:space="preserve"
			>
				<g id="XMLID_6_">
					<g id="XMLID_11_">
						<path
							d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105    C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75    S266.355,300,225,300z"
						/>
					</g>
					<g id="XMLID_18_">
						<path
							d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45    H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"
						/>
					</g>
					<g id="XMLID_23_">
						<path
							d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0    c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213    c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606    c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225    l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"
						/>
					</g>
				</g>
			</svg></button
		>
	</div>
</div>
