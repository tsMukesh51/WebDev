import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Otp } from './components/Otp'
import { Button } from './components/Buttons'

function App() {
  const [otpValid, setOtpValid] = useState(false);
  console.log(otpValid);

  return (
    <div className={`h-screen flex flex-col items-center justify-center bg-blue-900`}>
      <h2 className='p6 text-6xl'>Please Enter OTP</h2>
      <Otp number={6} setOtpValid={setOtpValid}></Otp>
      <Button enabled={otpValid}>Sign Up</Button>
    </div>
  )
}

export default App
