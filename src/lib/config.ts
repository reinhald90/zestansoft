export const CONFIG = {
  brand: {
    name: 'ZestanSoft',
    product: 'TreeZestan',
    tagline: 'Empowering Your Telegram Experience',
    domain: 'zestansoft.my.id',
  },
  links: {
    bot: 'https://t.me/treezestan_bot',
    channel: 'https://t.me/TreeZestan',
    owner: 'https://t.me/AzureLycount',
    github: 'https://github.com/reinhald90',
    panel: process.env.NEXT_PUBLIC_PANEL_URL || 'https://alfa-store-officials.alfamarket2.my.id',
  },
  api: {
    base: process.env.NEXT_PUBLIC_BOT_API_URL || '',
  },
  meta: {
    title: 'ZestanSoft — Bot Multifungsi #1 Indonesia',
    description: 'Download, AI, Games, Tools — semua dalam satu bot Telegram.',
  },
} as const;

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/store', label: 'Store' },
  { href: '/blog', label: 'Blog' },
];
