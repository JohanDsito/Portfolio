'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

const CV_URL =
  "https://drive.google.com/file/d/1o1Wx8DRHIYMfB7ILgzPnZXIOMEHzEvzy/view?usp=sharing";

export function MainContent() {
  const spotRef = useRef<HTMLDivElement>(null);

  /* Direct DOM update — zero React re-renders on mousemove */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!spotRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotRef.current.style.background = `radial-gradient(380px at ${x}% ${y}%, oklch(0.78 0.09 183 / 0.45), transparent 65%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!spotRef.current) return;
    spotRef.current.style.background =
      'radial-gradient(380px at 35% 50%, oklch(0.70 0.12 183 / 0.42), transparent 70%)';
  }, []);

  return (
    <section
      id="sobre-mi"
      className="relative bg-brand dark:bg-brand-deep overflow-hidden"
      style={{ minHeight: "88vh" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor spotlight — updates via ref, never re-renders */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(380px at 35% 50%, oklch(0.70 0.12 183 / 0.42), transparent 70%)',
          transition: 'background 0.08s linear',
        }}
      />
      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(oklch(0.98 0 0) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[88vh] py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center w-full">
          {/* Text */}
          <div>
            <p
              className="animate-hero font-body text-white/50 text-xs font-medium tracking-widest uppercase mb-5"
              style={{ animationDelay: "0ms" }}
            >
              Pasto, Colombia
            </p>

            <h1
              className="animate-hero-blur font-display font-extrabold text-white leading-none mb-6"
              style={{
                fontSize: "clamp(3.25rem, 9vw, 6rem)",
                letterSpacing: "-0.03em",
                animationDelay: "90ms",
              }}
            >
              Johan
              <br />
              Delgado
            </h1>

            <p
              className="animate-hero font-body text-white/75 text-lg md:text-xl leading-relaxed mb-8"
              style={{ animationDelay: "230ms", maxWidth: "34rem" }}
            >
              Estudiante de Ingeniería de Software, apasionado por el desarrollo de aplicaciones y la optimización de procesos. Mi objetivo es seguir creciendo como desarrollador y crear soluciones que mejoren la experiencia del usuario y el rendimiento de los sistemas.
            </p>

            {/* Mobile photo */}
            <div className="animate-hero lg:hidden mb-8" style={{ animationDelay: "300ms" }}>
              <div className="relative overflow-hidden rounded-2xl" style={{ width: "160px", height: "200px" }}>
                <Image src="/foto_perfil.png" alt="Johan Delgado" fill sizes="160px" className="object-cover" priority />
              </div>
            </div>

            <div className="animate-hero flex flex-wrap gap-3" style={{ animationDelay: "380ms" }}>
              <Link
                href="#mis-proyectos"
                className="btn-press inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand font-body font-semibold text-sm rounded-md hover:bg-white/90 hover:shadow-lg"
              >
                Ver mis proyectos
              </Link>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-white font-body font-semibold text-sm rounded-md border border-white/30 hover:bg-white/10"
              >
                Descargar CV
              </a>
            </div>
          </div>

          {/* Photo — subtle float animation */}
          <div className="animate-hero-fade hidden lg:block" style={{ animationDelay: "180ms" }}>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                width: "260px",
                height: "330px",
                animation: "photo-float 6s ease-in-out infinite",
              }}
            >
              <Image
                src="/foto_perfil.png"
                alt="Johan Delgado"
                fill
                sizes="260px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
      />
    </section>
  );
}
