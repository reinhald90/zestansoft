import Link from 'next/link';
import { Github, Send, MessageCircle, User } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-extrabold">
              Z
            </div>
            <span className="font-bold text-lg">ZestanSoft</span>
          </div>
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            {CONFIG.brand.tagline}. Bot multifungsi #1 di Indonesia — downloader, AI, games, tools, semua jadi satu.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={CONFIG.links.bot} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand/20 transition" aria-label="Bot">
              <Send className="w-4 h-4" />
            </a>
            <a href={CONFIG.links.channel} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand/20 transition" aria-label="Channel">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={CONFIG.links.owner} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand/20 transition" aria-label="Owner">
              <User className="w-4 h-4" />
            </a>
            <a href={CONFIG.links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand/20 transition" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 text-white">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/features" className="hover:text-white">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/store" className="hover:text-white">Store</Link></li>
            <li><Link href="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/docs" className="hover:text-white">Docs</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><a href={CONFIG.links.panel} target="_blank" rel="noopener noreferrer" className="hover:text-white">Panel</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ZestanSoft · All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> in Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
