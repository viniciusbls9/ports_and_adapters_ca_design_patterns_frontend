import { render, act, waitFor } from "@testing-library/react";
import { HttpClientContext } from "src/context/HttpClientContext";
import TodoHttpGateway from "src/gateways/TodoHttpGateway";
import AxiosAdapter from "src/infra/AxiosAdapter";
import TodoGateway from "src/gateways/TodoGateway"
import TodoList from "../src/components/TodoList"

function makeSut(todoGateway: TodoGateway) {
    return render(
        <HttpClientContext.Provider value={{ todoGateway }}>
            <TodoList />
        </HttpClientContext.Provider>
    )
}

function sleep(mili: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, mili)
    })
}

describe('TodoListView', () => {
    test('Should test a todo list screen', async () => {
        const sleepFunction = await sleep(100)
        const httpClientInstance = new AxiosAdapter()
        const todoGateway = new TodoHttpGateway(httpClientInstance, 'http://localhost:3001')
        const { container } = makeSut(todoGateway)
        await sleepFunction

        const completed = container.getElementsByClassName('completed')

        await waitFor(() => {
            expect(completed[0].textContent).toBe('33 %')
        })
    })
})