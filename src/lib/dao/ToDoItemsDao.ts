/**
 * @file Implements APIs for ToDoItem related data access object methods
 */
import type { ToDoItem } from '$lib/models/ToDoItem';
import { variables } from '$lib/env';
import axios from 'axios';

export async function getAllItems(): Promise<ToDoItem[]> {
	let items: ToDoItem[] = [];
	try {
		const response = await axios.get(`${variables.SERVER_URL}/todo/`);
		items = response.data;
		// console.log(`getAllItems: ${JSON.stringify(items)}`);
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
	return items;
}

export async function getAllItemsSorted(attrib: string, sort: string): Promise<ToDoItem[]> {
	let items: ToDoItem[] = [];
	try {
		const response = await axios.get(`${variables.SERVER_URL}/todo?attrib=${attrib}&sort=${sort}`);
		items = response.data;
	} catch (err) {
		console.error(err);
	}
	return items;
}

export async function getAllItemsSingleParam(
	attrib: string,
	param: string,
	threshold: number,
	sort: string
): Promise<ToDoItem[]> {
	let items: ToDoItem[] = [];
	try {
		const response = await axios.get(
			`${variables.SERVER_URL}/todo?attrib=${attrib}&${param}=${threshold}&sort=${sort}`
		);
		items = response.data;
	} catch (err) {
		console.error(err);
	}
	return items;
}

export async function getAllItemsTwoParam(
	attrib: string,
	start: number,
	end: number,
	sort: string
): Promise<ToDoItem[]> {
	let items: ToDoItem[] = [];
	try {
		const response = await axios.get(
			`${variables.SERVER_URL}/todo?attrib=${attrib}&start=${start}&end=${end}&sort=${sort}`
		);
		items = response.data;
	} catch (err) {
		console.error(err);
	}
	return items;
}

export async function getItemById(id: string): Promise<ToDoItem | null> {
	let item: ToDoItem;
	try {
		const response = await axios.get(`${variables.SERVER_URL}/todo/${id}`);
		item = response.data;
		return item;
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
	return null;
}

export async function createItem(item: any): Promise<void> {
	try {
		await axios.post(`${variables.SERVER_URL}/todo/`, item);
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
}

export function toggleItemById(id: string, newState: boolean): void {
	try {
		axios.put(`${variables.SERVER_URL}/todo/${id}`, { completed: newState });
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
}

export function updateItemById(id: string, updatedItem: any): void {
	try {
		axios.put(`${variables.SERVER_URL}/todo/${id}`, updatedItem);
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
}

export async function deleteItemById(id: string): Promise<void> {
	try {
		await axios.delete(`${variables.SERVER_URL}/todo/${id}`);
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
}
