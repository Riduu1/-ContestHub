import { NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          ContestHub
        </NavLink>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink
            to="/"
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

