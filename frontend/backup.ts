import axios from "axios"
import { FormEvent, Fragment, useEffect, useRef, useState } from "react"
import crypto from 'crypto'

function TodoListComponent() {
  const [todos, setTodos] = useState<any>([])
  const newTodoRef = useRef<HTMLInputElement>(null)

  const firstFetch = async () => {
    const fetch = await axios.get('http://localhost:3001/todos')
    setTodos(fetch.data)
  }

  useEffect(() => {
    firstFetch()
  }, [])

  async function addItem(event: FormEvent) {
    event.preventDefault()
    if (!newTodoRef?.current?.value) return
    if (todos.some((item: any) => item.description === newTodoRef?.current?.value)) return
    if (todos.filter((item: any) => !item.done).length > 4) return

    const item = { id: Math.random().toString(36).slice(2,7), description: newTodoRef?.current?.value as string, done: false }

    setTodos((old: any) => [...old, item])

    await axios.post('http://localhost:3001/todos', item)
  }

  async function removeItem(item: any) {
    const filterTodos = todos.filter((todo: any) => todo.description !== item.description)
    setTodos(filterTodos)

    await axios.delete(`http://localhost:3001/todos/${item.id}`)
  }

  async function toggleDone(item: any) {
    const toggleDoneTodo = todos.map((todo: any) => {
      if (todo.description === item.description) {
        item.done = !item.done
      }
      return todo
    })

    await axios.put(`http://localhost:3001/todos/${item.id}`, item)

    setTodos(toggleDoneTodo)
  }

  return (
    <form onSubmit={addItem}>
      {todos.length === 0 ? (
        <span>No item</span>
      ) : null}
      <ul>
        {todos.map((item: any) => (
          <Fragment key={item.description}>
            <span>{item.id}</span>
            <li style={{ textDecoration: item.done ? 'line-through' : '' }}>{item.description}</li>
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

export default TodoListComponent