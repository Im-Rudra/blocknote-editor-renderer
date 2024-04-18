'use client';

import { useEffect, useRef, useState } from 'react';

export default function ThemeButton() {
  const [theme, setTheme] = useState<string>('');
  const htmlRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    htmlRef.current = document.querySelector('html');
    return () => {
      htmlRef.current = null;
    };
  }, []);

  const toggleTheme = (ref: typeof htmlRef) => {
    if (!ref.current) return;
    const currentTheme = ref.current.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    ref.current.classList.remove(currentTheme);
    ref.current.classList.add(nextTheme);
  };

  return (
    <button
      className="text-black dark:text-white rounded-md px-4 py-2 border-2 border-gray-500 hover:border-gray-400"
      onClick={() => toggleTheme(htmlRef)}
    >
      Toggle
    </button>
  );
}
