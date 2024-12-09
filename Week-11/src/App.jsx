import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const {dataa} = useFetch();

  console.log(dataa, ' printing');
  return (
    <div>
      {dataa ? dataa.title : "Nothing"}
    </div>
  )
}

export default App
