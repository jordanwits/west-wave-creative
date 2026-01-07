import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/forms/', '/api/'],
      },
    ],
    sitemap: 'https://westwavecreative.com/sitemap.xml',
  }
}

