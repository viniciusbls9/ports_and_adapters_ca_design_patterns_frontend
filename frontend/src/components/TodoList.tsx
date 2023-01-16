import { Fragment, useRef, useState } from "react"
import TodoList from "src/entities/TodoList"


type TodoListProps = {
    todoList: TodoList | null;
};

const TodoListComponent = ({ todoList }: TodoListProps) => {
    const newTodoRef = useRef<HTMLInputElement>(null)


    return (
        <>
            {todoList?.items?.length === 0 ? (
                <span>No item</span>
            ) : null}
            <p className="completed">
                {todoList?.getCompleted?.()} %
            </p>
            <ul>
                {todoList?.items?.map((item: any) => (
                    <Fragment key={item.description}>
                        <li style={{ textDecoration: item.done ? 'line-through' : '' }}>
                            {item.id}  -  {item.description}
                        </li>
                        <button type='button' onClick={() => todoList.toggleDone(item)}>done/undone</button>
                        <button type='button' onClick={() => todoList.removeItem(item)}>remove</button>
                    </Fragment>
                ))}
            </ul>
            <input type="text" ref={newTodoRef} />
            <button
                type='submit'
                onClick={() => {
                    todoList?.addItem(newTodoRef?.current?.value as string)
                }}
            >
                add
            </button>
        </>

    )
}

export default TodoListComponent

// async function addItem(event: FormEvent) {
//     event.preventDefault()
//     if (!newTodoRef?.current?.value) return
//     if (todos.some((item: any) => item.description === newTodoRef?.current?.value)) return
//     if (todos.filter((item: any) => !item.done).length > 4) return

//     const item = { id: Math.random().toString(36).slice(2, 7), description: newTodoRef?.current?.value as string, done: false }

//     setTodos((old: any) => [...old, item])

//     await todoGateway.addItem(item)
// }

// async function removeItem(item: any) {
//     const filterTodos = todos.filter((todo: any) => todo.description !== item.description)
//     setTodos(filterTodos)

//     await todoGateway.removeItem(item.id)
// }

// async function toggleDone(item: any) {
//     const toggleDoneTodo = todos.map((todo: any) => {
//         if (todo.description === item.description) {
//             item.done = !item.done
//         }
//         return todo
//     })

//     await todoGateway.updateItem(item)

//     setTodos(toggleDoneTodo)
// }

// const completed = useMemo(() => {
//     const total = todos?.length
//     const done = todos?.filter((item: any) => item.done).length
//     return Math.round((done / total) * 100)
// }, [todos])
