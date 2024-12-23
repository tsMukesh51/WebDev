import { useRef, useState } from 'react'
import { Button } from './components/Button'
import { ShareIcon } from './assets/ShareIcon'
import { PlusIcon } from './assets/PlusIcon'
import { Card } from './components/Card'
import { CreateContentModel } from './components/CreateContentModal'

function App() {
  const modalOpen = useRef(false);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button variant='primary' text='Share Brain' size='lg' startIcon={<ShareIcon />}></Button>
      <Button variant='secondary' text='Add Content' size='lg' startIcon={<PlusIcon />} OnClick={() => { modalOpen.current = true; }}></Button>
      <CreateContentModel modalOpen={modalOpen} />
      <Card text='Namaste' />

    </>
  )
}

export default App
