/**
 * Represents ToDoItem
 * @typedef {ToDoItem} ToDoItem
 */

 export interface ToDoItem {
    _id: String;
    title: String;
    completed: boolean;
    createdAt: Number;
    deadline: Number | null;
}
