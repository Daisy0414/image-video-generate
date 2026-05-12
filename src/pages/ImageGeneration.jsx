import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  ImageIcon,
  ExternalLink,
  Pencil,
  Trash2,
  Image as Img,
} from 'lucide-react'
import { imageTasks } from '../data/mockData.js'
import ImageGenDialog from '../components/ImageGenDialog.jsx'

export default function ImageGeneration() {
  const [showDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {imageTasks.map((t) => (
          <article key={t.id} className="card overflow-hidden">
            <div className="px-5 pt-4">
              <h3 className="text-base font-semibold text-gray-900">{t.title}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {t.date}
              </div>
            </div>

            <div
              onClick={() => navigate('/tasks/Task_20260403_034933')}
              className="cursor-pointer px-5 pt-3"
            >
              <div className="grid grid-cols-3 gap-2">
                {t.thumbs.map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img src={src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Img className="h-3.5 w-3.5" />
                {t.count} 张图片
              </div>
              {t.status === 'done' ? (
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">已完成</span>
              ) : (
                <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-medium text-white">进行中</span>
              )}
            </div>

            <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
              <ActionBtn
                onClick={() => navigate('/tasks/Task_20260403_034933')}
                icon={<ExternalLink className="h-3.5 w-3.5" />}
                label="打开"
              />
              <ActionBtn icon={<Pencil className="h-3.5 w-3.5" />} label="重命名" />
              <ActionBtn icon={<Trash2 className="h-3.5 w-3.5" />} label="删除" danger />
            </div>
          </article>
        ))}
      </div>

      {showDialog && (
        <ImageGenDialog
          onClose={() => setShowDialog(false)}
          selectedCount={4}
          onSubmit={() => {
            setShowDialog(false)
            navigate('/tasks/Task_20260403_034933')
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
