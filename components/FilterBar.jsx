"use client";
import { useRouter, useParams } from "next/navigation";
import { useTransition, useState, useRef, useEffect } from "react";

export default function FilterBar({ categories }) {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [clickedId, setClickedId] = useState(null);
  const scrollRef = useRef(null);

  const slugArray = params?.slug || [];
  const activeCatSlug = slugArray[0] === "category" ? slugArray[1] : null;

  // Active category ko focus mein lane ke liye
  useEffect(() => {
    if (activeCatSlug && scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector(".active-cat");
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCatSlug]);

  const handleFilter = (slug, id) => {
    if (isPending) return;
    setClickedId(id);
    startTransition(() => {
      const url = slug ? `/blogs/category/${slug}/` : "/blogs/";
      router.push(url, { scroll: false });
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 🌫️ Left Side Gradient Fade (Only Mobile) */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#FDFCF9] to-transparent z-10 pointer-events-none" />

      {/* 🚀 Scrollable Container with "Peeking" Padding */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 px-6 md:px-0 pb-5 no-scrollbar items-center scroll-smooth"
      >
        {/* ALL Button */}
        <button
          onClick={() => handleFilter(null, 'all')}
          disabled={isPending}
          className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase border-2 transition-all 
            ${!activeCatSlug 
              ? 'active-cat bg-[#12066a] text-white border-[#12066a] shadow-md' 
              : 'bg-white border-gray-200 text-black active:scale-95'}`}
        >
          All
        </button>

        {/* Categories */}
        {categories.map((cat) => {
          const isActive = activeCatSlug === cat.slug;
          const isThisLoading = isPending && clickedId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleFilter(cat.slug, cat.id)}
              disabled={isPending}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase border-2 transition-all relative
                ${isActive 
                  ? 'active-cat bg-[#12066a] text-white border-[#12066a] shadow-md' 
                  : 'bg-white border-gray-200 text-black hover:border-[#12066a]/30 active:scale-95'}`}
            >
              <span className={isThisLoading ? "opacity-0" : "opacity-100"}>
                <span dangerouslySetInnerHTML={{ __html: cat.name }} />
              </span>
              {isThisLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-[#997819] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 🌫️ Right Side Gradient Fade (Only Mobile) */}
      {/* Is fade ki wajah se aakhri button "cut-off" nazar aayega jo scroll ka signal hai */}
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#FDFCF9] via-[#FDFCF9]/70 to-transparent z-10 pointer-events-none" />

      {/* Custom Scrollbar Styling (Minimalist) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          height: 2px;
        }
        .no-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(153, 120, 25, 0.2);
          border-radius: 10px;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}