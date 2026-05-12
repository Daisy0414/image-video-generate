import { NavLink, Link } from 'react-router-dom'
import { Zap, LayoutDashboard, Boxes, Image as ImageIcon, Video, Settings } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Product Library', icon: Boxes },
  { to: '/image-generation', label: 'Image Generation', icon: ImageIcon },
  { to: '/video-generation', label: 'Video Generation', icon: Video },
]

export default function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-100 bg-white">
      <Link to="/dashboard" className="flex items-center gap-2 px-5 py-5 text-base font-semibold text-gray-900">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
          <Zap className="h-4 w-4 fill-current" />
        </span>
        ProAI Studio
      </Link>

      <nav className="flex-1 px-3 py-2">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-3">
        <NavLink
          to="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </div>

      <div className="mx-3 mb-4 rounded-lg border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-3">
        <div className="text-xs font-semibold text-brand-700">AI Credits</div>
        <div className="mt-1 text-xs text-gray-500">730 / 1000 generations left</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
          <div className="h-full w-[73%] bg-brand-500" />
        </div>
      </div>
    </aside>
  )
}
