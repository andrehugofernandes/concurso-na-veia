'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Gerar breadcrumbs a partir do pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin' },
  ];

  segments.forEach((segment, index) => {
    if (segment === 'admin') return;

    const href = `/admin/${segments.slice(1, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: index < segments.length - 1 ? href : undefined,
    });
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-2">
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && <FaChevronRight className="w-3 h-3" />}
        </div>
      ))}
    </nav>
  );
}
