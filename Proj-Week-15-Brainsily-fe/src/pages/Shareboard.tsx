import { useState } from 'react'
import { Card } from '../components/Card'
import { SideBar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import { useParams } from 'react-router-dom'

export function Shareboard() {
  const [filter, setFilter] = useState('all');
  const { shareLink } = useParams();
  const { contents } = useContent({ comp: 'Shareboard', shareLink: shareLink });

  return <div className={'grid grid-cols-12'}>
    <div className={'p-5 col-span-2 border-r-2 border-slate-300 h-screen'}>
      <SideBar setFilter={setFilter} sharing={true} />
    </div>
    <div className={'p-8 bg-slate-50 col-span-10 h-screen'}>
      {/* <div className='flex justify-between items-center w-full mb-8'>
        <h3 className='font-semibold text-3xl'>All Notes</h3>
        <div className="flex gap-6">
          <Button variant='primary' text='Share Brain' size='lg' startIcon={<ShareIcon />} OnClick={() => { setIsShareModal(true) }}></Button>
          <ShareBrainModal isShareModal={isShareModal} setIsShareModal={setIsShareModal} />
          <Button variant='secondary' text='Add Content' size='lg' startIcon={<PlusIcon />} OnClick={() => { setIsModal(true) }}></Button>
          <CreateContentModel isModal={isModal} setIsModal={setIsModal} createContent={createContent} />
        </div>
      </div> */}
      <div className='grid auto-fill-[320px] gap-4 overflow-y-auto h-[calc(100%-48px)] pb-4'>
        {contents.map((content) => {
          if (filter == 'all')
            return <Card key={content.id.toString()} id={content.id} contentFormat={content.contentFormat} body={content.body} title={content.title} createdAt={content.createdAt} authorName={content.authorName} />
          if (filter == content.contentFormat)
            return <Card key={content.id.toString()} id={content.id} contentFormat={content.contentFormat} body={content.body} title={content.title} createdAt={content.createdAt} authorName={content.authorName} />
          return <></>
        })}
      </div>
    </div>
  </div>

}
