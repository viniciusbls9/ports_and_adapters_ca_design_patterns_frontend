import TodoList from "src/entities/TodoList"

describe('TodoList', () => {
    test("should create a todo List with 3 items", () => {
        const todoList = new TodoList()
        todoList.addItem('a')
        todoList.addItem('b')
        todoList.addItem('c')

        expect(todoList.getCompleted()).toBe(0)
    })
    
    test("should create a todo List with 3 items and 2 done", () => {
        const todoList = new TodoList()
        todoList.addItem('a')
        todoList.addItem('b')
        todoList.addItem('c')

        const a = todoList.getItem('a')
        if (a) todoList.toggleDone(a)

        const b = todoList.getItem('b')
        if (b) todoList.toggleDone(b)

        expect(todoList.getCompleted()).toBe(67)
    })
})