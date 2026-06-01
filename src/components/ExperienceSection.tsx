'use client';

import { useEffect, useRef, useState } from 'react';

const CV_URL =
  'https://drive.google.com/file/d/1o1Wx8DRHIYMfB7ILgzPnZXIOMEHzEvzy/view?usp=sharing';

const certificates = [
  {
    year: '2024',
    title: 'Bootcamp de programación nivel intermedio',
    detail: '159 horas · Estructuras de datos y bases de datos',
    url: 'https://drive.google.com/file/d/1995axTqfowjICSWuBzwj87zMjY9CLTEE/view?usp=sharing',
  },
  {
    year: '2023',
    title: 'Python 101 for Data Science',
    detail: 'IBM',
    url: 'https://drive.google.com/file/d/1xGhOYTgbYEnRq-7GWwiqLDn-dsy48BgY/view?usp=sharing',
  },
  {
    year: '2022',
    title: 'Formación Técnica en Gestión de Recursos Humanos',
    detail: 'Instituto Técnico Comfamiliar',
    url: null,
  },
  {
    year: '2021',
    title: 'Lógica de programación',
    detail: 'Egg Education, Argentina',
    url: null,
  },
];

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

type Cert = (typeof certificates)[number];

function TimelineItem({ cert, delay }: { cert: Cert; delay: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`reveal-left ${visible ? 'visible' : ''} relative pl-8 pb-10 last:pb-0`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        aria-hidden="true"
        className={`dot-animate ${visible ? 'visible' : ''} absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand dark:bg-brand border-2 border-surface dark:border-surface`}
        style={{ animationDelay: `${delay + 150}ms` }}
      />
      <time className="font-mono text-xs font-medium text-ink-muted dark:text-ink-muted block mb-1">
        {cert.year}
      </time>
      <h3 className="font-body font-semibold text-base text-ink dark:text-ink leading-snug mb-0.5">
        {cert.title}
      </h3>
      <p className="font-body text-sm text-ink-muted dark:text-ink-muted mb-2">
        {cert.detail}
      </p>
      {cert.url ? (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm font-medium text-brand hover:text-brand-deep dark:text-brand dark:hover:text-brand/80 underline underline-offset-2 transition-colors"
        >
          Ver certificado
        </a>
      ) : (
        <span className="font-body text-sm text-ink-muted/50 dark:text-ink-muted/50">
          Certificado físico
        </span>
      )}
    </li>
  );
}

export function ExperienceSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: timelineRef, visible: timelineVisible } = useReveal();

  return (
    <section id="experiencia" className="py-20 md:py-28 bg-surface dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`reveal ${headerVisible ? 'visible' : ''} mb-14`}
        >
          <h2
            className="font-display font-extrabold text-ink dark:text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Experiencia
          </h2>
          <p className="font-body text-ink-muted dark:text-ink-muted mt-2 text-base">
            Formación académica, certificaciones y aprendizaje continuo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-start">
          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Brand line draws over the static border as you scroll */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 w-0.5 bg-brand dark:bg-brand origin-top pointer-events-none z-10"
              style={{
                height: timelineVisible ? '100%' : '0%',
                transition: 'height 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: '200ms',
              }}
            />
            <ol className="relative border-l-2 border-surface-border dark:border-surface-border space-y-0">
              {certificates.map((cert, i) => (
                <TimelineItem key={i} cert={cert} delay={i * 80} />
              ))}
            </ol>
          </div>

          {/* CV card */}
          <div className="lg:sticky lg:top-24">
            <div
              className="bg-brand dark:bg-brand-deep rounded-xl p-7 text-center"
              style={{ minWidth: '220px' }}
            >
              <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-white/15 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="font-body font-semibold text-white text-sm mb-1">
                Curriculum Vitae
              </p>
              <p className="font-body text-white/60 text-xs mb-5">
                Versión completa en PDF
              </p>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-brand font-body font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
              >
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
