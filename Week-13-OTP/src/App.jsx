import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Otp } from './components/Otp'

function App() {
  const [otpValid, setOtpValid] = useState(false)

  return (
    <>
      <h2>Please enter OTP</h2>
      <Otp number={6} setOtpValid={setOtpValid}></Otp>
    </>
  )
}

export default App
