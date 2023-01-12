import { render, screen } from "@testing-library/react";
import TodoList from "../src/components/TodoList"

function sleep(mili: number) {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, mili)
    })
}

describe('TodoListView', () => {
    test('Should test a todo list screen', async () => {
        const { container } = render(<TodoList />)
        await sleep(100)

        const completed = container.getElementsByClassName('completed')

        expect(completed[0].textContent).toBe('33 %')
    })
})