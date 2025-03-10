import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { RedirectRight } from './components/RedirectRight'
import { Welcome } from './pages/Welcome'
import { Shareboard } from './pages/Shareboard'

export function AddLibrary(url: string) {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<RedirectRight comp={<Signup />} />} />
      <Route path='/signin' element={<RedirectRight comp={<Signin />} />} />
      <Route path='/dashboard' element={<RedirectRight comp={<Dashboard />} />} />
      <Route path='/shared/:shareLink' element={<RedirectRight comp={<Shareboard />} />} />
      <Route path='/' element={<RedirectRight comp={<Welcome />} />} />
    </Routes>
  </BrowserRouter>
}

export default App
