import React, { useState } from "react";
import {
  Home,
  Lightbulb,
  Target,
  Puzzle,
  Settings,
  ClipboardCheck,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Monitor,
  Cpu,
  Layers,
  HardDrive,
  Keyboard,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";

// --- EFEK SUARA INTUITIF (Web Audio API) ---
const playTone = (type = "click") => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === "click") {
      osc.frequency.setValueAtTime(480, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "error") {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {}
};

export default function App() {
  // Scene Navigation:
  // 1: Cover, 2: Menu Utama, 3: Petunjuk, 4: Tujuan, 5: Pemantik 1, 6: Komponen Komputer (Materi 1),
  // 7: Klasifikasi, 8: Kasus 1, 9: Refleksi 1, 10: Pemantik 2, 11: Alur Kerja (IPOS), 12: CPU/RAM/Storage,
  // 13: Urutkan Proses, 14: Booting, 15: Kasus 2, 16: Evaluasi, 17: Rangkuman, 18: Pustaka
  const [currentScene, setCurrentScene] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const goTo = (sceneNo) => {
    if (soundEnabled) playTone("click");
    setCurrentScene(sceneNo);
  };

  return (
    <div className="relative h-screen max-h-screen w-screen max-w-full bg-gradient-to-b from-[#b5f2fd] via-[#c5f5fe] to-[#a8eefc] text-slate-800 font-sans flex flex-col justify-between overflow-hidden select-none p-2 sm:p-3 md:p-4">
      
      {/* 1. LATAR BELAKANG ORNAMEN SIRKUIT, BINER & GELEMBUNG BERGERAK */}
      <BackgroundTechCircuit />
      <FloatingBubbles />

      {/* 2. KONTROL AUDIO (POJOK KANAN ATAS) */}
      <div className="absolute top-3 right-3 z-50">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playTone("click");
          }}
          aria-label="Toggle Audio"
          className="p-2.5 rounded-full bg-white/90 border-2 border-cyan-400 shadow-md text-cyan-700 hover:scale-105 active:scale-95 transition flex items-center justify-center backdrop-blur-sm"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-cyan-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {/* 3. WADAH KONTEN UTAMA SCENE */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-between overflow-hidden min-h-0 py-1">
        {currentScene === 1 && <Scene1Cover onStart={() => goTo(2)} />}
        {currentScene === 2 && <Scene2MenuUtama onNavigate={goTo} />}
        {currentScene === 3 && <Scene3Petunjuk onPrev={() => goTo(2)} onHome={() => goTo(2)} onNext={() => goTo(4)} />}
        {currentScene === 4 && <Scene4Tujuan onPrev={() => goTo(3)} onHome={() => goTo(2)} onNext={() => goTo(5)} />}
        {currentScene === 5 && <Scene5Pemantik onPrev={() => goTo(4)} onHome={() => goTo(2)} onNext={() => goTo(6)} sound={soundEnabled} />}
        {currentScene === 6 && <Scene6Komponen onPrev={() => goTo(5)} onHome={() => goTo(2)} onNext={() => goTo(7)} sound={soundEnabled} />}
        {currentScene === 7 && <Scene7Klasifikasi onPrev={() => goTo(6)} onHome={() => goTo(2)} onNext={() => goTo(8)} sound={soundEnabled} />}
        {currentScene === 8 && <Scene8Kasus1 onPrev={() => goTo(7)} onHome={() => goTo(2)} onNext={() => goTo(9)} sound={soundEnabled} />}
        {currentScene === 9 && <Scene9Refleksi onPrev={() => goTo(8)} onHome={() => goTo(2)} onNext={() => goTo(10)} />}
        {currentScene === 10 && <Scene10Pemantik2 onPrev={() => goTo(9)} onHome={() => goTo(2)} onNext={() => goTo(11)} sound={soundEnabled} />}
        {currentScene === 11 && <Scene11AlurKerja onPrev={() => goTo(10)} onHome={() => goTo(2)} onNext={() => goTo(12)} sound={soundEnabled} />}
        {currentScene === 12 && <Scene12Peran onPrev={() => goTo(11)} onHome={() => goTo(2)} onNext={() => goTo(13)} />}
        {currentScene === 13 && <Scene13Urutan onPrev={() => goTo(12)} onHome={() => goTo(2)} onNext={() => goTo(14)} sound={soundEnabled} />}
        {currentScene === 14 && <Scene14Booting onPrev={() => goTo(13)} onHome={() => goTo(2)} onNext={() => goTo(15)} sound={soundEnabled} />}
        {currentScene === 15 && <Scene15Kasus2 onPrev={() => goTo(14)} onHome={() => goTo(2)} onNext={() => goTo(16)} sound={soundEnabled} />}
        {currentScene === 16 && <Scene16Evaluasi onPrev={() => goTo(15)} onHome={() => goTo(2)} onNext={() => goTo(17)} sound={soundEnabled} />}
        {currentScene === 17 && <Scene17Rangkuman onPrev={() => goTo(16)} onHome={() => goTo(2)} onNext={() => goTo(18)} />}
        {currentScene === 18 && <Scene18Pustaka onPrev={() => goTo(17)} onHome={() => goTo(2)} />}
      </div>

      {/* 4. FOOTER LOGO KEMENTERIAN */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-0.5 flex justify-between items-center pointer-events-none opacity-90 shrink-0 h-8">
        <TutWuriHandayaniLogo />
        <DinasPendidikanLogo />
      </div>
    </div>
  );
}

// =========================================================================
// GELEMBUNG-GELEMBUNG SABUN 3D MELAYANG & BERGERAK
// =========================================================================
function FloatingBubbles() {
  const bubbles = [
    { top: "6%", left: "5%", size: "w-16 h-16 sm:w-20 sm:h-20", delay: "0s", duration: "7s", color: "from-cyan-300/50 via-sky-200/30 to-blue-400/20" },
    { top: "14%", left: "84%", size: "w-20 h-20 sm:w-24 sm:h-24", delay: "1.2s", duration: "8.5s", color: "from-pink-300/50 via-rose-200/30 to-purple-300/20" },
    { top: "42%", left: "3%", size: "w-24 h-24 sm:w-28 sm:h-28", delay: "2.5s", duration: "9s", color: "from-purple-300/50 via-indigo-200/30 to-cyan-300/20" },
    { top: "65%", left: "88%", size: "w-24 h-24 sm:w-32 sm:h-32", delay: "0.8s", duration: "7.8s", color: "from-cyan-300/50 via-teal-200/30 to-emerald-300/20" },
    { top: "78%", left: "10%", size: "w-14 h-14 sm:w-18 sm:h-18", delay: "3.5s", duration: "6.5s", color: "from-amber-300/50 via-yellow-200/30 to-orange-300/20" },
    { top: "25%", left: "46%", size: "w-12 h-12 sm:w-16 sm:h-16", delay: "4.2s", duration: "8.2s", color: "from-emerald-300/50 via-teal-200/30 to-cyan-300/20" },
    { top: "82%", left: "52%", size: "w-20 h-20 sm:w-24 sm:h-24", delay: "2.0s", duration: "9.5s", color: "from-pink-300/50 via-cyan-200/30 to-purple-300/20" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b, idx) => (
        <div
          key={idx}
          style={{
            top: b.top,
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
          className={`absolute ${b.size} rounded-full bg-gradient-to-tr ${b.color} border-2 border-white/90 shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.8),0_10px_25px_rgba(6,182,212,0.3)] backdrop-blur-[2px] animate-bubble-wobble flex items-start justify-start p-2`}
        >
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/90 shadow-sm"></div>
        </div>
      ))}
    </div>
  );
}

function BackgroundTechCircuit() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute top-0 left-0 w-72 h-72 opacity-40 text-cyan-500" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0 20h40l20 20h40v40l20 20h40" />
        <circle cx="160" cy="100" r="4" fill="currentColor" />
        <path d="M0 60h30l20 20h30v30l30 30h20" />
        <circle cx="130" cy="140" r="3.5" fill="currentColor" />
      </svg>
      <svg className="absolute top-0 right-0 w-72 h-72 opacity-40 text-cyan-500" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M200 30h-40l-20 20h-40v40l-20 20h-30" />
        <circle cx="50" cy="110" r="4" fill="currentColor" />
      </svg>
      <div className="absolute top-12 left-1/4 text-cyan-600/30 text-xs font-mono font-bold animate-pulse">01101</div>
      <div className="absolute top-24 right-1/3 text-cyan-600/35 text-sm font-mono font-bold animate-float-slow">100101</div>
    </div>
  );
}

function PurbalinggaSealLogo() {
  return (
    <img
      src="/images/logo_purbalingga.png"
      alt="Logo Kabupaten Purbalingga"
      className="w-9 h-10 object-contain shrink-0 drop-shadow"
    />
  );
}

function SchoolSealLogo() {
  return (
    <img
      src="/images/logo_smp1kutasari.png"
      alt="Logo SMP Negeri 1 Kutasari"
      className="w-10 h-11 object-contain shrink-0 drop-shadow"
    />
  );
}

function TutWuriHandayaniLogo() {
  return (
    <div className="flex items-center gap-2 bg-white/85 px-3.5 py-1.5 rounded-full border border-cyan-300 shadow-sm backdrop-blur-sm">
      <svg className="w-7 h-7" viewBox="0 0 100 100">
        <polygon points="50,5 95,90 5,90" fill="#0284c7" />
        <circle cx="50" cy="45" r="18" fill="#eab308" />
        <path d="M30,75 C40,65 60,65 70,75" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <div className="text-[10px] font-black text-cyan-900 leading-tight">
        KURIKULUM<br />MERDEKA
      </div>
    </div>
  );
}

function DinasPendidikanLogo() {
  return (
    <div className="flex items-center gap-2 bg-white/85 px-3.5 py-1.5 rounded-full border border-cyan-300 shadow-sm backdrop-blur-sm">
      <div className="text-[10px] font-black text-right text-cyan-900 leading-tight">
        DINAS DIKBUD<br />PURBALINGGA
      </div>
      <PurbalinggaSealLogo />
    </div>
  );
}

function BerandaBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff3b68] to-[#ff5b79] border-3 border-white text-white font-black text-sm sm:text-base tracking-wider shadow-[0_4px_14px_rgba(255,59,104,0.4)] hover:scale-105 active:scale-95 transition"
    >
      <div className="p-1 bg-white/25 rounded-full">
        <Home className="w-4 h-4 text-white fill-white" />
      </div>
      <span>BERANDA</span>
    </button>
  );
}

function PinkTitleBadge({ title }) {
  return (
    <div className="inline-block px-7 sm:px-10 py-2.5 rounded-full bg-gradient-to-r from-[#ff3b68] to-[#ff5b79] border-4 border-white shadow-[0_6px_18px_rgba(255,59,104,0.35)]">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide text-center drop-shadow-sm font-display">
        {title}
      </h1>
    </div>
  );
}

