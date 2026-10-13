import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { brand: { DEFAULT:'#3B82F6', dark:'#2563EB', light:'#60A5FA' }, accent:'#10B981',
      bg:{ DEFAULT:'#0A0F1C', card:'#111827', hover:'#1F2937' } },
    fontFamily:{ sans:['var(--font-inter)','system-ui','sans-serif'], mono:['var(--font-jetbrains)','monospace'] },
    animation:{ 'fade-up':'fadeUp .6s ease-out','float':'float 3s ease-in-out infinite' },
    keyframes:{ fadeUp:{'0%':{opacity:'0',transform:'translateY(20px)'},'100%':{opacity:'1',transform:'translateY(0)'}},
      float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-10px)'}} }
  }}, plugins:[]
};
export default config;
