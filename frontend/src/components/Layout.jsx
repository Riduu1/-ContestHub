import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.10),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.08),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)]
      "
    >
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout