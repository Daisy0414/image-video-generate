import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Download,
  RefreshCw,
  Sparkles,
  Loader2,
  Check,
  Image as ImageIcon,
  Video as VideoIcon,
  Plus,
  ChevronRight,
  MoreVertical,
  Star,
  Layers,
  Box,
  ArrowRight,
  Play,
} from 'lucide-react'
import { taskDetail } from '../data/mockData.js'

export default function TaskDetail() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const isVideo = (taskId || '').toLowerCase().includes('video')
  const [activeId, setActiveId] = useState(taskDetail.sources[0].id)

  return (
    <div className="flex h-[calc(100vh-3.5rem-2.75rem)] flex-col">
      {/* Top toolbar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="grid h-6 w-6 place-items-center rounded bg-gray-100 text-gray-500">
            {isVideo ? <VideoIcon className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
          </span>
          <span className="text-gray-500">{isVideo ? '视频生成' : '图片生成'}</span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">{taskId || taskDetail.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <Download className="h-4 w-4" /> 批量下载
          </button>
          <button className="btn-primary">
            <RefreshCw className="h-4 w-4" /> 全部重试
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: source list */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-gray-100 bg-white">
          <div className="px-5 pb-2 pt-4 text-xs font-semibold text-gray-500">
            原始素材 ({taskDetail.sources.length})
          </div>
          <div className="flex-1 overflow-y-auto px-3">
            {taskDetail.sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`mb-2 flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition ${
                  activeId === s.id
                    ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <img src={s.cover} alt={s.name} className="h-11 w-11 shrink-0 rounded-lg object-cover" />
                <div className="flex-1 overflow-hidden">
                  <div className="truncate text-sm font-medium text-gray-900">{s.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                    {s.status === 'completed' && (
                      <>
                        <span className="grid h-3 w-3 place-items-center rounded-full bg-emerald-500">
                          <Check className="h-2 w-2 text-white" />
                        </span>
                        <span className="text-gray-400">completed</span>
                      </>
                    )}
                    {s.status === 'generating' && (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin text-brand-500" />
                        <span className="text-gray-400">generating</span>
                      </>
                    )}
                    {s.status === 'pending' && (
                      <>
                        <span className="h-2 w-2 rounded-full bg-gray-300" />
                        <span className="text-gray-400">pending</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </button>
            ))}
          </div>
          <div className="px-3 pb-4 pt-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-3 text-sm font-medium text-gray-500 transition hover:border-brand-300 hover:text-brand-600">
              <Plus className="h-4 w-4" /> 添加更多
            </button>
          </div>
        </aside>

        {/* Center: params */}
        <section className="flex-1 overflow-y-auto bg-gray-50 px-6 py-5">
          {isVideo ? (
            <VideoCenter />
          ) : (
            <ImageCenter />
          )}
        </section>

        {/* Right: results */}
        <aside className="flex w-[340px] shrink-0 flex-col border-l border-gray-100 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="text-sm font-semibold text-gray-900">生成结果 ({taskDetail.results.length})</div>
            <div className="text-xs text-gray-400">
              任务完成 <span className="font-semibold text-brand-600">{taskDetail.progress}%</span>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {taskDetail.results.map((r) => (
              <ResultCard key={r.id} item={r} isVideo={isVideo} />
            ))}

            <LoadingCard isVideo={isVideo} />
            <QueuedCard />
          </div>

          <div className="border-t border-gray-100 p-4">
            <button
              onClick={() => navigate(isVideo ? '/video-generation' : '/products')}
              className="btn-primary w-full"
            >
              {isVideo ? '返回视频列表' : '返回产品库'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ---------- Image mode center ----------
function ImageCenter() {
  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">配置生成参数</h2>
          <p className="mt-1 text-xs text-gray-500">
            针对每张选中的原始图片，分别设定主图与产品图的 AI 生成提示词。
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          <Sparkles className="h-3.5 w-3.5" /> 高级生成模式已开启
        </span>
      </div>

      <div className="space-y-4">
        {taskDetail.sources.map((s) => (
          <ImageSourceCard key={s.id} source={s} />
        ))}
      </div>
    </>
  )
}

function ImageSourceCard({ source }) {
  return (
    <div className="card overflow-hidden">
      <SourceHeader source={source} />
      <div className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-2">
        <PromptField
          icon={<Layers className="h-4 w-4 text-brand-600" />}
          label="主图提示词 (Hero Shot)"
          value={source.heroPrompt}
        />
        <PromptField
          icon={<Box className="h-4 w-4 text-emerald-600" />}
          label="产品图提示词 (Context Shot)"
          value={source.contextPrompt}
        />
      </div>
      <SourceFooter status={source.status} />
    </div>
  )
}

// ---------- Video mode center ----------
function VideoCenter() {
  return (
    <>
      {/* Title bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">配置参数</h2>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800">全选</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <RefreshCw className="h-4 w-4" /> 重生提示词
          </button>
          <button className="btn-primary">
            <VideoIcon className="h-4 w-4" /> 批量生成视频
          </button>
        </div>
      </div>
      <p className="mb-4 text-xs text-gray-500">
        针对每张选中的原始图片，分别设定视频 AI 生成提示词。
      </p>

      {/* Top-level selects */}
      <div className="card mb-4 grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">视频模型</label>
          <select className="input cursor-pointer text-sm">
            <option>Pro Vision v2 (推荐)</option>
            <option>Pro Vision v1</option>
            <option>Lite Vision</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">预期长度</label>
          <select className="input cursor-pointer text-sm">
            <option>15 秒 (标准)</option>
            <option>10 秒</option>
            <option>30 秒</option>
            <option>60 秒</option>
          </select>
        </div>
      </div>

      {/* Source cards */}
      <div className="space-y-4">
        {taskDetail.sources.map((s) => (
          <VideoSourceCard key={s.id} source={s} />
        ))}
      </div>
    </>
  )
}

function VideoSourceCard({ source }) {
  return (
    <div className="card overflow-hidden">
      <SourceHeader source={source} />
      <div className="px-4 py-4">
        <PromptField
          icon={<VideoIcon className="h-4 w-4 text-brand-600" />}
          label="视频提示词"
          value={source.videoPrompt}
        />
      </div>
      <SourceFooter status={source.status} />
    </div>
  )
}

// ---------- Shared bits ----------
function SourceHeader({ source }) {
  const statusBadge =
    source.status === 'completed' ? (
      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">已完成</span>
    ) : source.status === 'generating' ? (
      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">生成中...</span>
    ) : (
      <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">待处理</span>
    )

  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-50 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <img src={source.cover} alt={source.name} className="h-8 w-8 rounded-md object-cover" />
        <span className="text-sm font-semibold text-gray-900">{source.name}</span>
      </div>
      {statusBadge}
    </div>
  )
}

function SourceFooter({ status }) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-gray-50 bg-gray-50/50 px-4 py-2.5">
      <button className="btn-secondary text-xs">重置参数</button>
      {status === 'pending' ? (
        <button className="btn-primary text-xs">
          <RefreshCw className="h-3.5 w-3.5" /> 开始生成
        </button>
      ) : (
        <button className="btn-primary text-xs">
          <RefreshCw className="h-3.5 w-3.5" /> 重新生成
        </button>
      )}
    </div>
  )
}

function PromptField({ icon, label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-700">
        <span className="flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        <button className="inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-cyan-600 hover:bg-cyan-100">
          <Sparkles className="h-3 w-3" /> AI 优化
        </button>
      </div>
      <textarea
        defaultValue={value}
        className="min-h-[88px] w-full resize-none rounded-lg border border-gray-200 bg-white p-2.5 text-xs leading-relaxed text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
    </div>
  )
}

function ResultCard({ item, isVideo }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
      <button className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-gray-400 shadow-sm transition hover:scale-105 hover:text-amber-400">
        <Star className="h-3.5 w-3.5" />
      </button>
      <div className="relative">
        <img src={item.cover} alt={item.title} className="aspect-[4/5] w-full object-cover" />
        {isVideo && (
          <button className="absolute bottom-2 left-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-700 shadow-md transition hover:scale-105">
            <Play className="h-4 w-4 fill-current" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="overflow-hidden">
          <div className="truncate text-xs font-medium text-gray-800">{item.title}</div>
          <div className="mt-0.5 flex items-center gap-2 text-[10px] text-gray-400">
            <span className="rounded bg-gray-100 px-1.5 py-px text-gray-500">{item.tag}</span>
            {item.time}
          </div>
        </div>
        <button className="grid h-6 w-6 place-items-center rounded text-gray-400 hover:bg-gray-100">
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function LoadingCard({ isVideo }) {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed border-brand-200 bg-brand-50/40">
      <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-brand-200">
        <Sparkles className="h-5 w-5 animate-pulse text-brand-500" />
      </div>
      <div className="mt-3 text-sm font-medium text-brand-700">AI 正在魔法生成中...</div>
      <div className="mt-1 text-[11px] text-gray-400">{isVideo ? '预计还需 15 秒' : '预计还需 15 秒'}</div>
    </div>
  )
}

function QueuedCard() {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/60">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-300">
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="mt-2 text-xs text-gray-400">排队等待生成...</div>
    </div>
  )
}
