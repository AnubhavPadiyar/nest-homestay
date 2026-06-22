import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/showcase', label: 'Components' },
  { to: '/login', label: 'Login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()

  const linkClass = ({ isActive }) =>
    `font-body text-sm tracking-wide transition-colors ${
      isActive
        ? 'text-clay dark:text-gold'
        : 'text-ink/70 hover:text-forest dark:text-paper/60 dark:hover:text-paper'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 dark:border-paper/10 bg-paper/95 dark:bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 3 L24 12 V24 H4 V12 Z" stroke="#213D32" strokeWidth="2" strokeLinejoin="round" fill="#DDE6DE"/>
            <path d="M11 24 V17 H17 V24" stroke="#C1714A" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight text-forest dark:text-paper">
            Nest
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end>
              {link.label}
            </NavLink>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 dark:border-paper/15 text-ink/60 dark:text-paper/60 hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors"
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M7.5 1V2.5M7.5 12.5V14M1 7.5H2.5M12.5 7.5H14M3.2 3.2L4.2 4.2M10.8 10.8L11.8 11.8M11.8 3.2L10.8 4.2M4.2 10.8L3.2 11.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M13 8.5A5.5 5.5 0 016.5 2a5.5 5.5 0 100 11A5.5 5.5 0 0013 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <Link
            to="/login"
            className="rounded-full bg-forest dark:bg-moss px-4 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-moss dark:hover:bg-forest"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 dark:border-paper/15 text-ink/60 dark:text-paper/60"
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M7.5 1V2.5M7.5 12.5V14M1 7.5H2.5M12.5 7.5H14M3.2 3.2L4.2 4.2M10.8 10.8L11.8 11.8M11.8 3.2L10.8 4.2M4.2 10.8L3.2 11.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M13 8.5A5.5 5.5 0 016.5 2a5.5 5.5 0 100 11A5.5 5.5 0 0013 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 dark:border-paper/15 text-ink dark:text-paper"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-ink/10 dark:border-paper/10 bg-paper dark:bg-ink md:hidden">
          <div className="flex flex-col gap-1 px-5 py-3 sm:px-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 font-body text-sm ${
                    isActive
                      ? 'bg-mist dark:bg-paper/10 text-forest dark:text-paper'
                      : 'text-ink/70 dark:text-paper/60 hover:bg-mist dark:hover:bg-paper/10'
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