function RobotMascot() {
  return (
    <div className="flex flex-col items-center animate-bounce-gentle relative group cursor-pointer">
      <div className="absolute -top-6 -left-4 w-7 h-7 rounded-full bg-cyan-300/60 border border-white backdrop-blur-xs animate-bubble-rise"></div>
      <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-pink-300/60 border border-white backdrop-blur-xs animate-bubble-wobble"></div>

      <div className="relative w-28 h-28 sm:w-36 sm:h-36 drop-shadow-2xl">
        <img
          src="/images/mascot_robot.jpg"
          alt="Robot Mascot 3D"
          className="w-full h-full object-contain rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition duration-300"
        />
        <div className="absolute -top-1 -right-1 bg-cyan-400 p-1.5 rounded-full border-2 border-white shadow-md animate-pulse">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// VECTOR ARTWORK PETUNJUK (PERSIS DENGAN REFERENSI GAMBAR PETUNJUK USER)
// =========================================================================

// Step 1: Target Bullseye Icon
function TargetBullseyeArt() {
  return (
    <svg className="w-16 h-16 shrink-0 drop-shadow-md" viewBox="0 0 100 100">
      <circle cx="45" cy="55" r="38" fill="#ffffff" stroke="#ef4444" strokeWidth="5" />
      <circle cx="45" cy="55" r="26" fill="#ef4444" />
      <circle cx="45" cy="55" r="14" fill="#ffffff" />
      <circle cx="45" cy="55" r="6" fill="#ef4444" />
      <line x1="85" y1="15" x2="45" y2="55" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <polygon points="85,15 70,20 80,30" fill="#1e293b" />
      <path d="M85 15 L95 10 M85 15 L90 25" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Step 2: Hands using Tablet Icon
function TouchscreenTabletArt() {
  return (
    <svg className="w-16 h-16 shrink-0 drop-shadow-md" viewBox="0 0 100 100">
      <rect x="25" y="10" width="50" height="75" rx="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="4" />
      <rect x="30" y="16" width="40" height="63" rx="4" fill="#ffffff" />
      {/* Tangan Kiri dan Kanan Memegang & Mengetuk */}
      <path d="M12 65 C12 50 25 45 28 58 L28 85 L12 85 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M88 65 C88 50 75 45 72 58 L72 85 L88 85 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <circle cx="50" cy="40" r="8" fill="none" stroke="#38bdf8" strokeWidth="3" className="animate-ping" />
      <circle cx="50" cy="40" r="4" fill="#0284c7" />
    </svg>
  );
}

// Step 3: Star Rating Feedback Document Icon
function StarFeedbackArt() {
  return (
    <svg className="w-16 h-16 shrink-0 drop-shadow-md" viewBox="0 0 100 100">
      <rect x="20" y="10" width="55" height="75" rx="6" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
      {/* 3 Bintang */}
      <path d="M30 25 L32 31 L38 31 L33 34 L35 40 L30 36 L25 40 L27 34 L22 31 L28 31 Z" fill="#eab308" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M47 25 L49 31 L55 31 L50 34 L52 40 L47 36 L42 40 L44 34 L39 31 L45 31 Z" fill="#eab308" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M64 25 L66 31 L72 31 L67 34 L69 40 L64 36 L59 40 L61 34 L56 31 L62 31 Z" fill="#eab308" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="30" y1="50" x2="65" y2="50" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="62" x2="55" y2="62" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      {/* Centang Hijau Bulat */}
      <circle cx="68" cy="70" r="16" fill="#22c55e" stroke="#1e293b" strokeWidth="3" />
      <path d="M60 70 L66 76 L76 64" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Step 4: Navigation Compass Icon
function NavigationCompassArt() {
  return (
    <svg className="w-16 h-16 shrink-0 drop-shadow-md" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="22" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
      <polygon points="50,32 55,50 50,46" fill="#ef4444" />
      <polygon points="50,68 55,50 50,54" fill="#3b82f6" />
      <polygon points="50,32 45,50 50,46" fill="#f87171" />
      <polygon points="50,68 45,50 50,54" fill="#60a5fa" />
      <circle cx="50" cy="50" r="4" fill="#1e293b" />
      {/* 4 Panah Arah Navigation */}
      <path d="M50,8 L50,22 M50,8 L44,14 M50,8 L56,14" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <path d="M50,92 L50,78 M50,92 L44,86 M50,92 L56,86" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <path d="M8,50 L22,50 M8,50 L14,44 M8,50 L14,56" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
      <path d="M92,50 L78,50 M92,50 L86,44 M92,50 L86,56" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function HardwareCardArt() {
  return (
    <div className="w-full h-32 sm:h-36 md:h-40 rounded-2xl overflow-hidden border-2 border-cyan-300 shadow-inner bg-cyan-50 relative group">
      <img
        src="/images/hardware.jpg"
        alt="Perangkat Keras Komputer Hardware 3D"
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-cyan-200 shadow-md text-center">
        <span className="text-[10px] sm:text-[11px] font-black text-cyan-900 font-display">🖥️ Fisik Dapat Disentuh</span>
      </div>
    </div>
  );
}

function SoftwareCardArt() {
  return (
    <div className="w-full h-32 sm:h-36 md:h-40 rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-600 via-sky-500 to-indigo-600 p-2.5 sm:p-3 flex flex-col justify-between shadow-inner relative overflow-hidden group">
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
            <div className="bg-red-500 rounded-xs"></div>
            <div className="bg-green-500 rounded-xs"></div>
            <div className="bg-blue-500 rounded-xs"></div>
            <div className="bg-yellow-500 rounded-xs"></div>
          </div>
          <span className="text-[11px] font-black text-slate-800 font-display">Windows OS</span>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] font-black text-white">
          Apps & System
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-1.5 border border-slate-700 shadow-lg z-10">
        <div className="flex gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <span className="text-[8px] font-mono text-slate-400 ml-1">chrome.exe — browser</span>
        </div>
        <div className="text-[9px] font-mono text-emerald-400 bg-black/60 p-1 rounded border border-slate-800">
          &gt; executing app_system.exe [OK]
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md px-3 py-0.5 rounded-xl border border-cyan-200 text-center z-10">
        <span className="text-[10px] sm:text-[11px] font-black text-cyan-900 font-display">💾 Program Digital & OS</span>
      </div>
    </div>
  );
}

function BrainwareCardArt() {
  return (
    <div className="w-full h-32 sm:h-36 md:h-40 rounded-2xl border-2 border-purple-300 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 p-2.5 sm:p-3 flex flex-col justify-between shadow-inner relative overflow-hidden group">
      <div className="flex justify-center items-center gap-2 sm:gap-3 my-auto z-10">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-lg sm:text-xl shadow-md">
            🧑🎓
          </div>
          <span className="text-[9px] sm:text-[10px] font-black text-white mt-0.5">Siswa</span>
        </div>
        <div className="flex flex-col items-center scale-105">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-200 border-3 border-white flex items-center justify-center text-xl sm:text-2xl shadow-xl">
            👨💻
          </div>
          <span className="text-[9px] sm:text-[10px] font-black text-yellow-300 mt-0.5">Programmer</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-lg sm:text-xl shadow-md">
            👩🏫
          </div>
          <span className="text-[9px] sm:text-[10px] font-black text-white mt-0.5">Guru</span>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md px-3 py-0.5 rounded-xl border border-purple-200 text-center z-10">
        <span className="text-[10px] sm:text-[11px] font-black text-purple-900 font-display">👨 Manusia Pengendali</span>
      </div>
    </div>
  );
}

function TujuanPembelajaranArt() {
  return (
    <div className="w-full h-36 sm:h-44 md:h-48 rounded-2xl border-3 border-cyan-300 bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 p-3 flex flex-col justify-between shadow-inner relative overflow-hidden group">
      <div className="flex justify-between items-center z-10">
        <div className="bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <span className="text-xs">🎯</span>
          <span className="text-[11px] font-black text-cyan-900 font-display">Target Belajar</span>
        </div>
        <div className="bg-yellow-400 border border-white text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-full shadow-xs font-display">
          TP 1 & TP 2
        </div>
      </div>

      <div className="my-auto flex items-center justify-center gap-2 sm:gap-3 z-10">
        <div className="flex flex-col items-center bg-white/25 backdrop-blur-md p-2 rounded-2xl border border-white/40 shadow-xs group-hover:scale-105 transition duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400 border-2 border-white flex items-center justify-center text-lg sm:text-xl shadow-md">
            🏆
          </div>
          <span className="text-[9px] font-black text-white mt-1 font-display">Komponen</span>
        </div>

        <div className="text-white text-base sm:text-lg font-black">➔</div>

        <div className="flex flex-col items-center bg-white/25 backdrop-blur-md p-2 rounded-2xl border border-white/40 shadow-xs group-hover:scale-105 transition duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-400 border-2 border-white flex items-center justify-center text-lg sm:text-xl shadow-md">
            ⚙️
          </div>
          <span className="text-[9px] font-black text-white mt-1 font-display">Alur IPOS</span>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white text-center z-10 shadow-xs">
        <span className="text-[10px] sm:text-[11px] font-black text-cyan-900 font-display">📘 Capaian Pembelajaran Fase D</span>
      </div>
    </div>
  );
}

function PertanyaanPemantikArt() {
  return (
    <div className="w-full h-36 sm:h-44 md:h-48 rounded-2xl border-3 border-purple-300 bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 p-3 flex flex-col justify-between shadow-inner relative overflow-hidden group">
      <div className="flex justify-between items-center z-10">
        <div className="bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <span className="text-xs">🤔</span>
          <span className="text-[11px] font-black text-purple-900 font-display">Rasa Ingin Tahu</span>
        </div>
        <div className="bg-emerald-400 border border-white text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-full shadow-xs font-display">
          Diskusi
        </div>
      </div>

      <div className="my-auto flex items-center justify-center gap-2.5 sm:gap-3 z-10">
        <div className="relative group-hover:scale-105 transition duration-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden bg-slate-900">
            <img
              src="/images/mascot_robot.jpg"
              alt="Mascot Robot Belajar"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -top-1 -right-1 bg-yellow-400 border border-white rounded-full px-1 text-xs shadow-md animate-bounce-gentle">
            ❓
          </div>
        </div>

        <div className="flex flex-col gap-0.5 text-left bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30 text-white max-w-[140px]">
          <span className="text-[10px] font-black font-display text-yellow-300">💡 Tahukah Kamu?</span>
          <span className="text-[9px] font-extrabold leading-tight">
            Komputer butuh Hardware, Software & Brainware!
          </span>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white text-center z-10 shadow-xs">
        <span className="text-[10px] sm:text-[11px] font-black text-purple-900 font-display">🧠 Mari Berpikir & Analisis</span>
      </div>
    </div>
  );
}

// =========================================================================
// SCENE 1: COVER
// =========================================================================
function Scene1Cover({ onStart }) {
  return (
    <div className="scene-card-wrapper rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#8ce4f8] via-[#9feafb] to-[#bbf1fd] border-4 border-white shadow-[0_12px_32px_rgba(2,132,199,0.25)] p-4 sm:p-6 md:p-8 text-center overflow-hidden flex-1 flex flex-col justify-between">
      
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto mb-3 relative z-20">
        <div className="flex items-center gap-2.5 bg-white/95 px-3.5 py-1.5 rounded-full border-2 border-slate-300 shadow-md">
          <PurbalinggaSealLogo />
          <div className="text-left">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              Pemerintah Kabupaten Purbalingga
            </h3>
            <p className="text-[10px] sm:text-xs font-bold text-slate-600">
              Dinas Pendidikan dan Kebudayaan
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white/95 p-1.5 rounded-full border-2 border-slate-300 shadow-md">
          <SchoolSealLogo />
        </div>
      </div>

      <div className="absolute top-20 right-4 sm:right-10 rotate-6 bg-white px-3 sm:px-4 py-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center z-10">
        <div className="w-6 h-3 bg-gradient-to-r from-slate-400 to-slate-200 rounded-t-md border border-slate-400 -mt-4 mb-1 shadow-inner"></div>
        <div className="text-[10px] font-black text-cyan-600 tracking-wider">FASE</div>
        <div className="text-lg sm:text-xl font-black text-cyan-800 font-display">D</div>
      </div>

      <div className="my-4 sm:my-6 relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#00a2c7] tracking-wider -rotate-1 mb-1 font-display drop-shadow-[0_6px_0px_#ffffff] text-shadow-canva">
          Sistem Komputer
        </h1>
        <h2 className="text-2xl sm:text-4xl font-black text-[#00a2c7] font-display drop-shadow-[0_4px_0px_#ffffff]">
          Kelas 9
        </h2>

        <div className="mt-4 inline-block px-6 sm:px-8 py-1 rounded-full bg-white/95 border-2 border-pink-300 text-[#00a2c7] font-black text-sm sm:text-base shadow-sm tracking-wide">
          Informatika
        </div>
      </div>

      <div className="mt-3 flex justify-center relative z-10">
        <button
          onClick={onStart}
          className="group flex items-center gap-3.5 bg-gradient-to-r from-[#ff3b68] to-[#ff5b79] hover:from-[#e62a56] hover:to-[#ff3b68] border-4 border-white px-8 py-3 rounded-full shadow-[0_8px_24px_rgba(255,59,104,0.45)] hover:scale-105 active:scale-95 transition"
        >
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-inner group-hover:scale-110 transition">
            <Play className="w-5 h-5 text-[#ff3b68] fill-[#ff3b68] ml-1" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-widest font-display">
            MULAI
          </span>
        </button>
      </div>

      <div className="mt-4 text-xs font-bold text-cyan-900/80 relative z-10">
        Penyusun: T. Angga Pradana, S.Kom • SMP N 1 Kutasari
      </div>
    </div>
  );
}

// =========================================================================
// SCENE 2: MENU UTAMA
// =========================================================================
function Scene2MenuUtama({ onNavigate }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex-1 flex flex-col justify-between">
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute left-0">
          <BerandaBtn onClick={() => onNavigate(1)} />
        </div>
        <PinkTitleBadge title="Menu Utama" />
      </div>

      <div className="w-full space-y-4 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <button
            onClick={() => onNavigate(3)}
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-white border-[5px] border-[#facc15] shadow-[0_8px_20px_rgba(250,204,21,0.3)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-left relative overflow-hidden"
          >
            <div className="p-3 bg-amber-100 rounded-2xl border-2 border-amber-300 group-hover:rotate-6 transition-transform shrink-0 shadow-sm">
              <Lightbulb className="w-9 h-9 sm:w-10 sm:h-10 text-amber-600 fill-amber-300 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 font-display">Petunjuk</h3>
              <p className="text-xs text-slate-500 font-bold">Panduan belajar MPI</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate(4)}
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-white border-[5px] border-[#3b82f6] shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-left relative overflow-hidden"
          >
            <div className="p-3 bg-blue-100 rounded-2xl border-2 border-blue-300 group-hover:rotate-6 transition-transform shrink-0 shadow-sm">
              <Target className="w-9 h-9 sm:w-10 sm:h-10 text-blue-600 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 leading-tight font-display">
                Tujuan<br />Pembelajaran
              </h3>
            </div>
          </button>

          <button
            onClick={() => onNavigate(5)}
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-white border-[5px] border-[#22c55e] shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-left relative overflow-hidden"
          >
            <div className="p-3 bg-emerald-100 rounded-2xl border-2 border-emerald-300 group-hover:rotate-6 transition-transform shrink-0 shadow-sm">
              <Puzzle className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600 fill-emerald-200 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-slate-800 block font-display">Materi 1</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 block leading-tight">Komponen Komputer</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate(10)}
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-white border-[5px] border-[#a855f7] shadow-[0_8px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-left relative overflow-hidden"
          >
            <div className="p-3 bg-purple-100 rounded-2xl border-2 border-purple-300 group-hover:rotate-6 transition-transform shrink-0 shadow-sm">
              <Settings className="w-9 h-9 sm:w-10 sm:h-10 text-purple-600 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-slate-800 block font-display">Materi 2</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 block leading-tight">Cara Kerja Komputer</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate(16)}
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-white border-[5px] border-[#06b6d4] shadow-[0_8px_20px_rgba(6,182,212,0.3)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-left relative overflow-hidden"
          >
            <div className="p-3 bg-cyan-100 rounded-2xl border-2 border-cyan-300 group-hover:rotate-6 transition-transform shrink-0 shadow-sm">
              <ClipboardCheck className="w-9 h-9 sm:w-10 sm:h-10 text-cyan-600 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-tight font-display">
                Rangkuman<br />& Evaluasi
              </h3>
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-1 pr-4">
        <RobotMascot />
      </div>
    </div>
  );
}

function WhiteBerandaBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#0284c7] text-[#0284c7] font-extrabold text-sm sm:text-base shadow-md hover:bg-cyan-50 active:scale-95 transition shrink-0"
    >
      <div className="w-7 h-7 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-sm">
        <Home className="w-4 h-4 stroke-[2.5]" />
      </div>
      <span className="tracking-wider">BERANDA</span>
    </button>
  );
}

function BottomNav({ onPrev, onHome, onNext, prevText = "Sebelumnya", nextText = "Lanjut" }) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto w-full px-2 sm:px-4 relative mt-auto py-1 sm:py-2 shrink-0 z-30">
      {onPrev ? (
        <button
          onClick={onPrev}
          className="px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] border-2 border-white text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition font-display shrink-0"
        >
          {prevText}
        </button>
      ) : (
        <div className="w-24 sm:w-32"></div>
      )}

      {/* KABEL SIRKUIT PENGHUBUNG 1 */}
      <div className="flex-1 hidden sm:flex items-center justify-center px-1">
        <svg className="w-full h-8 text-[#0284c7]" viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="0" y1="15" x2="120" y2="15" />
          <circle cx="20" cy="15" r="4" fill="currentColor" />
          <path d="M 60 15 L 60 5 M 60 5 L 75 5" />
          <circle cx="75" cy="5" r="3" fill="currentColor" />
          <circle cx="100" cy="15" r="4" fill="currentColor" />
        </svg>
      </div>

      {onHome && (
        <button
          onClick={onHome}
          className="px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] border-2 border-white text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition font-display shrink-0"
        >
          Beranda
        </button>
      )}

      {/* KABEL SIRKUIT PENGHUBUNG 2 */}
      <div className="flex-1 hidden sm:flex items-center justify-center px-1">
        <svg className="w-full h-8 text-[#0284c7]" viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="0" y1="15" x2="120" y2="15" />
          <circle cx="20" cy="15" r="4" fill="currentColor" />
          <path d="M 60 15 L 60 25 M 60 25 L 75 25" />
          <circle cx="75" cy="25" r="3" fill="currentColor" />
          <circle cx="100" cy="15" r="4" fill="currentColor" />
        </svg>
      </div>

      {onNext ? (
        <button
          onClick={onNext}
          className="px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] border-2 border-white text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition font-display shrink-0"
        >
          {nextText}
        </button>
      ) : (
        <div className="w-24 sm:w-32"></div>
      )}
    </div>
  );
}

// =========================================================================
// SCENE 3: PETUNJUK PENGGUNAAN (PERSIS GAMBAR REFERENSI PETUNJUK USER)
// =========================================================================
function Scene3Petunjuk({ onPrev, onHome, onNext }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      
      {/* HEADER BERANDA & KAPSUL PETUNJUK PENGGUNAAN */}
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0">
          <WhiteBerandaBtn onClick={onHome} />
        </div>
        <PinkTitleBadge title="Petunjuk Penggunaan" />
      </div>

      {/* KARTU UTAMA DENGAN ORNAMEN SIRKUIT BINGKAI & GRID 2x2 PETUNJUK */}
      <div className="relative bg-white rounded-[32px] border-4 border-white shadow-[0_12px_32px_rgba(2,132,199,0.2)] p-4 sm:p-5 max-w-4xl mx-auto w-full mb-2 overflow-y-auto min-h-0 flex-1 my-auto">
        
        {/* SIRKUIT DEKORATIF DENGAN BINTIK NODE DI POJOK ATAS KANAN & BAWAH KIRI */}
        <svg className="absolute top-3 right-4 w-56 h-36 pointer-events-none opacity-90 text-cyan-600" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M190 20 H60 Q30 20 30 50 V110" />
          <circle cx="190" cy="20" r="5" fill="currentColor" />
          <circle cx="150" cy="20" r="4" fill="currentColor" />
          <circle cx="120" cy="20" r="3.5" fill="currentColor" />
          <path d="M120 20 V35 H90" strokeWidth="2" />
          <circle cx="90" cy="35" r="3" fill="currentColor" />
          <circle cx="30" cy="80" r="4" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-3 left-4 w-56 h-36 pointer-events-none opacity-90 text-cyan-600" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 100 H140 Q170 100 170 70 V10" />
          <circle cx="10" cy="100" r="5" fill="currentColor" />
          <circle cx="50" cy="100" r="4" fill="currentColor" />
          <circle cx="80" cy="100" r="3.5" fill="currentColor" />
          <path d="M80 100 V85 H110" strokeWidth="2" />
          <circle cx="110" cy="85" r="3" fill="currentColor" />
          <circle cx="170" cy="40" r="4" fill="currentColor" />
        </svg>

        {/* GRID 2x2 PETUNJUK PENGGUNAAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 my-2">
          
          {/* PETUNJUK 1 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md font-display">
              1
            </div>
            <TargetBullseyeArt />
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-sans">
              Baca penjelasan konsep secara bertahap
            </p>
          </div>

          {/* PETUNJUK 2 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md font-display">
              2
            </div>
            <TouchscreenTabletArt />
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-sans">
              Ikuti instruksi aktivitas dan simulasi
            </p>
          </div>

          {/* PETUNJUK 3 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md font-display">
              3
            </div>
            <StarFeedbackArt />
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-sans">
              Periksa umpan balik skor pengerjaan
            </p>
          </div>

          {/* PETUNJUK 4 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md font-display">
              4
            </div>
            <NavigationCompassArt />
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-sans">
              Gunakan navigasi untuk berpindah halaman
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGASI BAWAH TERHUBUNG KABEL SIRKUIT (SEBELUMNYA • BERANDA • LANJUT) */}
      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

// =========================================================================
// SCENE 6: MATERI POKOK 1 (HARDWARE, SOFTWARE, BRAINWARE)
// =========================================================================
// =========================================================================
// SCENE 6: MATERI POKOK 1 (HARDWARE, SOFTWARE, BRAINWARE WITH INTERACTIVE MODALS)
// =========================================================================
function Scene6Komponen({ onPrev, onHome, onNext, sound }) {
  const [activeModal, setActiveModal] = useState(null); // 'hardware' | 'software' | 'brainware' | null

  const openModal = (key) => {
    setActiveModal(key);
    if (sound) playTone("click");
  };

  const closeModal = () => {
    setActiveModal(null);
    if (sound) playTone("click");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      
      {/* HEADER TOP BAR */}
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0">
          <WhiteBerandaBtn onClick={onHome} />
        </div>
        <PinkTitleBadge title="Komponen Sistem Komputer" />
      </div>

      {/* 3 INTERACTIVE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-2 flex-1 min-h-0 overflow-y-auto my-auto py-1">
        
        {/* CARD 1: HARDWARE */}
        <div
          onClick={() => openModal("hardware")}
          className="bg-white rounded-[28px] sm:rounded-[32px] border-4 border-[#0284c7] p-3.5 sm:p-4 shadow-xl flex flex-col items-center justify-between text-center hover:scale-105 active:scale-95 transition duration-300 cursor-pointer group hover:shadow-2xl"
        >
          <h3 className="text-lg sm:text-xl font-black text-[#0284c7] tracking-wider mb-2 font-display">
            HARDWARE
          </h3>
          <HardwareCardArt />
          <p className="text-xs font-bold text-slate-700 leading-relaxed mt-2">
            Perangkat fisik yang dapat dilihat, disentuh, dan dipindahkan.
          </p>
          <div className="mt-2 text-[11px] font-black text-cyan-800 bg-cyan-100 px-3 py-0.5 rounded-full border border-cyan-300">
            Contoh: CPU, Monitor, Keyboard
          </div>
        </div>

        {/* CARD 2: SOFTWARE */}
        <div
          onClick={() => openModal("software")}
          className="bg-white rounded-[28px] sm:rounded-[32px] border-4 border-[#06b6d4] p-3.5 sm:p-4 shadow-xl flex flex-col items-center justify-between text-center hover:scale-105 active:scale-95 transition duration-300 cursor-pointer group hover:shadow-2xl"
        >
          <h3 className="text-lg sm:text-xl font-black text-[#06b6d4] tracking-wider mb-2 font-display">
            SOFTWARE
          </h3>
          <SoftwareCardArt />
          <p className="text-xs font-bold text-slate-700 leading-relaxed mt-2">
            Program atau instruksi digital yang mengendalikan hardware.
          </p>
          <div className="mt-2 text-[11px] font-black text-cyan-800 bg-cyan-100 px-3 py-0.5 rounded-full border border-cyan-300">
            Contoh: Windows, Chrome, Word
          </div>
        </div>

        {/* CARD 3: BRAINWARE */}
        <div
          onClick={() => openModal("brainware")}
          className="bg-white rounded-[28px] sm:rounded-[32px] border-4 border-[#3b82f6] p-3.5 sm:p-4 shadow-xl flex flex-col items-center justify-between text-center hover:scale-105 active:scale-95 transition duration-300 cursor-pointer group hover:shadow-2xl"
        >
          <h3 className="text-lg sm:text-xl font-black text-[#3b82f6] tracking-wider mb-2 font-display">
            BRAINWARE
          </h3>
          <BrainwareCardArt />
          <p className="text-xs font-bold text-slate-700 leading-relaxed mt-2">
            Manusia yang mengoperasikan dan mengelola sistem komputer.
          </p>
          <div className="mt-2 text-[11px] font-black text-purple-800 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-300">
            Contoh: Murid, Guru, Programmer
          </div>
        </div>
      </div>

      {/* POPUP MODAL MATERI DETAIL */}
      {activeModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] border-4 border-white shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col justify-between p-4 sm:p-6 relative animate-scale-up"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-700 font-black text-base flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-600 transition shadow-sm font-display z-10"
            >
              ✕
            </button>

            {/* MODAL 1: HARDWARE */}
            {activeModal === "hardware" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-cyan-100 pb-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500 border-2 border-white flex items-center justify-center text-2xl shadow-md">
                    🖥️
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0284c7] font-display">
                      HARDWARE (Perangkat Keras)
                    </h2>
                    <p className="text-xs font-bold text-slate-500">
                      Seluruh komponen fisik sistem komputer yang nyata & dapat disentuh.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-cyan-50/80 rounded-2xl border border-cyan-200">
                    <h4 className="text-xs font-black text-cyan-900 font-display flex items-center gap-1.5 mb-1">
                      <span>⌨️</span> Perangkat Masukan (Input)
                    </h4>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Memasukkan data/perintah dari pengguna ke komputer.
                    </p>
                    <span className="text-[10px] font-bold text-cyan-700 block mt-1">
                      Contoh: Keyboard, Mouse, Scanner, Mikrofon.
                    </span>
                  </div>

                  <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-200">
                    <h4 className="text-xs font-black text-purple-900 font-display flex items-center gap-1.5 mb-1">
                      <span>⚙️</span> Perangkat Pemproses (Processing)
                    </h4>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Mengolah dan mengendalikan semua perhitungan data.
                    </p>
                    <span className="text-[10px] font-bold text-purple-700 block mt-1">
                      Contoh: CPU (Processor), RAM, Motherboard.
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                    <h4 className="text-xs font-black text-emerald-900 font-display flex items-center gap-1.5 mb-1">
                      <span>🖥️</span> Perangkat Keluaran (Output)
                    </h4>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Menampilkan hasil olahan data kepada pengguna.
                    </p>
                    <span className="text-[10px] font-bold text-emerald-700 block mt-1">
                      Contoh: Monitor, Speaker, Printer, Proyektor.
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
                    <h4 className="text-xs font-black text-amber-900 font-display flex items-center gap-1.5 mb-1">
                      <span>💾</span> Perangkat Penyimpanan (Storage)
                    </h4>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Menyimpan file dan OS secara permanen.
                    </p>
                    <span className="text-[10px] font-bold text-amber-700 block mt-1">
                      Contoh: SSD NVMe, Harddisk (HDD), Flashdisk.
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-cyan-100 rounded-2xl border border-cyan-300 text-center">
                  <p className="text-xs font-extrabold text-cyan-950">
                    💡 <strong>Catatan Penting:</strong> Hardware tidak dapat bekerja sendiri tanpa adanya instruksi dari <strong>Software</strong> dan pengguna <strong>Brainware</strong>!
                  </p>
                </div>
              </div>
            )}

            {/* MODAL 2: SOFTWARE */}
            {activeModal === "software" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-teal-100 pb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#06b6d4] border-2 border-white flex items-center justify-center text-2xl shadow-md text-white">
                    💾
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#06b6d4] font-display">
                      SOFTWARE (Perangkat Lunak)
                    </h2>
                    <p className="text-xs font-bold text-slate-500">
                      Kumpulan program digital & sekumpulan instruksi kode yang menjalankan hardware.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-start gap-3">
                    <span className="text-2xl p-2 bg-white rounded-xl border shadow-xs">🪟</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-sky-900 font-display">
                        1. Sistem Operasi (Operating System / OS)
                      </h4>
                      <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                        Software utama yang mengontrol seluruh resource komputer dan menjembatani pengguna dengan hardware.
                      </p>
                      <span className="text-[10px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full inline-block mt-1">
                        Contoh: Windows 11, macOS, Linux, Android
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-start gap-3">
                    <span className="text-2xl p-2 bg-white rounded-xl border shadow-xs">📄</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-indigo-900 font-display">
                        2. Perangkat Lunak Aplikasi (Application Software)
                      </h4>
                      <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                        Program yang dirancang khusus membantu tugas spesifik pengguna sehari-hari.
                      </p>
                      <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full inline-block mt-1">
                        Contoh: Google Chrome, Microsoft Word, Canva, Scratch
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0d9488]/10 rounded-2xl border border-teal-200 flex items-start gap-3">
                    <span className="text-2xl p-2 bg-white rounded-xl border shadow-xs">🛡️</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-teal-900 font-display">
                        3. Program Utilitas & Perkakas (Utility & Security)
                      </h4>
                      <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                        Program pemeliharaan kesehatan komputer dan proteksi dari ancaman virus.
                      </p>
                      <span className="text-[10px] font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full inline-block mt-1">
                        Contoh: Windows Defender, Antivirus, Driver Hardware
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-teal-100 rounded-2xl border border-teal-300 text-center">
                  <p className="text-xs font-extrabold text-teal-950">
                    💡 <strong>Catatan Penting:</strong> Software disimpan di dalam Storage dan akan dimuat sementara ke dalam <strong>RAM</strong> saat kamu membukanya!
                  </p>
                </div>
              </div>
            )}

            {/* MODAL 3: BRAINWARE */}
            {activeModal === "brainware" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#3b82f6] border-2 border-white flex items-center justify-center text-2xl shadow-md text-white">
                    👨💻
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#3b82f6] font-display">
                      BRAINWARE (Pengguna / Manusia)
                    </h2>
                    <p className="text-xs font-bold text-slate-500">
                      Unsur manusia yang mengoperasikan, memberi perintah, dan mengelola komputer.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">👨💻</span>
                      <h4 className="text-xs font-black text-purple-900 font-display">Programmer</h4>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Ahli yang membuat kode program dan mengembangkan aplikasi software baru.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">👨🔧</span>
                      <h4 className="text-xs font-black text-blue-900 font-display">Teknisi Komputer</h4>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Pakar yang merawat, merakit, dan memperbaiki kerusakan perangkat fisik hardware.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🧑🎓</span>
                      <h4 className="text-xs font-black text-amber-900 font-display">Operator / User</h4>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Pengguna akhir (Siswa, Guru, Pekerja) yang mengoperasikan aplikasi sehari-hari.
                    </p>
                  </div>

                  <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🌐</span>
                      <h4 className="text-xs font-black text-pink-900 font-display">System Administrator</h4>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      Pengelola yang mengatur jaringan komputer, database, dan sistem keamanan server.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-purple-100 rounded-2xl border border-purple-300 text-center">
                  <p className="text-xs font-extrabold text-purple-950">
                    🎉 <strong>Kesimpulan Utama:</strong> Tanpa <strong>Brainware</strong> (manusia), Hardware dan Software secanggih apapun tidak akan pernah berfungsi!
                  </p>
                </div>
              </div>
            )}

            {/* MODAL FOOTER CLOSE BUTTON */}
            <div className="mt-4 text-center border-t pt-3">
              <button
                onClick={closeModal}
                className="px-8 py-2 rounded-full bg-slate-800 text-white font-black text-xs hover:bg-cyan-700 transition font-display uppercase tracking-wider shadow-md"
              >
                TUTUP MATERI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGASI BAWAH SIRKUIT */}
      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

// =========================================================================
// SCENE LAINNYA
// =========================================================================
function Scene4Tujuan({ onPrev, onHome, onNext }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Tujuan Pembelajaran" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-2 flex-1 min-h-0 overflow-y-auto my-auto py-1">
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white p-3.5 sm:p-4 rounded-[32px] border-[5px] border-cyan-400 shadow-xl w-full max-w-sm flex flex-col items-center text-center">
            <TujuanPembelajaranArt />
            <div className="mt-2.5 text-xs font-black text-cyan-900 bg-cyan-100 px-4 py-1 rounded-full border border-cyan-300 font-display">
              Fase D • Informatika SMP
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-[28px] border-[5px] border-[#0284c7] p-4 sm:p-5 shadow-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl border-2 border-blue-300 shrink-0">
              <Target className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-display">
                TP 1: Mengidentifikasi Komponen Komputer
              </h3>
              <p className="text-xs sm:text-sm font-extrabold text-cyan-700 mt-0.5">
                • Hardware, Software, dan Brainware
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[28px] border-[5px] border-[#0284c7] p-4 sm:p-5 shadow-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl border-2 border-blue-300 shrink-0">
              <Target className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-display">
                TP 2: Menjelaskan Alur Kerja Sistem Komputer
              </h3>
              <p className="text-xs sm:text-sm font-extrabold text-cyan-700 mt-0.5">
                • Input, Process, Output, dan Storage (IPOS)
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene5Pemantik({ onPrev, onNext, onHome, sound }) {
  const [selected, setSelected] = useState(null);

  const handleChoose = (ans) => {
    setSelected(ans);
    if (sound) playTone(ans === "tidak" ? "success" : "error");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Pertanyaan Pemantik" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-2 flex-1 min-h-0 overflow-y-auto my-auto py-1">
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white p-3.5 sm:p-4 rounded-[32px] border-[5px] border-purple-400 shadow-xl w-full max-w-sm">
            <PertanyaanPemantikArt />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full p-6 sm:p-8 rounded-[36px] bg-white border-[5px] border-purple-300 shadow-2xl text-center">
            <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-snug font-display">
              Apakah komputer hanya terdiri dari perangkat keras fisik yang bisa disentuh?
            </h2>

            <div className="mt-5 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleChoose("ya")}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full border-3 border-white font-black text-base text-white shadow-lg transition font-display ${
                  selected === "ya"
                    ? "bg-red-500 scale-105"
                    : "bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:opacity-90"
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Ya</span>
              </button>

              <button
                onClick={() => handleChoose("tidak")}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full border-3 border-white font-black text-base text-white shadow-lg transition font-display ${
                  selected === "tidak"
                    ? "bg-emerald-500 scale-105"
                    : "bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:opacity-90"
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Tidak</span>
              </button>
            </div>
          </div>

          {selected && (
            <div className={`mt-3 p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-extrabold text-center max-w-lg ${
              selected === "tidak"
                ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                : "bg-amber-100 border-amber-400 text-amber-900"
            }`}>
              {selected === "tidak"
                ? "🎉 Jawabanmu Benar! Komputer butuh Software (program) dan Brainware (manusia) agar beroperasi!"
                : "💡 Belum tepat! Selain perangkat fisik, komputer butuh Software dan Brainware."}
            </div>
          )}
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

// =========================================================================
// VECTOR ARTWORKS FOR SCENE 7 KLASIFIKASI (MATCHING REFERENCE DESIGN)
// =========================================================================
function RamCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <g transform="rotate(-15 50 50)">
        <rect x="15" y="30" width="70" height="40" rx="5" fill="#22c55e" stroke="#15803d" strokeWidth="4" />
        <rect x="25" y="42" width="10" height="16" rx="2" fill="#15803d" />
        <rect x="40" y="42" width="10" height="16" rx="2" fill="#15803d" />
        <rect x="55" y="42" width="10" height="16" rx="2" fill="#15803d" />
        <rect x="70" y="42" width="10" height="16" rx="2" fill="#15803d" />
        <line x1="20" y1="62" x2="80" y2="62" stroke="#eab308" strokeWidth="5" strokeDasharray="5 3" />
      </g>
    </svg>
  );
}

function AntivirusCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <path d="M50 12 L82 25 V50 C82 70 50 86 50 86 C50 86 18 70 18 50 V25 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="4" />
      <path d="M50 20 L74 30 V48 C74 64 50 78 50 78 C50 78 26 64 26 48 V30 Z" fill="#93c5fd" />
      <path d="M36 48 L46 58 L64 38" fill="none" stroke="#15803d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProgrammerCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <circle cx="50" cy="30" r="14" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M36 24 C36 14 64 14 64 24 Z" fill="#334155" />
      <path d="M24 78 C24 58 36 50 50 50 C64 50 76 58 76 78 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
      <rect x="32" y="58" width="36" height="22" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="50" y="73" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
    </svg>
  );
}

function MonitorCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <rect x="15" y="16" width="70" height="50" rx="6" fill="#334155" stroke="#0f172a" strokeWidth="4" />
      <rect x="22" y="23" width="56" height="36" rx="3" fill="#0284c7" />
      <path d="M42 66 L36 80 H64 L58 66 Z" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
      <rect x="32" y="80" width="36" height="6" rx="2" fill="#334155" />
      <text x="50" y="46" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
    </svg>
  );
}

function WebBrowserCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <circle cx="50" cy="45" r="28" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
      <circle cx="50" cy="45" r="12" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
      <path d="M50 17 A28 28 0 0 1 74 31 L61 39 A12 12 0 0 0 50 33 Z" fill="#ef4444" />
      <path d="M74 31 A28 28 0 0 1 64 69 L56 56 A12 12 0 0 0 61 39 Z" fill="#eab308" />
      <path d="M64 69 A28 28 0 0 1 26 59 L39 51 A12 12 0 0 0 56 56 Z" fill="#22c55e" />
      <polygon points="62,55 82,75 72,77 78,90 71,93 65,80 57,85" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
    </svg>
  );
}

