
/**
 * @file Implements APIs for ToDoItem related data access object methods
 */
import type { ToDoItem } from '$lib/models/ToDoItem';
import { variables } from '$lib/env';
import axios from 'axios';

export async function getAllItems(): Promise<ToDoItem[]> {
    let items: ToDoItem[] = [];
    try {
        const response = await axios.get(`${variables.SERVER_URL}/todo`);
        items = response.data;
        console.log(`getAllItems: ${JSON.stringify(items)}`);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    return items;
}
