<div align="center">

# LAPORAN TUGAS BESAR DAN UJIAN AKHIR SEMESTER
## Manajemen Proyek Perangkat Lunak

<br><br><br>

### PROYEK PENGEMBANGAN SISTEM INFORMASI PENGADUAN LAYANAN KAMPUS (SIPELKAM)

<br><br><br>

**Disusun Oleh:**

Nama : [NAMA LENGKAP ANDA] <br>
NIM : [NIM ANDA] <br>
Kelas : [KELAS ANDA] <br>

<br><br><br>

**PROGRAM STUDI [NAMA PRODI]** <br>
**FAKULTAS [NAMA FAKULTAS]** <br>
**UNIVERSITAS XYZ** <br>
**2026**

</div>

---
<div style="page-break-after: always;"></div>

## DAFTAR ISI

1. [Cover](#)
2. [Daftar Isi](#daftar-isi)
3. [BAB 1 Pendahuluan](#bab-1-pendahuluan)
4. [BAB 2 Identifikasi Kebutuhan dan Ruang Lingkup Proyek](#bab-2-identifikasi-kebutuhan-dan-ruang-lingkup-proyek)
5. [BAB 3 Project Charter](#bab-3-project-charter)
6. [BAB 4 Work Breakdown Structure (WBS)](#bab-4-work-breakdown-structure-wbs)
7. [BAB 5 Jadwal, Sumber Daya, dan Anggaran](#bab-5-jadwal-sumber-daya-dan-anggaran)
8. [BAB 6 Penggunaan Tools Manajemen Proyek](#bab-6-penggunaan-tools-manajemen-proyek)
9. [BAB 7 Pengelolaan Tim dan Komunikasi Proyek](#bab-7-pengelolaan-tim-dan-komunikasi-proyek)
10. [BAB 8 Analisis Risiko dan Strategi Mitigasi](#bab-8-analisis-risiko-dan-strategi-mitigasi)
11. [BAB 9 Monitoring, Laporan Status, dan Evaluasi Proyek](#bab-9-monitoring-laporan-status-dan-evaluasi-proyek)
12. [BAB 10 Rencana Integrasi Modul dan Pengujian Awal](#bab-10-rencana-integrasi-modul-dan-pengujian-awal)
13. [BAB 11 Inovasi Proyek](#bab-11-inovasi-proyek)
14. [BAB 12 Kesimpulan](#bab-12-kesimpulan)
15. [Daftar Pustaka](#daftar-pustaka)
16. [Lampiran](#lampiran)

---
<div style="page-break-after: always;"></div>

## BAB 1 Pendahuluan

### A. Latar Belakang Masalah
Kualitas layanan di lingkungan Universitas XYZ merupakan faktor krusial dalam mendukung kelancaran aktivitas akademik maupun non-akademik. Saat ini, proses pengaduan mahasiswa terkait berbagai aspek seperti fasilitas, akademik, administrasi, jaringan internet, kebersihan, dan keamanan masih dilakukan secara tidak terpusat. Pengaduan sering kali disampaikan melalui pesan WhatsApp, email, atau bahkan laporan langsung secara lisan ke bagian terkait. Hal ini mengakibatkan proses pelacakan dan penanganan pengaduan menjadi tidak efisien.

### B. Identifikasi Masalah
Berdasarkan latar belakang di atas, dapat diidentifikasi beberapa permasalahan utama:
1. Status penyelesaian pengaduan sangat sulit untuk dilacak oleh mahasiswa.
2. Mahasiswa tidak memiliki akses untuk mengetahui sejauh mana perkembangan laporan yang telah mereka kirimkan.
3. Unit layanan terkait mengalami kesulitan dalam menentukan skala prioritas penanganan masalah.
4. Tidak adanya sistem pencatatan terpusat menyebabkan sulitnya membuat laporan rekapitulasi pengaduan secara berkala.
5. Pimpinan kampus kekurangan data historis dan analitik yang valid untuk mengevaluasi kualitas layanan secara komprehensif.

### C. Tujuan Proyek
Proyek pengembangan **Sistem Informasi Pengaduan Layanan Kampus (SIPELKAM)** ini bertujuan untuk:
1. Menyediakan sebuah platform (media) pengaduan layanan kampus yang terpusat dan terintegrasi.
2. Memudahkan mahasiswa dalam mengirimkan pengaduan serta memantau status penyelesaiannya secara transparan (real-time).
3. Membantu petugas atau unit terkait dalam menerima, mengkategorikan, memproses, dan mendokumentasikan penyelesaian pengaduan.
4. Memfasilitasi pimpinan kampus dalam memperoleh laporan rekapitulasi pengaduan secara periodik secara otomatis.
5. Meningkatkan transparansi, akuntabilitas, dan efektivitas pelayanan di lingkungan kampus.

### D. Manfaat Proyek
1. **Bagi Mahasiswa:** Mendapatkan kepastian atas laporan yang diajukan dan kemudahan akses informasi status penyelesaian.
2. **Bagi Unit Layanan:** Meningkatkan efisiensi kerja karena laporan sudah terfilter berdasarkan kategori dan prioritas.
3. **Bagi Pimpinan:** Memiliki landasan data yang kuat untuk pengambilan keputusan strategis terkait perbaikan infrastruktur dan layanan.

### E. Ruang Lingkup Awal Proyek
Ruang lingkup proyek ini dibatasi pada pengembangan aplikasi berbasis **Web** yang akan memakan waktu selama **8 minggu**. Fokus utama adalah pada penyediaan modul Login (Role-based), Form Pengaduan dengan upload gambar, Verifikasi Admin, Distribusi ke Petugas, Update Status, Notifikasi, Dashboard statistik, dan Pelaporan harian/mingguan/bulanan.

---
<div style="page-break-after: always;"></div>

## BAB 2 Identifikasi Kebutuhan dan Ruang Lingkup Proyek

### A. Stakeholder Proyek
| No | Stakeholder | Peran |
|---|---|---|
| 1 | Mahasiswa | Mengirim pengaduan, melampirkan bukti, dan memantau status laporan. |
| 2 | Admin Sistem | Memverifikasi kelengkapan laporan, mengelola data pengguna, mengelola kategori, dan mendistribusikan laporan. |
| 3 | Petugas Unit Layanan | Menerima laporan dari admin, menindaklanjuti pengaduan, memberikan tanggapan, dan mengupdate status penyelesaian. |
| 4 | Kepala Unit / Pimpinan | Melihat dashboard analitik, melihat rekapitulasi laporan, dan mengevaluasi kinerja layanan. |
| 5 | Project Manager | Merencanakan, menjadwalkan, mengelola sumber daya, memantau risiko, dan memastikan proyek selesai tepat waktu. |
| 6 | Tim Pengembang | Terdiri dari System Analyst, UI/UX, Programmer, Database Designer, dan Tester yang bertugas membangun sistem. |

### B. Teknik Pengumpulan Kebutuhan
Dalam proyek simulasi ini, teknik pengumpulan kebutuhan dilakukan melalui:
1. **Analisis Dokumen (Document Analysis):** Menganalisis studi kasus yang diberikan (dokumen soal).
2. **Brainstorming Internal (Simulasi):** Diskusi terarah bersama tim simulasi untuk menentukan alur terbaik yang memenuhi tujuan studi kasus.

### C. Kebutuhan Fungsional (KF)
| Kode | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| KF-01 | Sistem harus menyediakan fitur Login dengan akses (role) berbeda: Mahasiswa, Admin, Petugas, Pimpinan. | Tinggi |
| KF-02 | Sistem memungkinkan Mahasiswa mengisi form pengaduan (judul, kategori, deskripsi, lokasi, dan bukti foto). | Tinggi |
| KF-03 | Sistem memungkinkan Admin memverifikasi dan mendistribusikan laporan ke unit yang tepat. | Tinggi |
| KF-04 | Sistem memungkinkan Petugas merubah status pengaduan (Diajukan, Diverifikasi, Diproses, Selesai, Ditolak). | Tinggi |
| KF-05 | Sistem memungkinkan Petugas memberikan komentar/tanggapan pada laporan yang diproses. | Sedang |
| KF-06 | Sistem dapat mengirimkan notifikasi perubahan status kepada Mahasiswa. | Tinggi |
| KF-07 | Sistem menyediakan Dashboard statistik jumlah pengaduan berdasarkan kategori, status, dan waktu. | Sedang |
| KF-08 | Sistem dapat men-generate laporan pengaduan harian, mingguan, atau bulanan yang bisa diakses Pimpinan. | Sedang |

### D. Kebutuhan Non-Fungsional (KNF)
| Kode | Kebutuhan Non-Fungsional | Keterangan |
|---|---|---|
| KNF-01 | **Keamanan** | Akses menggunakan login terenkripsi dan role-based access control (RBAC). |
| KNF-02 | **Kemudahan Penggunaan** | Desain Antarmuka (UI) harus intuitif, responsif, dan mudah digunakan (User Friendly). |
| KNF-03 | **Kinerja Sistem** | Waktu muat (load time) halaman dashboard dan pencarian data maksimal 3 detik. |
| KNF-04 | **Ketersediaan** | Sistem dapat diakses 24/7 melalui browser standar (Chrome, Firefox, Safari). |
| KNF-05 | **Dokumentasi** | Terdapat user manual atau panduan penggunaan terintegrasi di dalam sistem. |

### E. Batasan Sistem
1. Sistem berbasis **Web**, tidak mencakup pembuatan aplikasi *Mobile native* (Android/iOS).
2. Proyek dirancang sebagai simulasi dan harus diselesaikan perencanaannya dalam jangka waktu **8 minggu**.

---
<div style="page-break-after: always;"></div>

## BAB 3 Project Charter

| Komponen | Isi |
|---|---|
| **Nama Proyek** | Sistem Informasi Pengaduan Layanan Kampus (SIPELKAM) |
| **Tujuan Proyek** | Menyediakan platform pengaduan kampus yang terpusat untuk memudahkan pemantauan, pelaporan, dan meningkatkan transparansi serta efektivitas pelayanan kampus. |
| **Durasi Proyek** | 8 Minggu (2 Bulan) |
| **Stakeholder** | Mahasiswa (End-user), Admin Sistem, Petugas Unit Layanan, Pimpinan Kampus (Sponsor/End-user), Tim Proyek. |
| **Output Proyek** | 1. Dokumen Perencanaan (WBS, Jadwal, RAB, Risiko). <br>2. Rancangan Antarmuka (Mockup/Wireframe). <br>3. Sistem berbasis Web yang siap di-deploy. <br>4. Laporan pengujian dan dokumentasi penggunaan. |
| **Batasan Proyek** | 1. Hanya berbasis Web. <br>2. Proses *payment* tidak ada dalam sistem. <br>3. Dikerjakan dengan durasi waktu ketat 8 minggu secara independen. |
| **Risiko Utama** | 1. Perubahan *scope* secara mendadak di pertengahan jalan (Scope Creep). <br>2. Keterlambatan pengerjaan jadwal yang berdampak domino. <br>3. Miskomunikasi antar anggota tim terkait detail fitur. |

---
<div style="page-break-after: always;"></div>

## BAB 4 Work Breakdown Structure (WBS)

| Level | Aktivitas |
|---|---|
| **1** | **Proyek Sistem Informasi Pengaduan Layanan Kampus (SIPELKAM)** |
| **1.1** | **Inisiasi Proyek** |
| 1.1.1 | Identifikasi dan perumusan masalah layanan kampus |
| 1.1.2 | Penentuan tujuan dan sasaran proyek |
| 1.1.3 | Penyusunan dokumen Project Charter |
| **1.2** | **Analisis Kebutuhan** |
| 1.2.1 | Identifikasi dan wawancara simulasi Stakeholder |
| 1.2.2 | Penyusunan dokumen Kebutuhan Fungsional (KF) |
| 1.2.3 | Penyusunan dokumen Kebutuhan Non-fungsional (KNF) |
| **1.3** | **Perancangan Sistem** |
| 1.3.1 | Perancangan alur proses bisnis (Flowchart / BPMN) |
| 1.3.2 | Perancangan struktur Database (ERD) |
| 1.3.3 | Perancangan UI/UX (Wireframe & Mockup) |
| **1.4** | **Pengembangan Sistem (Coding)** |
| 1.4.1 | Pembuatan Modul Manajemen User & Login |
| 1.4.2 | Pembuatan Modul Form Pengaduan (CRUD Laporan) |
| 1.4.3 | Pembuatan Modul Verifikasi & Distribusi Laporan (Admin) |
| 1.4.4 | Pembuatan Modul Update Status & Komentar (Petugas) |
| 1.4.5 | Pembuatan Modul Notifikasi, Dashboard, dan Laporan (Pimpinan) |
| **1.5** | **Pengujian (Testing)** |
| 1.5.1 | Pengujian Login & Hak Akses (Role) |
| 1.5.2 | Pengujian fungsionalitas Input Pengaduan & Upload |
| 1.5.3 | Pengujian siklus perubahan status dan notifikasi |
| 1.5.4 | Pengujian validitas output Laporan (PDF/Excel) |
| **1.6** | **Evaluasi dan Penutupan** |
| 1.6.1 | Evaluasi hasil User Acceptance Test (UAT) simulasi |
| 1.6.2 | Penyusunan laporan akhir proyek dan manual pengguna |
| 1.6.3 | Handover dan Presentasi akhir proyek |

---
<div style="page-break-after: always;"></div>

## BAB 5 Jadwal, Sumber Daya, dan Anggaran

### A. Jadwal Proyek (Gantt Chart Simulation)
Proyek berjalan selama 8 minggu dengan milestone sebagai berikut:

| Minggu | Aktivitas Utama (WBS Level 2) | PIC | Keterangan |
| :---: |---|---|---|
| **M1** | **1.1 Inisiasi Proyek** (Identifikasi masalah, Project Charter) | Project Manager | Kick-off proyek |
| **M2** | **1.2 Analisis Kebutuhan** (Identifikasi Stakeholder, KF & KNF) | System Analyst | Fixasi *Requirement* |
| **M3** | **1.3 Perancangan Sistem** (Flowchart, ERD, UI/UX Mockup) | Sys Analyst, UI/UX, DB Designer | Desain disetujui |
| **M4** | **1.4 Pengembangan Sistem (Tahap 1)** (Modul Login, Form Pengaduan, Verifikasi) | Programmer | Frontend & Backend setup |
| **M5** | **1.4 Pengembangan Sistem (Tahap 2)** (Update Status, Komentar, Notifikasi) | Programmer | Modul Interaktif |
| **M6** | **1.4 Pengembangan Sistem (Tahap 3)** (Dashboard, Cetak Laporan PDF/Excel) | Programmer | Modul Analitik |
| **M7** | **1.5 Pengujian (Testing)** (Uji kelayakan seluruh modul, perbaikan bug) | Tester | Sistem bebas Bug kritis |
| **M8** | **1.6 Evaluasi dan Penutupan** (Laporan Akhir, Presentasi, Dokumentasi) | Project Manager | Handover proyek |

### B. Perencanaan Sumber Daya (Tim Proyek)
| Peran | Tanggung Jawab |
|---|---|
| **Project Manager** | Mengelola keseluruhan jadwal, ruang lingkup, risiko, anggaran, dan komunikasi proyek. |
| **System Analyst** | Menerjemahkan keinginan klien (stakeholder) menjadi spesifikasi kebutuhan dan proses bisnis. |
| **UI/UX Designer** | Merancang antarmuka pengguna (Mockup/Prototipe) agar sistem mudah digunakan. |
| **Programmer** | Mengembangkan dan menulis kode (Frontend & Backend) untuk seluruh modul sistem. |
| **Database Designer** | Merancang arsitektur penyimpanan data (ERD, Tabel) yang optimal. |
| **Tester (QA)** | Melakukan pengujian sistem untuk memastikan tidak ada *bug* dan memenuhi spesifikasi. |

### C. Estimasi Anggaran (RAB)
| No | Komponen Biaya / Aktivitas | Estimasi Biaya (Rp) |
|:---:|---|---:|
| 1 | Analisis Kebutuhan & Desain Database | 1.000.000 |
| 2 | Perancangan UI/UX | 1.000.000 |
| 3 | Pengembangan Sistem (Programming) | 4.500.000 |
| 4 | Pengujian Sistem (Quality Assurance) | 750.000 |
| 5 | Sewa Cloud Hosting & Domain (1 Tahun) | 500.000 |
| 6 | Dokumentasi dan Pelatihan Pengguna | 250.000 |
| 7 | Cadangan Risiko Proyek (Contingency Fund) | 1.000.000 |
| | **Total Anggaran** | **9.000.000** |

---
<div style="page-break-after: always;"></div>

## BAB 6 Penggunaan Tools Manajemen Proyek

Dalam pengelolaan proyek ini, saya memilih **Trello** sebagai tool manajemen utama karena antarmukanya yang intuitif (berbasis Kanban), mempermudah pemantauan status pekerjaan (*To Do*, *Doing*, *Done*), serta mendukung kolaborasi tim dengan fitur *checklist*, *due date*, dan label prioritas.

### Struktur Board Trello
Board Trello dirancang dengan 5 kolom (List) utama:
1. **Backlog:** Berisi seluruh rincian pekerjaan (WBS) yang belum dijadwalkan secara spesifik.
2. **To Do:** Pekerjaan yang telah diprioritaskan untuk dikerjakan pada minggu berjalan.
3. **In Progress:** Pekerjaan yang sedang dieksekusi oleh anggota tim (PIC).
4. **Review/Testing:** Pekerjaan yang sudah selesai di-coding, namun masih menunggu verifikasi atau *testing* dari QA.
5. **Done:** Pekerjaan yang telah 100% selesai dan disetujui.

### Contoh Implementasi Card Trello
Berikut adalah detail salah satu *Card* pada kolom "In Progress" untuk aktivitas pengembangan:

| Elemen Card | Isi / Keterangan |
|---|---|
| **Nama Card** | **1.4.2 Membuat Modul Form Pengaduan** |
| **Deskripsi** | Merancang dan melakukan coding fitur input pengaduan mahasiswa (Frontend & Backend). Field: Judul, Kategori, Deskripsi, Lokasi, Upload Bukti Foto (Maks 2MB). |
| **Label** | 🔴 Prioritas Tinggi, 🔵 Pengembangan |
| **Checklist** | - [x] Setup form HTML/CSS <br>- [x] Integrasi database insert data <br>- [ ] Validasi ukuran dan format file foto <br>- [ ] Pesan sukses / error |
| **Due Date** | Akhir Minggu ke-4 |
| **PIC (Member)** | Programmer |
| **Status (Kolom)** | In Progress |

> [!NOTE]
> *(Screenshot Trello Board yang asli akan dilampirkan pada halaman Lampiran di akhir dokumen ini).*

---
<div style="page-break-after: always;"></div>

## BAB 7 Pengelolaan Tim dan Komunikasi Proyek

Keberhasilan proyek sangat bergantung pada kelancaran komunikasi. Mengingat durasi yang singkat (8 minggu), pola komunikasi diatur sebagai berikut:

1. **Daily Stand-up (15 Menit):** Dilakukan setiap pagi secara *online* untuk melaporkan apa yang dikerjakan kemarin, apa yang akan dikerjakan hari ini, dan hambatan yang dialami (Blocker).
2. **Weekly Review (1 Jam):** Pertemuan setiap akhir pekan (Jumat sore) antara PM dan seluruh tim untuk mengevaluasi progres mingguan dan memindahkan *Card* Trello ke kolom "Done" atau merencanakan sprint minggu depan.
3. **Tools Komunikasi:** 
   - **Trello:** Update progres pekerjaan.
   - **WhatsApp Group / Slack:** Komunikasi cepat harian.
   - **Google Meet / Zoom:** Meeting mingguan atau pembahasan teknis rumit.
   - **Google Drive:** Penyimpanan dokumen terpusat (Desain, Kebutuhan, Laporan).

---
<div style="page-break-after: always;"></div>

## BAB 8 Analisis Risiko dan Strategi Mitigasi

Berikut adalah identifikasi 8 risiko utama proyek beserta tingkat dan strategi mitigasinya:

| No | Risiko Proyek | Kategori | Dampak | Probabilitas | Strategi Mitigasi |
|:---:|---|---|---|---|---|
| 1 | **Kebutuhan pengguna (scope) berubah-ubah** secara signifikan di tengah pengembangan. | Scope | Tinggi | Sedang | Meminta pengesahan *Project Charter* & *Requirement* dari awal. Jika ada perubahan, terapkan *Change Control Process* yang ketat. |
| 2 | **Jadwal pengembangan terlambat** karena programmer kesulitan menemukan solusi teknis (Bug). | Waktu | Tinggi | Tinggi | Menerapkan pengerjaan fitur inti (Prioritas Tinggi) lebih dulu. Siapkan *buffer time* (waktu cadangan) di minggu ke-7. |
| 3 | **Data form pengaduan (upload foto) tidak terkirim** atau format salah sehingga membebani server. | Data / Teknis | Sedang | Sedang | Menambahkan validasi ketat di sisi *Frontend* & *Backend* (batas 2MB, ekstensi JPG/PNG) dan menangani *error handling*. |
| 4 | **Miskomunikasi antar peran** (misal: Programmer salah membaca desain UI/UX). | Komunikasi | Tinggi | Sedang | Wajibkan Programmer dan UI/UX Designer berdiskusi 15 menit sebelum coding sebuah modul dimulai. |
| 5 | **Bug/Error pada fitur perubahan status** yang memicu *looping* notifikasi berlebih. | Teknis | Tinggi | Rendah | *Tester (QA)* melakukan *Automated Testing* dan *Stress Test* khusus untuk fungsi notifikasi sebelum dirilis. |
| 6 | **Anggota tim inti (Programmer) jatuh sakit** di masa krusial (Minggu 4-6). | SDM | Tinggi | Rendah | Penerapan *Clean Code* dan Git Repository agar pekerjaan mudah dilanjutkan rekan lain (Back-up plan). |
| 7 | **Keterbatasan Anggaran Hosting** karena penggunaan *resource* yang mendadak tinggi (*Traffic spike*). | Biaya | Sedang | Rendah | Memilih layanan hosting *Scalable* bayar sesuai pemakaian (Pay-as-you-go) dan mengalokasikan "Cadangan Risiko Proyek". |
| 8 | **Risiko Keamanan Data Laporan (Kebocoran data / SQL Injection)**. | Keamanan | Sangat Tinggi | Sedang | Penggunaan *framework* modern yang tahan eksploitasi, *Prepared Statements* untuk Query SQL, dan *Role-Based Access Control* (RBAC) yang solid. |

---
<div style="page-break-after: always;"></div>

## BAB 9 Monitoring, Laporan Status, dan Evaluasi Proyek

Untuk memantau kesehatan proyek, PM akan menyusun laporan status. Berikut adalah contoh laporan progres proyek yang dibuat pada akhir **Minggu ke-4**:

| Komponen | Keterangan Status Proyek |
|---|---|
| **Periode Laporan** | Akhir Minggu ke-4 |
| **Progres Keseluruhan (%)** | **45%** |
| **Status Proyek** | 🟢 **On Track (Sesuai Jadwal)** |
| **Aktivitas yang Telah Selesai** | Inisiasi, Project Charter, Identifikasi Kebutuhan, Flowchart, ERD, Desain Antarmuka (Mockup). |
| **Aktivitas yang Sedang Berjalan** | Coding Tahap 1: Pembuatan Modul Login, Hak Akses, Modul Form Input Pengaduan (Sedang diselesaikan). |
| **Kendala yang Dihadapi** | Sempat terjadi kendala kecil terkait struktur database untuk fitur *multi-kategori* pengaduan, namun sudah terselesaikan. |
| **Solusi / Tindakan** | Melakukan normalisasi tabel database tambahan (Pivot table) pada hari Rabu lalu. |
| **Rencana Minggu Berikutnya (M5)**| Merampungkan fitur update status oleh Petugas, pembuatan sistem komentar, dan uji coba trigger Notifikasi. |

---
<div style="page-break-after: always;"></div>

## BAB 10 Rencana Integrasi Modul dan Pengujian Awal

Pengujian (*Testing*) dilakukan untuk memvalidasi bahwa modul-modul yang dibangun berfungsi sesuai dokumen Kebutuhan Fungsional (KF).

| No | Modul yang Diuji | Skenario Pengujian | Hasil yang Diharapkan |
|:---:|---|---|---|
| 1 | **Login & Role Access** | Pengguna memasukkan *username* dan *password* yang valid. Role = Admin. | Sistem berhasil login, sesi terbentuk, dan langsung diarahkan ke Dashboard Admin (Mahasiswa tidak bisa akses ini). |
| 2 | **Form Pengaduan** | Mahasiswa mengisi form lengkap, mengunggah foto .JPG 1MB, dan menekan 'Kirim'. | Data tersimpan di database, foto masuk ke direktori, muncul pesan "Laporan Berhasil Diajukan". Status = 'Diajukan'. |
| 3 | **Verifikasi Pengaduan** | Admin menekan tombol "Verifikasi & Teruskan" lalu memilih Unit IT. | Laporan berpindah dari antrian Admin ke antrian Petugas Unit IT. Status berubah menjadi 'Diverifikasi'. |
| 4 | **Update Status Laporan** | Petugas Unit IT mengubah status dari "Diverifikasi" menjadi "Selesai" dan memberi komentar "Kabel LAN telah diganti". | Status berhasil berubah, muncul di log riwayat laporan, dan notifikasi terkirim ke Mahasiswa pembuat laporan. |
| 5 | **Export Laporan (PDF)** | Pimpinan menekan filter Bulan "November" dan menekan tombol "Export PDF". | Browser secara otomatis mengunduh file PDF yang berisi tabel rapi rekapitulasi pengaduan bulan November. |

---
<div style="page-break-after: always;"></div>

## BAB 11 Inovasi Proyek

Untuk meningkatkan efektivitas Sistem Informasi Pengaduan Layanan Kampus (SIPELKAM), tim merencanakan 2 (dua) inovasi fitur unggulan yang melampaui batasan sistem aduan konvensional:

### 1. Integrasi Notifikasi WhatsApp (WhatsApp Gateway API)
**Deskripsi Inovasi:** 
Mahasiswa tidak perlu *login* ke sistem setiap hari hanya untuk mengecek apakah keluhannya sudah ditangani. Sistem akan diintegrasikan dengan WhatsApp API pihak ketiga (misal: Wablas / Fonnte).
**Manfaat:** 
Setiap kali status laporan berubah (misalnya: dari *Diproses* menjadi *Selesai*), sistem akan otomatis mengirimkan pesan WhatsApp ke nomor mahasiswa, memberikan rasa *real-time response* yang sangat transparan dan memuaskan pengguna.

### 2. Fitur "Smart Priority" Berbasis Kata Kunci (AI Sederhana)
**Deskripsi Inovasi:**
Daripada mengandalkan Admin manusia untuk menentukan keluhan mana yang "Mendesak", sistem akan dirancang memiliki logika pembobotan. Jika deskripsi laporan mahasiswa mengandung kata-kata spesifik seperti *"Kebakaran"*, *"Bocor parah"*, *"Ujian terganggu"*, atau *"Jaringan Mati Total"*, sistem akan otomatis menempelkan label **"PRIORITAS MERAH"** dan menempatkannya di urutan paling atas di dashboard petugas.
**Manfaat:**
Mencegah terjadinya keterlambatan fatal pada insiden yang bersifat sangat mendesak/berbahaya, mempercepat waktu respon unit layanan.

---
<div style="page-break-after: always;"></div>

## BAB 12 Kesimpulan

Berdasarkan rancangan dokumen manajemen proyek di atas, pengembangan Sistem Informasi Pengaduan Layanan Kampus (SIPELKAM) diproyeksikan dapat menyelesaikan permasalahan desentralisasi aduan di lingkungan kampus Universitas XYZ. Dengan anggaran yang realistis sebesar Rp 9.000.000 dan tenggat waktu 8 minggu, sistem ini sangat layak untuk dikembangkan.

Penggunaan metodologi yang terstruktur (melalui WBS dan Gantt Chart), dipadukan dengan alat bantu *Trello*, serta penerapan analisis risiko dan strategi mitigasi yang komprehensif, akan memastikan bahwa proyek ini terhindar dari keterlambatan kritis (Scope Creep) maupun pembengkakan biaya. Adanya inovasi seperti Notifikasi WhatsApp dan Smart Priority diyakini akan mendongkrak kepuasan mahasiswa secara signifikan.

---
<div style="page-break-after: always;"></div>

## Daftar Pustaka

1. Pressman, R. S., & Maxim, B. R. (2014). *Software Engineering: A Practitioner's Approach (8th ed.)*. McGraw-Hill Education.
2. Schwalbe, K. (2015). *Information Technology Project Management (8th ed.)*. Cengage Learning.
3. Panduan Tugas Besar Ujian Akhir Semester (UAS), Mata Kuliah Manajemen Proyek Perangkat Lunak, Tahun Ajaran Genap 2025/2026.

---
<div style="page-break-after: always;"></div>

## Lampiran

> *(Bagian ini disediakan untuk Anda menempelkan Screenshot Trello Board)*

**Lampiran 1: Screenshot Board Trello (Tampilan Keseluruhan Kolom Backlog hingga Done)**
<br><br>
*(Silakan Paste Gambar Anda di Sini)*
<br><br><br><br>

**Lampiran 2: Screenshot Detail Salah Satu Card (Menampilkan Deskripsi, Label, Checklist, Due Date, dan Member/PIC)**
<br><br>
*(Silakan Paste Gambar Anda di Sini)*
<br><br>

---
*(Akhir dari Dokumen Laporan)*
