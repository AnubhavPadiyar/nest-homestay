import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/ui'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import UIShowcase from './pages/UIShowcase'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col bg-paper dark:bg-ink text-ink dark:text-paper transition-colors">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/showcase" element={<UIShowcase />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
