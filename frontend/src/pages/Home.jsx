import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { Loader, useToast } from '../components/ui'

const COLOR_MAP = ['#5B7F66', '#C1714A', '#D9A441', '#5B7F66', '#C1714A']

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((r) => r.json())
      .then((data) => {
        setProperties(data.data)
        setLoading(false)
      })
      .catch(() => {
        showToast({ message: 'Failed to load properties. Is the backend running?', type: 'error' })
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss">
              Featured stays
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest dark:text-paper sm:text-4xl">
              Homes along the ridge
            </h2>
          </div>
          {!loading && (
            <p className="font-mono text-xs text-ink/40 dark:text-paper/40">
              {properties.length} properties
            </p>
          )}
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {properties.map((p, i) => (
              <Card
                key={p._id}
                image={COLOR_MAP[i % COLOR_MAP.length]}
                eyebrow={`${p.location} · ${p.altitude}m`}
                title={p.name}
                description={p.description}
                meta={`₹${p.pricePerNight.toLocaleString()} / night`}
                actionLabel={p.available ? 'View stay' : 'Unavailable'}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
