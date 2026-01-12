import { Metadata } from 'next';

export const siteConfig = {
  name: 'Microlearning',
  description: 'Train 250M+ frontline workers in India with 2-3 minute AI-powered microlearning modules delivered via WhatsApp & SMS in 12+ Indian languages.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-learning.app',
  ogImage: '/og-image.jpg',
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@microlearning',
  keywords: [
    'microlearning',
    'frontline workers',
    'WhatsApp training',
    'SMS learning',
    'AI training',
    'India workforce',
    'factory training',
    'warehouse training',
    'employee training',
    'skill development',
    'workforce development',
    'corporate training',
    'employee upskilling',
    'multilingual training',
    'mobile learning',
    'microlearning platform',
    'bite-sized learning',
    'just-in-time training',
    'training automation',
    'learning management system',
    'micro-learning app',
    
  ],
};

interface CreateMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = '',
  keywords = siteConfig.keywords,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: CreateMetadataParams = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | AI-Powered Training for Frontline Workers`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: authors ? authors.map(name => ({ name })) : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_IN',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  };
}
