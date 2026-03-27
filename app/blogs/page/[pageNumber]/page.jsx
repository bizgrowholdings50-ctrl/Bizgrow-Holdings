import Link from "next/link";
import Image from "next/image";

async function getPosts(page, categoryId = null) {
  const perPage = 9;
  let url = `https://bizgrow-holdings.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`;
  if (categoryId) url += `&categories=${categoryId}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const totalPages = res.headers.get("X-WP-TotalPages") || 1;
    const posts = await res.json();
    return { posts, totalPages: parseInt(totalPages) };
  } catch (error) { return { posts: [], totalPages: 0 }; }
}

async function getCategories() {
  try {
    const res = await fetch("https://bizgrow-holdings.com/wp-json/wp/v2/categories?per_page=30");
    return await res.json();
  } catch (error) { return []; }
}

export default async function BlogPaginationPage({ params, searchParams }) {
  const { pageNumber } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(pageNumber) || 1;
  const activeCat = sParams?.cat || null;

  const { posts, totalPages } = await getPosts(currentPage, activeCat);
  const categories = await getCategories();

  const getLink = (p) => {
    const base = p === 1 ? "/blogs" : `/blogs/page/${p}`;
    return activeCat ? `${base}?cat=${activeCat}` : base;
  };

  return (
    <section className="w-full bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto mt-10 px-6 py-16">
        <header className="text-center mt-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#12066a] mb-4 uppercase">
            Digital Marketing <span className="text-[#997819]">Insights</span>
          </h1>
          <p className="text-[#997819] font-bold">Page {currentPage}</p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link href="/blogs" className={`px-5 py-2 rounded-full text-[10px] font-black uppercase border-2 ${!activeCat ? 'bg-[#12066a] text-white border-[#12066a]' : 'border-gray-200 text-black'}`}>All</Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/blogs?cat=${cat.id}`} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase border-2 ${activeCat == cat.id ? 'bg-[#12066a] text-white border-[#12066a]' :  ' hover:border-[#997819] border-gray-200 text-black'}`} dangerouslySetInnerHTML={{ __html: cat.name }} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-[#997819] flex flex-col overflow-hidden">
              <div className="relative h-56 w-full"><Image src={post.yoast_head_json?.og_image?.[0]?.url || "/placeholder.jpg"} alt={post.title.rendered} unoptimized fill className="object-cover" /></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-extrabold text-[#12066a] mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <Link href={`/${post.slug}`} className="mt-auto text-[#997819] font-extrabold text-xs uppercase tracking-widest">Read Full Story →</Link>
              </div>
            </article>
          ))}
        </div>

        <nav className="flex justify-center items-center gap-4 mt-12 pt-10 border-t border-gray-100">
          <Link href={getLink(currentPage - 1)} className="px-6 py-2 border-2 border-[#997819] text-[#12066a] rounded-full font-bold">PREV</Link>
          <div className="hidden md:flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <Link key={i + 1} href={getLink(i + 1)} className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${currentPage === i + 1 ? "bg-[#12066a] text-white" : "text-gray-400"}`}>{i + 1}</Link>
            ))}
          </div>
          {currentPage < totalPages && <Link href={getLink(currentPage + 1)} className="px-6 py-2 border-2 border-[#997819] text-[#12066a] rounded-full font-bold">NEXT</Link>}
        </nav>
      </div>
    </section>
  );
}