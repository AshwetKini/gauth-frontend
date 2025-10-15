'use client';
import { useAuth } from '@/components/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Mode = 'service' | 'product' | 'auto';

interface Props {
  mode?: Mode; // auto = infer from user.role
  hrefOverride?: string; // optional custom destination
  tooltip?: string; // optional tooltip text
}

export default function FloatingCreateButton({
  mode = 'auto',
  hrefOverride,
  tooltip,
}: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Move all hooks to the top, before any conditional logic
  const role = user?.role;
  
  // Decide intent based on mode + role
  const intent: 'service' | 'product' = useMemo(() => {
    if (mode === 'service' || mode === 'product') return mode;
    return role === 'hustler' ? 'service' : 'product';
  }, [mode, role]);

  // Default targets
  const defaultTarget = useMemo(() => {
    return intent === 'service'
      ? '/dashboard/hustler/create-service'
      : '/dashboard/seller/create-product';
  }, [intent]);

  const to = hrefOverride || defaultTarget;

  // Colors and label
  const colors = useMemo(() => {
    return intent === 'service'
      ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400'
      : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400';
  }, [intent]);

  const label = tooltip || (intent === 'service' ? 'Create service' : 'Create product');

  // Now do conditional rendering after all hooks
  if (!role || (role !== 'hustler' && role !== 'seller')) {
    return null;
  }

  // Hide FAB on its own create page
  if (pathname?.startsWith(defaultTarget)) {
    return null;
  }

  const handleClick = () => {
    router.push(to);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className={`
          ${colors}
          w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center
          text-white font-medium
          transition-all duration-200
          hover:scale-110 hover:shadow-xl
          focus:outline-none focus:ring-4 focus:ring-offset-2
          group
        `}
        title={label}
        aria-label={label}
      >
        <svg
          className="w-6 h-6 transition-transform group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {label}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
