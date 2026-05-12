import { useState } from 'react'
import {
  X,
  Search,
  Image as ImageIcon,
  Clock,
  Info,
  Maximize2,
  ChevronRight,
} from 'lucide-react'
import { videoSourceFolder, videoCandidates } from '../data/mockData.js'

export default function VideoGenDialog({ onClose, onSubmit }) {
  const [tab, setTab] = useState('aiimg')
  const [picked, setPicked] = useState(videoCandidates.slice(0, 3).map((c) => c.id))

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const selectAll = () => setPicked(videoCandidates.map((c) => c.id))
  const clearAll = () => setPicked([])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI 视频生成</h2>
            <p className="mt-1 text-xs text-gray-500">
              请配置您的生成任务参数。确认后系统将自动创建任务文件夹并跳转。
            </p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-6 px-7 pb-2 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Search assets or tasks..."
              />
            </div>

            <div className="mt-4 flex items-center gap-5 border-b border-gray-100 pb-3">
              <TabBtn active={tab === 'aiimg'} onClick={() => setTab('aiimg')}>
                <ImageIcon className="h-4 w-4" />
                AI图片文件夹 (4)
              </TabBtn>
              <TabBtn active={tab === 'lib'} onClick={() => setTab('lib')}>
                产品库 (10)
              </TabBtn>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {videoSourceFolder.map((s) => (
                <div key={s.id} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img src={s.cover} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-gray-200 px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">任务将存入新文件夹</div>
                <div className="mt-0.5 text-[11px] text-gray-400">以当前时间命名: Gen_432026</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="flex items-center gap-2">
              <button onClick={selectAll} className="btn-secondary px-3 py-1.5 text-xs">全选</button>
              <button onClick={clearAll} className="btn-secondary px-3 py-1.5 text-xs">取消全选</button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {videoCandidates.map((c) => {
                const sel = picked.includes(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`relative overflow-hidden rounded-xl border ${
                      sel ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-100'
                    }`}
                  >
                    <img src={c.cover} alt="" className="aspect-square w-full object-cover" />
                    <span
                      className={`absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-md border ${
                        sel ? 'border-brand-500 bg-white' : 'border-white bg-white/80'
                      }`}
                    >
                      {sel && <span className="h-2.5 w-2.5 rounded-sm bg-brand-600" />}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <ParamRow icon={<Maximize2 className="h-4 w-4" />} label="视频模型" hint="1:1 推荐">
                <Select options={['sdance2.0 (默认)', 'sdance2.0 Pro', 'sdance3.0']} />
              </ParamRow>
              <ParamRow icon={<Maximize2 className="h-4 w-4" />} label="视频时长" hint="3:4 推荐">
                <Select options={['15 (默认)', '30', '60']} />
              </ParamRow>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-50/70 px-4 py-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-600">
                <Info className="h-4 w-4" />
              </div>
              <div className="text-xs leading-relaxed">
                <div className="font-semibold text-gray-900">生成估算</div>
                <p className="mt-1 text-gray-600">
                  当前配置每张原图将生成 5 张图片，总计 <span className="font-semibold text-brand-700">20</span> 张。预计消耗{' '}
                  <span className="font-semibold text-brand-700">20</span> 算力积分。耗时约{' '}
                  <span className="font-semibold text-brand-700">45</span> 秒。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 px-7 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5" /> 任务提交后将自动为您跳转到生成界面
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary">取消</button>
            <button onClick={onSubmit} className="btn-primary">
              开始视频生成任务 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative -mb-3 flex items-center gap-1.5 pb-3 text-sm font-medium transition ${
        active ? 'text-brand-600' : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600" />}
    </button>
  )
}

function ParamRow({ icon, label, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
          <span className="text-gray-500">{icon}</span>
          {label}
        </div>
        {hint && (
          <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function Select({ options }) {
  return (
    <select className="input cursor-pointer text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )
}
