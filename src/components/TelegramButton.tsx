'use client';

import { Send } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { cn } from '@/lib/utils';

interface Props {
  children?: React.ReactNode;
  className?: string;
  startParam?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TelegramButton({ children, className, startParam, size = 'md' }: Props) {
  const url = startParam ? `${CONFIG.links.bot}?start=${startParam}` : CONFIG.links.bot;
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'btn-primary inline-flex items-center gap-2 rounded-lg font-semibold text-white',
        sizes[size],
        className
      )}
    >
      <Send className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      {children || 'Buka Bot'}
    </a>
  );
}
