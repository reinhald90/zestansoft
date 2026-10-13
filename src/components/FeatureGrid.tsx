'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '📥', title: 'Downloader', desc: 'TikTok, IG, YT, FB, Spotify — tanpa watermark, tanpa ribet.' },
  { icon: '🤖', title: 'AI Chat', desc: 'Gemini, GPT, Claude siap jawab apapun dalam hitungan detik.' },
  { icon: '🎮', title: 'Games', desc: 'Slot, Tic Tac Toe, Gacha, Trivia — main sambil ngobrol.' },
  { icon: '🎨', title: 'Canvas Tools', desc: 'Sticker, Brat, HD, Upscale. Ubah foto jadi keren.' },
  { icon: '💰', title: 'Economy', desc: 'Daily reward, balance, bank, transfer. Bangun kekayaan.' },
  { icon: '📊', title: 'Utilities', desc: 'Ping, ID, QR, Shortlink — tools harian lengkap.' },
  { icon: '🛒', title: 'Store', desc: 'Premium, voucher, item game, reward. Belanja langsung.' },
  { icon: '🎫', title: 'Support', desc: 'Tiket support 24/7, respon cepat dari tim.' },
];

export default function FeatureGrid() {
  return (
    <section className="py-20" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Semua yang kamu butuh, <span className="gradient-text">dalam 1 bot</span>
          </h2>
          <p className="mt-4 text-gray-400">
            8 kategori fitur utama, ratusan command siap dipakai.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="card-glow group rounded-xl bg-bg-card border border-white/[0.08] p-6"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
