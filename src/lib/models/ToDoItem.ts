/**
 * Represents ToDoItem
 * @typedef {ToDoItem} ToDoItem
 */

 export interface ToDoItem {
    _id: String;
    title: string;
    completed: boolean;
    createdAt: Number;
    deadline: Number;
}
