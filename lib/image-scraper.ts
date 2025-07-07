import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// Image scraper utility for GPS store
export class ImageScraper {
  private baseUrl = 'https://picsum.photos';
  private unsplashUrl = 'https://source.unsplash.com';
  
  constructor() {}

  // Generate placeholder image URL with specific dimensions
  generatePlaceholderImage(width: number = 400, height: number = 300, text?: string): string {
    if (text) {
      return `https://via.placeholder.com/${width}x${height}/4F46E5/FFFFFF?text=${encodeURIComponent(text)}`;
    }
    return `${this.baseUrl}/${width}/${height}`;
  }

  // Get image from Unsplash with search term
  getUnsplashImage(searchTerm: string, width: number = 400, height: number = 300): string {
    const cleanTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ',');
    return `${this.unsplashUrl}/${width}x${height}/?${cleanTerm}`;
  }

  // Scrape images from Google Images (simplified)
  async scrapeGoogleImages(query: string, count: number = 1): Promise<string[]> {
    try {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch&safe=active`;
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const images: string[] = [];
      
      $('img').each((i: number, el: any) => {
        if (images.length >= count) return false;
        const src = $(el).attr('src');
        if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon')) {
          images.push(src);
        }
      });
      
      return images.length > 0 ? images : [this.generatePlaceholderImage(400, 300, query)];
    } catch (error) {
      console.error('Error scraping Google Images:', error);
      return [this.generatePlaceholderImage(400, 300, query)];
    }
  }

  // Generate images for GPS products
  generateProductImages(productName: string, category: string): string[] {
    const images: string[] = [];
    const searchTerms = [
      `${productName} ${category}`,
      `${productName} gps`,
      `${category} equipment`,
      `${productName} survey`
    ];

    searchTerms.forEach((term, index) => {
      images.push(this.getUnsplashImage(term, 400, 300));
    });

    return images;
  }

  // Generate images for categories
  generateCategoryImages(categoryName: string): string {
    const searchTerm = `${categoryName} equipment survey gps`;
    return this.getUnsplashImage(searchTerm, 80, 80);
  }

  // Generate images for brands
  generateBrandImages(brandName: string): string {
    // For brand logos, we'll use placeholder with brand name
    return this.generatePlaceholderImage(150, 80, brandName);
  }

  // Generate images for blog posts
  generateBlogImages(title: string, category: string): string {
    const searchTerm = `${title} ${category} technology`;
    return this.getUnsplashImage(searchTerm, 600, 400);
  }

  // Main function to generate all images for the store
  async generateAllImages(): Promise<{
    products: { [key: string]: string[] };
    categories: { [key: string]: string };
    brands: { [key: string]: string };
    blogs: { [key: string]: string };
  }> {
    const result = {
      products: {} as { [key: string]: string[] },
      categories: {} as { [key: string]: string },
      brands: {} as { [key: string]: string },
      blogs: {} as { [key: string]: string }
    };

    // GPS Products
    const gpsProducts = [
      { name: 'Garmin GPSMAP 66i', category: 'GPS Handheld' },
      { name: 'Garmin eTrex 32x', category: 'GPS Handheld' },
      { name: 'Garmin GPSMAP 64sx', category: 'GPS Handheld' },
      { name: 'Magellan eXplorist 710', category: 'GPS Handheld' },
      { name: 'Trimble R12i GNSS', category: 'GPS Surveying' },
      { name: 'Leica GS18 I GNSS', category: 'GPS Surveying' },
      { name: 'Topcon HiPer VR GNSS', category: 'GPS Surveying' },
      { name: 'South Galaxy G1 GNSS', category: 'GPS Surveying' },
      { name: 'Leica TS16 Total Station', category: 'Total Station' },
      { name: 'Topcon GT-1200 Robotic', category: 'Total Station' },
      { name: 'Sokkia CX-107 Total Station', category: 'Total Station' },
      { name: 'HI-TARGET ZTS-360R Total Station', category: 'Total Station' },
      { name: 'Leica TM50 Theodolite', category: 'Theodolite' },
      { name: 'Topcon DT-209 Theodolite', category: 'Theodolite' },
      { name: 'South ET-02 Electronic Theodolite', category: 'Theodolite' },
      { name: 'Leica NA720 Automatic Level', category: 'Level Optik' },
      { name: 'Topcon AT-B4 Automatic Level', category: 'Level Optik' },
      { name: 'Sokkia B40 Automatic Level', category: 'Level Optik' },
      { name: 'Leica Rugby 610 Laser Level', category: 'Laser Level' },
      { name: 'Topcon RL-H5A Laser Level', category: 'Laser Level' },
      { name: 'Spectra Precision GL722 Laser Level', category: 'Laser Level' },
      { name: 'DJI Phantom 4 RTK', category: 'Drone Survey' },
      { name: 'Parrot Sequoia+ Multispectral Camera', category: 'Drone Survey' },
      { name: 'GSSI UtilityScan Pro GPR', category: 'Ground Penetrating Radar' },
      { name: 'Sensors Software LMX200 GPR', category: 'Ground Penetrating Radar' }
    ];

    // Generate product images
    gpsProducts.forEach(product => {
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      result.products[slug] = this.generateProductImages(product.name, product.category);
    });

    // GPS Categories
    const gpsCategories = [
      'GPS Handheld', 'GPS Surveying', 'Total Station', 'Theodolite', 
      'Level Optik', 'Laser Level', 'Ranging Pole', 'Prisma Reflektor',
      'GPS Mapping', 'Software Survei', 'Tripod', 'Aksesoris GPS',
      'Drone Survey', 'Ground Penetrating Radar', 'Compass & Clinometer'
    ];

    gpsCategories.forEach(category => {
      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      result.categories[slug] = this.generateCategoryImages(category);
    });

    // GPS Brands
    const gpsBrands = [
      'Garmin', 'Trimble', 'Leica Geosystems', 'Topcon', 'Sokkia',
      'Magellan', 'TomTom', 'Hemisphere GNSS', 'Spectra Precision',
      'Carlson', 'South', 'HI-TARGET', 'CHC Navigation', 'Stonex', 'UniStrong'
    ];

    gpsBrands.forEach(brand => {
      const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      result.brands[slug] = this.generateBrandImages(brand);
    });

    // Blog posts
    const blogPosts = [
      { title: 'Panduan Memilih GPS Handheld Terbaik', category: 'GPS Guide' },
      { title: 'Cara Menggunakan Total Station untuk Survei', category: 'Survey Tutorial' },
      { title: 'Teknologi GNSS Terbaru 2025', category: 'Technology' },
      { title: 'Tips Maintenance Alat Survei', category: 'Maintenance' },
      { title: 'Drone Survey vs Traditional Survey', category: 'Technology Comparison' }
    ];

    blogPosts.forEach(post => {
      const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      result.blogs[slug] = this.generateBlogImages(post.title, post.category);
    });

    return result;
  }
}

// Export singleton instance
export const imageScraper = new ImageScraper();