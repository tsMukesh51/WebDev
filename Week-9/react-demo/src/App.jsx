import { useEffect, useRef, useState } from 'react'

function App() {
  return (
    <>
      <Counter />
    </>
  )
}

function Counter() {
  const [count, setcount] = useState(0);
  const timerRef = useRef(null);

  let timer;
  function startTimer() {
    if (!timerRef.current)
      timerRef.current = setInterval(function () { setcount((count) => count + 1); }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  )
}
export default App
