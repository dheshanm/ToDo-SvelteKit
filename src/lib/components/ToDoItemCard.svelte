<script lang="ts">
    import type { ToDoItem } from "$lib/models/ToDoItem";

    export let data: ToDoItem;
</script>

<div class="flex-auto p-4 shadow-lg">
    <input bind:checked={data.completed} type="checkbox">
    <span class="text-lg font-mono pt-2 font-medium">{data.title}</span>
    <ul class="pl-4">
        Created: <span class="text-lime-600 pr-4" class:checked={data.completed}>{new Date(data.createdAt).toDateString()}</span>
        Deadline: <span class="text-red-600" class:checked={data.completed}>{new Date(data.deadline).toDateString()}</span>
    </ul>
</div>

