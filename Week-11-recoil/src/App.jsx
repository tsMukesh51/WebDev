import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, isCounterEvenSel } from './store/atoms/count'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  )
}

function Counter() {
  return (
    <div>
      <DisplayCount />
      <IncCounter />
      <DecCounter />
      <DisIsEven />
    </div>
  )
}

function DisplayCount() {
  const count = useRecoilValue(counterAtom);
  return (
    <div>
      {count}
    </div>
  )
}

function IncCounter() {
  const setCount = useSetRecoilState(counterAtom);
  function increase() {
    setCount((c) => c + 2);
  }
  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  )
}

function DecCounter() {
  const setCount = useSetRecoilState(counterAtom);
  function decrease() {
    setCount((c) => c - 1);
  }
  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

function DisIsEven() {
  const isEven = useRecoilValue(isCounterEvenSel);
  console.log(isEven);
  console.log('DisIsEven');
  return (
    <div>
      {isEven ? 'Even' : 'Odd'}
    </div>
  )
}

export default App
