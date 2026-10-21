# Zestansoft App

Web chat realtime: Firebase Auth (Email/Password, Telepon, Google) + Cloud Firestore. Dibangun dengan Vite.

## Langkah 1 — Siapkan Firebase (sekali saja)
1. **Firestore**: Firebase Console → Build → Firestore Database → *Create database*.
2. **Rules**: tab *Rules* → tempel isi `firestore.rules` → *Publish*.
3. **Authorized domains**: Authentication → Settings → Authorized domains → tambahkan domain Vercel kamu (mis. `zestansoft-app.vercel.app`). Tanpa ini, login Google dan Telepon akan gagal di Vercel.

## Langkah 2 — Jalankan lokal
```bash
npm install
npm run dev
```

## Langkah 3 — GitHub
```bash
git init
git add .
git commit -m "Zestansoft App"
git branch -M main
git remote add origin https://github.com/USERNAME/zestansoft-app.git
git push -u origin main
```

## Langkah 4 — Vercel
1. vercel.com → *Add New → Project* → impor repo GitHub tadi.
2. Framework otomatis terdeteksi **Vite** (build: `npm run build`, output: `dist`).
3. Klik *Deploy*. Lalu lakukan Langkah 1 nomor 3 dengan domain yang diberikan Vercel.

## Catatan
- Chat memakai Firestore realtime (`onSnapshot`), bukan Socket.IO, karena Vercel tidak mendukung koneksi WebSocket yang menetap.
- Konfigurasi Firebase web memang publik; keamanan data dijaga oleh `firestore.rules`.
- Login telepon di paket gratis dibatasi 10 SMS/hari.
