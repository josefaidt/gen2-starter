import type { Schema } from "../amplify/data/resource"
import { useEffect, useState } from "react"
import { generateClient } from "aws-amplify/data"

const client = generateClient<Schema>()

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    })
  }, [])

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") })
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="#">Review next step of this tutorial.</a>
      </div>
    </main>
  )
}

export default App
