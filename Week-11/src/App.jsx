import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [todoId, setTodoId] = useState(1);
  // const { dataa, loading } = useFetch("https://jsonplaceholder.typicode.com/users/" + todoId);

  const debounced = useDebounce(todoId);

  console.log(' logging');
  return (
    <div>
      <div>
        <button onClick={() => setTodoId(1)}>1</button>
        <button onClick={() => setTodoId(2)}>2</button>
        <button onClick={() => setTodoId(3)}>3</button>
        <button onClick={() => setTodoId(4)}>4</button>
      </div>
      <h2>
        {debounced}
      </h2>
    </div>
  )
}

export default App
