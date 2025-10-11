'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function TokenHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    login(token);

    // Remove token from URL
    const params = new URLSearchParams(window.location.search);
    params.delete('token');
    const newQS = params.toString();
    const newURL = newQS ? `${pathname}?${newQS}` : pathname;
    window.history.replaceState({}, document.title, newURL);

    router.refresh();
  }, [searchParams, pathname, router, login]);

  return null;
}
