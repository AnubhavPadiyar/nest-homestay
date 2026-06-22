/**
 * Loader component
 *
 * @param {string}  variant  - 'spinner' | 'skeleton'  (default: 'spinner')
 * @param {string}  size     - 'sm' | 'md' | 'lg'      (default: 'md') — spinner only
 * @param {number}  lines    - number of skeleton lines (default: 3) — skeleton only
 * @param {string}  label    - accessible screen-reader label (default: 'Loading…')
 */
export default function Loader({
  variant = 'spinner',
  size = 'md',
  lines = 3,
  label = 'Loading…',
}) {
  if (variant === 'skeleton') {
    return (
      <div role="status" aria-label={label} className="flex flex-col gap-3 w-full">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg bg-ink/10 dark:bg-paper/10 animate-pulse ${
              i === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
            style={{ height: '14px' }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  // Spinner
  const spinnerSizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-10 h-10 border-[3px]',
  }

  return (
    <div
      role="status"
      aria-label={label}
      className="flex items-center justify-center"
    >
      <div
        className={`rounded-full border-forest/20 border-t-forest dark:border-paper/20 dark:border-t-paper animate-spin ${spinnerSizes[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
