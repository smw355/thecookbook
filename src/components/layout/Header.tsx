'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            TheCookbook.ai
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/recipes" className="text-gray-700 hover:text-blue-600">
              Recipes
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
