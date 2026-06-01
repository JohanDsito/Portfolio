'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setScale(scrollable > 0 ? el.scrollTop / scrollable : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left bg-brand"
      style={{
        transform: `scaleX(${scale})`,
        /* scaleX is composited — no layout cost */
        transition: 'transform 80ms linear',
      }}
    />
  );
}
