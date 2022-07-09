/**
 * Represents ToDoItem
 * @typedef {ToDoItem} ToDoItem
 */

export interface ToDoItem {
	_id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	deadline: number | null;
}
