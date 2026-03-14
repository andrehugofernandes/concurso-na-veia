import { getInitials } from '@/lib/utils';
import Image from 'next/image';

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
  badgeColor?: string;
  usePrimaryColor?: boolean; // Usar cor primária do sistema de skins
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-2xl'
};

export function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
  className = '',
  showBadge = false,
  badgeColor = '#10B981',
  usePrimaryColor = true // Por padrão usa a cor primária
}: UserAvatarProps) {
  const initials = getInitials(name);
  const sizeClass = sizeClasses[size];

  if (avatarUrl) {
    return (
      <div className={`relative ${sizeClass} ${className}`}>
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {showBadge && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
            style={{ backgroundColor: badgeColor }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {usePrimaryColor ? (
        <div className="w-full h-full rounded-full flex items-center justify-center font-semibold text-white bg-[var(--primary)]">
          {initials}
        </div>
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center font-semibold text-white"
          style={{ backgroundColor: '#10B981' }}
        >
          {initials}
        </div>
      )}
      {showBadge && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
          style={{ backgroundColor: badgeColor }}
        />
      )}
    </div>
  );
}
