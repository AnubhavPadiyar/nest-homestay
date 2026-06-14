import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `font-body text-sm tracking-wide transition-colors ${
      isActive ? 'text-clay' : 'text-ink/70 hover:text-forest'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M14 3 L24 12 V24 H4 V12 Z"
              stroke="#213D32"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="#DDE6DE"
            />
            <path d="M11 24 V17 H17 V24" stroke="#C1714A" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight text-forest">
            Nest
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            className="rounded-full bg-forest px-4 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-moss"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 4.5 H16 M2 9 H16 M2 13.5 H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <div className="flex flex-col gap-1 px-5 py-3 sm:px-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 font-body text-sm ${
                    isActive ? 'bg-mist text-forest' : 'text-ink/70 hover:bg-mist hover:text-forest'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
