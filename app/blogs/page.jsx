import Link from "next/link";
import Image from "next/image";
import FilterBar from "@/components/FilterBar";

// 1. Optimized: Sirf zaroori fields mangwana taake response fast ho
const WP_FIELDS = "_fields=id,slug,title,yoast_head_json";

async function getCategoryIdBySlug(slug) {
  if (!slug) return null;
  try {
    const res = await fetch(
      `https://bizgrow-holdings.com/wp-json/wp/v2/categories?slug=${slug}&${WP_FIELDS}`,
      { next: { revalidate: 3600 } }
    );
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch { return null; }
}

async function getPosts(page = 1, categoryId = null) {
  // Performance Tip: 100 posts load karna browser ko slow karta hai. 
  // Isay 12 ya 15 par rakhna behtar hai, lekin maine aapka logic (100 if category) barkarar rakha hai.
  const perPage = categoryId ? 100 : 9; 
  let url = `https://bizgrow-holdings.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}&${WP_FIELDS}`;
  
  if (categoryId) url += `&categories=${categoryId}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const totalPages = res.headers.get("X-WP-TotalPages") || 1;
    const posts = await res.json();
    return { posts: Array.isArray(posts) ? posts : [], totalPages: parseInt(totalPages) };
  } catch { return { posts: [], totalPages: 0 }; }
}

async function getCategories() {
  try {
    // Categories mein bhi sirf id, name aur slug mangwayein
    const res = await fetch("https://bizgrow-holdings.com/wp-json/wp/v2/categories?per_page=30&_fields=id,name,slug", { next: { revalidate: 3600 } });
    return await res.json();
  } catch { return []; }
}

export default async function BlogPage({ searchParams }) {
  const sParams = await searchParams;
  const catSlug = sParams?.category || null;
  const currentPage = parseInt(sParams?.page) || 1;
  
  // Pehle Category ID nikaalni hogi kyunki Posts is par depend karti hain
  const activeCatId = await getCategoryIdBySlug(catSlug);

  // 🚀 OPTIMIZATION: Posts aur Categories ab PARALLEL fetch hongi
  const [postsData, categories] = await Promise.all([
    getPosts(currentPage, activeCatId),
    getCategories()
  ]);

  const { posts, totalPages } = postsData;

  return (
    <section className="w-full bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="text-center mt-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#12066a] uppercase">
            Digital Marketing <span className="text-[#997819]">Insights</span>
          </h1>
        </header>

        <FilterBar categories={categories} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-[#997819] flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={post.yoast_head_json?.og_image?.[0]?.url || "/placeholder.jpg"} 
                  alt={post.title.rendered} 
                  unoptimized // Filhaal unoptimized rakha hai jaisa aapka pehle tha
                  fill 
                  className="object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-extrabold text-[#12066a] mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <Link href={`/${post.slug}`} className="mt-auto text-[#997819] font-extrabold text-xs uppercase tracking-widest hover:underline">Read Full Story →</Link>
              </div>
            </article>
          ))}
        </div>

        {!catSlug && totalPages > 1 && (
          <nav className="flex justify-center items-center gap-4 mt-16 pt-10 border-t border-gray-100">
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Link 
                    key={pageNum} 
                    href={`/blogs?page=${pageNum}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${currentPage === pageNum ? "bg-[#12066a] text-white scale-110 shadow-md" : "text-gray-400 hover:text-[#12066a]"}`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
            {currentPage < totalPages && (
              <Link href={`/blogs?page=${currentPage + 1}`} className="px-8 py-2 border-2 border-[#997819] text-[#12066a] rounded-full font-bold hover:bg-[#997819] hover:text-white transition-all">
                NEXT
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}