const fs = require('fs');
const path = require('path');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');

// Banner configurations with proper sizing
const bannerConfigs = [
  {
    id: 1,
    title: 'GPS Terbaru 2025',
    subtitle: 'Navigasi Presisi Tinggi',
    description: 'Koleksi GPS handheld dan surveying terlengkap',
    filename: 'gps-terbaru-2025',
    size: 'hero', // 1200x400
    mobileSize: 'hero-mobile', // 800x600
    color: '#1e40af',
    textColor: '#ffffff',
    searchTerms: ['gps', 'handheld', 'navigation', 'technology']
  },
  {
    id: 2,
    title: 'Promo Total Station',
    subtitle: 'Diskon Hingga 30%',
    description: 'Total station Leica, Topcon, dan Sokkia',
    filename: 'promo-total-station',
    size: 'hero', // 1200x400
    mobileSize: 'hero-mobile', // 800x600
    color: '#dc2626',
    textColor: '#ffffff',
    searchTerms: ['total station', 'surveying', 'construction', 'equipment']
  },
  {
    id: 3,
    title: 'Drone Survey RTK',
    subtitle: 'Teknologi Mapping Udara',
    description: 'DJI Phantom 4 RTK dan drone survey',
    filename: 'drone-survey-rtk',
    size: 'hero', // 1200x400
    mobileSize: 'hero-mobile', // 800x600
    color: '#059669',
    textColor: '#ffffff',
    searchTerms: ['drone', 'aerial', 'mapping', 'rtk']
  },
  {
    id: 4,
    title: 'Gratis Konsultasi',
    subtitle: 'Solusi Survei Terbaik',
    description: 'Tim ahli siap membantu',
    filename: 'gratis-konsultasi',
    size: 'banner', // 600x300
    mobileSize: 'banner-mobile', // 400x400
    color: '#7c3aed',
    textColor: '#ffffff',
    searchTerms: ['consultation', 'expert', 'help', 'professional']
  },
  {
    id: 5,
    title: 'Pelatihan GPS',
    subtitle: 'Kursus Survei & Pemetaan',
    description: 'Sertifikat resmi dan praktek langsung',
    filename: 'pelatihan-gps',
    size: 'banner', // 600x300
    mobileSize: 'banner-mobile', // 400x400
    color: '#ea580c',
    textColor: '#ffffff',
    searchTerms: ['training', 'education', 'course', 'certification']
  },
  {
    id: 6,
    title: 'Layanan Kalibrasi',
    subtitle: 'Akurasi Terjamin',
    description: 'Teknisi berpengalaman dan bersertifikat',
    filename: 'layanan-kalibrasi',
    size: 'sidebar', // 400x200
    mobileSize: 'sidebar-mobile', // 300x300
    color: '#0891b2',
    textColor: '#ffffff',
    searchTerms: ['calibration', 'service', 'repair', 'maintenance']
  },
  {
    id: 7,
    title: 'Garansi Resmi',
    subtitle: 'Jaminan Kualitas',
    description: 'Layanan after-sales terbaik',
    filename: 'garansi-resmi',
    size: 'sidebar', // 400x200
    mobileSize: 'sidebar-mobile', // 300x300
    color: '#16a34a',
    textColor: '#ffffff',
    searchTerms: ['warranty', 'guarantee', 'service', 'quality']
  }
];

// Size configurations
const sizeConfigs = {
  'hero': { width: 1200, height: 400 },
  'hero-mobile': { width: 800, height: 600 },
  'banner': { width: 600, height: 300 },
  'banner-mobile': { width: 400, height: 400 },
  'sidebar': { width: 400, height: 200 },
  'sidebar-mobile': { width: 300, height: 300 }
};

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

// Function to create banner image
async function createBannerImage(config, size) {
  const sizeConfig = sizeConfigs[size];
  const canvas = createCanvas(sizeConfig.width, sizeConfig.height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, sizeConfig.width, sizeConfig.height);
  gradient.addColorStop(0, config.color);
  gradient.addColorStop(1, adjustColor(config.color, -20));
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, sizeConfig.width, sizeConfig.height);

  // Add overlay pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < sizeConfig.width; i += 20) {
    ctx.fillRect(i, 0, 1, sizeConfig.height);
  }

  // Text styling
  ctx.fillStyle = config.textColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // Responsive font sizes
  const titleSize = size.includes('hero') ? 48 : size.includes('banner') ? 28 : 20;
  const subtitleSize = size.includes('hero') ? 24 : size.includes('banner') ? 16 : 12;
  const descSize = size.includes('hero') ? 16 : size.includes('banner') ? 12 : 10;

  // Draw title
  ctx.font = `bold ${titleSize}px Arial`;
  ctx.fillText(config.title, 40, sizeConfig.height * 0.35);

  // Draw subtitle
  ctx.font = `${subtitleSize}px Arial`;
  ctx.fillText(config.subtitle, 40, sizeConfig.height * 0.5);

  // Draw description (if space allows)
  if (sizeConfig.height > 250) {
    ctx.font = `${descSize}px Arial`;
    ctx.fillText(config.description, 40, sizeConfig.height * 0.65);
  }

  // Add geometric shapes for visual interest
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(sizeConfig.width - 100, 50, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(sizeConfig.width - 50, sizeConfig.height - 50, 20, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// Function to adjust color brightness
function adjustColor(color, amount) {
  const usePound = color[0] === '#';
  const col = usePound ? color.slice(1) : color;
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = (num >> 8 & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  
  const result = (r << 16) | (g << 8) | b;
  return (usePound ? '#' : '') + result.toString(16).padStart(6, '0');
}

// Main function to create all banners
async function createAllBanners() {
  console.log('Creating banner images...');
  
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'banners');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const config of bannerConfigs) {
    try {
      // Create desktop version
      const desktopCanvas = await createBannerImage(config, config.size);
      const desktopPath = path.join(outputDir, `${config.filename}.png`);
      const desktopBuffer = desktopCanvas.toBuffer('image/png');
      fs.writeFileSync(desktopPath, desktopBuffer);
      console.log(`Created desktop banner: ${config.filename}.png`);

      // Create mobile version
      const mobileCanvas = await createBannerImage(config, config.mobileSize);
      const mobilePath = path.join(outputDir, `${config.filename}-mobile.png`);
      const mobileBuffer = mobileCanvas.toBuffer('image/png');
      fs.writeFileSync(mobilePath, mobileBuffer);
      console.log(`Created mobile banner: ${config.filename}-mobile.png`);

    } catch (error) {
      console.error(`Error creating banner ${config.filename}:`, error);
    }
  }

  console.log('All banner images created successfully!');
}

// Run the script
if (require.main === module) {
  createAllBanners().catch(console.error);
}

module.exports = { createAllBanners, bannerConfigs };
