import {
  X,
  Image as ImageIcon,
  Layers,
  Maximize2,
  Settings2,
  Clock,
  Info,
  ChevronRight,
} from 'lucide-react'
import { products } from '../data/mockData.js'

export default function ImageGenDialog({ onClose, selectedCount, selectedProducts, onSubmit }) {
  const list = selectedProducts?.length ? selectedProducts : products.slice(0, 4)
  const count = selectedCount || list.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI 生成图片设置</h2>
            <p className="mt-1 text-xs text-gray-500">
              请配置您的生成任务参数。确认后系统将自动创建任务文件夹并跳转。
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-gray-400 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-6 px-7 pb-2 md:grid-cols-2">
          {/* Left: selected images */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
              <ImageIcon className="h-4 w-4 text-brand-600" />
              已选择图片 ({count})
            </div>

            <div className="grid grid-cols-2 gap-3">
              {list.slice(0, 4).map((p) => (
                <div key={p.id} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img src={p.cover} alt={p.name} className="h-full w-full object-cover" />
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

          {/* Right: params */}
          <div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <ParamRow icon={<Layers className="h-4 w-4" />} label="主图生成数量" hint="每张原图对应">
                <Select options={['1 张', '2 张', '4 张']} />
              </ParamRow>
              <ParamRow icon={<Layers className="h-4 w-4" />} label="产品图生成数量" hint="细节与多角度">
                <Select options={['4 张', '8 张', '12 张']} />
              </ParamRow>
              <ParamRow icon={<Maximize2 className="h-4 w-4" />} label="主图尺寸" hint="1:1 推荐">
                <Select options={['1000 * 1000 (默认)', '1500 * 1500', '2000 * 2000']} />
              </ParamRow>
              <ParamRow icon={<Maximize2 className="h-4 w-4" />} label="产品图尺寸" hint="3:4 推荐">
                <Select options={['750 * 1000 (默认)', '1080 * 1440', '1500 * 2000']} />
              </ParamRow>
              <div className="col-span-2">
                <ParamRow icon={<Settings2 className="h-4 w-4" />} label="图片生成模型" hint="高精度">
                  <Select options={['AI', 'AI Pro', 'AI Studio v2']} />
                </ParamRow>
              </div>
            </div>

            {/* Estimate panel */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-brand-50/70 px-4 py-3">
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
            <Clock className="h-3.5 w-3.5" />
            任务提交后将自动为您跳转到生成界面
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary">取消</button>
            <button onClick={onSubmit} className="btn-primary">
              开始图片生成任务 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
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
