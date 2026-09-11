# Baekho Taekwondo Academy — one-page site (concept project)

Demo fiktif untuk bid Upwork + aset portfolio reusable.
Live target: `https://dojang.npaujiana.tech`

> **Concept project — fictional studio.** Nama, alamat, dan harga dummy.

## Arsitektur

Tanpa build step, tanpa framework. Sengaja — biar gampang di-handover ke klien non-teknis.

```
takewondo-landing-page/
├── index.html            # 7 section semantik, 1x <h1>, JSON-LD SportsActivityLocation
├── css/
│   ├── tokens.css        # SATU-SATUNYA tempat ubah warna/font/spasi (Konsep Belt Line)
│   ├── base.css          # reset + tipografi + focus ring + skip link
│   ├── layout.css        # container 1120px, .split, .stack, .belt-band
│   ├── components.css    # button, chip, nav, tabel→kartu, form, lightbox, map-lazy
│   └── sections.css      # style per-section (#hero, #about, …), scope ketat
├── js/
│   └── main.js           # 5 modul IIFE: header, lightbox, map-lazy, form, misc (<3KB gz)
├── assets/img/           # taruh foto asli klien di sini (lihat bawah)
├── favicon.svg
└── robots.txt
```

**Kenapa CSS dipecah 5 file, bukan 1?**
- `tokens.css` = kontrak desain. Klien/ganti brand cukup edit `:root`.
- `base/layout/components/sections` = urutan cascade eksplisit di `<link>`, tidak saling menimpa.
- Tetap 0 build step: deploy = drag folder ke Netlify / Cloudflare Pages.

**Konsep visual: Belt Line.** Tiap section dipisah band 8px yang warnanya naik
putih → kuning → hijau → biru → merah → hitam. Halaman = perjalanan murid.

## Cara edit (untuk klien)

| Mau ganti… | Edit… |
|---|---|
| Warna / font / lebar container | `css/tokens.css` → `:root` |
| Teks / jadwal / harga | `index.html` → cari `id="schedule"` |
| Foto | ganti file di `assets/img/`, pertahankan nama + `width/height` di `<img>` |
| Tujuan form | `index.html` → `data-web3forms-key` di `<form id="trialForm">` |
| No WA / telp | cari `wa.me` dan `tel:` di `index.html` (3 titik) |

## Form

1. Daftar gratis di web3forms.com → dapat access key.
2. Tempel ke `data-web3forms-key="..."` di form.
3. Deploy. Sudah ada honeypot (`company`) + rate-limit 10 detik + pesan sukses/error.

Tanpa key = mode demo (pesan jelas, tidak diam).

## Foto

Demo memakai hotlink Unsplash. Sebelum go-live klien **wajib ganti** dengan foto asli:
- `hero` 1600px landscape (kelas, bukan pose stok)
- `instructor` portrait 900px
- `gallery` 6 foto 1200px (dobok V-neck putih, matras puzzle, target pad)
- Kompres ke WebP (`hero.webp` dsb), pertahankan `width`/`height` + `alt`.

## Deploy

- Netlify / Cloudflare Pages: root = folder ini, build command kosong.
- Custom domain: `dojang.npaujiana.tech` → CNAME ke deploy URL.
- Tes: Lighthouse mobile Perf ≥ 95, A11y 100, SEO 100. Cek 360/390/768/1024/1440, matikan wifi untuk state error form.

## Clone untuk vertikal lain

Ganti `tokens.css` (belt → warna brand baru), ganti copy di `index.html`, ganti 8 foto. Struktur tidak berubah. Target: karate, gym, yoga, silat.
