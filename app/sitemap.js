// app/sitemap.js

export default async function sitemap() {
  const baseUrl = 'https://bizgrow-holdings.com';
  let blogUrls = [];
  
  try {
    // WordPress se blogs fetch karna
    const response = await fetch('https://cms.bizgrow-holdings.com/wp-json/wp/v2/posts?_fields=slug,modified&per_page=100', {
      next: { revalidate: 3600 }
    });
    
    if (response.ok) {
      const posts = await response.json();
      blogUrls = posts.map((post) => ({
        // Blogs direct slug par hain (e.g. bizgrow-holdings.com/what-is-pqq)
        url: `${baseUrl}/${post.slug}`, 
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Sitemap fetch error:', error);
  }

  const staticPages = [
    // Main Pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/our-mission`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/our-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },

    // Compliance & ISO Services
    { url: `${baseUrl}/our-services/sia-acs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/cop-119-labour-provision`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/safe-contractor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/iso-9001`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/iso-14001`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/iso-45001`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/constructionline`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/nasdu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/smas-accreditation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/cyber-essentials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/chas-scheme`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/bs-10800`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/bs7858-screening-vetting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/our-services/bs-7499`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Other Important Links
    { url: `${baseUrl}/training-moments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/uks-private-security-directory`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/compliance-consultancies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/qms-software`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/certificate-verification-validate-bizgrow-certification`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Legal
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...staticPages, ...blogUrls];
}