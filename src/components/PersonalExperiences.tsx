'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const photos = [
  { src: '/galeras1.png', alt: 'Johan en escenario con su banda',   rotate: -2.5 },
  { src: '/galeras2.png', alt: 'Johan tocando batería en evento',    rotate: 1.5  },
  { src: '/raices.png',   alt: 'Grupo musical en evento Raíces',     rotate: -1   },
  { src: '/runas.jpg',    alt: 'Logo Capital en evento Runas',       rotate: 2    },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export function PersonalExperiences() {
  const { ref: sectionRef, visible: sectionVisible } = useReveal();
  const { ref: textRef, visible: textVisible } = useReveal();

  return (
    <section
      id="experiencias"
      className="py-20 md:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, oklch(0.36 0.11 183) 0%, oklch(0.28 0.09 183) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className={`reveal ${sectionVisible ? 'visible' : ''} mb-12`}
        >
          <h2
            className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Más allá del código
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo grid — scattered look */}
          <div className="relative grid grid-cols-2 gap-4 py-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className={`reveal ${sectionVisible ? 'visible' : ''} relative overflow-hidden rounded-xl`}
                style={{
                  aspectRatio: '4/3',
                  transform: `rotate(${photo.rotate}deg)`,
                  boxShadow:
                    '0 4px 12px oklch(0 0 0 / 0.35), 0 1px 3px oklch(0 0 0 / 0.25)',
                  transitionDelay: `${i * 70}ms`,
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1.03)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 24px oklch(0 0 0 / 0.45), 0 2px 6px oklch(0 0 0 / 0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = `rotate(${photo.rotate}deg)`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 12px oklch(0 0 0 / 0.35), 0 1px 3px oklch(0 0 0 / 0.25)';
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 28vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`reveal ${textVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            <p className="font-body text-white/85 text-lg leading-relaxed mb-5">
              La música me ha llevado por un camino distinto donde puedo
              expresarme libremente. A base de ritmos y melodías construyo
              pensamientos que no pueden expresarse solo con palabras.
            </p>
            <p className="font-body text-white/60 text-base leading-relaxed">
              Salir del mundo del software no está mal. Al contrario, es
              precisamente eso lo que nos hace personas más completas. La batería
              es mi lugar seguro, el contrapunto al teclado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
