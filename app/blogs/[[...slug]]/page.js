import Link from "next/link";
import Image from "next/image";
import FilterBar from "@/components/FilterBar";
import { notFound } from "next/navigation";

// FIX: Humne _embedded aur featured_media ko fields mein add kiya hai taakay images ka data miss na ho
const WP_FIELDS =
  "_fields=id,slug,title,yoast_head_json,featured_media,_links,_embedded";

async function getData(page = 1, catSlug = null) {
  let catId = null;
  if (catSlug) {
    const catRes = await fetch(
      `https://cms.bizgrow-holdings.com/wp-json/wp/v2/categories?slug=${catSlug}`,
      { next: { revalidate: 3600 } },
    );
    const cats = await catRes.json();
    catId = cats.length > 0 ? cats[0].id : null;
    if (!catId) return { posts: [], totalPages: 0, categories: [] };
  }

  const postsUrl = `https://cms.bizgrow-holdings.com/wp-json/wp/v2/posts?_embed&per_page=9&page=${page}&${WP_FIELDS}${catId ? `&categories=${catId}` : ""}`;
  const [postsRes, catsRes] = await Promise.all([
    fetch(postsUrl, { next: { revalidate: 3600 } }),
    fetch(
      "https://cms.bizgrow-holdings.com/wp-json/wp/v2/categories?per_page=30&_fields=id,name,slug",
      { next: { revalidate: 3600 } },
    ),
  ]);

  return {
    posts: await postsRes.json(),
    totalPages: parseInt(postsRes.headers.get("X-WP-TotalPages") || 1),
    categories: await catsRes.json(),
  };
}

const getPaginationRange = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  let start = Math.max(1, current - 3); // 3 numbers left
  let end = Math.min(total, start + 6); // Total 7 items (start + 6)

  if (end - start < 6) {
    start = Math.max(1, total - 6);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const metadata = {
  title: "BizGrow Blogs | Compliance, Certification & Growth Tips",
  description:
    "Learn how to achieve compliance, secure certifications & scale your business with expert advice from BizGrow Holdings.",
};

export default async function BlogPage({ params }) {
  const { slug: slugArray = [] } = await params;

  if (
    slugArray.length > 0 &&
    slugArray[0] !== "category" &&
    slugArray[0] !== "page"
  ) {
    return notFound();
  }

  let currentPage = 1,
    activeCat = null;

  if (slugArray[0] === "category") {
    activeCat = slugArray[1];
    if (slugArray[2] === "page") currentPage = parseInt(slugArray[3]);
  } else if (slugArray[0] === "page") {
    currentPage = parseInt(slugArray[1]);
  }

  const { posts, totalPages, categories } = await getData(
    currentPage,
    activeCat,
  );
  if (totalPages > 0 && currentPage > totalPages) return notFound();

  const getPageLink = (p) =>
    `/blogs/${activeCat ? `category/${activeCat}/` : ""}${p === 1 ? "" : `page/${p}/`}`;

  return (
    <section className="w-full bg-[#FDFCF9] py-8 md:py-30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-20 md:mt-10">
        <h1 className="text-center text-3xl md:text-5xl font-black text-[#12066a] uppercase mb-10 px-2 leading-tight">
          {activeCat ? activeCat.replace(/-/g, " ") : "Bizgrow Holdings"}{" "}
          <span className="text-[#997819]">Insights</span>
        </h1>

        <div className="w-full mb-12">
          <FilterBar categories={categories} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(posts) &&
            posts.map((post) => {
              // FIX: Image nikalne ka fallback logic (Pehle WP embedded image, phir Yoast OG, phir placeholder)
              const postImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                post.yoast_head_json?.og_image?.[0]?.url ||
                "/placeholder.jpg";

              return (
                <article
                  key={post.id}
                  className="bg-white border border-[#997819]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full group"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={postImage}
                      alt={post.title.rendered || "Blog Image"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2
                      className="text-base font-bold text-[#12066a] mb-4 line-clamp-2 min-h-[3rem]"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <Link
                      href={`/${post.slug}/`}
                      className="mt-auto text-[#997819] font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform duration-300 inline-block"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <nav className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-20 pt-10 border-t border-gray-100 dark:border-white/5">
            {/* Previous Page Button (Sirf tab jab page > 1 ho) */}
            {currentPage > 1 && (
              <Link
                href={getPageLink(currentPage - 1)}
                className="px-8 py-4 rounded-full border-2 border-gray-200 dark:border-white/10 text-gray-500 font-black text-xs uppercase tracking-widest hover:border-[#997819] hover:text-[#997819] transition-all duration-300"
              >
                Previous
              </Link>
            )}

            <div className="flex flex-wrap justify-center gap-3 items-center">
              {getPaginationRange(currentPage, totalPages).map((page) => (
                <Link
                  key={page}
                  href={getPageLink(page)}
                  className={`w-11 h-11 flex items-center justify-center rounded-full text-sm font-black transition-all ${
                    currentPage === page
                      ? "bg-[#997819] text-white shadow-lg shadow-[#997819]/30"
                      : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {/* Next Page Button (Sirf tab jab page < totalPages ho) */}
            {currentPage < totalPages && (
              <Link
                href={getPageLink(currentPage + 1)}
                className="px-8 py-4 rounded-full border-2 border-[#997819] text-[#997819] font-black text-xs uppercase tracking-widest hover:bg-[#997819] hover:text-white transition-all duration-300 shadow-sm"
              >
                Next Page
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
