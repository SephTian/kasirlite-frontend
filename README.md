CATATAN:

- Server-Side Files:

  1. API Routes:

  - app/api/<route>/route.ts (App Router, Next.js 13+)
  - pages/api/<route>.ts (Pages Router, Next.js 12+)
  - API Routes digunakan untuk menangani permintaan HTTP (misalnya autentikasi, pengambilan data dari database, dll.) dan dijalankan di server.

  2. Server-Side Rendering (SSR):

  - getServerSideProps: Fungsi ini hanya dijalankan di server dan dipanggil sebelum halaman dirender. Data yang diperoleh digunakan untuk merender halaman di server.

  3. Middleware:

  - Digunakan untuk menjalankan kode sebelum permintaan sampai ke handler atau halaman. Biasanya digunakan untuk pemeriksaan autentikasi atau redirect yang perlu diproses di server.

- Client-Side Files:
  1. Client Components:
  - File yang menggunakan 'use client' untuk menandakan bahwa komponen tersebut berjalan di sisi klien. Semua komponen yang membutuhkan interaktivitas pengguna (seperti menangani klik, input form, dll) umumnya berada di sisi klien.
  - app/page.tsx, app/about.tsx (jika menggunakan App Router) atau pages/index.tsx (jika menggunakan Pages Router) adalah file yang dapat berfungsi di sisi klien.
  2. Hooks dan State:
  - Menggunakan React hooks (useState, useEffect, dll) untuk menangani logika di sisi klien.
  - Misalnya, useEffect yang digunakan untuk menjalankan kode setelah komponen dimuat di browser.
  3. Client-Side API Calls:
  - Panggilan API yang dilakukan menggunakan fetch atau axios langsung dari komponen React di sisi klien.

NOTE:
kalau pake useSession() harus destruktur data dlu.
kalau pake getServerSession(authOption) langsung datanya.
