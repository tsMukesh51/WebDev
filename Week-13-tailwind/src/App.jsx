import { useState } from 'react'
import reactLogo from './assets/react.svg'
import monitorLogo from './assets/monitorScreen.svg'
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
      <div className={"h-screen bg-blue-850 flex flex-col items-center justify-center"}>
        <div className={'flex items-center text-4xl py-6 pb-16 -ml-12'}>
          <img className={'h-6 px-6'} src={monitorLogo} alt='Nothing' />
          <p className={'text-blue-300'}>Webinar</p>
          <p className={'text-white'}>.gg</p>
        </div>
        <Input className={'pb-6'} type={'email'} placeholder={'Enter email'} />
        <Button disabled={disabled} fn={disableIt}>Sign Up</Button></div>
    </>
  )
}

export default App
