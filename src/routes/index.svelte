<script lang="ts">
    import { DateInput } from 'date-picker-svelte'
    import { getAllItems } from '$lib/dao/ToDoItemsDao'
    import ToDoItemCard from '$lib/components/ToDoItemCard.svelte';
    import type { ToDoItem } from '$lib/models/ToDoItem';

    const attribs = ['createdAt', 'deadline'];
    let attrib: String = '';
    let params: String = '';

    let sort: String = 'asc';

    let date = new Date();

    let start = new Date();
    let end = new Date();

    let toDoItems: ToDoItem[] = [];

    getAllItems().then(items => {
        toDoItems = items;
    })
</script>

<div>
    <form class="w-full flex flex-col flex-wrap md:flex-row">
        <div class="m-2 p-2 flex-1 max-w-sm">
            <div class="md:w-1/3">
                <label class="block text-black text-lg font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-type">
                  Filter By
                </label>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-attribute">
                    Attributes
                  </label>
                </div>
                <div class="md:w-2/3">
                    <div class="flex items-center mb-1">
                        <input id="attributes" type="radio" bind:group={attrib} value={''} name="attributes" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="attributes" class="ml-2 text-sm font-medium text-gray-900 ">None</label>
                    </div>
                    {#each attribs as atrib_vals}
                        <div class="flex items-center mb-1">
                            <input id="attributes" type="radio" bind:group={attrib} value={atrib_vals} name="attributes" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="attributes" class="ml-2 text-sm font-medium text-gray-900 ">{atrib_vals}</label>
                        </div>
                    {/each}
                </div>
            </div>
            {#if attrib}
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-type">
                    Params
                  </label>
                </div>
                <div class="md:w-2/3">
                    <div class="flex items-center mb-1">
                        <input id="params" type="radio" bind:group={params} value={''} name="params" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="params" class="ml-2 text-sm font-medium text-gray-900 ">None</label>
                    </div>
                    <div class="flex items-center mb-1">
                        <input id="params" type="radio" bind:group={params} value={"bw"} name="params" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="params" class="ml-2 text-sm font-medium text-gray-900 ">Start and End</label>
                    </div>
                    <div class="flex items-center mb-1">
                        <input id="params" type="radio" bind:group={params} value={"b"} name="params" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="params" class="ml-2 text-sm font-medium text-gray-900 ">Before</label>
                    </div>
                    <div class="flex items-center mb-1">
                        <input id="params" type="radio" bind:group={params} value={"a"} name="params" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="params" class="ml-2 text-sm font-medium text-gray-900 ">After</label>
                    </div>
                  <!-- <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"> -->
                </div>
            </div>
            {/if}

            {#if params == "b" || params == "a"}
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-date">
                      Date
                    </label>
                </div>
                <div class="md:w-2/3">
                    <DateInput bind:value={date} />
                </div>
            </div>
            {/if}

            {#if params == "bw"}
            <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-start-date">
                      Start
                    </label>
                </div>
                <div class="md:w-2/3">
                    <DateInput bind:value={start} />
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-end-date">
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
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-sort">
                    Sort
                  </label>
                </div>
                <div class="md:w-2/3">
                    <div class="flex items-center mb-1">
                        <input id="sort-by" type="radio" bind:group={sort} value={"asc"} name="sort-by" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="sort-by" class="ml-2 text-sm font-medium text-gray-900 ">Ascending</label>
                    </div>
                    <div class="flex items-center mb-1">
                        <input id="sort-by" type="radio" bind:group={sort} value={"desc"} name="sort-by" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="sort-by" class="ml-2 text-sm font-medium text-gray-900 ">Descending</label>
                    </div>
                </div>
            </div>
            {/if}

            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Filter
                  </button>
                </div>
            </div>
        </div>

        <div class="m-2 p-2 flex-1 max-w-4xl">
            <div class="md:flex md:items-center mb-6 flex-col">
                <div class="pl-2 flex flex-col md:flex-row">
                {#each toDoItems as item, index}
                    <ToDoItemCard bind:data={item} />
                {/each}
                </div>
            </div>
        </div>
      </form>
</div>