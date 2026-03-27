import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from "react"; // 🚀 Performance boost ke liye

// 1. cache() use karne se metadata aur page dono ke liye sirf EK request jayegi
const getPost = cache(async (slug) => {
  try {
    const res = await fetch(
      `https://bizgrow-holdings.com/wp-json/wp/v2/posts?slug=${slug}&_embed&_fields=id,slug,title,content,date,yoast_head_json`, 
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) return { title: "BizGrow Holdings" };

  return {
    title: post.yoast_head_json?.title || post.title?.rendered,
    description: post.yoast_head_json?.description || "",
    alternates: { canonical: `https://bizgrow-digital.co.uk/${slug}/` },
    // Social Media ke liye image bhi add kar di hai
    openGraph: {
      images: [post.yoast_head_json?.og_image?.[0]?.url || ""],
    },
  };
}

export default async function SingleBlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar (Optional but looks pro) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#997819]/20 z-50">
        <div className="h-full bg-[#997819] w-0 transition-all duration-300" id="scroll-bar"></div>
      </div>

      <header className="max-w-4xl mt-10 mx-auto px-6 pt-16 pb-10">
        <Link 
          href="/blogs" 
          className="text-[#997819] font-extrabold text-sm tracking-widest uppercase mb-8 inline-block hover:translate-x-[-5px] transition-transform duration-300"
        >
          ← Back to Insights
        </Link>
        <h1 
          className="text-[28px] sm:text-4xl md:text-5xl font-black text-[#12066a] leading-[1.2] mb-6" 
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
        />
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-[#997819]"></div>
          <div className="text-[#997819] font-bold uppercase text-xs tracking-tighter">
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </header>

      {post.yoast_head_json?.og_image?.[0]?.url && (
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
            <img 
              src={post.yoast_head_json.og_image[0].url} 
              alt={post.title.rendered} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div
          className="prose prose-p:text-xl prose-p:leading-[1.9] prose-p:text-gray-700 prose-p:mb-12 
                     prose-h2:text-4xl prose-h2:font-black prose-h2:text-[#12066a] prose-h2:mt-20 prose-h2:mb-8 
                     prose-h3:text-2xl prose-h3:font-extrabold prose-h3:text-[#12066a] 
                     prose-strong:text-[#12066a] prose-strong:font-black 
                     prose-a:text-[#B54118] prose-a:font-bold prose-a:underline 
                     prose-img:rounded-3xl prose-img:shadow-lg
                     max-w-none blog-content-flow"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
}