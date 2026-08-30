import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Contests from './pages/Contests'
import MyContests from './pages/MyContests'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/my-contests" element={<MyContests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App