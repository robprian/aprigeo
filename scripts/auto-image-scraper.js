// Auto Image Scraper for Products, Categories, Brands, Blog
// Menggunakan Unsplash API (bisa diganti Bing/Google/Pinterest jika ada API key)
// Hasil: update file seed SQL dengan URL gambar yang relevan

const fs = require('fs');
const axios = require('axios');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_KEY';
const SEARCH_ENDPOINT = 'https://api.unsplash.com/search/photos';

async function fetchImageUrl(query) {
  try {
    const res = await axios.get(SEARCH_ENDPOINT, {
      params: { query, per_page: 1 },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
    });
    if (res.data.results && res.data.results.length > 0) {
      return res.data.results[0].urls.regular;
    }
  } catch (e) {
    console.error('Error fetching image for', query, e.message);
  }
  return '/placeholder.jpg';
}

async function updateSeedFile(seedFile, entity, queries) {
  let sql = fs.readFileSync(seedFile, 'utf8');
  for (const [name, search] of Object.entries(queries)) {
    const url = await fetchImageUrl(search);
    // Replace placeholder image for this entity
    const regex = new RegExp(`('/images/${entity}/[^']*${name}[^']*')`, 'gi');
    sql = sql.replace(regex, `'${url}'`);
  }
  fs.writeFileSync(seedFile, sql, 'utf8');
}

// Contoh penggunaan untuk produk, kategori, brand
async function main() {
  // Daftar produk/kategori/brand yang ingin diupdate gambarnya
  const products = {
    'garmin-gpsmap-66i': 'gps garmin outdoor',
    'leica-ts16-total-station': 'leica total station',
    'dji-phantom-4-rtk': 'drone survey',
    // ... tambahkan produk lain
  };
  const categories = {
    'gps-handheld': 'gps handheld',
    'total-station': 'total station',
    'drone-survey': 'drone survey',
    // ...
  };
  const brands = {
    'garmin': 'logo garmin',
    'leica-geosystems': 'logo leica',
    'dji': 'logo dji',
    // ...
  };
  await updateSeedFile('./database/seed_gps_products.sql', 'products', products);
  await updateSeedFile('./database/seed_gps_products.sql', 'categories', categories);
  await updateSeedFile('./database/seed_gps_products.sql', 'brands', brands);
  // Lakukan juga untuk part2 dan part3 jika perlu
}

main();
