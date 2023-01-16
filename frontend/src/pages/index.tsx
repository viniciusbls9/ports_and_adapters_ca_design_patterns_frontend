import TodoList from "src/components/TodoList"
import { useHttpClient } from "src/context/HttpClientContext";
import { useTodoList } from "src/hooks/useTodoList";


function TodoListComponent() {
  const { todoGateway } = useHttpClient()
  const { todoList } = useTodoList(todoGateway)

  return (
    <TodoList todoList={todoList} />
  )
}

export default TodoListComponent