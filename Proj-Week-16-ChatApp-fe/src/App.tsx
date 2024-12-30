import { useEffect, useRef } from "react"

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ws = useRef<WebSocket>({});

  useEffect(() => {
    ws.current = new WebSocket('http://localhost:8080');

    ws.onmessage()
  }, [])

  return <div className="h-screen bg-black flex flex-col justify-between">
    <div className=""></div>
    <div className={"h-8 p-2 flex gap-3"}>
      <input ref={inputRef} className="bg-white rounded-md text-black" type="text"></input>
      <button className="bg-slate-700 rounded-md" onClick={() => {

      }}>Send</button>
    </div>
  </div>
}

export default App
