import { Link } from 'react-router-dom'

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'WhatsApp', href: '#' },
  { label: 'GitHub', href: 'https://github.com/AnubhavPadiyar/nest-homestay' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <span className="font-display text-xl font-semibold text-forest">Nest</span>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-ink/70">
              A direct booking platform for rural homestays across Uttarakhand —
              built with hosts, for travellers.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm text-ink/70">
              <li><Link to="/" className="hover:text-forest">Home</Link></li>
              <li><Link to="/about" className="hover:text-forest">About</Link></li>
              <li><Link to="/dashboard" className="hover:text-forest">Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-forest">Login</Link></li>
            </ul>
          </div>

          {/* Hosts */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50">
              For hosts
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm text-ink/70">
              <li><a href="#" className="hover:text-forest">List your home</a></li>
              <li><a href="#" className="hover:text-forest">Host guidelines</a></li>
              <li><a href="#" className="hover:text-forest">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50">
              Connect
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm text-ink/70">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-forest">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6 font-mono text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Nest. Built in the Himalaya, for the Himalaya.</span>
          <span>Chopta · Sari · Tungnath</span>
        </div>
      </div>
    </footer>
  )
}
