export default function Login() {
  return (
    <main className="mx-auto max-w-md px-5 py-16 sm:px-8 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss">Login</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest">
        Sign in to Nest
      </h1>
      <p className="mt-4 font-body text-sm leading-relaxed text-ink/70">
        This is a placeholder sign-in form. Authentication is not connected
        yet — submitting does nothing for now.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="font-body text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-ink/15 bg-white/60 px-3 py-2 font-body text-sm text-ink placeholder:text-ink/40"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-body text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-ink/15 bg-white/60 px-3 py-2 font-body text-sm text-ink placeholder:text-ink/40"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-forest px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-moss"
        >
          Sign in
        </button>
      </form>
    </main>
  )
}
