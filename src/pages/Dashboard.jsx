import { Link } from 'react-router-dom'
import {
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Plus,
  FolderKanban,
  Clock,
} from 'lucide-react'
import { dashboardStats, recentTasks, quickActions, dashboardCards } from '../data/mockData.js'

const iconMap = {
  image: ImageIcon,
  video: Video,
  file: FileText,
  zap: Zap,
  sparkles: Sparkles,
  trending: TrendingUp,
}

const statBg = {
  brand: 'bg-gradient-to-br from-brand-100/80 via-brand-50 to-white',
  teal: 'bg-gradient-to-br from-emerald-100/70 via-emerald-50 to-white',
  plain: 'bg-white',
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            早安，王经理 <span className="text-xl">👋</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">今天我们为您准备了 3 条 AI 视频创意，快来看看吧。</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <FolderKanban className="h-4 w-4" /> 管理资产
          </button>
          <Link to="/products" className="btn-primary">
            <Plus className="h-4 w-4" /> 上传新产品
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {dashboardStats.map((s) => {
          const Icon = iconMap[s.icon] || FileText
          return (
            <div
              key={s.key}
              className={`relative overflow-hidden rounded-2xl border border-gray-100 p-5 shadow-card ${statBg[s.tone]}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="mt-2 text-3xl font-semibold leading-none text-gray-900">{s.value}</div>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/60 text-gray-600">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
                {s.delta.startsWith('+') ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
                {s.delta}
              </div>
            </div>
          )
        })}
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Left column: recent tasks + bottom cards */}
        <div className="space-y-6 lg:col-span-2">
        <div className="card">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">近期任务流</h2>
              <p className="mt-0.5 text-xs text-gray-400">跟踪您最近的 AI 生成任务进度</p>
            </div>
            <Link to="#" className="text-xs font-medium text-brand-600 hover:underline">
              查看全部任务
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="relative h-12 w-12 shrink-0">
                  <img src={t.cover} className="h-12 w-12 rounded-lg object-cover" alt="" />
                  <span className="absolute bottom-0 right-0 grid h-4 w-4 place-items-center rounded-tl-md rounded-br-lg bg-black/60 text-white">
                    {t.status === 'progress' ? (
                      <Video className="h-2.5 w-2.5" />
                    ) : (
                      <ImageIcon className="h-2.5 w-2.5" />
                    )}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{t.title}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {t.time}
                  </div>
                </div>
                {t.status === 'done' ? (
                  <span className="rounded-md bg-brand-600 px-2 py-0.5 text-[11px] font-medium text-white">已完成</span>
                ) : (
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">处理中</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom cards (inside left column) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dashboardCards.map((c) => {
            const Icon = iconMap[c.icon] || Sparkles
            const bg =
              c.tone === 'brand'
                ? 'bg-gradient-to-br from-brand-100/70 via-brand-50/60 to-white border-brand-100'
                : 'bg-gradient-to-br from-cyan-100/60 via-cyan-50/50 to-white border-cyan-100'
            const iconCol = c.tone === 'brand' ? 'text-brand-600' : 'text-cyan-500'
            const ctaCol = c.tone === 'brand' ? 'text-brand-700' : 'text-cyan-600'
            return (
              <div key={c.key} className={`rounded-2xl border p-6 shadow-card ${bg}`}>
                <Icon className={`h-6 w-6 ${iconCol}`} strokeWidth={2.25} />
                <h3 className="mt-4 text-base font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{c.desc}</p>
                <button className={`mt-3 inline-flex items-center text-xs font-medium hover:underline ${ctaCol}`}>
                  {c.cta}
                </button>
              </div>
            )
          })}
        </div>
        </div>

        {/* Quick start */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Sparkles className="h-4 w-4 text-brand-600" /> 快速开始
          </div>
          <div className="space-y-3">
            {quickActions.map((a) => {
              const Icon = iconMap[a.icon] || Sparkles
              const isGradient = a.tone === 'gradient'
              return (
                <Link
                  key={a.key}
                  to={a.href}
                  className={`block overflow-hidden rounded-xl border p-4 transition hover:shadow-soft ${
                    isGradient
                      ? 'border-brand-100 bg-gradient-to-br from-brand-50 via-white to-emerald-50'
                      : 'border-gray-100 bg-white hover:border-brand-200'
                  }`}
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gray-50 text-gray-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-gray-900">{a.title}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{a.desc}</p>
                  {isGradient ? (
                    <button className="btn-secondary mt-3 w-full text-xs">{a.cta}</button>
                  ) : (
                    <div className="mt-2 text-xs font-medium text-brand-600">{a.cta}</div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
