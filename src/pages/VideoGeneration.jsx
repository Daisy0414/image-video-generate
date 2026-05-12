import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Video as VideoIcon,
  ExternalLink,
  Pencil,
  Trash2,
  Play,
} from 'lucide-react'
import { videoTasks } from '../data/mockData.js'
import VideoGenDialog from '../components/VideoGenDialog.jsx'

export default function VideoGeneration() {
  const [showDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-6 flex items-center justify-end">
        <button onClick={() => setShowDialog(true)} className="btn-primary">
          <VideoIcon className="h-4 w-4" /> AI视频生成
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {videoTasks.map((t) => (
          <article key={t.id} className="card overflow-hidden">
            <div className="px-5 pt-4">
              <h3 className="text-base font-semibold text-gray-900">{t.title}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {t.date}
              </div>
            </div>

            <div className="px-5 pt-3">
              <div className="grid grid-cols-3 gap-2">
                {t.thumbs.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid place-items-center bg-black/15">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-brand-700 shadow">
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <VideoIcon className="h-3.5 w-3.5" />
                {t.count} 个视频
              </div>
              {t.status === 'done' ? (
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">已完成</span>
              ) : (
                <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-medium text-white">进行中</span>
              )}
            </div>

            <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
              <ActionBtn icon={<ExternalLink className="h-3.5 w-3.5" />} label="打开" />
              <ActionBtn icon={<Pencil className="h-3.5 w-3.5" />} label="重命名" />
              <ActionBtn icon={<Trash2 className="h-3.5 w-3.5" />} label="删除" danger />
            </div>
          </article>
        ))}
      </div>

      {showDialog && (
        <VideoGenDialog
          onClose={() => setShowDialog(false)}
          onSubmit={() => {
            setShowDialog(false)
            navigate('/tasks/Task_20240512_video_034933')
          }}
        />
      )}
    </div>
  )
}

function ActionBtn({ icon, label, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition hover:bg-gray-50 ${
        danger ? 'text-rose-500 hover:bg-rose-50' : 'text-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
