import React, { useState, useEffect } from "react";
import { 
  Compass, FileText, CheckCircle2, Bot, Sparkles, 
  Terminal, ShieldCheck, HelpCircle, LogOut, Clock, Code,
  BookOpen, Layers, Database
} from "lucide-react";
import PortalDemo from "./components/PortalDemo";
import PMHub from "./components/PMHub";
import ArchitectureGuide from "./components/ArchitectureGuide";

export default function App() {
  const [activeMode, setActiveMode] = useState<"portal" | "pmhub" | "architecture">("portal");
  const [logs, setLogs] = useState<string[]>([
    "Sistem inisialisasi: Berhasil mendeteksi core engine React v19 & Tailwind CSS.",
    "Database Simulator: Berhasil memuat 5 data laporan pengaduan awal dari LocalStorage.",
    "Koneksi AI Server: Siap memproses FAQ Chatbot & Laporan Generator menggunakan Gemini 3.5 Flash."
  ]);
  const [showLogs, setShowLogs] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Dynamic real-time ticking clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }) + " WIB");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour12: false });
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased selection:bg-teal-500/10 selection:text-teal-900">
      
      {/* Top Main Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Compass className="w-5.5 h-5.5 text-white animate-spin-slow" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm md:text-base">SIPELAK</span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm">V2.0</span>
              </div>
              <span className="text-[10px] text-slate-400 block font-medium">Sistem Pengaduan Kampus & PM Hub</span>
            </div>
          </div>

          {/* Core Navigation Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex space-x-1">
            <button
              onClick={() => {
                setActiveMode("portal");
                handleAddLog("Pengguna beralih ke Mode: Live Demo Sistem Pengaduan Kampus");
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeMode === "portal"
                  ? "bg-white text-teal-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Compass className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Demo Aplikasi</span>
              <span className="inline sm:hidden">Demo</span>
            </button>
            <button
              onClick={() => {
                setActiveMode("pmhub");
                handleAddLog("Pengguna beralih ke Mode: PM Hub & Document Generator (UAS)");
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeMode === "pmhub"
                  ? "bg-white text-teal-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Layers className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">PM Hub & Laporan UAS</span>
              <span className="inline sm:hidden">Laporan</span>
            </button>
            <button
              onClick={() => {
                setActiveMode("architecture");
                handleAddLog("Pengguna beralih ke Mode: Arsitektur Database & Cetak Biru API");
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeMode === "architecture"
                  ? "bg-white text-teal-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Database className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Arsitektur & API</span>
              <span className="inline sm:hidden">Arsitektur</span>
            </button>
          </div>

          {/* Quick Header Widget */}
          <div className="flex items-center space-x-4 text-right">
            <div className="hidden md:block">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Waktu Lokal Sistem</span>
              <span className="text-xs text-slate-600 font-mono font-medium flex items-center justify-end">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {currentTime}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Stage Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Visual intro card */}
        <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400 fill-teal-400" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-teal-400 font-mono">Tugas Besar & UAS MPPL</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {activeMode === "portal" 
                ? "Sistem Informasi Pengaduan Layanan Kampus" 
                : activeMode === "pmhub"
                ? "Project Management Hub & Generator Laporan UAS"
                : "Arsitektur Database & Cetak Biru API (Blueprint)"
              }
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {activeMode === "portal"
                ? "Aplikasi interaktif yang mengelola seluruh proses penanganan aduan akademik, fasilitas, IT, kebersihan, keamanan, dan administrasi dari awal laporan dikirimkan hingga diselesaikan."
                : activeMode === "pmhub"
                ? "Sistem pendukung perencanaan proyek MPPL. Memuat Project Charter, WBS, estimasi anggaran Rp9jt, matriks risiko, uji QA, simulator Trello, Gantt Chart, serta generator draf akademik bertenaga AI Gemini."
                : "Arsitektur database relasional PostgreSQL/MySQL lengkap, struktur perutean REST API endpoints (routes), kode contoh Controller Form Upload, serta logika agregasi Dashboard statistik untuk pimpinan."
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center space-x-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">PM & Developer</span>
                <span className="text-xs font-bold text-slate-200">Rian Hidayat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Mode Renderer */}
        {activeMode === "portal" ? (
          <PortalDemo onAddLog={handleAddLog} />
        ) : activeMode === "pmhub" ? (
          <PMHub onAddLog={handleAddLog} />
        ) : (
          <ArchitectureGuide onAddLog={handleAddLog} />
        )}

      </main>

      {/* Floating System Audit Logs Console Panel */}
      <div className="sticky bottom-0 z-30 w-full bg-slate-900 border-t border-slate-800 text-slate-400 font-mono shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 flex items-center justify-between">
            <button 
              onClick={() => {
                setShowLogs(!showLogs);
                handleAddLog(`Konsol audit log ${showLogs ? "ditutup" : "dibuka"}`);
              }}
              className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition-all focus:outline-hidden"
            >
              <Terminal className="w-4 h-4 text-teal-400" />
              <span>Sistem Audit Log & Aktivitas Proyek ({logs.length})</span>
            </button>
            <div className="flex items-center space-x-3 text-[10px]">
              <span className="text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-ping"></span>
                Node API: Live
              </span>
              <span className="text-teal-400">Environment: Sandbox</span>
            </div>
          </div>

          {/* Expandable Log List */}
          {showLogs && (
            <div className="pb-4 pt-1 max-h-40 overflow-y-auto text-[11px] space-y-1.5 border-t border-slate-800/80 text-slate-300">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start space-x-2 hover:bg-slate-800/50 px-2 py-0.5 rounded-sm transition-all">
                  <span className="text-teal-500 select-none shrink-0">&gt;</span>
                  <span className="whitespace-pre-wrap">{log}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Humble Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-auto">
        <p>© 2026 SIPELAK - Sistem Informasi Pengaduan Layanan Kampus. Proyek Manajemen Perangkat Lunak.</p>
        <p className="mt-1 font-mono text-[10px]">Powered by Google AI Studio Build & Gemini 3.5 Flash Model</p>
      </footer>

    </div>
  );
}