function TeknisiCardArt() {
  return (
    <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
      <circle cx="45" cy="35" r="14" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M30 28 C30 18 60 18 60 28 Z" fill="#eab308" stroke="#1e293b" strokeWidth="3" />
      <rect x="25" y="27" width="40" height="6" rx="3" fill="#f59e0b" />
      <path d="M22 80 C22 62 32 55 45 55 C58 55 68 62 68 80 Z" fill="#0284c7" stroke="#1e293b" strokeWidth="3" />
      <rect x="62" y="60" width="28" height="20" rx="4" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
      <path d="M72 60 V55 C72 53 80 53 80 55 V60" fill="none" stroke="#1e293b" strokeWidth="3" />
      <path d="M80 35 L88 43 M86 37 L90 41" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function ZonaHardwareIcon() {
  return (
    <svg className="w-14 h-14 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
      <circle cx="42" cy="42" r="16" strokeWidth="5" />
      <path d="M42 18 V26 M42 58 V66 M18 42 H26 M58 42 H66 M25 25 L31 31 M53 53 L59 59 M25 59 L31 53 M53 31 L59 25" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 75 L75 50 M70 45 L80 55 C85 50 82 40 75 45 Z" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ZonaSoftwareIcon() {
  return (
    <svg className="w-14 h-14 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
      <rect x="20" y="20" width="60" height="60" rx="8" />
      <line x1="20" y1="36" x2="80" y2="36" />
      <circle cx="28" cy="28" r="2.5" fill="currentColor" />
      <circle cx="36" cy="28" r="2.5" fill="currentColor" />
      <circle cx="44" cy="28" r="2.5" fill="currentColor" />
      <rect x="28" y="44" width="24" height="28" rx="4" fill="currentColor" opacity="0.3" />
      <rect x="58" y="44" width="14" height="12" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="58" y="60" width="14" height="12" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function ZonaBrainwareIcon() {
  return (
    <svg className="w-14 h-14 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
      <circle cx="45" cy="35" r="16" fill="#a78bfa" stroke="#4c1d95" strokeWidth="4" />
      <circle cx="45" cy="30" r="6" fill="#ffffff" />
      <path d="M35 44 C35 38 55 38 55 44 Z" fill="#ffffff" />
      <circle cx="30" cy="72" r="10" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <circle cx="55" cy="74" r="10" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <circle cx="76" cy="72" r="10" fill="#4ade80" stroke="#1e293b" strokeWidth="3" />
    </svg>
  );
}

// =========================================================================
// SCENE 7: AKTIVITAS KLASIFIKASIKAN (DRAG & DROP + CLICK UNTUK SEMUA DEVICE)
// =========================================================================
function Scene7Klasifikasi({ onPrev, onNext, onHome, sound }) {
  const initialItems = [
    { id: "ram", name: "RAM", cat: "hardware", Art: RamCardArt },
    { id: "antivirus", name: "Antivirus", cat: "software", Art: AntivirusCardArt },
    { id: "programmer", name: "Programmer", cat: "brainware", Art: ProgrammerCardArt },
    { id: "monitor", name: "Monitor", cat: "hardware", Art: MonitorCardArt },
    { id: "browser", name: "Web Browser", cat: "software", Art: WebBrowserCardArt },
    { id: "teknisi", name: "Teknisi", cat: "brainware", Art: TeknisiCardArt },
  ];

  const [pool, setPool] = useState(initialItems);
  const [bins, setBins] = useState({ hardware: [], software: [], brainware: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoreInfo, setScoreInfo] = useState(null);

  const handleSelectItem = (item) => {
    if (submitted) return;
    setSelectedItem(selectedItem?.id === item.id ? null : item);
    if (sound) playTone("click");
  };

  const moveItemToZone = (item, targetZoneKey) => {
    if (!item) return;
    setPool((prev) => prev.filter((i) => i.id !== item.id));
    setBins((prev) => {
      const nextBins = {
        hardware: prev.hardware.filter((i) => i.id !== item.id),
        software: prev.software.filter((i) => i.id !== item.id),
        brainware: prev.brainware.filter((i) => i.id !== item.id),
      };
      nextBins[targetZoneKey].push(item);
      return nextBins;
    });
    setSelectedItem(null);
    if (sound) playTone("click");
  };

  const moveItemToPool = (item) => {
    if (submitted) return;
    setBins((prev) => ({
      hardware: prev.hardware.filter((i) => i.id !== item.id),
      software: prev.software.filter((i) => i.id !== item.id),
      brainware: prev.brainware.filter((i) => i.id !== item.id),
    }));
    setPool((prev) => [...prev, item]);
    if (sound) playTone("click");
  };

  const handleDragStart = (e, item) => {
    if (submitted) return;
    setDraggedItem(item);
    e.dataTransfer.setData("text/plain", item.id);
  };

  const handleDrop = (e, targetZoneKey) => {
    e.preventDefault();
    if (submitted) return;
    if (draggedItem) {
      moveItemToZone(draggedItem, targetZoneKey);
      setDraggedItem(null);
    } else if (selectedItem) {
      moveItemToZone(selectedItem, targetZoneKey);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const totalCount = initialItems.length;

    Object.keys(bins).forEach((zoneKey) => {
      bins[zoneKey].forEach((item) => {
        if (item.cat === zoneKey) {
          correctCount++;
        }
      });
    });

    setSubmitted(true);
    setScoreInfo({ correct: correctCount, total: totalCount });
    if (sound) playTone(correctCount === totalCount ? "success" : "error");
  };

  const handleReset = () => {
    setPool(initialItems);
    setBins({ hardware: [], software: [], brainware: [] });
    setSelectedItem(null);
    setDraggedItem(null);
    setSubmitted(false);
    setScoreInfo(null);
    if (sound) playTone("click");
  };

  const zones = [
    { key: "hardware", title: "Zona Hardware", IconComp: ZonaHardwareIcon, items: bins.hardware },
    { key: "software", title: "Zona Software", IconComp: ZonaSoftwareIcon, items: bins.software },
    { key: "brainware", title: "Zona Brainware", IconComp: ZonaBrainwareIcon, items: bins.brainware },
  ];

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      
      {/* HEADER TOP BAR WITH LOGOS AND TITLE BADGE */}
      <div className="relative flex items-center justify-between mb-2 shrink-0">
        <WhiteBerandaBtn onClick={onHome} />

        {/* TITLE BADGE DENGAN IKON MEMORI STICK & AKTIVITAS */}
        <div className="flex items-center gap-2 px-5 sm:px-6 py-1.5 rounded-full bg-gradient-to-r from-[#ff3b68] to-[#ff5b79] border-3 border-white shadow-md">
          <div className="bg-emerald-400 p-1 rounded-lg border border-white text-xs font-bold text-white shadow-xs">
            📟
          </div>
          <h1 className="text-base sm:text-xl font-black text-white tracking-wide font-display text-center">
            Aktivitas: Klasifikasikan!
          </h1>
          <div className="bg-amber-400 p-1 rounded-lg border border-white text-xs font-bold text-slate-900 shadow-xs">
            👨💻
          </div>
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-cyan-400 text-cyan-800 text-xs font-black shadow-sm hover:bg-cyan-200 transition font-display"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* MIDDLE SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto min-h-0 py-1 px-1 space-y-2 pr-1">
        {/* TOP OBJECT POOL CONTAINER (GLOSSY BLUE CARD POOL) */}
        <div className="bg-[#e0f2fe] rounded-2xl border-3 border-[#bae6fd] p-2.5 sm:p-3 shadow-inner relative min-h-[80px]">
          {pool.length === 0 ? (
            <div className="w-full py-3 flex flex-col items-center justify-center text-center">
              <span className="text-xs sm:text-sm font-black text-cyan-800 font-display">
                ✨ Semua objek telah dimasukkan ke dalam Zona! Klik "SUBMIT JAWABAN" di bawah.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {pool.map((item) => {
                const { id, name, Art } = item;
                const isSelected = selectedItem?.id === id;
                return (
                  <div
                    key={id}
                    draggable={!submitted}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => handleSelectItem(item)}
                    className={`relative p-2 rounded-2xl border-2 transition duration-200 cursor-grab active:cursor-grabbing flex flex-col items-center justify-between min-h-[95px] select-none ${
                      isSelected
                        ? "bg-gradient-to-b from-sky-200 via-sky-300 to-cyan-400 border-yellow-400 scale-105 shadow-xl ring-4 ring-yellow-300/60"
                        : "bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#93c5fd] border-white shadow-md hover:scale-105 hover:shadow-lg"
                    }`}
                  >
                    <Art />
                    <span className="text-xs font-black text-slate-900 mt-1 font-display tracking-wide text-center">
                      {name}
                    </span>

                    {/* HAND POINTER CURSOR ICON AT BOTTOM RIGHT (PER GAMBAR USER) */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs">
                      <span className="text-[9px]">👆</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* THREE ZONES (ZONA HARDWARE, ZONA SOFTWARE, ZONA BRAINWARE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {zones.map((zone) => {
            const { key, title, IconComp, items } = zone;
            const isTargeted = selectedItem !== null;
            return (
              <div
                key={key}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, key)}
                onClick={() => selectedItem && moveItemToZone(selectedItem, key)}
                className={`rounded-2xl border-3 border-[#bae6fd] bg-[#e0f2fe] p-3 shadow-md flex flex-col justify-between min-h-[140px] transition ${
                  isTargeted ? "cursor-pointer hover:border-cyan-500 hover:bg-cyan-100/70" : ""
                }`}
              >
                <h3 className="text-sm sm:text-base font-black text-slate-900 text-center mb-1.5 font-display">
                  {title}
                </h3>

                {/* DASHED RECTANGLE INNER DROP BOX */}
                <div className="flex-1 rounded-xl border-2 border-dashed border-slate-400 bg-white/60 p-2 flex flex-col items-center justify-center min-h-[85px] relative overflow-hidden">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-1">
                      <IconComp />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 justify-center items-center w-full z-10">
                      {items.map((it) => {
                        const isCorrect = it.cat === key;
                        return (
                          <div
                            key={it.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItemToPool(it);
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border-2 shadow-xs cursor-pointer transition hover:scale-105 ${
                              submitted
                                ? isCorrect
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                                  : "bg-red-100 border-red-500 text-red-900"
                                : "bg-white border-cyan-400 text-slate-800"
                            }`}
                          >
                            <it.Art />
                            <span className="text-xs font-black font-display">{it.name}</span>
                            {submitted && (
                              isCorrect ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-red-600 ml-0.5" />
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SCORE FEEDBACK BANNER */}
        {submitted && scoreInfo && (
          <div className={`p-2.5 rounded-2xl border-2 text-center text-xs sm:text-sm font-black font-display shadow-md ${
            scoreInfo.correct === scoreInfo.total
              ? "bg-emerald-100 border-emerald-500 text-emerald-900"
              : "bg-amber-100 border-amber-500 text-amber-900"
          }`}>
            {scoreInfo.correct === scoreInfo.total
              ? `🎉 Luar Biasa! Semua ${scoreInfo.total} komponen berhasil dikelompokkan dengan Sempurna! (Skor 100/100)`
              : `💡 Skor: ${scoreInfo.correct} dari ${scoreInfo.total} benar. Periksa item bertanda merah dan coba lagi!`}
          </div>
        )}

        {/* SUBMIT BUTTON & MASCOT ROBOT */}
        <div className="flex flex-col items-center justify-center my-1 relative z-10">
          <button
            onClick={handleSubmit}
            className="px-10 sm:px-14 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] border-3 border-white text-white font-black text-base sm:text-lg tracking-wider shadow-xl hover:scale-105 active:scale-95 transition font-display uppercase"
          >
            SUBMIT JAWABAN
          </button>

          <button
            onClick={onHome}
            className="mt-1 text-[11px] font-black text-slate-600 hover:text-cyan-800 underline uppercase tracking-widest font-display"
          >
            KEMBALI KE MENU
          </button>

          {/* MASCOT ROBOT WAVING HAND AT BOTTOM RIGHT */}
          <div className="absolute right-0 -bottom-1 hidden sm:flex flex-col items-center pointer-events-none">
            <div className="w-16 h-16 drop-shadow-xl animate-bounce-gentle">
              <img
                src="/images/mascot_robot.jpg"
                alt="Mascot Robot"
                className="w-full h-full object-contain rounded-full border-2 border-white shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGASI BAWAH SIRKUIT (SEBELUMNYA • BERANDA • LANJUT) */}
      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene8Kasus1({ onPrev, onNext, onHome, sound }) {
  const [ans, setAns] = useState(null);
  const handleAns = (val) => {
    setAns(val);
    if (sound) playTone(val === "B" ? "success" : "error");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Studi Kasus 1" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-cyan-400 p-4 sm:p-5 shadow-xl max-w-2xl mx-auto w-full mb-2 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <div className="p-3.5 rounded-2xl bg-cyan-50 border-2 border-cyan-200 mb-4">
          <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
            🔍 <strong>Kasus:</strong> Layar komputer menyala normal, mouse bisa digerakkan, tetapi ketika aplikasi pengolah kata diklik, program gagal terbuka. Bagian apa yang paling tepat diperiksa lebih dulu?
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            { id: "A", t: "A. Monitor komputer rusak", ok: false },
            { id: "B", t: "B. Masalah pada software / aplikasi", ok: true },
            { id: "C", t: "C. Kabel keyboard terlepas", ok: false },
          ].map((op) => (
            <button
              key={op.id}
              onClick={() => handleAns(op.id)}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-black text-xs sm:text-sm transition flex items-center justify-between font-display ${
                ans === op.id
                  ? op.ok
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                    : "bg-red-100 border-red-500 text-red-900"
                  : "bg-slate-50 border-slate-200 hover:border-cyan-400 text-slate-800"
              }`}
            >
              <span>{op.t}</span>
              {ans === op.id && (op.ok ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />)}
            </button>
          ))}
        </div>

        {ans && (
          <div className="mt-3 p-3 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
            💡 <strong>Penjelasan:</strong> Komputer menyala dan desktop tampil normal membuktikan hardware bekerja baik. Kegagalan membuka aplikasi adalah kendala pada sisi <strong>Software</strong>.
          </div>
        )}
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene9Refleksi({ onPrev, onNext, onHome }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Refleksi Materi 1" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-cyan-400 p-3.5 sm:p-5 shadow-xl max-w-2xl mx-auto w-full mb-2 space-y-2.5 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200">
          <label className="text-xs sm:text-sm font-black text-cyan-900 block mb-1 font-display">
            1. Perangkat keras (hardware) apa yang paling sering kamu gunakan di sekolah?
          </label>
          <input type="text" placeholder="Ketik jawabanmu di sini..." className="w-full p-2.5 rounded-xl border border-cyan-300 text-xs font-bold bg-white text-slate-800 focus:outline-cyan-500" />
        </div>

        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
          <label className="text-xs sm:text-sm font-black text-purple-900 block mb-1 font-display">
            2. Aplikasi (software) apa yang paling memudahkanmu mengerjakan tugas?
          </label>
          <input type="text" placeholder="Contoh: Canva, Word, Chrome..." className="w-full p-2.5 rounded-xl border border-purple-300 text-xs font-bold bg-white text-slate-800 focus:outline-purple-500" />
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
          <label className="text-xs sm:text-sm font-black text-amber-900 block mb-1 font-display">
            3. Mengapa peran manusia (brainware) tetap yang paling menentukan?
          </label>
          <textarea rows="2" placeholder="Tuliskan pendapat singkatmu..." className="w-full p-2.5 rounded-xl border border-amber-300 text-xs font-bold bg-white text-slate-800 focus:outline-amber-500 resize-none" />
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene10Pemantik2({ onPrev, onNext, onHome, sound }) {
  const [char, setChar] = useState("A");
  const [pulse, setPulse] = useState(false);

  const testKey = (k) => {
    setChar(k);
    setPulse(true);
    if (sound) playTone("click");
    setTimeout(() => {
      setPulse(false);
      if (sound) playTone("success");
    }, 600);
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Alur Kerja Komputer" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-purple-400 p-4 sm:p-5 shadow-xl max-w-3xl mx-auto w-full text-center mb-2 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1 font-display">
          "Ke mana data pergi setelah tombol keyboard ditekan?"
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 font-bold max-w-md mx-auto">
          Klik salah satu huruf di bawah untuk mengamati sinyal mengalir dari Keyboard ➔ CPU ➔ Monitor:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-2">
          <div className="p-3 bg-slate-100 rounded-2xl border-2 border-slate-300 flex flex-col items-center">
            <Keyboard className="w-7 h-7 text-cyan-600 mb-1.5" />
            <div className="flex gap-1">
              {["K", "U", "T", "A", "S", "R", "I"].map((k) => (
                <button
                  key={k}
                  onClick={() => testKey(k)}
                  className="w-7 h-7 rounded-lg bg-white border-2 border-slate-300 hover:border-cyan-500 font-black text-xs text-slate-800 shadow-xs"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className={`h-1 w-12 bg-purple-500 rounded transition-all duration-300 ${pulse ? "scale-x-125 opacity-100" : "opacity-30"}`} />

          <div className="p-3 bg-purple-50 rounded-2xl border-2 border-purple-300 flex flex-col items-center w-24">
            <Cpu className={`w-7 h-7 text-purple-600 ${pulse ? "animate-spin" : ""}`} />
            <span className="text-xs font-black text-purple-900 mt-0.5 font-display">CPU</span>
          </div>

          <div className={`h-1 w-12 bg-emerald-500 rounded transition-all duration-300 ${pulse ? "scale-x-125 opacity-100" : "opacity-30"}`} />

          <div className="p-3 bg-cyan-50 rounded-2xl border-2 border-cyan-300 flex flex-col items-center w-24">
            <Monitor className="w-7 h-7 text-cyan-600" />
            <div className="w-9 h-6 bg-black rounded text-cyan-400 font-mono font-bold flex items-center justify-center text-xs mt-1">
              {pulse ? "..." : char}
            </div>
          </div>
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene11AlurKerja({ onPrev, onNext, onHome, sound }) {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0: Input, 1: Process, 2: Output, 3: Storage
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios = [
    {
      id: 0,
      title: "⌨️ Mengetik Dokumen / Tugas",
      icon: "📄",
      steps: [
        {
          stage: "1. INPUT",
          name: "Memasukkan Data",
          device: "Keyboard & Mouse",
          desc: "Pengguna menekan huruf 'A' pada Keyboard. Sinyal listrik diubah menjadi kode biner (01000001).",
          packet: "⚡ Sinyal Huruf 'A'",
        },
        {
          stage: "2. PROCESS",
          name: "Mengolah Data",
          device: "CPU & RAM",
          desc: "CPU menerima kode biner dari RAM, memproses posisi kursor, dan menyiapkan tampilan teks.",
          packet: "⚙️ Pengolahan Biner oleh CPU",
        },
        {
          stage: "3. OUTPUT",
          name: "Menyajikan Hasil",
          device: "Monitor Komputer",
          desc: "Layar Monitor menyalakan piksel sehingga huruf 'A' langsung muncul secara instan!",
          packet: "🖥️ Piksel Huruf 'A' di Layar",
        },
        {
          stage: "4. STORAGE",
          name: "Menyimpan Data",
          device: "SSD / Harddisk",
          desc: "Saat menekan tombol Ctrl+S (Simpan), file dokumen disimpan secara permanen ke dalam SSD.",
          packet: "💾 File Tugas.docx Tersimpan",
        },
      ],
    },
    {
      id: 1,
      title: "📸 Scan & Edit Foto",
      icon: "🖼️",
      steps: [
        {
          stage: "1. INPUT",
          name: "Memasukkan Data",
          device: "Scanner / Kamera",
          desc: "Scanner memindai foto fisik menjadi gambar digital berformat titik-titik warna (piksel).",
          packet: "⚡ Sinyal Gambar Digital",
        },
        {
          stage: "2. PROCESS",
          name: "Mengolah Data",
          device: "CPU & GPU & RAM",
          desc: "RAM menampung foto resolusi tinggi, CPU dan GPU menyesuaikan kecerahan & filter warna.",
          packet: "⚙️ Rendering Piksel Foto",
        },
        {
          stage: "3. OUTPUT",
          name: "Menyajikan Hasil",
          device: "Monitor & Printer",
          desc: "Foto hasil editan ditampilkan tajam di monitor dan disajikan cetak lewat Printer.",
          packet: "🖼️ Cetakan Foto Warna",
        },
        {
          stage: "4. STORAGE",
          name: "Menyimpan Data",
          device: "Flashdisk / Cloud",
          desc: "Foto resolusi tinggi disimpan aman ke dalam Flashdisk USB agar bisa dibawa ke sekolah.",
          packet: "💾 File Foto.png di Flashdisk",
        },
      ],
    },
    {
      id: 2,
      title: "🎵 Memutar Lagu & Video",
      icon: "🎧",
      steps: [
        {
          stage: "1. INPUT",
          name: "Memasukkan Data",
          device: "Klik Mouse / Touchscreen",
          desc: "Pengguna mengklik tombol 'PLAY' pada pemutar musik di aplikasi Web / Media Player.",
          packet: "⚡ Perintah Klik Play",
        },
        {
          stage: "2. PROCESS",
          name: "Mengolah Data",
          device: "CPU & Sound Card",
          desc: "CPU mengekstrak kompresi file audio MP3 dan mengubah gelombang digital menjadi sinyal suara.",
          packet: "⚙️ Dekode Sinyal Frekuensi Suara",
        },
        {
          stage: "3. OUTPUT",
          name: "Menyajikan Hasil",
          device: "Speaker / Headphone",
          desc: "Speaker menggetarkan membran udara dan menghasilkan nada musik yang jernih!",
          packet: "🔊 Nada Musik Terdengar",
        },
        {
          stage: "4. STORAGE",
          name: "Menyimpan Data",
          device: "Memory Card / SSD",
          desc: "Daftar playlist lagu tersimpan rapi di dalam memori penyimpanan perangkat.",
          packet: "💾 Playlist Lagu Favorit",
        },
      ],
    },
  ];

  // Auto-play timer loop
  React.useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % 4;
          if (sound) playTone("click");
          if (next === 3 && sound) playTone("success");
          return next;
        });
      }, 1800);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const currentScenData = scenarios[selectedScenario];
  const activeStepData = currentScenData.steps[activeStep];

  const handleScenarioChange = (idx) => {
    setSelectedScenario(idx);
    setActiveStep(0);
    setIsPlaying(false);
    if (sound) playTone("click");
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % 4);
    if (sound) playTone("click");
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (sound) playTone("click");
  };

  const stepCardColors = [
    { border: "border-[#0284c7]", bg: "bg-cyan-50", badge: "bg-cyan-500", text: "text-[#0284c7]", ic: Keyboard },
    { border: "border-[#a855f7]", bg: "bg-purple-50", badge: "bg-purple-500", text: "text-[#a855f7]", ic: Cpu },
    { border: "border-[#10b981]", bg: "bg-emerald-50", badge: "bg-emerald-500", text: "text-[#10b981]", ic: Monitor },
    { border: "border-[#f59e0b]", bg: "bg-amber-50", badge: "bg-amber-500", text: "text-[#f59e0b]", ic: HardDrive },
  ];

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      {/* HEADER BAR */}
      <div className="relative flex items-center justify-between mb-2 shrink-0">
        <WhiteBerandaBtn onClick={onHome} />

        <PinkTitleBadge title="Simulasi & Visualisasi Siklus IPOS" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            className={`px-3 py-1 rounded-full border-2 border-white text-white text-xs font-black shadow-md transition font-display flex items-center gap-1 ${
              isPlaying ? "bg-amber-500 hover:bg-amber-600 animate-pulse" : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            <span>{isPlaying ? "⏸️ JEDA" : "▶️ SIMULASI OTOMATIS"}</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto min-h-0 py-1 space-y-2.5 my-auto">
        {/* SKENARIO SIMULASI SELECTOR */}
        <div className="bg-white/95 rounded-2xl border-3 border-cyan-300 p-2 sm:p-2.5 shadow-md">
          <div className="text-[11px] font-black text-cyan-900 mb-1.5 font-display text-center uppercase tracking-wide">
            🎯 Pilih Skenario Aktivitas Untuk Disimulasikan:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(idx)}
                className={`p-2 rounded-xl border-2 text-xs font-black transition flex items-center justify-center gap-2 font-display ${
                  selectedScenario === idx
                    ? "bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] border-white text-white shadow-md scale-[1.02]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50"
                }`}
              >
                <span>{sc.icon}</span>
                <span>{sc.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 VISUAL IPOS CARDS WITH ANIMATED FLOW INDICATOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 relative">
          {currentScenData.steps.map((st, idx) => {
            const isActive = activeStep === idx;
            const styleInfo = stepCardColors[idx];
            const Icon = styleInfo.ic;

            return (
              <div
                key={st.stage}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                  if (sound) playTone("click");
                }}
                className={`rounded-[24px] border-[4px] p-3 sm:p-3.5 shadow-xl flex flex-col justify-between text-center transition-all duration-300 cursor-pointer relative ${
                  isActive
                    ? `${styleInfo.border} bg-white ring-4 ring-cyan-400 scale-[1.03] shadow-2xl z-20`
                    : "border-slate-200 bg-white/90 opacity-80 hover:opacity-100 hover:scale-[1.01]"
                }`}
              >
                {/* ACTIVE FLOATING BADGE */}
                {isActive && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${styleInfo.badge} text-white px-3 py-0.5 rounded-full text-[10px] font-black border border-white shadow-sm font-display animate-bounce-gentle z-30`}>
                    ⚡ PROSES AKTIF
                  </div>
                )}

                <div>
                  <div className={`w-10 h-10 mx-auto rounded-2xl ${styleInfo.bg} border-2 ${styleInfo.border} flex items-center justify-center mb-1.5 shadow-sm`}>
                    <Icon className={`w-5 h-5 ${styleInfo.text}`} />
                  </div>
                  <h4 className={`font-black text-xs sm:text-sm font-display ${isActive ? styleInfo.text : "text-slate-800"}`}>
                    {st.stage}
                  </h4>
                  <p className="text-[11px] font-black text-slate-600 mb-1">{st.name}</p>
                  <div className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg inline-block border border-slate-200">
                    {st.device}
                  </div>
                </div>

                {/* ANIMATED PACKET INDICATOR */}
                <div className={`mt-2 p-1.5 rounded-xl border text-[10px] font-bold transition-all ${
                  isActive
                    ? "bg-cyan-100 border-cyan-400 text-cyan-950 font-black animate-pulse"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}>
                  {st.packet}
                </div>
              </div>
            );
          })}
        </div>

        {/* REAL-TIME VISUALIZATION PROCESS EXPLANATION PANEL */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl border-3 border-cyan-400 p-3 sm:p-4 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
          {/* DEKORASI GELOMBANG ANIMASI */}
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center">
            <span className="text-8xl font-black font-mono">0110101</span>
          </div>

          <div className="space-y-1 relative z-10 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase font-display">
                TAHAP {activeStep + 1} DARI 4
              </span>
              <span className="text-xs font-black text-cyan-300 font-display">
                {activeStepData.stage}: {activeStepData.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed max-w-2xl">
              {activeStepData.desc}
            </p>
          </div>

          {/* SIMULATION STEP CONTROLS */}
          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <button
              onClick={handleNextStep}
              className="px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-md transition font-display uppercase tracking-wider flex items-center gap-1 active:scale-95"
            >
              <span>Langkah Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGASI BAWAH SIRKUIT */}
      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene12Peran({ onPrev, onNext, onHome }) {
  const data = [
    { n: "CPU (Processor)", a: "👨🍳 Koki Masak", d: "Menghitung dan mengeksekusi semua perintah secara instan.", col: "border-purple-400" },
    { n: "RAM (Memory)", a: "🍽️ Meja Dapur", d: "Tempat meletakkan bahan yang sedang dimasak sementara.", col: "border-cyan-400" },
    { n: "Storage (SSD/HDD)", a: "🧊 Kulkas / Lemari", d: "Menyimpan resep & bahan makanan secara permanen.", col: "border-amber-400" },
  ];

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="CPU, RAM & Storage" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2 flex-1 min-h-0 overflow-y-auto my-auto py-1">
        {data.map((item) => (
          <div key={item.n} className={`bg-white rounded-[28px] border-[4px] ${item.col} p-5 shadow-xl text-center flex flex-col justify-between`}>
            <div>
              <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-800 mb-2 font-display">
                Analogi: {item.a}
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-1 font-display">{item.n}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-extrabold leading-relaxed">
                {item.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene13Urutan({ onPrev, onNext, onHome, sound }) {
  const [seq, setSeq] = useState(["CPU mengolah data", "Tombol ditekan", "Hasil tampil di monitor", "Sinyal input diterima"]);
  const correct = ["Tombol ditekan", "Sinyal input diterima", "CPU mengolah data", "Hasil tampil di monitor"];
  const [valid, setValid] = useState(null);

  const move = (i, dir) => {
    const n = [...seq];
    const target = i + dir;
    if (target < 0 || target >= n.length) return;
    const temp = n[i];
    n[i] = n[target];
    n[target] = temp;
    setSeq(n);
    setValid(null);
    if (sound) playTone("click");
  };

  const check = () => {
    const isOk = JSON.stringify(seq) === JSON.stringify(correct);
    setValid(isOk);
    if (sound) playTone(isOk ? "success" : "error");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Urutkan Proses" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-purple-400 p-4 sm:p-5 shadow-xl max-w-xl mx-auto w-full mb-2 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <p className="text-xs sm:text-sm font-extrabold text-slate-700 mb-3 text-center">
          Susun urutan yang benar menggunakan tombol panah:
        </p>

        <div className="space-y-2 mb-3">
          {seq.map((s, idx) => (
            <div key={s} className="p-3 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between font-black text-xs sm:text-sm text-slate-800">
              <span>{idx + 1}. {s}</span>
              <div className="flex gap-1.5">
                <button onClick={() => move(idx, -1)} className="px-2 py-0.5 bg-white rounded-lg border border-purple-300 font-bold text-xs hover:bg-purple-100">▲</button>
                <button onClick={() => move(idx, 1)} className="px-2 py-0.5 bg-white rounded-lg border border-purple-300 font-bold text-xs hover:bg-purple-100">▼</button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={check} className="w-full py-2.5 rounded-full bg-purple-600 text-white font-black text-xs sm:text-sm shadow hover:bg-purple-700 transition font-display">
          Periksa Urutan
        </button>

        {valid !== null && (
          <div className={`mt-2.5 p-3 rounded-xl text-center text-xs font-black ${valid ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900"}`}>
            {valid ? "🎉 Benar! Alur: Tombol ditekan ➔ Input ➔ CPU ➔ Monitor" : "❌ Belum tepat, coba teliti kembali!"}
          </div>
        )}
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

// =========================================================================
// SCENE 14: SIMULASI BOOTING INTERAKTIF (VISUAL DESKTOP & POST PROCESS)
// =========================================================================
function Scene14Booting({ onPrev, onNext, onHome, sound }) {
  const [bootStage, setBootStage] = useState(0); // 0: OFF, 1: POST Check, 2: Loading OS, 3: Desktop Ready
  const [activeApp, setActiveApp] = useState(null);

  const handlePowerClick = () => {
    if (bootStage !== 0) return;
    setBootStage(1);
    setActiveApp(null);
    if (sound) playTone("click");

    // Stage 1 -> Stage 2 (BIOS & POST Check) after 1.8s
    setTimeout(() => {
      setBootStage(2);
      if (sound) playTone("click");
    }, 1800);

    // Stage 2 -> Stage 3 (Loading OS to RAM) after 3.8s
    setTimeout(() => {
      setBootStage(3);
      if (sound) playTone("success");
    }, 3800);
  };

  const handleRestart = () => {
    setBootStage(0);
    setActiveApp(null);
    if (sound) playTone("click");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      
      {/* HEADER TOP BAR */}
      <div className="relative flex items-center justify-between mb-1.5 shrink-0">
        <WhiteBerandaBtn onClick={onHome} />
        <PinkTitleBadge title="Simulasi Booting Komputer" />
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-cyan-400 text-cyan-800 text-xs font-black shadow-sm hover:bg-cyan-200 transition font-display"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Boot Ulang</span>
        </button>
      </div>

      {/* MIDDLE CONTAINER FOR BOOT SIMULATION */}
      <div className="flex-1 min-h-0 flex flex-col justify-between overflow-y-auto py-0.5 space-y-1.5">
        {/* STEPPER PROSES BOOTING (4 TAHAP) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 shrink-0">
          {[
            { step: 0, title: "1. Tombol Power", desc: "Arus listrik masuk" },
            { step: 1, title: "2. POST & BIOS Check", desc: "Cek CPU & RAM" },
            { step: 2, title: "3. Memuat OS", desc: "Pindah dari SSD ke RAM" },
            { step: 3, title: "4. Desktop Siap!", desc: "Sistem Komputer Aktif" },
          ].map((s) => {
            const isActive = bootStage === s.step;
            const isDone = bootStage > s.step;
            return (
              <div
                key={s.step}
                className={`p-1 rounded-lg border-2 transition duration-300 text-center ${
                  isActive
                    ? "bg-cyan-500 text-white border-white shadow-sm"
                    : isDone
                    ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                    : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                <div className="text-[11px] sm:text-xs font-black font-display flex items-center justify-center gap-1">
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                  <span>{s.title}</span>
                </div>
                <p className="text-[9px] font-bold opacity-80">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* MONITOR SETUP FRAME DENGAN CASING CPU TOWER ATAS MEJA */}
        <div className="bg-[#e0f2fe] rounded-2xl border-3 border-[#bae6fd] p-2 sm:p-3 shadow-inner flex flex-col md:flex-row gap-2.5 items-center justify-center relative flex-1 min-h-0">
          
          {/* CASING CPU TOWER (DI SAMPING MONITOR) */}
          <div className="w-24 sm:w-28 md:w-32 bg-slate-900 rounded-2xl border-3 border-slate-700 p-2 flex flex-col justify-between shadow-xl relative overflow-hidden shrink-0 h-36 sm:h-40 md:h-44">
            {/* LED POWER & RESTART BUTTON CPU */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePowerClick}
                  disabled={bootStage !== 0}
                  className={`w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center transition shadow-xs ${
                    bootStage === 0
                      ? "bg-red-500 hover:bg-emerald-500 animate-pulse cursor-pointer"
                      : "bg-emerald-400"
                  }`}
                >
                  <Zap className="w-2 h-2 text-white" />
                </button>
                <span className="text-[8px] font-mono font-bold text-slate-300">
                  {bootStage === 0 ? "PWR" : "ON"}
                </span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${bootStage > 0 ? "bg-cyan-400 animate-ping" : "bg-red-500"}`}></div>
            </div>

            {/* KIPAS COOLER RGB MEMUTAR SAAT BOOTING */}
            <div className="my-auto flex flex-col items-center gap-0.5 z-10">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center shadow-inner relative overflow-hidden ${bootStage > 0 ? "animate-spin" : ""}`}>
                <div className="w-full h-full bg-gradient-to-tr from-cyan-500 via-pink-500 to-yellow-400 opacity-60 rounded-full blur-xs"></div>
                <Cpu className="w-3.5 h-3.5 text-white absolute" />
              </div>
              <div className="text-[7px] font-mono text-cyan-300 font-bold text-center">
                COOLER RGB
              </div>
            </div>

            {/* VENTILASI UDARA CASING BAWAH */}
            <div className="grid grid-cols-5 gap-0.5 z-10 opacity-40">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-0.5 bg-cyan-400 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* MONITOR DISPLAY LAYAR ULTRRAWIDE */}
          <div className="flex-1 w-full flex flex-col items-center min-h-0 h-full">
            <div className="w-full rounded-2xl border-4 border-slate-900 bg-slate-950 shadow-xl relative overflow-hidden flex-1 h-36 sm:h-44 md:h-48 max-h-[210px] flex flex-col justify-between">
              
              {/* TAHAP 0: SCREEN MATI (OFF) */}
              {bootStage === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-950 text-slate-400">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-1 animate-pulse">
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-xs font-black text-white font-display">
                    Komputer Belum Dinyalakan
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs font-bold">
                    Klik tombol <span className="text-emerald-400">"POWER NYALA"</span> di bawah!
                  </p>
                </div>
              )}

              {/* TAHAP 1: POST & BIOS CHECK */}
              {bootStage === 1 && (
                <div className="w-full h-full p-2.5 font-mono text-left text-xs bg-black text-emerald-400 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between border-b border-emerald-800 pb-0.5 mb-1 text-[10px]">
                      <span className="font-bold text-cyan-400">BIOS v4.2</span>
                      <span>POST CHECK</span>
                    </div>
                    <div className="space-y-0.5 text-[9px]">
                      <p className="animate-fade-in">⚡ Electricity: 12V / 5V Rail Connected [OK]</p>
                      <p className="animate-fade-in delay-100">🔍 Testing CPU (Intel Core i5)... [PASS]</p>
                      <p className="animate-fade-in delay-200">⚡ Testing Memory (8GB DDR4 RAM)... [PASS]</p>
                      <p className="animate-fade-in delay-300">💾 Storage (SSD 256GB)... [READY]</p>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[8px] text-slate-400">
                      <span>Testing Components...</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAHAP 2: LOADING OS INTO RAM */}
              {bootStage === 2 && (
                <div className="w-full h-full p-2 flex flex-col items-center justify-center bg-gradient-to-b from-sky-900 via-slate-900 to-blue-950 text-white text-center">
                  <div className="grid grid-cols-2 gap-0.5 w-6 h-6 mb-1.5 animate-bounce-gentle">
                    <div className="bg-cyan-400 rounded-xs"></div>
                    <div className="bg-sky-400 rounded-xs"></div>
                    <div className="bg-blue-400 rounded-xs"></div>
                    <div className="bg-teal-400 rounded-xs"></div>
                  </div>

                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-1.5"></div>

                  <h3 className="text-[11px] font-black font-display text-cyan-200">
                    Memuat Sistem Operasi (OS) dari SSD ke RAM...
                  </h3>
                </div>
              )}

              {/* TAHAP 3: DESKTOP SIAP */}
              {bootStage === 3 && (
                <div className="w-full h-full bg-gradient-to-br from-sky-400 via-cyan-600 to-blue-800 p-2 flex flex-col justify-between relative overflow-hidden">
                  <div className="grid grid-cols-4 gap-1 z-10 max-w-xs">
                    {[
                      { title: "MPI App", icon: "💻" },
                      { title: "Chrome", icon: "🌐" },
                      { title: "MS Word", icon: "📄" },
                      { title: "Canva", icon: "🎨" },
                    ].map((app) => (
                      <button
                        key={app.title}
                        onClick={() => setActiveApp(app.title)}
                        className="flex flex-col items-center p-1 rounded-lg bg-white/85 hover:bg-white backdrop-blur-md shadow-xs border border-white/60 hover:scale-105 transition"
                      >
                        <span className="text-sm">{app.icon}</span>
                        <span className="text-[8px] font-black text-slate-800 text-center font-display">
                          {app.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  {activeApp && (
                    <div className="absolute inset-1.5 z-20 bg-white/95 rounded-xl p-2 border border-cyan-400 shadow-xl flex flex-col justify-between backdrop-blur-md">
                      <div className="flex justify-between items-center border-b pb-0.5">
                        <span className="text-[10px] font-black text-slate-800 font-display">
                          📌 Aplikasi Terbuka: {activeApp}
                        </span>
                        <button
                          onClick={() => setActiveApp(null)}
                          className="w-3.5 h-3.5 rounded-full bg-red-500 text-white font-bold text-[9px] flex items-center justify-center hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="my-auto text-center p-0.5">
                        <p className="text-[10px] font-extrabold text-cyan-900">
                          🎉 Aplikasi <strong>{activeApp}</strong> berhasil dibuka! CPU dan RAM sedang mengeksekusi instruksi program ini.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white shadow-xs text-center mx-auto z-10">
                    <span className="text-[10px] font-black text-cyan-900 font-display">
                      🎉 BOOTING SELESAI! Komputer Siap Digunakan.
                    </span>
                  </div>

                  <div className="bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-md flex justify-between items-center z-10 border border-slate-700">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-cyan-500 flex items-center justify-center text-white font-bold text-[8px]">
                        🪟
                      </div>
                      <span className="text-[7px] font-mono text-slate-300 font-bold">Search...</span>
                    </div>
                    <div className="text-[7px] font-mono font-bold text-slate-200">
                      10:45 AM • SMPN 1 Kutasari
                    </div>
                  </div>
                </div>
              )}

              <div className="h-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center px-2">
                <span className="text-[7px] font-mono font-bold text-slate-500">MONITOR 24" FHD</span>
                <div className={`w-1.5 h-1.5 rounded-full ${bootStage === 3 ? "bg-emerald-400" : bootStage > 0 ? "bg-amber-400 animate-pulse" : "bg-red-500"}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* POWER CONTROL BUTTON */}
        <div className="flex justify-center shrink-0 py-0.5">
          {bootStage === 0 ? (
            <button
              onClick={handlePowerClick}
              className="px-6 sm:px-10 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 border-2 border-white text-white font-black text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition font-display flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-yellow-300 stroke-none" />
              <span>⚡ TEKAN TOMBOL POWER NYALA</span>
            </button>
          ) : (
            <button
              onClick={handleRestart}
              className="px-6 sm:px-8 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-white text-white font-black text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition font-display flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>BOOTING ULANG (RESTART)</span>
            </button>
          )}
        </div>
      </div>

      {/* NAVIGASI BAWAH SIRKUIT */}
      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene15Kasus2({ onPrev, onNext, onHome, sound }) {
  const [ans, setAns] = useState(null);
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Studi Kasus 2" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-cyan-400 p-4 sm:p-5 shadow-xl max-w-xl mx-auto w-full mb-2 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <p className="text-xs sm:text-sm font-extrabold text-slate-800 mb-3 leading-relaxed">
          Mengapa komputer tiba-tiba menjadi lambat saat membuka puluhan tab browser sekaligus?
        </p>
        <div className="space-y-2">
          {[
            { id: "A", t: "A. Kapasitas RAM penuh dan CPU kewalahan", ok: true },
            { id: "B", t: "B. Ukuran monitor berubah mengecil", ok: false },
            { id: "C", t: "C. Keyboard kehabisan tinta", ok: false },
          ].map((op) => (
            <button
              key={op.id}
              onClick={() => { setAns(op.id); if (sound) playTone(op.ok ? "success" : "error"); }}
              className={`w-full p-3 rounded-2xl border-2 text-left font-black text-xs sm:text-sm font-display transition ${
                ans === op.id ? (op.ok ? "bg-emerald-100 border-emerald-500 text-emerald-900" : "bg-red-100 border-red-500 text-red-900") : "bg-slate-50 border-slate-200 hover:border-cyan-400"
              }`}
            >
              {op.t}
            </button>
          ))}
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene16Evaluasi({ onPrev, onNext, onHome, sound }) {
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const qs = [
    { id: 1, q: "Komponen penyimpan data sementara saat komputer hidup adalah...", ops: ["RAM", "Monitor", "Printer"], a: 0 },
    { id: 2, q: "Perangkat yang termasuk alat masukan (Input) adalah...", ops: ["Speaker", "Keyboard", "Proyektor"], a: 1 },
    { id: 3, q: "Unsur manusia pemakai sistem komputer disebut...", ops: ["Software", "Hardware", "Brainware"], a: 2 },
    { id: 4, q: "Siklus pengolahan data standar yang benar adalah...", ops: ["Output-Process-Input", "Input-Process-Output", "Storage-Input-Process"], a: 1 },
    { id: 5, q: "Proses menghidupkan komputer dari awal disebut...", ops: ["Booting", "Typing", "Coding"], a: 0 },
  ];

  const handleAns = (qId, opIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: opIdx }));
    if (sound) playTone("click");
  };

  const calculate = () => {
    let s = 0;
    qs.forEach((q) => {
      if (answers[q.id] === q.a) s += 20;
    });
    setScore(s);
    if (sound) playTone("success");
  };

  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Evaluasi Pemahaman" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-[#0284c7] p-3.5 sm:p-5 shadow-xl max-w-2xl mx-auto w-full mb-2 space-y-2 flex-1 min-h-0 overflow-y-auto my-auto pr-1">
        {qs.map((q, idx) => (
          <div key={q.id} className="p-2.5 bg-cyan-50/60 rounded-xl border border-cyan-200">
            <p className="text-xs sm:text-sm font-black text-slate-800 mb-1 font-display">
              {idx + 1}. {q.q}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {q.ops.map((op, oIdx) => (
                <button
                  key={op}
                  onClick={() => handleAns(q.id, oIdx)}
                  className={`p-1.5 rounded-lg text-xs font-black border transition font-display ${
                    answers[q.id] === oIdx ? "bg-cyan-600 text-white border-cyan-700" : "bg-white text-slate-700 border-slate-300 hover:border-cyan-400"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate} className="w-full py-2.5 rounded-full bg-cyan-600 text-white font-black text-xs sm:text-sm shadow-md hover:bg-cyan-500 transition font-display">
          Hitung Nilai Akhir
        </button>

        {score !== null && (
          <div className="p-2.5 bg-emerald-100 rounded-xl border-2 border-emerald-400 text-center">
            <span className="text-xs font-bold text-emerald-800">Skor Kamu:</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900 font-display">{score} / 100</div>
          </div>
        )}
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene17Rangkuman({ onPrev, onNext, onHome }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Rangkuman Materi" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-cyan-400 p-3.5 sm:p-5 shadow-xl max-w-2xl mx-auto w-full mb-2 space-y-2 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200">
          <span className="font-black text-cyan-800 block text-sm sm:text-base font-display">① Tiga Pilar Sistem Komputer</span>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">Hardware (fisik), Software (program), dan Brainware (manusia) wajib bersatu.</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
          <span className="font-black text-purple-800 block text-sm sm:text-base font-display">② Alur Kerja IPOS</span>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">Input ➔ Process ➔ Output ➔ Storage secara terstruktur.</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
          <span className="font-black text-emerald-800 block text-sm sm:text-base font-display">③ Sinergi CPU, RAM & Storage</span>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">CPU memasak, RAM sebagai meja kerja sementara, dan Storage sebagai lemari permanen.</p>
        </div>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={onNext} />
    </div>
  );
}

function Scene18Pustaka({ onPrev, onHome }) {
  return (
    <div className="scene-card-wrapper relative z-10 flex flex-col justify-between h-full max-h-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-2 shrink-0">
        <div className="absolute left-0"><WhiteBerandaBtn onClick={onHome} /></div>
        <PinkTitleBadge title="Daftar Pustaka" />
      </div>

      <div className="bg-white rounded-[28px] border-4 border-cyan-400 p-4 sm:p-5 shadow-xl max-w-xl mx-auto w-full mb-2 text-left space-y-2.5 flex-1 min-h-0 overflow-y-auto my-auto flex flex-col justify-center">
        <p className="text-xs sm:text-sm font-extrabold text-slate-700">
          1. Kemendikbudristek. Buku Siswa Informatika SMP/MTs Kelas IX. Jakarta: Puskurbuk.
        </p>
        <p className="text-xs sm:text-sm font-extrabold text-slate-700">
          2. Badan Standar, Kurikulum, dan Asesmen Pendidikan. Alur Tujuan Pembelajaran Informatika Fase D.
        </p>
      </div>

      <BottomNav onPrev={onPrev} onHome={onHome} onNext={null} />
    </div>
  );
}
