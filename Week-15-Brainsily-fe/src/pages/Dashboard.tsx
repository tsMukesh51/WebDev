import { useRef, useState } from 'react'
import { Button } from '../components/Button'
import { ShareIcon } from '../assets/ShareIcon'
import { PlusIcon } from '../assets/PlusIcon'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModal'
import { SideBar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import { useScript } from '../hooks/useScript'

export function Dashboard() {
  const [isModal, setIsModal] = useState(false);
  const { contents, refresh } = useContent();
  useScript({ url: "https://platform.twitter.com/widgets.js" });

  return <div className={'grid grid-cols-12'}>
    <div className={'p-5 col-span-2 border-r-2 border-slate-300 h-screen'}>
      <SideBar />
    </div>
    <div className={'p-8 bg-slate-50 col-span-10'}>
      <div className='flex justify-between items-center w-full mb-8'>
        <h3 className='font-semibold text-3xl'>All Notes</h3>
        <div className="flex gap-6">
          <Button variant='primary' text='Share Brain' size='lg' startIcon={<ShareIcon />}></Button>
          <Button variant='secondary' text='Add Content' size='lg' startIcon={<PlusIcon />} OnClick={() => { setIsModal(true) }}></Button>
          <CreateContentModel isModal={isModal} setIsModal={setIsModal} />
        </div>
      </div>
      <div className='grid auto-fit-[320px] gap-4'>
        {contents.map((content) =>
          <Card key={content.id.toString()} id={content.id} contentFormat={content.contentFormat} body={content.body} title={content.title} createdAt={content.createdAt} authorName={content.authorName} />
        )}
      </div>
    </div>
  </div>

}