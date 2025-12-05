'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TopMenu from '@/Components/Navigation/TopMenu';

export default function ConditionalTopMenu() {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {

    if (!pathname) {
      setShouldShow(true);
      return;
    }

    const normalizedPath = pathname.toLowerCase();
  
    const isAdminStatisticRoute =
      normalizedPath.includes('/adminstatistic') ||
      normalizedPath.endsWith('/adminstatistic') ||
      /\/[a-z]{2}\/adminstatistic(\/)?$/i.test(normalizedPath);

    const isTrackingRoute = normalizedPath.includes('tracking');

    if (isAdminStatisticRoute || isTrackingRoute) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }

  }, [pathname]);

  if (!shouldShow) {
    return null;
  }

  return <TopMenu />;
}
