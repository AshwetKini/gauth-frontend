'use client';

import { useAuth } from '@/components/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Mode = 'service' | 'product' | 'auto';

interface Props {
  mode?: Mode;               // auto = infer from user.role
  hrefOverride?: string;     // optional custom destination
  tooltip?: string;          // optional tooltip text
}

export default function FloatingCreateButton({
  mode = 'auto',
  hrefOverride,
  tooltip,
}: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Only Hustler or Seller can see FAB
  const role = user?.role;
  if (!role || (role !== 'hustler' && role !== 'seller')) return null;

  // Decide intent based on mode + role
  const intent: 'service' | 'product' = useMemo(() => {
    if (mode === 'service' || mode === 'product') return mode;
    return role === 'hustler' ? 'service' : 'product';
  }, [mode, role]);

  // Default targets
  const defaultTarget =
    intent === 'service'
      ? '/dashboard/hustler/create-service'
      : '/dashboard/seller/create-product';

  const to = hrefOverride || defaultTarget;

  // Hide FAB on its own create page
  if (pathname?.startsWith(defaultTarget)) return null;

  const colors =
    intent === 'service'
      ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400'
      : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400';

  const label = tooltip || (intent === 'service' ? 'Create service' : 'Create product');

  return (
    <button
      aria-label={label}
      title={label}
      onClick={() => router.push(to)}
      className={`fixed right-6 bottom-6 z-50 inline-flex items-center justify-center rounded-full shadow-lg text-white ${colors} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
      style={{ width: 56, height: 56 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}
