# Baekho Martial Arts Academy

Website satu halaman untuk akademi bela diri fiktif di Sydney. Saya bikin ini sebagai demo sekaligus bahan portfolio. Studionya tidak benar-benar ada, jadi nama, alamat, dan harga yang tertulis di sini semuanya dummy.

Isi halamannya, urut dari atas ke bawah:

- Hero, judul, tombol trial gratis, dan info intake berikutnya
- Tentang pelatih, Master Daniel Suh, 5th Dan Kukkiwon
- Benefits, alasan kenapa orang tua memilih tempat ini
- Programs, jadwal dan harga per kelompok umur
- Gallery, foto suasana latihan di dojang
- Reviews, testimoni orang tua murid
- Contact, alamat, jam buka, form, plus link WhatsApp dan telepon
- Footer

Dibuat dengan HTML, CSS, dan JavaScript biasa. Tanpa framework, tanpa build step, jadi tinggal upload dan jalan.

## Struktur folder

```
index.html          semua section halaman ini
css/
  tokens.css        warna, font, ukuran. ubah desain dari sini.
  base.css          reset dan tipografi dasar
  layout.css        container, grid, jarak antar section
  components.css    tombol, tabel, kartu, form, galeri
  sections.css      style khusus tiap section
js/
  main.js           menu, galeri, peta, form. semuanya vanilla.
assets/img/         semua foto halaman ini
favicon.svg
robots.txt
```

CSS-nya saya pecah jadi beberapa file biar gampang dicari. Kalau mau ganti warna atau font, cukup buka `tokens.css` bagian paling atas. Sisanya tidak perlu disentuh.

## Kalau mau ubah isi

Teks, jadwal, dan harga semuanya ada di `index.html`. Cari saja id sectionnya, misalnya `id="programs"` untuk jadwal kelas.

Foto ada di `assets/img`. Kalau ganti foto, pakai nama file yang sama biar langsung kepakai tanpa edit HTML. Usahakan ukurannya mirip dengan foto lama supaya tampilannya tidak berubah.

Form butuh access key dari Web3Forms. Caranya daftar gratis, terus tempel key-nya ke atribut `data-web3forms-key` pada form di `index.html`. Kalau key belum diisi, form menampilkan pesan demo dan pengunjung tetap bisa menghubungi lewat WhatsApp yang ada di bawahnya.

Nomor WhatsApp dan telepon tersebar di beberapa titik. Cari tulisan `wa.me` dan `tel:` di `index.html`, ganti semuanya dengan nomor yang benar.

## Menjalankan lokal

Masuk ke folder project, lalu:

```
python -m http.server 8000
```

Buka `http://localhost:8000` di browser. Tidak perlu install apa-apa selain Python.
