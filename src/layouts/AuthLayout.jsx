import { Outlet, Link } from 'react-router-dom'
import { Diamond } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-white via-brand-50/40 to-emerald-50/40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-center pt-12">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Diamond className="h-5 w-5" />
          </span>
          AI 电商
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <Outlet />
      </main>

      <footer className="relative z-10 pb-8 text-center text-xs text-gray-400">
        <div className="space-x-4">
          <Link to="#" className="hover:text-gray-600">服务协议</Link>
          <Link to="#" className="hover:text-gray-600">隐私政策</Link>
          <Link to="#" className="hover:text-gray-600">帮助中心</Link>
        </div>
        <div className="mt-2">© 2026 ProAI Studio. 基于先进的神经网络模型驱动</div>
      </footer>
    </div>
  )
}
