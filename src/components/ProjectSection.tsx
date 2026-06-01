'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'Restaurante Web',
    description:
      'Página web informativa e interactiva para un restaurante. Incluye comparación de menús, precios y animaciones de scroll. Diseñada con HTML, CSS y JavaScript.',
    imageUrl: '/restaurante.png',
    repoUrl: 'https://github.com/JohanDsito/Restaurante_web',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Base de Datos de Ejercicios',
    description:
      'Genera rutinas de ejercicio según la intensidad del usuario, con representación gráfica. Construida con Next.js y Tailwind.',
    imageUrl: '/rutinas.png',
    repoUrl: 'https://github.com/JohanDsito/Rutina_ejercicio',
    tags: ['Next.js', 'Tailwind'],
  },
  {
    title: 'Sistema de Tickets',
    description:
      'Simulador de tickets para eventos con número de referencia único y vencimiento. Diseñado 100% en Python, incluida la interfaz.',
    imageUrl: '/sistema_tickets.png',
    repoUrl: 'https://github.com/JohanDsito/Sistema_Tickets',
    tags: ['Python'],
  },
  {
    title: 'Sistema de Reservas',
    description:
      'Reservas de habitaciones con asignación por tipo y fechas de entrada y salida. Desarrollado con Java, HTML y CSS.',
    imageUrl: '/reserva_habitaciones.png',
    repoUrl: 'https://github.com/JohanDsito/Reserva_Hoteles',
    tags: ['Java', 'HTML', 'CSS'],
  },
];

type Project = (typeof projects)[number];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="text-[11px] font-mono font-semibold text-brand bg-brand-subtle dark:bg-brand/15 dark:text-brand px-2 py-0.5 rounded">
      {tag}
    </span>
  );
}

/* Shared hover overlay — slides up from bottom on hover */
function ImageOverlay({ repoUrl, title }: { repoUrl: string; title: string }) {
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver ${title} en GitHub`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3
                 bg-brand/90 dark:bg-brand-deep/95
                 translate-y-full group-hover:translate-y-0
                 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white/90" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <span className="text-white font-body font-semibold text-sm tracking-wide">
        Ver en GitHub
      </span>
    </a>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="card-elevate group h-full flex flex-col bg-white dark:bg-surface-raised rounded-2xl overflow-hidden">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={project.imageUrl}
          alt={`Captura de ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          priority
        />
        <ImageOverlay repoUrl={project.repoUrl} title={project.title} />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map(t => <TagBadge key={t} tag={t} />)}
        </div>
        <h3 className="font-display font-extrabold text-2xl text-ink dark:text-ink mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="font-body text-sm text-ink-muted dark:text-ink-muted leading-relaxed flex-1 mb-5">
          {project.description}
        </p>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-brand hover:text-brand-deep dark:text-brand dark:hover:text-brand/70 transition-colors"
          aria-label={`Ver ${project.title} en GitHub`}
        >
          Ver en GitHub
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function SmallCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} h-full`} style={{ transitionDelay: `${delay}ms` }}>
      <article className="card-elevate group h-full flex flex-col bg-white dark:bg-surface-raised rounded-2xl overflow-hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={project.imageUrl}
            alt={`Captura de ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <ImageOverlay repoUrl={project.repoUrl} title={project.title} />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map(t => <TagBadge key={t} tag={t} />)}
          </div>
          <h3 className="font-display font-bold text-base text-ink dark:text-ink mb-1.5 leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-xs text-ink-muted dark:text-ink-muted leading-relaxed flex-1 mb-4">
            {project.description}
          </p>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-brand hover:text-brand-deep dark:text-brand dark:hover:text-brand/70 transition-colors"
            aria-label={`Ver ${project.title} en GitHub`}
          >
            Ver en GitHub
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
}

function WideCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} lg:col-span-3`} style={{ transitionDelay: `${delay}ms` }}>
      <article className="card-elevate group flex flex-col md:flex-row bg-white dark:bg-surface-raised rounded-2xl overflow-hidden">
        <div className="relative overflow-hidden md:w-2/5 flex-shrink-0" style={{ aspectRatio: '16/9' }}>
          <Image
            src={project.imageUrl}
            alt={`Captura de ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <ImageOverlay repoUrl={project.repoUrl} title={project.title} />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map(t => <TagBadge key={t} tag={t} />)}
          </div>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink dark:text-ink mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-ink-muted dark:text-ink-muted leading-relaxed mb-5" style={{ maxWidth: '52ch' }}>
            {project.description}
          </p>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-brand hover:text-brand-deep dark:text-brand dark:hover:text-brand/70 transition-colors"
            aria-label={`Ver ${project.title} en GitHub`}
          >
            Ver en GitHub
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
}

export function ProjectsSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: featuredRef, visible: featuredVisible } = useReveal();
  const [featured, small1, small2, wide] = projects;

  return (
    <section id="mis-proyectos" className="py-20 md:py-28 bg-surface dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''} mb-12`}>
          <h2
            className="font-display font-extrabold text-ink dark:text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Mis proyectos
          </h2>
          <p className="font-body text-ink-muted dark:text-ink-muted mt-2 text-base">
            Proyectos personales y académicos disponibles en GitHub.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
          <div
            ref={featuredRef}
            className={`reveal ${featuredVisible ? 'visible' : ''} lg:col-span-2 lg:row-span-2`}
          >
            <FeaturedCard project={featured} />
          </div>
          <SmallCard project={small1} delay={80} />
          <SmallCard project={small2} delay={160} />
          <WideCard project={wide} delay={220} />
        </div>
      </div>
    </section>
  );
}
