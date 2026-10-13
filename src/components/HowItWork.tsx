'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { n: '01', title: 'Klik Buka Bot', desc: 'Buka Telegram, klik tombol "Buka Bot" di atas.' },
  { n: '02', title: 'Kirim /start', desc: 'Bot akan menyapa dengan menu utama lengkap.' },
  { n: '03', title: 'Langsung Pakai', desc: 'Pilih fitur favorit, mulai explore tanpa batas.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cuma <span className="gradient-text">3 langkah</span> untuk mulai
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative card-glow rounded-xl bg-bg-card border border-white/[0.08] p-8"
            >
              <div className="text-5xl font-extrabold gradient-text opacity-60">{s.n}</div>
              <h3 className="mt-4 font-bold text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{s.desc}</p>

              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 w-8 h-8 text-brand/40 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
