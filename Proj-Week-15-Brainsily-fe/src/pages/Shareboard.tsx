import { useRef, useState } from 'react'
import { Card } from '../components/Card'
import { SideBar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import { useParams } from 'react-router-dom'

export function Shareboard() {
  const [filter, setFilter] = useState('all');
  const { shareLink } = useParams();
  const { contents } = useContent({ comp: 'Shareboard', shareLink: shareLink });
  const [toastNoti, setToastNoti] = useState<JSX.Element[]>();
  const toastCount = useRef(0);

  return <div className={'grid grid-cols-12'}>
    <div className={'p-5 col-span-2 border-r-2 border-slate-300 h-screen'}>
      <SideBar setFilter={setFilter} sharing={true} />
    </div>
    <div className={'p-8 bg-slate-50 col-span-10 h-screen'}>
      <div className='grid auto-fill-[320px] gap-4 overflow-y-auto h-[calc(100%-48px)] pb-4'>
        {contents == null ? <p>Brain is private</p> :
          contents.map((content) => {
            if (filter == 'all')
              return <Card key={content.id.toString()} id={content.id} contentFormat={content.contentFormat} body={content.body} title={content.title} createdAt={content.createdAt} authorName={content.authorName} setToastNoti={setToastNoti} toastCount={toastCount} />
            if (filter == content.contentFormat)
              return <Card key={content.id.toString()} id={content.id} contentFormat={content.contentFormat} body={content.body} title={content.title} createdAt={content.createdAt} authorName={content.authorName} setToastNoti={setToastNoti} toastCount={toastCount} />
            return <></>
          })}
      </div>
    </div>
    <div className='fixed bottom-48 left-1/2 w-128 h-[1px] -translate-x-1/2'>{toastNoti}</div>
  </div>
}
