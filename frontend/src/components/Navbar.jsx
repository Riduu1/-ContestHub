import { NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm transition group-hover:bg-blue-600">
            C
          </div>

          <div>
            <span className="block text-base font-bold tracking-tight text-slate-950">
              ContestHub
            </span>

            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              Contest Tracker
            </span>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/contests"
            className={navLinkClass}
          >
            Contests
          </NavLink>

          <NavLink
            to="/my-contests"
            className={navLinkClass}
          >
            My Contests
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar