import ContourPattern from './ContourPattern'

/**
 * Reusable Card component.
 *
 * Props:
 * - image:        optional. Hex color used for the placeholder image panel.
 * - eyebrow:      optional. Small mono-style label above the title (e.g. coordinates).
 * - title:        required. Card heading.
 * - description:  required. Short supporting text.
 * - meta:         optional. Right-aligned tag in the footer (e.g. price, rating).
 * - actionLabel:  optional. If provided, renders an action link/button.
 * - onAction:     optional. Click handler for the action.
 */
export default function Card({
  image = '#5B7F66',
  eyebrow,
  title,
  description,
  meta,
  actionLabel,
  onAction,
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60 shadow-sm transition-shadow hover:shadow-md">
      {/* Image placeholder */}
      <div
        className="relative h-40 w-full"
        style={{ backgroundColor: image }}
      >
        <ContourPattern className="absolute inset-0 h-full w-full text-paper" opacity={0.3} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-moss">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2 font-display text-lg font-semibold text-forest">
          {title}
        </h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/70">
          {description}
        </p>

        {(meta || actionLabel) && (
          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
            {meta && (
              <span className="font-mono text-xs text-ink/60">{meta}</span>
            )}
            {actionLabel && (
              <button
                type="button"
                onClick={onAction}
                className="rounded-full bg-forest px-4 py-1.5 font-body text-xs font-medium text-paper transition-colors hover:bg-moss"
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
