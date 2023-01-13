import HttpClient from "src/infra/HttpClient";
import TodoGateway from "./TodoGateway";

export default class TodoHttpGateway implements TodoGateway {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

    async getTodos(): Promise<any> {
        return await this.httpClient.get(`${this.baseUrl}/todos`)
    }

    async addItem(item: any): Promise<any> {
        await this.httpClient.post(`${this.baseUrl}/todos`, item)
    }

    async updateItem(item: any): Promise<any> {
        await this.httpClient.put(`${this.baseUrl}/todos/${item.id}`, item)
    }

    async removeItem(id: string): Promise<any> {
        await this.httpClient.delete(`${this.baseUrl}/todos/${id}`)
    }

}
