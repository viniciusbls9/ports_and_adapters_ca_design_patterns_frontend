import { render } from "@testing-library/react";
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
        const { debug } = render(<TodoList />)

        await sleep(100)
        debug()
    })
})