import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test users with hashed passwords
  const hashedPassword = await bcrypt.hash('password123', 12)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'zwolf.dev@gmail.com' },
    update: {},
    create: {
      email: 'zwolf.dev@gmail.com',
      password: hashedPassword,
      name: 'Wolf Developer',
      firstName: 'Wolf',
      lastName: 'Developer',
      role: 'admin',
      isActive: true,
    },
  })

  // Create customer user
  const customerUser = await prisma.user.upsert({
    where: { email: 'developer.aprinia@gmail.com' },
    update: {},
    create: {
      email: 'developer.aprinia@gmail.com',
      password: hashedPassword,
      name: 'Aprinia Developer',
      firstName: 'Aprinia',
      lastName: 'Developer',
      role: 'customer',
      isActive: true,
    },
  })

  // Create customer groups
  const vipGroup = await prisma.customerGroup.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'VIP Customers',
      description: 'High-value customers with special benefits',
      discountPercentage: 10.00,
      minimumOrderAmount: 500.00,
    },
  })

  const regularGroup = await prisma.customerGroup.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Regular Customers',
      description: 'Standard customer group',
      discountPercentage: 0.00,
      minimumOrderAmount: 0.00,
    },
  })

  // Create categories
  const gpsCategory = await prisma.category.upsert({
    where: { slug: 'gps-equipment' },
    update: {},
    create: {
      name: 'GPS Equipment',
      slug: 'gps-equipment',
      description: 'Global Positioning System devices and accessories',
      isActive: true,
      sortOrder: 1,
    },
  })

  const surveyCategory = await prisma.category.upsert({
    where: { slug: 'survey-equipment' },
    update: {},
    create: {
      name: 'Survey Equipment',
      slug: 'survey-equipment',
      description: 'Professional surveying instruments and tools',
      isActive: true,
      sortOrder: 2,
    },
  })

  // Create brands
  const garminBrand = await prisma.brand.upsert({
    where: { slug: 'garmin' },
    update: {},
    create: {
      name: 'Garmin',
      slug: 'garmin',
      description: 'Leading GPS technology company',
      website: 'https://www.garmin.com',
      isActive: true,
    },
  })

  const trimbleBrand = await prisma.brand.upsert({
    where: { slug: 'trimble' },
    update: {},
    create: {
      name: 'Trimble',
      slug: 'trimble',
      description: 'Advanced positioning solutions',
      website: 'https://www.trimble.com',
      isActive: true,
    },
  })

  // Create sample products
  const gpsHandheld = await prisma.product.upsert({
    where: { slug: 'garmin-gpsmap-64st' },
    update: {},
    create: {
      name: 'Garmin GPSMAP 64st',
      slug: 'garmin-gpsmap-64st',
      description: 'Handheld GPS with 2.6" color display, preloaded with TOPO U.S. 100K maps',
      shortDescription: 'Professional handheld GPS with color display',
      sku: 'GAR-GPSMAP-64ST',
      price: 299.99,
      salePrice: 269.99,
      stockQuantity: 50,
      categoryId: gpsCategory.id,
      brandId: garminBrand.id,
      images: ['/images/garmin-gpsmap-64st.jpg'],
      isFeatured: true,
      isActive: true,
      metaTitle: 'Garmin GPSMAP 64st - Professional Handheld GPS',
      metaDescription: 'Professional handheld GPS with color display and preloaded maps',
    },
  })

  const totalStation = await prisma.product.upsert({
    where: { slug: 'trimble-s7-total-station' },
    update: {},
    create: {
      name: 'Trimble S7 Total Station',
      slug: 'trimble-s7-total-station',
      description: 'High-precision robotic total station with advanced measurement technology',
      shortDescription: 'Professional robotic total station',
      sku: 'TRI-S7-TS',
      price: 15999.99,
      stockQuantity: 5,
      categoryId: surveyCategory.id,
      brandId: trimbleBrand.id,
      images: ['/images/trimble-s7.jpg'],
      isFeatured: true,
      isActive: true,
      metaTitle: 'Trimble S7 Total Station - Professional Survey Equipment',
      metaDescription: 'High-precision robotic total station for professional surveying',
    },
  })

  // Create blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'gps-accuracy-guide' },
    update: {},
    create: {
      title: 'Understanding GPS Accuracy: A Complete Guide',
      slug: 'gps-accuracy-guide',
      excerpt: 'Learn about factors affecting GPS accuracy and how to improve measurement precision',
      content: 'GPS accuracy is crucial for professional applications...',
      status: 'published',
      publishedAt: new Date(),
    },
  })

  await prisma.blogPost.upsert({
    where: { slug: 'survey-equipment-maintenance' },
    update: {},
    create: {
      title: 'Essential Survey Equipment Maintenance Tips',
      slug: 'survey-equipment-maintenance',
      excerpt: 'Keep your survey equipment in top condition with these maintenance best practices',
      content: 'Proper maintenance of survey equipment ensures accuracy and longevity...',
      status: 'published',
      publishedAt: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Test accounts created:')
  console.log('   Admin: zwolf.dev@gmail.com / password123')
  console.log('   Customer: developer.aprinia@gmail.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
