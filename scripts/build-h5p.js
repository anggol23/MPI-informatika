import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const stagingDir = path.join(rootDir, '.h5p-staging');
const outputH5P = path.join(rootDir, 'media-informatika.h5p');

console.log('🚀 Memulai proses pembuatan paket H5P...\n');

// 1. Build aplikasi Vite ke folder dist
console.log('📦 1. Mengompilasi aplikasi React/Vite (npm run build)...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ Gagal: Folder dist/ atau index.html tidak ditemukan setelah build.');
  process.exit(1);
}

// 2. Bersihkan staging folder sebelumnya
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// 3. Buat file h5p.json utama
const h5pManifest = {
  title: "Media Pembelajaran Informatika - Sistem Komputer",
  language: "id",
  mainLibrary: "H5P.MediaInteraktif",
  preloadedDependencies: [
    {
      machineName: "H5P.MediaInteraktif",
      majorVersion: 1,
      minorVersion: 0
    }
  ],
  embedTypes: ["iframe"],
  license: "CC BY 4.0",
  author: "Informatika Media Team"
};
fs.writeFileSync(
  path.join(stagingDir, 'h5p.json'),
  JSON.stringify(h5pManifest, null, 2),
  'utf-8'
);

// 4. Buat folder content dan content/content.json
const contentDir = path.join(stagingDir, 'content');
fs.mkdirSync(contentDir, { recursive: true });
fs.writeFileSync(
  path.join(contentDir, 'content.json'),
  JSON.stringify({}, null, 2),
  'utf-8'
);

// 5. Buat folder library H5P.MediaInteraktif-1.0
const libDir = path.join(stagingDir, 'H5P.MediaInteraktif-1.0');
fs.mkdirSync(libDir, { recursive: true });

// 5a. Buat library.json
const libraryManifest = {
  title: "Media Pembelajaran Interaktif Informatika",
  description: "Media Pembelajaran Interaktif Materi Sistem Komputer Berbasis Kurikulum Merdeka",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 0,
  runnable: 1,
  author: "Informatika Media Team",
  license: "CC BY 4.0",
  coreApi: {
    majorVersion: 1,
    minorVersion: 24
  },
  preloadedJs: [
    {
      path: "wrapper.js"
    }
  ],
  preloadedCss: [
    {
      path: "wrapper.css"
    }
  ]
};
fs.writeFileSync(
  path.join(libDir, 'library.json'),
  JSON.stringify(libraryManifest, null, 2),
  'utf-8'
);

// 5b. Buat wrapper.css
const wrapperCss = `
.h5p-media-interaktif-container {
  width: 100%;
  min-height: 720px;
  height: 85vh;
  position: relative;
  overflow: hidden;
  background-color: #bdf0fb;
  border-radius: 12px;
}

.h5p-media-interaktif-iframe {
  width: 100%;
  height: 100%;
  min-height: 720px;
  border: none;
  display: block;
}
`;
fs.writeFileSync(path.join(libDir, 'wrapper.css'), wrapperCss.trim(), 'utf-8');

// 5c. Buat wrapper.js
const wrapperJs = `
var H5P = H5P || {};

H5P.MediaInteraktif = (function ($) {
  function C(options, id) {
    this.options = options || {};
    this.id = id;
  }

  C.prototype.attach = function ($wrapper) {
    $wrapper.addClass('h5p-media-interaktif-container');

    var libraryPath = H5P.getLibraryPath('H5P.MediaInteraktif-1.0');
    var appUrl = libraryPath + '/app/index.html';

    var iframe = document.createElement('iframe');
    iframe.className = 'h5p-media-interaktif-iframe';
    iframe.src = appUrl;
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('webkitallowfullscreen', 'true');
    iframe.setAttribute('mozallowfullscreen', 'true');
    iframe.setAttribute('allow', 'fullscreen; autoplay; clipboard-write');

    $wrapper.empty().append(iframe);
  };

  return C;
})(H5P.jQuery);
`;
fs.writeFileSync(path.join(libDir, 'wrapper.js'), wrapperJs.trim(), 'utf-8');

// 5d. Salin folder dist ke H5P.MediaInteraktif-1.0/app
console.log('📁 2. Menyalin bundle aplikasi ke struktur library H5P...');
const appTargetDir = path.join(libDir, 'app');
fs.cpSync(distDir, appTargetDir, { recursive: true });

// 6. Kompresi menjadi file .h5p
console.log('🗜️ 3. Mengompresi menjadi file .h5p...');
if (fs.existsSync(outputH5P)) {
  fs.unlinkSync(outputH5P);
}

try {
  // Gunakan tar (bsdtar bawaan Windows/Linux/macOS yang mendukung zip)
  execSync(
    `tar -a -c -f "${outputH5P}" -C "${stagingDir}" h5p.json content H5P.MediaInteraktif-1.0`,
    { stdio: 'inherit', cwd: rootDir }
  );
} catch (err) {
  console.log('Mencoba metode PowerShell kompresi alternatif...');
  const psCmd = `$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${outputH5P}.zip' -Force; Move-Item -Path '${outputH5P}.zip' -Destination '${outputH5P}' -Force`;
  execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit', cwd: rootDir });
}

// 7. Bersihkan folder staging
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}

// 8. Cek hasil akhir
if (fs.existsSync(outputH5P)) {
  const stats = fs.statSync(outputH5P);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log('\n✅ BERHASIL!');
  console.log(`📁 File H5P siap digunakan: media-informatika.h5p (${sizeMB} MB)`);
  console.log('📌 Lokasi file: ' + outputH5P);
  console.log('\nCara upload ke Moodle:');
  console.log('1. Buka Moodle -> Masuk ke "Bank Konten" (Content Bank)');
  console.log('2. Klik tombol "Unggah" (Upload) -> Pilih file "media-informatika.h5p"');
  console.log('3. Selesai! Media interaktif langsung aktif di Moodle.');
} else {
  console.error('❌ Gagal membuat file media-informatika.h5p.');
  process.exit(1);
}
