'use client';

import { useTheme } from '@/src/components/ThemeContext';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#sobre-mi',      label: 'Sobre mí' },
  { href: '#mis-proyectos', label: 'Proyectos' },
  { href: '#habilidades',   label: 'Habilidades' },
  { href: '#experiencia',   label: 'Experiencia' },
  { href: '#contacto',      label: 'Contacto' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHero = !scrolled;

  const baseLink = onHero
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-ink-muted hover:text-ink hover:bg-surface-raised dark:text-ink-muted dark:hover:text-ink dark:hover:bg-surface-raised';

  const iconBtn = onHero
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-ink-muted hover:text-ink hover:bg-surface-raised dark:text-ink-muted dark:hover:text-ink dark:hover:bg-surface-raised';

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        onHero
          ? 'bg-brand dark:bg-brand-deep border-b border-white/10'
          : 'bg-surface/95 dark:bg-surface/95 backdrop-blur-sm border-b border-surface-border shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`font-mono text-sm font-semibold tracking-tight transition-colors ${
              onHero ? 'text-white' : 'text-brand dark:text-brand'
            }`}
          >
            Johan_D3
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-anim px-3 py-2 text-sm font-medium rounded-md transition-colors ${baseLink}`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className={`ml-2 p-2 rounded-md transition-colors ${iconBtn}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className={`p-2 rounded-md transition-colors ${iconBtn}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú de navegación"
              className={`p-2 rounded-md transition-colors ${iconBtn}`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface dark:bg-surface border-t border-surface-border px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-ink-muted hover:text-ink border-b border-surface-border last:border-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
