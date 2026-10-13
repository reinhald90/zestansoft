import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const inter=Inter({subsets:['latin'],variable:'--font-inter'});
const jetbrains=JetBrains_Mono({subsets:['latin'],variable:'--font-jetbrains'});
export const metadata: Metadata = { title:'ZestanSoft — Bot Multifungsi #1 Indonesia', description:'Download, AI, Games, Tools — semua dalam satu bot Telegram.', metadataBase:new URL('https://zestansoft.my.id'), openGraph:{title:'ZestanSoft',description:'Empowering Your Telegram Experience',images:['/og-image.png']} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}><Navbar/><main className="min-h-screen pt-20">{children}</main><Footer/></body></html>}
