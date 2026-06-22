/**
 * Button component
 *
 * @param {string}   variant   - 'primary' | 'secondary' | 'outline'  (default: 'primary')
 * @param {string}   size      - 'sm' | 'md' | 'lg'                   (default: 'md')
 * @param {boolean}  disabled  - disables interaction and dims the button
 * @param {function} onClick   - click handler
 * @param {node}     children  - button label / content
 * @param {string}   type      - HTML button type (default: 'button')
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center font-body font-medium rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-forest text-paper hover:bg-moss dark:bg-moss dark:hover:bg-forest',
    secondary: 'bg-mist text-forest hover:bg-mist/70 dark:bg-ink/20 dark:text-paper dark:hover:bg-ink/30',
    outline:   'border border-forest text-forest hover:bg-forest hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
