'use client';

import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    label: 'Backend & Lógica',
    note: 'Foco principal',
    primary: true,
    skills: ['Java', 'Spring Boot', 'Python', 'Django', 'JavaScript', 'Express.js'],
  },
  {
    label: 'Bases de datos',
    note: 'Relacionales y NoSQL',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['Docker', 'AWS S3', 'AWS Lambda', 'Railway', 'Vercel', 'Git', 'GitHub', 'Azure'],
  },
  {
    label: 'Testing & Calidad',
    skills: ['Postman', 'Selenium', 'JMeter', 'OWASP'],
  },
  {
    label: 'Frontend',
    note: 'Nivel funcional',
    skills: ['TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    label: 'Mensajería',
    skills: ['Apache Kafka', 'RabbitMQ'],
  },
  {
    label: 'Automatización & Herramientas',
    skills: ['N8N', 'Figma', 'Scrum', 'SQL'],
  },
];

type SkillGroup = (typeof skillGroups)[number];

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

function SkillPill({
  name,
  primary,
  index,
  groupVisible,
}: {
  name: string;
  primary?: boolean;
  index: number;
  groupVisible: boolean;
}) {
  const base = 'pill-hover inline-flex items-center px-3 py-1.5 rounded-md font-body text-sm font-medium cursor-default select-none';
  const style: React.CSSProperties = {
    opacity: 0,
    animationDelay: `${index * 45}ms`,
    animationFillMode: 'forwards',
    animationDuration: '0.35s',
    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    animationName: groupVisible ? 'pill-in' : 'none',
  };

  if (primary) {
    return (
      <span
        className={`${base} text-brand dark:text-brand bg-brand-subtle dark:bg-brand/12 border border-brand/25 dark:border-brand/30`}
        style={style}
      >
        {name}
      </span>
    );
  }
  return (
    <span
      className={`${base} text-ink dark:text-ink bg-surface-raised dark:bg-surface-raised border border-surface-border dark:border-surface-border`}
      style={style}
    >
      {name}
    </span>
  );
}

function GroupCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} bg-white dark:bg-surface-raised rounded-2xl p-6`}
      style={{
        boxShadow: 'var(--shadow-card)',
        transitionDelay: `${delay}ms`,
        borderTop: group.primary
          ? '3px solid var(--color-brand)'
          : '3px solid var(--color-surface-border)',
      }}
    >
      <div className="flex items-baseline gap-2 mb-4">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-ink dark:text-ink">
          {group.label}
        </p>
        {group.note && (
          <span className="font-body text-[11px] font-medium text-brand dark:text-brand bg-brand-subtle dark:bg-brand/12 px-2 py-0.5 rounded-full">
            {group.note}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            name={skill}
            primary={group.primary}
            index={i}
            groupVisible={visible}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const [backend, databases, cloud, testing, frontend, messaging, tools] = skillGroups;

  return (
    <section id="habilidades" className="py-20 md:py-28 bg-brand-subtle dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''} mb-12`}>
          <h2
            className="font-display font-extrabold text-ink dark:text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Habilidades técnicas
          </h2>
          <p className="font-body text-ink-muted dark:text-ink-muted mt-2 text-base">
            Perfil orientado a backend, con experiencia en bases de datos, cloud y automatización.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <div className="lg:col-span-2">
            <GroupCard group={backend} delay={0} />
          </div>
          <GroupCard group={databases} delay={80} />
          <div className="lg:col-span-2">
            <GroupCard group={cloud} delay={120} />
          </div>
          <GroupCard group={testing} delay={160} />
          <GroupCard group={frontend} delay={200} />
          <GroupCard group={messaging} delay={240} />
          <GroupCard group={tools} delay={280} />
        </div>
      </div>
    </section>
  );
}
