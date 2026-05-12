import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import TopBar from '../components/TopBar.jsx'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
        <footer className="border-t border-gray-100 bg-white py-3 text-center text-xs text-gray-400">
          © 2026 ProAI Studio. Powered by Advanced Neural Models.
        </footer>
      </div>
    </div>
  )
}
