import Hero from '../components/Hero'
import Card from '../components/Card'

const FEATURED_STAYS = [
  {
    image: '#5B7F66',
    eyebrow: '30.4500° N · 79.2000° E — Chopta, 2,608m',
    title: 'Riverside Pine Cottage',
    description:
      'A two-room stone cottage above the Madhyamaheshwar stream, run by the Negi family for three generations.',
    meta: '₹1,800 / night',
    actionLabel: 'View stay',
  },
  {
    image: '#C1714A',
    eyebrow: '30.4380° N · 79.1850° E — Sari Village, 1,920m',
    title: 'Maa Mandakini Homestay',
    description:
      'Home-cooked Garhwali meals, a sunny courtyard, and a short walk to the start of the Deoria Tal trail.',
    meta: '₹1,200 / night',
    actionLabel: 'View stay',
  },
  {
    image: '#D9A441',
    eyebrow: '30.4900° N · 79.2200° E — Tungnath Ridge, 2,680m',
    title: 'Tungnath View Retreat',
    description:
      'Wake up to the Chandrashila ridgeline. Three rooms, a wood-fired bukhari, and resident guide on call.',
    meta: '₹2,200 / night',
    actionLabel: 'View stay',
  },
]

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss">
              Featured stays
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">
              Homes along the ridge
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {FEATURED_STAYS.map((stay) => (
            <Card key={stay.title} {...stay} />
          ))}
        </div>
      </section>
    </main>
  )
}
