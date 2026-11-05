import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const stagingDir = path.join(rootDir, '.h5p-staging');
const outputH5P = path.join(rootDir, 'media-informatika.h5p');
const vercelUrl = 'https://media-informatika.vercel.app/';

console.log('🚀 Memulai proses pembuatan paket resmi H5P IFrameEmbed...\n');

// 1. Bersihkan staging folder sebelumnya
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// 2. Buat file h5p.json utama (Standar resmi H5P / Lumi)
const h5pManifest = {
  title: "Media Pembelajaran Informatika - Sistem Komputer",
  language: "id",
  mainLibrary: "H5P.IFrameEmbed",
  preloadedDependencies: [
    {
      machineName: "H5P.IFrameEmbed",
      majorVersion: 1,
      minorVersion: 0
    }
  ],
  embedTypes: ["iframe"],
  license: "CC BY",
  licenseVersion: "4.0",
  authors: [
    {
      name: "Informatika Media Team",
      role: "Author"
    }
  ]
};
fs.writeFileSync(
  path.join(stagingDir, 'h5p.json'),
  JSON.stringify(h5pManifest, null, 2),
  'utf-8'
);

// 3. Buat folder content dan content/content.json dengan URL Vercel
const contentDir = path.join(stagingDir, 'content');
fs.mkdirSync(contentDir, { recursive: true });
const contentData = {
  source: vercelUrl,
  width: "100%",
  minWidth: "100%",
  height: "750px"
};
fs.writeFileSync(
  path.join(contentDir, 'content.json'),
  JSON.stringify(contentData, null, 2),
  'utf-8'
);

// 4. Buat folder library resmi H5P.IFrameEmbed-1.0
const libDir = path.join(stagingDir, 'H5P.IFrameEmbed-1.0');
fs.mkdirSync(libDir, { recursive: true });

// 4a. library.json resmi H5P.IFrameEmbed
const libraryJsonContent = JSON.stringify({
  title: "IFrame Embed",
  machineName: "H5P.IFrameEmbed",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 20,
  runnable: 1,
  author: "Joubel",
  license: "MIT",
  coreApi: {
    majorVersion: 1,
    minorVersion: 20
  },
  preloadedJs: [
    {
      path: "iframe-embed.js"
    }
  ]
}, null, 2);

fs.writeFileSync(path.join(libDir, 'library.json'), libraryJsonContent, 'utf-8');

// 4b. semantics.json resmi
const semanticsData = [
  {
    name: "source",
    type: "text",
    label: "Source URL",
    importance: "high",
    description: "URL halaman web yang disematkan",
    placeholder: "https://..."
  },
  {
    name: "width",
    type: "text",
    label: "Width",
    importance: "low",
    default: "100%",
    optional: true
  },
  {
    name: "minWidth",
    type: "text",
    label: "Min width",
    importance: "low",
    default: "100%",
    optional: true
  },
  {
    name: "height",
    type: "text",
    label: "Height",
    importance: "low",
    default: "750px",
    optional: true
  }
];
fs.writeFileSync(
  path.join(libDir, 'semantics.json'),
  JSON.stringify(semanticsData, null, 2),
  'utf-8'
);

// 4c. iframe-embed.js
const iframeEmbedJs = `
var H5P = H5P || {};

H5P.IFrameEmbed = (function ($) {
  function C(options, id) {
    this.options = options || {};
    this.id = id;
  }

  C.prototype.attach = function ($wrapper) {
    $wrapper.addClass('h5p-iframe-wrapper');
    $wrapper.css({
      width: this.options.width || '100%',
      minHeight: this.options.height || '750px',
      height: '85vh',
      position: 'relative'
    });

    var iframe = document.createElement('iframe');
    iframe.src = this.options.source || '${vercelUrl}';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = this.options.height || '750px';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('webkitallowfullscreen', 'true');
    iframe.setAttribute('mozallowfullscreen', 'true');
    iframe.setAttribute('allow', 'fullscreen; autoplay; clipboard-write');

    $wrapper.empty().append(iframe);
  };

  return C;
})(H5P.jQuery);
`;
fs.writeFileSync(path.join(libDir, 'iframe-embed.js'), iframeEmbedJs.trim(), 'utf-8');

// 5. Kompresi menjadi file .h5p
console.log('🗜️ Mengompresi menjadi paket .h5p resmi...');
if (fs.existsSync(outputH5P)) {
  fs.unlinkSync(outputH5P);
}

try {
  execSync(
    `tar --format zip -c -f "${outputH5P}" -C "${stagingDir}" h5p.json content H5P.IFrameEmbed-1.0`,
    { stdio: 'inherit', cwd: rootDir }
  );
} catch (err) {
  const psCmd = `$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${outputH5P}.zip' -Force; Move-Item -Path '${outputH5P}.zip' -Destination '${outputH5P}' -Force`;
  execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit', cwd: rootDir });
}

// 6. Bersihkan folder staging
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}

// 7. Cek hasil akhir
if (fs.existsSync(outputH5P)) {
  const stats = fs.statSync(outputH5P);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log('\n✅ BERHASIL MEMBUAT PAKET H5P!');
  console.log(`📁 File H5P: media-informatika.h5p (${sizeKB} KB)`);
  console.log(`🔗 Target URL Vercel: ${vercelUrl}`);
  console.log('📌 Lokasi file: ' + outputH5P);
} else {
  console.error('❌ Gagal membuat file media-informatika.h5p.');
  process.exit(1);
}
