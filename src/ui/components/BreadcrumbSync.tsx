'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '@/ui/store/slices/BreadcrumbsSlice';

export function BreadcrumbSync() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = parts.map((part, i) => ({
      label: decodeURIComponent(part),
      href: '/' + parts.slice(0, i + 1).join('/'),
    }));

    dispatch(setBreadcrumbs(crumbs));
  }, [pathname]);

  return null;
}
