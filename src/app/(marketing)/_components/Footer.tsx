'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold text-xl">
            YT2PDF
          </div>
          <nav className="flex gap-6 text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/tos" className="hover:text-white transition-colors">
              Términos de Servicio
            </Link>
          </nav>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} YT2PDF. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
