import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbState, setBulbState] = useState(false);

  return (
    <BulbContext.Provider value={{ bulbState: bulbState, bulbSwitch: setBulbState }}>
      {children}
    </BulbContext.Provider>
  )
}

function App() {
  return (
    <>
      <BulbProvider>
        <LightBulb />
      </BulbProvider>
    </>
  )
}

function LightBulb() {

  return (
    <>
      <Bulb />
      <Switch />
    </>
  )
}

function Bulb() {
  const { bulbState } = useContext(BulbContext);
  return (
    <>
      {bulbState ? "BulbOn" : "BulbOff"}
    </>
  )
}

function Switch() {
  const { bulbSwitch } = useContext(BulbContext);
  function toggle() {
    bulbSwitch((bulbState) => !bulbState)
  }
  return (
    <>
      <button onClick={toggle}>Bulb Switch</button>
    </>
  )
}

export default App
