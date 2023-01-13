import HttpClient from "src/infra/HttpClient";
import TodoGateway from "./TodoGateway";

export default class TodoMemoryGateway implements TodoGateway {
    todos: any
    constructor() {
        this.todos = [
            { id: Math.random().toString(36).slice(2, 7), description: "Estudar TypeScript", done: true },
            { id: Math.random().toString(36).slice(2, 7), description: "Fazer a prova online", done: false },
            { id: Math.random().toString(36).slice(2, 7), description: "Cortar a grama", done: false }
        ]
    }

    async getTodos(): Promise<any> {
        return this.todos
    }

    async addItem(item: any): Promise<any> {
        this.todos.push(item)
    }

    async updateItem(item: any): Promise<any> {
        const todo = this.todos.find((todo: any) => todo.id === item.id);
        if (todo) {
            todo.done = item.done
        }
    }

    async removeItem(id: string): Promise<any> {
        const todo = this.todos.find((todo: any) => todo.id === id);
        if (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        }
    }

}
