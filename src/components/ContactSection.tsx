'use client';

import Image from 'next/image';
import { useState } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: <LinkedInIcon className="w-5 h-5" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/johan-delgado-175540333/',
  },
  {
    icon: <InstagramIcon className="w-5 h-5" />,
    label: 'Instagram',
    href: 'https://www.instagram.com/johan._.delgado/?hl=es',
  },
  {
    icon: <GitHubIcon className="w-5 h-5" />,
    label: 'GitHub',
    href: 'https://github.com/JohanDsito',
  },
];

type FormData = { name: string; email: string; message: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setErrorMsg('Agrega NEXT_PUBLIC_FORMSPREE_ID en .env.local para activar el formulario.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'Error al enviar. Intenta de nuevo.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Sin conexión. Intenta de nuevo.');
      setStatus('error');
    }
  };

  const inputClass =
    'input-animated w-full px-4 py-3 bg-surface dark:bg-surface-raised border border-surface-border dark:border-surface-border rounded-md font-body text-sm text-ink dark:text-ink placeholder-ink-muted/60 dark:placeholder-ink-muted/60';

  return (
    <section id="contacto" className="py-20 md:py-28 bg-brand-subtle dark:bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            className="font-display font-extrabold text-ink dark:text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Trabajemos juntos
          </h2>
          <p className="font-body text-ink-muted dark:text-ink-muted mt-2 text-base">
            Cuéntame sobre tu proyecto o escríbeme directamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 w-full">
            <div>
              <label htmlFor="contact-name" className="sr-only">Nombre</label>
              <input
                id="contact-name" type="text" placeholder="Nombre"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                required disabled={status === 'sending'} className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">Email</label>
              <input
                id="contact-email" type="email" placeholder="Email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required disabled={status === 'sending'} className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">Mensaje</label>
              <textarea
                id="contact-message" placeholder="Mensaje"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                required rows={6} disabled={status === 'sending'}
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="submit" disabled={status === 'sending'}
              className="btn-press w-full py-3 px-6 bg-brand text-white font-body font-semibold text-sm rounded-md hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {status === 'success' && (
              <p role="status" className="font-body text-sm text-brand font-medium text-center animate-hero">
                Mensaje enviado con éxito.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="font-body text-sm text-red-600 dark:text-red-400 font-medium text-center">
                {errorMsg}
              </p>
            )}
          </form>

          {/* Sidebar card */}
          <aside className="bg-white dark:bg-surface-raised rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            {/* Header: photo + name */}
            <div className="bg-brand dark:bg-brand-deep p-6 flex items-center gap-4">
              <figure className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/20">
                <Image src="/profile.png" alt="Johan Delgado" fill sizes="64px" className="object-cover" />
              </figure>
              <div>
                <p className="font-display font-bold text-white text-lg leading-tight">Johan Delgado</p>
                <p className="font-body text-white/60 text-sm mt-0.5">Pasto, Colombia</p>
              </div>
            </div>

            {/* Quote */}
            <div className="px-6 py-5 border-b border-surface-border dark:border-surface-border">
              <p className="font-body text-ink-muted dark:text-ink-muted text-sm italic leading-relaxed">
                &ldquo;Programar es componer sinfonías digitales: cada función una nota, cada algoritmo una melodía que transforma el mundo.&rdquo;
              </p>
            </div>

            {/* Social links */}
            <div className="p-4 space-y-1.5">
              <p className="font-body text-[11px] font-semibold text-ink-muted dark:text-ink-muted uppercase tracking-widest px-2 mb-3">
                Encuéntrame en
              </p>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ir a ${link.label} de Johan Delgado`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-ink dark:text-ink hover:bg-brand/8 dark:hover:bg-brand/15 hover:text-brand dark:hover:text-brand transition-all duration-200 group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface dark:bg-surface text-ink-muted dark:text-ink-muted group-hover:bg-brand group-hover:text-white transition-all duration-200 flex-shrink-0">
                    {link.icon}
                  </span>
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
