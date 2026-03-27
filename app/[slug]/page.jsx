import { notFound } from "next/navigation";
import Link from "next/link";

async function getPost(slug) {
  try {
    const res = await fetch(`https://bizgrow-holdings.com/wp-json/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data[0];
  } catch (error) { return null; }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Bizgrow Digital" };
  return {
    title: post.yoast_head_json?.title || post.title?.rendered,
    description: post.yoast_head_json?.description || "",
    alternates: { canonical: `https://bizgrow-digital.co.uk/${slug}/` },
  };
}

export default async function SingleBlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-4xl mt-10 mx-auto px-6 pt-16 pb-10">
        <Link href="/blogs" className="text-[#997819] font-extrabold text-sm tracking-widest uppercase mb-8 inline-block hover:underline">← Back to Insights</Link>
        <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black text-[#12066a] leading-[1.2] mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="text-[#997819] font-medium">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
      </header>

      {post.yoast_head_json?.og_image?.[0]?.url && (
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src={post.yoast_head_json.og_image[0].url} alt={post.title.rendered} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div
          className="prose prose-p:text-xl prose-p:leading-[1.9] prose-p:text-gray-700 prose-p:mb-12 prose-h2:text-4xl prose-h2:font-black prose-h2:text-[#12066a] prose-h2:mt-20 prose-h2:mb-8 prose-h3:text-2xl prose-h3:font-extrabold prose-h3:text-[#12066a] prose-strong:text-[#12066a] prose-strong:font-black prose-a:text-[#B54118] prose-a:font-bold prose-a:underline max-w-none blog-content-flow"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
}