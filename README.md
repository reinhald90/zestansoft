# ZestanSoft Web

Website Next.js 14 App Router untuk brand ZestanSoft dan bot Telegram TreeZestan.

## Kebutuhan
- Node.js 20 LTS atau lebih baru
- npm
- Bot Telegram dan backend Express yang dapat diakses melalui HTTPS (untuk data live)

## Menjalankan secara lokal
1. Ekstrak folder proyek.
2. Salin `.env.example` menjadi `.env.local`.
3. Isi variabel environment dengan token baru yang aman dan URL backend kamu.
4. Jalankan `npm install`.
5. Jalankan `npm run dev`.
6. Buka http://localhost:3000.

Tanpa API backend, statistik menggunakan angka fallback dan fitur data akun/checkout tidak aktif.

## Deploy ke Vercel
1. Push folder proyek ke repositori GitHub.
2. Di Vercel pilih **Add New → Project**, lalu import repositori.
3. Framework akan terdeteksi sebagai Next.js.
4. Tambahkan `BOT_TOKEN`, `JWT_SECRET`, `NEXT_PUBLIC_BOT_API_URL`, dan variabel `NEXT_PUBLIC_*` yang diperlukan di Project Settings → Environment Variables.
5. Deploy. Jangan menaruh token rahasia di variabel `NEXT_PUBLIC_*`.
6. Uji halaman utama, endpoint `/api/stats`, autentikasi, dan koneksi API bot.

## Domain zestansoft.my.id
1. Tambahkan domain di Vercel Project → Settings → Domains.
2. Ikuti record DNS yang ditampilkan Vercel. Untuk apex domain biasanya berupa A record dan subdomain `www` berupa CNAME; gunakan nilai yang ditampilkan di dashboard karena dapat berubah.
3. Hapus record DNS lama yang bertentangan, simpan perubahan, lalu tunggu propagasi.
4. Setelah Vercel memverifikasi domain dan sertifikat TLS aktif, pilih domain utama/redirect sesuai kebutuhan.

## API backend
Website mengharapkan backend Express memiliki:
- `GET /api/public/stats`
- `GET /api/public/user/:id`
- `GET /api/public/leaderboard?type=richest|gamer|active|referral`
- `POST /api/public/ticket`
- `POST /api/public/checkout` (opsional, perlu dibuat di backend)

Pastikan backend menerapkan CORS, rate limiting, autentikasi server-to-server, validasi input, dan logging tanpa menyimpan rahasia ke log. Jangan membuka endpoint database SQLite langsung ke internet; akses SQLite harus tetap melalui backend API yang terautentikasi.

## Catatan autentikasi
Route `/api/auth` saat ini hanya menerima `initData` mentah yang diverifikasi HMAC dengan token bot. Telegram Login Widget klasik mengirim user/hash dengan pola berbeda dan memerlukan validator terpisah. Integrasikan widget sesuai metode Telegram yang dipilih; jangan mempercayai objek `telegramUser` dari browser saja.

## Pembayaran
Halaman Store hanya mengirim permintaan checkout ke backend. Jangan menampilkan QR atau nomor tujuan buatan dan jangan mengaktifkan barang berdasarkan tombol “Sudah Bayar” dari browser. Aktivasi harus berdasarkan webhook pembayaran terverifikasi atau pemeriksaan transaksi server-side.

## Keamanan token
Jika token bot asli pernah ditempel ke prompt, chat, commit, atau tempat yang bisa diakses orang lain, cabut/rotasi token lewat BotFather sebelum deploy. Simpan token baru hanya di `.env.local` dan Vercel Environment Variables.
