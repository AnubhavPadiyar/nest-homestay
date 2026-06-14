import { Link } from 'react-router-dom'
import ContourPattern from './ContourPattern'

export default function Hero() {
  return (
    <section className="overflow-hidden bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:items-center md:gap-12">
        {/* Left: headline */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist/70">
            30.2406° N · 79.0421° E — Chopta Valley, Uttarakhand
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Stay where the valley begins.
          </h1>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-mist/90 sm:text-lg">
            Nest connects travellers directly with homestay hosts across rural
            Uttarakhand — no commission, no middlemen, just a room with a view
            and a host who knows the trail.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="rounded-full bg-clay px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-clay/90"
            >
              Browse stays
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-paper/30 px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-paper/10"
            >
              Become a host
            </Link>
          </div>
        </div>

        {/* Right: field-note panel with contour motif */}
        <div className="relative rounded-2xl border border-paper/15 bg-forest/60 p-6 sm:p-8">
          <ContourPattern className="absolute inset-0 h-full w-full text-paper" opacity={0.16} />
          <div className="relative z-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Field note · 002
            </p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug sm:text-3xl">
              0% commission, paid direct to the host.
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-mist/80">
              OTAs take 18–25% per booking. Nest keeps that money in the
              village — with hosts who run the rooms, cook the meals, and
              know every ridge above their roof.
            </p>
            <div className="mt-6 flex items-center gap-4 border-t border-paper/15 pt-4 font-mono text-xs text-mist/70">
              <span>EST. 2026</span>
              <span aria-hidden="true">·</span>
              <span>Trishul Network, Chopta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
