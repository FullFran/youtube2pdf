'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, FileText, LogIn, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Back */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-slate-800/50 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
          
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">YouTube2PDF</span>
          </div>
        </div>

        {/* Right side - Auth */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
          ) : user ? (
            <>
              <Link href="/my-reports">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-400 hover:text-white hover:bg-slate-800/50">
                  Mis Informes
                </Button>
              </Link>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <span className="truncate max-w-[150px]">{user.email}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white hover:bg-slate-800/50 gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            <>
              <div className="hidden md:block text-sm text-gray-400">
                Genera informes profesionales
              </div>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Iniciar sesión</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
