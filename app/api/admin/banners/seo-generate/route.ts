import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, description, keywords } = await request.json();

    if (!title || !subtitle) {
      return NextResponse.json(
        { error: 'Title and subtitle are required' },
        { status: 400 }
      );
    }

    // Auto-generate SEO optimized content
    const seoOptimized = {
      // Enhanced title for GPS/Survey niche
      optimizedTitle: enhanceTitle(title, subtitle),
      
      // SEO-friendly description
      optimizedDescription: enhanceDescription(title, subtitle, description),
      
      // Generate relevant keywords
      keywords: generateKeywords(title, subtitle, description, keywords),
      
      // Suggest button text variations
      buttonTextSuggestions: generateButtonText(title, subtitle),
      
      // Suggest background colors for GPS/Survey theme
      backgroundSuggestions: generateBackgroundSuggestions(),
      
      // SEO meta tags
      metaTags: generateMetaTags(title, subtitle, description)
    };

    return NextResponse.json(seoOptimized);

  } catch (error) {
    console.error('SEO generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO content' },
      { status: 500 }
    );
  }
}

function enhanceTitle(title: string, subtitle: string): string {
  const gpsKeywords = ['GPS', 'Survey', 'GNSS', 'Precision', 'Professional', 'Accuracy'];
  const hasGpsKeyword = gpsKeywords.some(keyword => 
    title.toLowerCase().includes(keyword.toLowerCase()) ||
    subtitle.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasGpsKeyword) {
    return `Professional ${title} - GPS Survey Solutions`;
  }
  
  return `${title} - ${subtitle} | GPS Survey Equipment`;
}

function enhanceDescription(title: string, subtitle: string, description?: string): string {
  const baseDesc = description || `${title} ${subtitle}`;
  
  const seoEnhancements = [
    'professional GPS survey equipment',
    'high-precision surveying tools',
    'industry-leading accuracy',
    'trusted by professionals worldwide'
  ];
  
  return `${baseDesc}. Discover ${seoEnhancements[Math.floor(Math.random() * seoEnhancements.length)]} with cutting-edge technology and reliable performance for your surveying projects.`;
}

function generateKeywords(title: string, subtitle: string, description?: string, existingKeywords?: string[]): string[] {
  const baseKeywords = [
    'GPS equipment', 'survey tools', 'GNSS receivers', 'surveying instruments',
    'precision mapping', 'land surveying', 'GPS technology', 'professional survey',
    'measurement tools', 'geospatial equipment', 'topographic survey', 'construction survey'
  ];
  
  const extractedKeywords = [
    ...title.toLowerCase().split(' '),
    ...subtitle.toLowerCase().split(' '),
    ...(description?.toLowerCase().split(' ') || [])
  ].filter(word => word.length > 3);
  
  const existingKeywordsArray = existingKeywords || [];
  
  const allKeywords = [...new Set([...baseKeywords, ...extractedKeywords, ...existingKeywordsArray])]
    .filter(keyword => keyword.length > 2)
    .slice(0, 15);
    
  return allKeywords;
}

function generateButtonText(title: string, subtitle: string): string[] {
  const suggestions = [
    'Explore Now',
    'Shop Equipment',
    'View Products',
    'Get Quote',
    'Learn More',
    'See Details',
    'Browse Catalog',
    'Find Solutions',
    'Contact Sales',
    'Request Demo'
  ];
  
  return suggestions.slice(0, 5);
}

function generateBackgroundSuggestions(): Array<{name: string, value: string, preview: string}> {
  return [
    {
      name: 'Professional Blue',
      value: 'from-blue-50 to-blue-100',
      preview: 'Linear gradient from light blue to lighter blue'
    },
    {
      name: 'Survey Orange',
      value: 'from-orange-50 to-orange-100', 
      preview: 'Linear gradient from light orange to lighter orange'
    },
    {
      name: 'Precision Green',
      value: 'from-green-50 to-green-100',
      preview: 'Linear gradient from light green to lighter green'
    },
    {
      name: 'Tech Gray',
      value: 'from-gray-50 to-gray-100',
      preview: 'Linear gradient from light gray to lighter gray'
    },
    {
      name: 'Modern Purple',
      value: 'from-purple-50 to-purple-100',
      preview: 'Linear gradient from light purple to lighter purple'
    },
    {
      name: 'GPS Cyan',
      value: 'from-cyan-50 to-cyan-100',
      preview: 'Linear gradient from light cyan to lighter cyan'
    }
  ];
}

function generateMetaTags(title: string, subtitle: string, description?: string): Record<string, string> {
  return {
    'og:title': `${title} - ${subtitle}`,
    'og:description': description || `${title} ${subtitle} - Professional GPS Survey Equipment`,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:title': `${title} - ${subtitle}`,
    'twitter:description': description || `${title} ${subtitle} - Professional GPS Survey Equipment`,
    'keywords': generateKeywords(title, subtitle, description).join(', ')
  };
}
