'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Download, Gamepad2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface StatsData {
  users: number;
  messages: number;
  downloads: number;
  games: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const FALLBACK: StatsData = {
  users: 50234,
  messages: 1240000,
  downloads: 856000,
  games: 320000,
};

export default function Stats() {
  const { data, error } = useSWR<StatsData>('/api/stats', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  const stats = !error && data ? data : FALLBACK;

  const items = [
    { icon: Users, label: 'Total User', value: stats.users, color: 'text-brand-light' },
    { icon: MessageSquare, label: 'Pesan Diproses', value: stats.messages, color: 'text-accent' },
    { icon: Download, label: 'File Downloaded', value: stats.downloads, color: 'text-purple-400' },
    { icon: Gamepad2, label: 'Game Played', value: stats.games, color: 'text-yellow-400' },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow rounded-xl bg-bg-card border border-white/[0.08] p-5 sm:p-6"
            >
              <it.icon className={`w-6 h-6 ${it.color}`} />
              <div className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                {formatNumber(it.value)}+
              </div>
              <div className="mt-1 text-xs sm:text-sm text-gray-400">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
