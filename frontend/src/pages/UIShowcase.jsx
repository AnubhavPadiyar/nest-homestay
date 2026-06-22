import { useState } from 'react'
import { Button, Input, Modal, Loader, useToast } from '../components/ui'

export default function UIShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { showToast } = useToast()

  const validateEmail = () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
      showToast({ message: 'Email saved successfully!', type: 'success' })
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss">Week 3</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-forest dark:text-paper">
        UI Component Library
      </h1>
      <p className="mt-3 font-body text-sm text-ink/60 dark:text-paper/60">
        All five reusable components for the Nest design system — Button, Input, Modal, Toast, and Loader.
      </p>

      <hr className="my-8 border-ink/10 dark:border-paper/10" />

      {/* BUTTON */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-forest dark:text-paper mb-1">Button</h2>
        <p className="font-body text-xs text-ink/50 dark:text-paper/50 mb-5">3 variants × 3 sizes + disabled state</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* INPUT */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-forest dark:text-paper mb-1">Input</h2>
        <p className="font-body text-xs text-ink/50 dark:text-paper/50 mb-5">Label, placeholder, error display</p>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input
            label="Email address"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
            error={emailError}
          />
          <Input label="Password" placeholder="••••••••" type="password" />
          <Input label="Disabled field" placeholder="Cannot edit" disabled />
          <Button onClick={validateEmail}>Validate email</Button>
        </div>
      </section>

      {/* MODAL */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-forest dark:text-paper mb-1">Modal</h2>
        <p className="font-body text-xs text-ink/50 dark:text-paper/50 mb-5">Focus-trapped, Escape-to-close, backdrop click</p>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm booking inquiry"
        >
          <p className="mb-5">
            Your inquiry will be sent directly to the host via WhatsApp. No OTA commission
            is charged — the host receives the full amount.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => { setModalOpen(false); showToast({ message: 'Inquiry sent to host!', type: 'success' }) }}>
              Confirm
            </Button>
          </div>
        </Modal>
      </section>

      {/* TOAST */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-forest dark:text-paper mb-1">Toast</h2>
        <p className="font-body text-xs text-ink/50 dark:text-paper/50 mb-5">3 types — success, error, info</p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => showToast({ message: 'Booking confirmed!', type: 'success' })}>
            Success toast
          </Button>
          <Button variant="outline" onClick={() => showToast({ message: 'Something went wrong.', type: 'error' })}>
            Error toast
          </Button>
          <Button variant="secondary" onClick={() => showToast({ message: 'Review classified by AI.', type: 'info' })}>
            Info toast
          </Button>
        </div>
      </section>

      {/* LOADER */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-forest dark:text-paper mb-1">Loader</h2>
        <p className="font-body text-xs text-ink/50 dark:text-paper/50 mb-5">Spinner (sm/md/lg) + skeleton variant</p>
        <div className="flex flex-wrap items-center gap-8 mb-6">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
        <div className="max-w-sm">
          <Loader variant="skeleton" lines={4} />
        </div>
      </section>
    </main>
  )
}
