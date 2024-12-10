import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const [todoId, setTodoId] = useState(1);
  const { dataa, loading } = useFetch("https://jsonplaceholder.typicode.com/users/" + todoId);

  console.log(dataa, ' printing');
  return (
    <div>
      <div>
        <button onClick={() => setTodoId(1)}>1</button>
        <button onClick={() => setTodoId(2)}>2</button>
        <button onClick={() => setTodoId(3)}>3</button>
        <button onClick={() => setTodoId(4)}>4</button>
      </div>
      <p>
        {loading ? "Loading..." : JSON.stringify(dataa)}
      </p>
    </div>
  )
}

export default App
