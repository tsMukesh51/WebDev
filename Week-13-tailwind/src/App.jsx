import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button } from './components/Buttons'

function App() {
  const [count, setCount] = useState(true)

  function disableIt() {
    setCount(c => !c);
  }
  return (
    <>
      <h3>Hi there</h3>
      <Button disabled={count} fn={disableIt}>Sign Up</Button>
    </>
  )
}

export default App
