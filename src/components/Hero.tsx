'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, BookOpen, Sparkles, Star, MapPin } from 'lucide-react';
import TelegramButton from './TelegramButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-gray-300"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          50.000+ user aktif
        </motion.div>

        {/* Emoji besar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
          className="mt-8 text-7xl sm:text-8xl animate-float select-none"
        >
          🎋
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]"
        >
          Bot Multifungsi <span className="gradient-text">#1</span>
          <br />
          di Indonesia
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Download, AI, Games, Tools — semua dalam 1 bot Telegram.
          <br className="hidden sm:block" />
          <span className="text-white/90 font-medium">Gratis. Cepat. Selamanya.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <TelegramButton size="lg">
            Buka di Telegram
          </TelegramButton>
          <Link
            href="/features"
            className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white"
          >
            <BookOpen className="w-5 h-5" />
            Lihat Fitur
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-light" /> 50K+ user
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9/5
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent" /> Made in Indonesia
          </span>
        </motion.div>
      </div>
    </section>
  );
}
