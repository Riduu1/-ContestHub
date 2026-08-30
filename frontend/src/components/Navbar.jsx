import { NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? 'text-blue-600 font-semibold'
        : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-gray-900"
        >
          ContestHub
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/contests" className={navLinkClass}>
            Contests
          </NavLink>

          <NavLink to="/my-contests" className={navLinkClass}>
            My Contests
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar