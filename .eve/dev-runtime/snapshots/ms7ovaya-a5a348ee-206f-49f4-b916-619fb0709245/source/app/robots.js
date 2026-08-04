// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Agar aap apne API routes hide karna chahte hain
    },
    sitemap: 'https://bizgrow-holdings.com/sitemap.xml',
  }
}