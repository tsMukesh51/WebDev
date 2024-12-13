import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button } from './components/Buttons'
import { Input } from './components/Inputs'

function App() {
  const [disabled, setDisabled] = useState(false)

  function disableIt() {
    setDisabled(c => !c);
  }

  return (
    <>
      <h3>Hi there</h3>
      <Input type={'text'} placeholder={'Enter email'} />
      <Button disabled={disabled} fn={disableIt}>Sign Up</Button>
    </>
  )
}

export default App
