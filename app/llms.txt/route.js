// app/llms.txt/route.js

export async function GET() {
  const baseUrl = "https://bizgrow-holdings.com";

  // Helper to clean HTML tags, entities, and extra spaces
  const cleanText = (str = "") =>
    String(str)
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&#8212;/g, "-")
      .replace(/&amp;/g, "&")
      .replace(/&#038;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\[\x26#8230;\]/g, "...")
      .replace(/\[\.\.\.\]/g, "...")
      .replace(/\s+/g, " ")
      .trim();

  // Multi-tier description builder: Yoast SEO Meta -> WP Excerpt -> Smart Fallback
  const buildDescription = (post, title) => {
    // 1. Try Yoast SEO Meta Description
    const yoastDesc = cleanText(
      post.yoast_head_json?.description || 
      post.yoast_head_json?.og_description || 
      ""
    );
    if (yoastDesc && yoastDesc.length > 20) {
      return yoastDesc.length > 160 ? yoastDesc.slice(0, 157).trim() + "..." : yoastDesc;
    }

    // 2. Fallback to standard WP Excerpt
    const rawExcerpt = post.excerpt?.rendered || post.excerpt || "";
    const cleanedExcerpt = cleanText(rawExcerpt);
    if (cleanedExcerpt && cleanedExcerpt.length > 20) {
      return cleanedExcerpt.length > 160
        ? cleanedExcerpt.slice(0, 157).trim() + "..."
        : cleanedExcerpt;
    }

    // 3. Fallback to clean contextual description generated from title
    const t = title.toLowerCase();
    const coreSubject = title
      .replace(/\b(a complete guide|complete guide|guide|in the uk|uk 2026|2026|what is|how to|explained)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (/security|guard|patrol|dog|cctv|k9|acs|nasdu|sia|vetting|bs7858/i.test(t)) {
      return `Regulatory standards, compliance requirements, and operational guidelines for ${coreSubject.toLowerCase()}.`;
    }

    if (/iso|audit|quality|risk assessment|cqms|sheq|cyber essentials|bs 10119|cop 119/i.test(t)) {
      return `Framework compliance, certification criteria, and audit procedures for ${coreSubject.toLowerCase()}.`;
    }

    if (/chas|ssip|safecontractor|constructionline|coshh|rams|health/i.test(t)) {
      return `Health and safety compliance, contractor vetting, and accreditation standards for ${coreSubject.toLowerCase()}.`;
    }

    return `Operational, legal, and regulatory considerations for ${coreSubject.toLowerCase()}.`;
  };

  const categorizePost = (title) => {
    const t = title.toLowerCase();

    if (/security|guard|patrol|dog|door supervision|cctv|k9|event|close protection|manned|vetting|bs7858|acs|nasdu|sia/i.test(t)) {
      return "Security & Guarding Compliance";
    }

    if (/iso 9001|iso 14001|iso 45001|quality|audit|risk assessment|cqms|sheq|cyber essentials|bs 10119|cop 119|standard/i.test(t)) {
      return "ISO & Quality Standards";
    }

    if (/chas|ssip|safecontractor|constructionline|coshh|rams|health and safety|construction site|construction company|contractor|accreditation/i.test(t)) {
      return "Health, Safety & Construction Accreditations";
    }

    return "Business Setup & Legal Compliance";
  };

  let dynamicBlogsMarkdown = "";

  try {
    const response = await fetch(
      "https://cms.bizgrow-holdings.com/wp-json/wp/v2/posts?per_page=50&_fields=slug,title,excerpt,yoast_head_json",
      { next: { revalidate: 3600 } }
    );
    const posts = await response.json();

    if (Array.isArray(posts) && posts.length > 0) {
      const categories = {
        "Security & Guarding Compliance": [],
        "ISO & Quality Standards": [],
        "Health, Safety & Construction Accreditations": [],
        "Business Setup & Legal Compliance": [],
      };

      posts.forEach((post) => {
        const title = cleanText(post.title?.rendered || post.title || "Untitled Post");
        const slug = String(post.slug || "").trim();
        const category = categorizePost(title);

        if (categories[category]) {
          categories[category].push({
            title,
            url: `${baseUrl}/${slug}/`,
            description: buildDescription(post, title),
          });
        }
      });

      const sections = Object.entries(categories)
        .filter(([, items]) => items.length > 0)
        .map(([heading, items]) => {
          const list = items
            .map((item) => `- [${item.title}](${item.url}): ${item.description}`)
            .join("\n");

          return `### ${heading}\n\n${list}`;
        });

      dynamicBlogsMarkdown = sections.join("\n\n");
    } else {
      dynamicBlogsMarkdown = "* No recent articles published yet.";
    }
  } catch (error) {
    dynamicBlogsMarkdown = `- [Corporate Insights & Blogs](${baseUrl}/blogs): Read our latest articles regarding compliance and business growth.`;
  }

  const content = `# BizGrow Holdings

> Premium corporate consultancy, compliance solutions, and professional IT services provider specializing in UK business accreditations and digital transformation.

## Private Security Compliance Consultancy

BizGrow Holdings is a UK-based private security compliance consultancy supporting security companies with SIA ACS, COP 119, BS 10119, BS 7858, NASDU, and related UK security compliance requirements.

Our security compliance consultancy services include ACS preparation, security business compliance, audit readiness, documentation support, tender compliance, and ongoing accreditation support.

- [Compliance Consultancies Service](${baseUrl}/compliance-consultancies): Primary portal for UK security accreditation, ISO consultancy, and audit management.

## Core Standards Summary

- Security Standards: COP 119, BS 10119, BS 10800, BS 7858, SIA ACS, NASDU.
- ISO Standards: ISO 9001, ISO 14001, ISO 45001.
- Health & Safety / Construction: CHAS, SSIP, SafeContractor, Constructionline, COSHH, RAMS.
- Quality & Governance: CQMS, Cyber Essentials, SHEQ, and audit-led compliance frameworks.

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
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}