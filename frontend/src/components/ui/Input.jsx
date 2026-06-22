/**
 * Input component
 *
 * @param {string}   label        - visible label above the input
 * @param {string}   placeholder  - input placeholder text
 * @param {string}   type         - HTML input type (default: 'text')
 * @param {string}   value        - controlled value
 * @param {function} onChange     - change handler (e) => void
 * @param {string}   error        - error message shown below the input
 * @param {string}   id           - ties label to input for accessibility
 * @param {boolean}  disabled     - disables the input
 */
export default function Input({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
  id,
  disabled = false,
  className = '',
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-sm font-medium text-ink dark:text-paper"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border px-3 py-2 font-body text-sm text-ink placeholder:text-ink/40
          bg-white/60 dark:bg-ink/20 dark:text-paper dark:placeholder:text-paper/40
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-clay/60
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-ink/15 dark:border-paper/15 hover:border-ink/30 dark:hover:border-paper/30'
          }`}
      />
      {error && (
        <p className="font-body text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
