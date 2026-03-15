import Image from 'next/image';

interface UserAvatarProps {
  name?: string | null;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-2xl'
};

function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return '?';
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('') || '?';
}

export function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
  className = ''
}: UserAvatarProps) {
  const displayName = name?.trim() || 'Usuário';
  const initials = getInitials(displayName);
  const sizeClass = sizeClasses[size];

  if (avatarUrl) {
    return (
      <div className={`relative ${sizeClass} ${className}`}>
        <Image
          src={avatarUrl}
          alt={displayName}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <div className="w-full h-full rounded-full flex items-center justify-center font-semibold text-white bg-[var(--primary,#0037C1)]">
        {initials}
      </div>
    </div>
  );
}
