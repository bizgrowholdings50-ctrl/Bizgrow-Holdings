"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

export default function FilterBar({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [clickedId, setClickedId] = useState(null); // ID track karein ge specific effect k liye
  
  const activeCatSlug = searchParams.get("category");

  const handleFilter = (slug, id) => {
    setClickedId(id); // Set specific ID for animation
    startTransition(() => {
      const url = slug ? `/blogs?category=${slug}` : "/blogs";
      router.push(url);
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {/* --- ALL BUTTON --- */}
      <button
        onClick={() => handleFilter(null, 'all')}
        disabled={isPending}
        className={`px-6 py-2 rounded-full text-[11px] font-black uppercase border-2 transition-all duration-300 relative overflow-hidden
          ${!activeCatSlug ? 'bg-[#12066a] text-white border-[#12066a] shadow-lg scale-105' : 'bg-white border-gray-200 text-black hover:border-[#997819]'}
          ${isPending && clickedId === 'all' ? "scale-110 ring-4 ring-[#997819]/20" : "active:scale-90"}
        `}
      >
        {isPending && clickedId === 'all' && (
          <span className="absolute inset-0 bg-[#997819] animate-pulse opacity-20"></span>
        )}
        All
      </button>

      {/* --- CATEGORY BUTTONS --- */}
      {categories.map((cat) => {
        const isThisLoading = isPending && clickedId === cat.id;
        const isActive = activeCatSlug === cat.slug;

        return (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.slug, cat.id)}
            disabled={isPending}
            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase border-2 transition-all duration-300 relative flex items-center justify-center
              ${isActive ? 'bg-[#12066a] text-white border-[#12066a] shadow-md' : 'bg-white border-gray-200 text-black hover:border-[#997819] hover:text-[#12066a]'}
              ${isThisLoading ? "scale-110 border-[#997819] ring-4 ring-[#997819]/30 z-10" : "active:scale-95"}
            `}
          >
            {/* Attention Grabber: Pulse Ring Effect */}
            {isThisLoading && (
              <span className="absolute inset-0 rounded-full border-2 border-[#997819]  opacity-75"></span>
            )}

            <span className={isThisLoading ? "opacity-60" : "opacity-100"}>
              <span dangerouslySetInnerHTML={{ __html: cat.name }} />
            </span>

            {/* Spinner Overlay */}
            {isThisLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#997819] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}