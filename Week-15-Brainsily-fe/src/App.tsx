import { useState } from 'react'
import { Button } from './components/Button'
import { ShareIcon } from './assets/ShareIcon'
import { PlusIcon } from './assets/PlusIcon'
import { Card } from './components/Card'
import { CreateContentModel } from './components/CreateContentModal'
import { SideBar } from './components/SideBar'

function App() {
  const [isModal, setIsModal] = useState(false);

  return <div className={'grid grid-cols-12'}>
    <div className={'p-5 col-span-2 border-2 border-slate-300 h-screen'}>
      <SideBar />
    </div>
    <div className={'p-8 bg-slate-50 col-span-10'}>
      <div className='flex justify-between items-center w-full mb-8'>
        <h3 className='font-semibold text-3xl'>All Notes</h3>
        <div className="flex gap-6">
          <Button variant='primary' text='Share Brain' size='lg' startIcon={<ShareIcon />}></Button>
          <Button variant='secondary' text='Add Content' size='lg' startIcon={<PlusIcon />} OnClick={() => { setIsModal(isModal => isModal = true) }}></Button>
          <CreateContentModel isModal={isModal} setIsModal={setIsModal} />
        </div>
      </div>
      <div className='grid grid-flow-col'>
        <Card text='Namaste' />
        <Card text='Namaste' />
        <Card text='Namaste' />
      </div>
    </div>
  </div>
}

export default App
