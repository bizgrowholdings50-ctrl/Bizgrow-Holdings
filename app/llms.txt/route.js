// app/llms.txt/route.js

export async function GET() {
  // CORRECTED: Holdings ka live domain
  const baseUrl = "https://bizgrow-holdings.com"; 
  let dynamicBlogsMarkdown = "";

  try {
    // Live WordPress CMS se posts fetch ho rahi hain
    const response = await fetch(
      "https://cms.bizgrow-holdings.com/wp-json/wp/v2/posts?per_page=50&_fields=slug,title",
      { next: { revalidate: 3600 } }
    );
    const posts = await response.json();

    if (Array.isArray(posts) && posts.length > 0) {
      dynamicBlogsMarkdown = posts
        .map((post) => {
          let cleanTitle = post.title.rendered
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/&#8217;/g, "'")
            .replace(/&#8211;/g, "—")
            .replace(/&amp;/g, "&")
            .replace(/&#038;/g, "&");
          
          return `- [${cleanTitle}](${baseUrl}/${post.slug}/): Expert corporate insights, compliance strategies, and industry updates.`;
        })
        .join("\n");
    } else {
      dynamicBlogsMarkdown = "* No recent articles published yet.";
    }
  } catch (error) {
    dynamicBlogsMarkdown = `- [Corporate Insights & Blogs](${baseUrl}/blogs): Read our latest articles regarding compliance and business growth.`;
  }

  const content = `# BizGrow Holdings

> Premium corporate consultancy, compliance solutions, and professional IT services provider specializing in UK business accreditations and digital transformation.

## Core Information & Company Profile

- [About Us](${baseUrl}/about-us): Insights into BizGrow Holdings, our corporate history, and values.
- [Our Mission](${baseUrl}/our-mission): Understanding our commitment to driving business growth and regulatory compliance.
- [Contact Us](${baseUrl}/contact-us): Get in touch with our compliance officers and technical team.

## Core Business Divisions

- [IT Services](${baseUrl}/it-services): Custom high-performance web development, premium technical SEO, and cloud infrastructure management.
- [Compliance Consultancies](${baseUrl}/compliance-consultancies): Comprehensive professional advisory for corporate governance and regulatory compliance.

## Dynamic Blogs & Latest Insights

${dynamicBlogsMarkdown}

## Legal & Operational Framework

- [Privacy Policy](${baseUrl}/privacy-policy): Detailed document on data processing and privacy measures.
- [Terms & Conditions](${baseUrl}/terms-and-conditions): Corporate terms governing service delivery and compliance contracts.
`;

 return new Response(content, {
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Robots-Tag': 'noindex', // <-- VIP LINE: Google isay index nahi karega, par AI bots crawl kar lenge
  },
});
}