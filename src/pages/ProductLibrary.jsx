import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Folder,
  FolderPlus,
  Upload,
  Image as ImageIcon,
  Video,
  ArrowUpDown,
  Filter,
  Plus,
  UploadCloud,
} from 'lucide-react'
import { productFolders, products } from '../data/mockData.js'
import ImageGenDialog from '../components/ImageGenDialog.jsx'
import VideoGenDialog from '../components/VideoGenDialog.jsx'

export default function ProductLibrary() {
  const [activeFolder, setActiveFolder] = useState('all')
  const [selected, setSelected] = useState([])
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const navigate = useNavigate()

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }
  const allSelected = selected.length === products.length
  const toggleAll = () => setSelected(allSelected ? [] : products.map((p) => p.id))

  return (
    <div className="flex min-h-[calc(100vh-3.5rem-2.75rem)]">
      {/* Folder sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-gray-100 bg-white">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm font-semibold text-gray-700">文件夹</span>
          <button className="grid h-7 w-7 place-items-center rounded-md text-brand-600 hover:bg-brand-50">
            <FolderPlus className="h-4 w-4" />
          </button>
        </div>

        <ul className="px-3 pb-4">
          {productFolders.map((f) => {
            const isActive = activeFolder === f.id
            return (
              <li key={f.id}>
                <button
                  onClick={() => setActiveFolder(f.id)}
                  className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Folder className={`h-4 w-4 ${isActive ? 'fill-brand-200 text-brand-600' : 'text-gray-400'}`} />
                    {f.name}
                  </span>
                  <span className={`text-xs ${isActive ? 'text-brand-600' : 'text-gray-400'}`}>{f.count}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto px-4 pb-4">
          <div className="rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-600">
                <UploadCloud className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">快速上传</div>
                <div className="mt-0.5 text-xs text-gray-500">拖拽图片到此处</div>
              </div>
            </div>
            <button className="btn-primary mt-3 w-full">上传到当前文件夹</button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 px-6 py-5">
        {/* Top breadcrumb + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">产品库</span>
            <span className="text-gray-300">›</span>
            <span className="font-medium text-gray-900">2024 夏季新</span>
            <span className="chip ml-2">4 项</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="搜索图片名称..."
                className="h-9 w-64 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button className="btn-secondary">
              <ArrowUpDown className="h-4 w-4" /> 排序
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> 上传图片
            </button>
          </div>
        </div>

        {/* Action row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              全选当前页
            </label>
            <button
              onClick={() => setSelected([])}
              className="text-gray-500 hover:text-gray-900"
            >
              取消全选
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowImageDialog(true)} className="btn-primary">
              <ImageIcon className="h-4 w-4" /> AI图片生成
            </button>
            <button onClick={() => setShowVideoDialog(true)} className="btn-primary">
              <Video className="h-4 w-4" /> AI视频生成
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => {
            const isSelected = selected.includes(p.id)
            return (
              <div
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-white transition ${
                  isSelected ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-100 hover:border-brand-200 hover:shadow-soft'
                }`}
              >
                <div className="absolute left-2 top-2 z-10">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 bg-white/90 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-3">
                  <div className="truncate text-sm font-semibold text-gray-900">{p.name}</div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-400">
                    <span>{p.resolution}</span>
                    <span>{p.date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showImageDialog && (
        <ImageGenDialog
          onClose={() => setShowImageDialog(false)}
          selectedCount={selected.length || products.length}
          selectedProducts={products.filter((p) => selected.includes(p.id))}
          onSubmit={() => {
            setShowImageDialog(false)
            navigate('/tasks/Task_20260403_034933')
          }}
        />
      )}
      {showVideoDialog && (
        <VideoGenDialog
          onClose={() => setShowVideoDialog(false)}
          selectedCount={selected.length || products.length}
          selectedProducts={products.filter((p) => selected.includes(p.id))}
          onSubmit={() => {
            setShowVideoDialog(false)
            navigate('/tasks/Task_20240512_video_034933')
          }}
        />
      )}
    </div>
  )
}
