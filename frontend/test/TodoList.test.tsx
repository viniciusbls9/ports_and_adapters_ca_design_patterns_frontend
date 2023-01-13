import TodoList from "src/entities/TodoList"

describe('TodoList', () => {
    test("should create a todo List with 3 items", () => {
        const todoList = new TodoList()
        todoList.addItem('a')
        todoList.addItem('b')
        todoList.addItem('c')

        expect(todoList.getCompleted()).toBe(0)
    })
})