import React, { useState } from "react";
import { 
  Database, Cpu, Route, FileCode, BarChart3, Copy, Check, Info, ShieldAlert, Terminal, Eye
} from "lucide-react";

interface ArchitectureGuideProps {
  onAddLog: (action: string) => void;
}

export default function ArchitectureGuide({ onAddLog }: ArchitectureGuideProps) {
  const [activeTab, setActiveTab] = useState<"erd" | "routing" | "controller" | "dashboard">("erd");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    onAddLog(`Mahasiswa menyalin blueprint kode: ${id}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // SQL Schema blueprint
  const sqlSchema = `-- =========================================================================
-- DATABASE BLUEPRINT: SYSTEM INFORMASI PENGADUAN LAYANAN KAMPUS (SIPELAK)
-- Target RDBMS: PostgreSQL (rekomendasi) atau MySQL
-- =========================================================================

-- 1. Tabel Users (Kredensial, Profil, dan Hak Akses Role-Based)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Di-hash menggunakan bcrypt/argon2
    role VARCHAR(50) NOT NULL DEFAULT 'Mahasiswa', -- 'Mahasiswa', 'Admin', 'Petugas', 'Pimpinan'
    nim VARCHAR(50) UNIQUE, -- Khusus Mahasiswa
    unit_name VARCHAR(100), -- Khusus Petugas (misal: 'Unit IT', 'Sarana Prasarana')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Categories (Manajemen Kategori oleh Admin)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Complaints (Form Pengaduan, Level Prioritas, Alur Status)
CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL, -- Format: SPK-YYYYMMDD-XXXX
    student_id INT REFERENCES users(id) ON DELETE SET NULL, -- Pembuat aduan (Mahasiswa)
    category_id INT REFERENCES categories(id) ON DELETE RESTRICT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    image_url VARCHAR(255), -- Path file bukti pengaduan yang di-upload
    status VARCHAR(50) NOT NULL DEFAULT 'Diajukan', -- 'Diajukan', 'Diverifikasi', 'Diproses', 'Selesai', 'Ditolak'
    priority VARCHAR(50) DEFAULT 'Sedang', -- 'Rendah', 'Sedang', 'Tinggi' (Ditentukan Admin saat verifikasi)
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL, -- Petugas Unit Penerima Distribusi Tugas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Comments (Sistem Komentar/Interaksi Tiket Pengaduan)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    complaint_id INT REFERENCES complaints(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Pengirim tanggapan (Mahasiswa/Petugas)
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Notifications (Sistem Peringatan Internal atas Perubahan Status)
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Penerima notifikasi
    complaint_id INT REFERENCES complaints(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  // Routing API guide data
  const apiRoutes = [
    { method: "POST", path: "/api/auth/login", desc: "Autentikasi akun pengguna dan penerbitan JSON Web Token (JWT) sesuai role." },
    { method: "POST", path: "/api/auth/register", desc: "Registrasi mahasiswa baru dengan menyertakan nama, email, NIM, dan password." },
    { method: "GET", path: "/api/complaints", desc: "Mendapatkan daftar seluruh laporan pengaduan (terfilter otomatis berdasarkan hak akses role)." },
    { method: "POST", path: "/api/complaints", desc: "Mengirimkan formulir pengaduan baru lengkap dengan data dan file upload bukti fisik." },
    { method: "GET", path: "/api/categories", desc: "Mendapatkan daftar seluruh kategori pengaduan yang aktif di kampus." },
    { method: "POST", path: "/api/categories", desc: "Admin menambah atau memperbarui kategori baru dalam sistem." },
    { method: "PUT", path: "/api/complaints/:id/verify", desc: "Admin memverifikasi laporan baru, menyetujui, menolak, serta menentukan prioritas kerja." },
    { method: "PUT", path: "/api/complaints/:id/distribute", desc: "Admin mendelegasikan tugas penanganan tiket ke petugas unit tertentu secara formal." },
    { method: "PUT", path: "/api/complaints/:id/status", desc: "Petugas unit mengubah status penanganan laporan (misal: dari Diproses ke Selesai)." },
    { method: "POST", path: "/api/complaints/:id/comments", desc: "Menambahkan interaksi tanggapan atau instruksi baru di dalam tiket." },
    { method: "GET", path: "/api/dashboard/stats", desc: "Pimpinan memanggil data komprehensif rekapitulasi performa & penyelesaian aduan." },
  ];

  // Form controller code example
  const controllerCode = `// =========================================================================
// NODE.JS & EXPRESS CONTROLLER: LOGIKA FORM PENGADUAN DENGAN UPLOAD FILE
// Library Pendukung: Express, Multer, UUID, dan DB Driver (pg / drizzle)
// =========================================================================

const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database'); // Koneksi DB Anda

const router = express.Router();

// 1. Konfigurasi Upload Engine dengan Multer (Validasi Format & Ukuran)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/complaints'); // Menyimpan ke folder aset server
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'bukti-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Format berkas salah! Hanya file gambar (JPG, PNG, WEBP) yang diizinkan.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file maks 5MB
    fileFilter: fileFilter
});

// 2. Handler POST /api/complaints (Simpan Pengaduan)
router.post('/api/complaints', upload.single('image_proof'), async (req, res) => {
    try {
        const { title, category_id, description, location } = req.body;
        const student_id = req.user.id; // Diambil dari JWT auth middleware

        // Validasi input wajib
        if (!title || !category_id || !description || !location) {
            return res.status(400).json({ 
                success: false, 
                message: "Seluruh kolom wajib (judul, kategori, deskripsi, lokasi) harus diisi!" 
            });
        }

        // Generate nomor tiket acak & terstruktur
        const today = new Date().toISOString().slice(0,10).replace(/-/g,"");
        const randomHex = uuidv4().substring(0, 4).toUpperCase();
        const ticket_number = \`SPK-\${today}-\${randomHex}\`;

        // Ambil nama file upload jika disediakan oleh mahasiswa
        const image_url = req.file ? \`/uploads/complaints/\${req.file.filename}\` : null;

        // Query INSERT ke Database Relasional
        const query = \`
            INSERT INTO complaints (ticket_number, student_id, category_id, title, description, location, image_url, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        \`;
        
        const values = [ticket_number, student_id, category_id, title, description, location, image_url, 'Diajukan'];
        const result = await db.query(query, values);
        const newComplaint = result.rows[0];

        // Buat sistem notifikasi awal untuk Admin kampus
        await db.query(
            \`INSERT INTO notifications (user_id, complaint_id, message) 
             SELECT id, $1, $2 FROM users WHERE role = 'Admin'\`,
            [newComplaint.id, \`Pengaduan baru \${ticket_number} telah dikirimkan oleh mahasiswa dan menunggu verifikasi.\`]
        );

        return res.status(201).json({
            success: true,
            message: "Pengaduan berhasil diajukan dengan nomor tiket: " + ticket_number,
            data: newComplaint
        });

    } catch (error) {
        console.error("Error creating complaint:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal sistem saat memproses pengaduan Anda.",
            error: error.message
        });
    }
});

module.exports = router;`;

  // Dashboard logic example
  const dashboardCode = `// =========================================================================
// NODE.JS API: LOGIKA AGREGASI DATA DASHBOARD VISUAL UNTUK PIMPINAN
// Menyajikan rekapitulasi statistik, penyelesaian tugas, dan kategori chart
// =========================================================================

const express = require('express');
const db = require('../config/database');
const router = express.Router();

router.get('/api/dashboard/stats', async (req, res) => {
    // Memastikan hanya Pimpinan dan Admin yang dapat mengakses endpoint ini
    if (req.user.role !== 'Pimpinan' && req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Akses ditolak! Menu khusus pimpinan." });
    }

    try {
        // Query 1: Total Pengaduan & Breakdown Status Utama
        const statusQuery = \`
            SELECT 
                COUNT(*) AS total_laporan,
                COUNT(CASE WHEN status = 'Diajukan' THEN 1 END) AS diajukan,
                COUNT(CASE WHEN status = 'Diverifikasi' THEN 1 END) AS diverifikasi,
                COUNT(CASE WHEN status = 'Diproses' THEN 1 END) AS diproses,
                COUNT(CASE WHEN status = 'Selesai' THEN 1 END) AS selesai,
                COUNT(CASE WHEN status = 'Ditolak' THEN 1 END) AS ditolak
            FROM complaints
        \`;
        const statusResult = await db.query(statusQuery);
        const statsSummary = statusResult.rows[0];

        // Query 2: Distribusi Pengaduan Berdasarkan Kategori (untuk Chart)
        const categoryQuery = \`
            SELECT 
                c.name AS category_name,
                COUNT(p.id) AS count
            FROM categories c
            LEFT JOIN complaints p ON c.id = p.category_id
            WHERE c.is_active = TRUE
            GROUP BY c.id, c.name
            ORDER BY count DESC
        \`;
        const categoryResult = await db.query(categoryQuery);

        // Query 3: Rekap Kinerja Penyelesaian Berdasarkan Prioritas
        const priorityQuery = \`
            SELECT 
                priority,
                COUNT(*) AS total,
                COUNT(CASE WHEN status = 'Selesai' THEN 1 END) AS selesai,
                ROUND((COUNT(CASE WHEN status = 'Selesai' THEN 1 END)::FLOAT / COUNT(*)::FLOAT) * 100, 2) AS completion_rate
            FROM complaints
            GROUP BY priority
        \`;
        const priorityResult = await db.query(priorityQuery);

        // Mengirimkan Response Payload Gabungan untuk dikonsumsi Charting Engine (Recharts/D3)
        return res.json({
            success: true,
            summary: {
                total: parseInt(statsSummary.total_laporan),
                open_tickets: parseInt(statsSummary.diajukan) + parseInt(statsSummary.diverifikasi) + parseInt(statsSummary.diproses),
                closed_tickets: parseInt(statsSummary.selesai),
                rejected_tickets: parseInt(statsSummary.ditolak),
                overall_completion_rate: statsSummary.total_laporan > 0 
                    ? Math.round((statsSummary.selesai / statsSummary.total_laporan) * 100) 
                    : 0
            },
            charts: {
                by_category: categoryResult.rows,
                by_priority: priorityResult.rows
            }
        });

    } catch (error) {
        console.error("Dashboard Aggregation Error:", error);
        return res.status(500).json({
            success: false,
            message: "Gagal menghimpun data analisis pimpinan."
        });
    }
});

module.exports = router;`;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
      
      {/* Tab Header Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md uppercase tracking-wider">Arsitektur & API</span>
            <span className="text-[10px] font-bold text-slate-400">| SISTEM INFORMASI AKADEMIK</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">Panduan Cetak Biru (Blueprint) Developer</h2>
          <p className="text-xs text-slate-500 mt-1">Dokumentasi skema database relasional, endpoints perutean (routes), dan controller logika backend untuk UAS / Tugas Besar Anda.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto shrink-0">
          <button 
            onClick={() => setActiveTab("erd")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "erd" ? "bg-white text-teal-700 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Skema ERD</span>
          </button>
          <button 
            onClick={() => setActiveTab("routing")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "routing" ? "bg-white text-teal-700 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>Routing API</span>
          </button>
          <button 
            onClick={() => setActiveTab("controller")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "controller" ? "bg-white text-teal-700 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Controller Form</span>
          </button>
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "dashboard" ? "bg-white text-teal-700 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Logika Dashboard</span>
          </button>
        </div>
      </div>

      {/* Interactive Tabs Content */}
      <div className="space-y-4">
        
        {/* TAB 1: ERD / SQL Schema */}
        {activeTab === "erd" && (
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center text-[11px] uppercase tracking-wider text-teal-700">
                  <Database className="w-4 h-4 mr-1.5 shrink-0" />
                  1. Integritas Relasional
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Semua tabel dihubungkan dengan <strong>Foreign Key (FK)</strong> yang kuat (e.g., <code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono">complaints.student_id</code> merujuk ke <code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono">users.id</code>) untuk mencegah inkonsistensi data pengaduan kampus.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center text-[11px] uppercase tracking-wider text-teal-700">
                  <Terminal className="w-4 h-4 mr-1.5 shrink-0" />
                  2. Optimasi Atribut
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Penyimpanan berkas bukti aduan menggunakan tipe data string <code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono">image_url</code>, menunjuk lokasi unggahan gambar (physical storage) alih-alih tipe BLOB untuk performa query yang kencang.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center text-[11px] uppercase tracking-wider text-teal-700">
                  <Cpu className="w-4 h-4 mr-1.5 shrink-0" />
                  3. Skalabilitas & Log audit
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Menyediakan timestamp global (<code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono">created_at</code> &amp; <code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono">updated_at</code>) pada setiap entitas untuk melacak durasi tindak lanjut SLA pelayanan kampus.
                </p>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-lg text-[11px] md:text-xs">
              <div className="bg-slate-950 text-slate-400 px-4 py-3 flex items-center justify-between font-mono font-bold tracking-wider border-b border-slate-800/60">
                <span className="flex items-center text-teal-400">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2.5 animate-pulse"></span>
                  POSTGRESQL_DDL_SCHEMA.sql
                </span>
                <button 
                  onClick={() => handleCopy(sqlSchema, "sqlSchema")}
                  className="hover:text-white transition-all p-1.5 bg-slate-900 rounded-md hover:bg-slate-800 flex items-center space-x-1"
                >
                  {copiedText === "sqlSchema" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[10px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-300 font-mono max-h-[400px] leading-relaxed select-all">
                {sqlSchema}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 2: Routing / URL Endpoints */}
        {activeTab === "routing" && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-800 flex items-start space-x-3">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5">Aturan Proteksi Router & Middleware:</strong>
                Seluruh endpoint di bawah wajib dilindungi oleh middleware verifikasi token JWT untuk mencegah penipuan identitas. Khusus endpoint yang diawali dengan kata <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono font-bold">Admin</code> atau <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono font-bold">Pimpinan</code> wajib memvalidasi isi kolom role pengguna demi keamanan data kampus.
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3">Method</th>
                    <th className="p-3">API Endpoint URL</th>
                    <th className="p-3">Hak Akses Role (RBAC)</th>
                    <th className="p-3">Deskripsi &amp; Kegunaan Teknis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {apiRoutes.map((route, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          route.method === "POST" ? "bg-emerald-50 text-emerald-700" :
                          route.method === "GET" ? "bg-sky-50 text-sky-700" :
                          route.method === "PUT" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"
                        }`}>
                          {route.method}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-800 text-[11px]">{route.path}</td>
                      <td className="p-3 text-slate-600 font-mono text-[10px]">
                        {route.path.includes("verify") || route.path.includes("distribute") || (route.path.includes("categories") && route.method === "POST") ? (
                          <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-bold">Admin</span>
                        ) : route.path.includes("dashboard") ? (
                          <span className="text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">Pimpinan, Admin</span>
                        ) : route.path.includes("status") ? (
                          <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold">Petugas Unit</span>
                        ) : route.path.includes("login") || route.path.includes("register") ? (
                          <span className="text-slate-400">Publik</span>
                        ) : (
                          <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded font-bold">Semua Role</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-500 leading-relaxed text-[11px] font-normal">{route.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Controller Form Upload */}
        {activeTab === "controller" && (
          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-sky-800 flex items-start space-x-3">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
              <div>
                <strong className="block mb-0.5">Penjelasan Struktur Controller Form Pengaduan:</strong>
                Logika backend ini menggunakan pustaka <strong>Multer</strong> untuk menyaring tipe file serta batas ukuran lampiran (maksimal 5MB) guna mencegah serangan Denial of Service (DoS) dari unggahan file sampah berukuran raksasa. Nama file diubah otomatis menggunakan UUID agar terhindar dari bentrok nama file (collision) di server.
              </div>
            </div>

            {/* Controller Code Container */}
            <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-lg text-[11px] md:text-xs">
              <div className="bg-slate-950 text-slate-400 px-4 py-3 flex items-center justify-between font-mono font-bold tracking-wider border-b border-slate-800/60">
                <span className="flex items-center text-teal-400">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2.5 animate-pulse"></span>
                  ComplaintController.js (Node.js/Express)
                </span>
                <button 
                  onClick={() => handleCopy(controllerCode, "controllerCode")}
                  className="hover:text-white transition-all p-1.5 bg-slate-900 rounded-md hover:bg-slate-800 flex items-center space-x-1"
                >
                  {copiedText === "controllerCode" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[10px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-300 font-mono max-h-[400px] leading-relaxed select-all">
                {controllerCode}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: Dashboard Aggregation Logic */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-xs text-teal-800 flex items-start space-x-3">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-teal-600" />
              <div>
                <strong className="block mb-0.5">Mengapa Logika Sisi Server Penting?</strong>
                Mengolah data statistik di database (agregasi SQL) jauh lebih cepat dan aman daripada mengunduh ribuan baris data transaksi mentah ke browser. Payload JSON yang dikembalikan oleh API ini siap dibaca langsung oleh pustaka visualisasi grafik di sisi client seperti <strong>Recharts</strong> atau <strong>D3.js</strong> yang ada di sistem SIPELAK ini.
              </div>
            </div>

            {/* Dashboard Code Container */}
            <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-lg text-[11px] md:text-xs">
              <div className="bg-slate-950 text-slate-400 px-4 py-3 flex items-center justify-between font-mono font-bold tracking-wider border-b border-slate-800/60">
                <span className="flex items-center text-teal-400">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2.5 animate-pulse"></span>
                  DashboardController.js (SQL Aggregation)
                </span>
                <button 
                  onClick={() => handleCopy(dashboardCode, "dashboardCode")}
                  className="hover:text-white transition-all p-1.5 bg-slate-900 rounded-md hover:bg-slate-800 flex items-center space-x-1"
                >
                  {copiedText === "dashboardCode" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[10px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-300 font-mono max-h-[400px] leading-relaxed select-all">
                {dashboardCode}
              </pre>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
