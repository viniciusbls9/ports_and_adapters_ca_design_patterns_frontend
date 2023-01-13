import { FormEvent, Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useHttpClient } from "src/context/HttpClientContext"

const TodoList = () => {
    const [todos, setTodos] = useState<any>([])
    const newTodoRef = useRef<HTMLInputElement>(null)

    const { todoGateway } = useHttpClient()

    const firstFetch = async () => {
        const fetch = await todoGateway.getTodos()
        setTodos(fetch)
    }

    useEffect(() => {
        firstFetch()
    }, [])

    async function addItem(event: FormEvent) {
        event.preventDefault()
        if (!newTodoRef?.current?.value) return
        if (todos.some((item: any) => item.description === newTodoRef?.current?.value)) return
        if (todos.filter((item: any) => !item.done).length > 4) return

        const item = { id: Math.random().toString(36).slice(2, 7), description: newTodoRef?.current?.value as string, done: false }

        setTodos((old: any) => [...old, item])

        await todoGateway.addItem(item)
    }

    async function removeItem(item: any) {
        const filterTodos = todos.filter((todo: any) => todo.description !== item.description)
        setTodos(filterTodos)

        await todoGateway.removeItem(item.id)
    }

    async function toggleDone(item: any) {
        const toggleDoneTodo = todos.map((todo: any) => {
            if (todo.description === item.description) {
                item.done = !item.done
            }
            return todo
        })

        await todoGateway.updateItem(item)

        setTodos(toggleDoneTodo)
    }

    const completed = useMemo(() => {
        const total = todos?.length
        const done = todos?.filter((item: any) => item.done).length
        return Math.round((done / total) * 100)
    }, [todos])

    return (
        <form onSubmit={addItem}>
            {todos?.length === 0 ? (
                <span>No item</span>
            ) : null}
            {completed > 0 ?
                (<span className="completed">
                    {completed} %
                </span>) : null
            }
            <ul>
                {todos?.map((item: any) => (
                    <Fragment key={item.description}>
                        <li style={{ textDecoration: item.done ? 'line-through' : '' }}>
                            {item.id}  -  {item.description}
                        </li>
                        <button type='button' onClick={() => toggleDone(item)}>done/undone</button>
                        <button type='button' onClick={() => removeItem(item)}>remove</button>
                    </Fragment>
                ))}
            </ul>
            <input type="text" ref={newTodoRef} />
            <button type='submit' onClick={(event) => addItem(event)}>add</button>
        </form>
    )
}

export default TodoList