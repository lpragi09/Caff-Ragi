"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductsCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }

  function scrollBy(direction: 1 | -1) {
    scrollToIndex(Math.min(Math.max(active + direction, 0), products.length - 1));
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      let closest = 0;
      let minDistance = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      });
      setActive(closest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[82%] flex-none snap-start sm:w-[60%] md:w-[45%] lg:w-[48%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {products.map((product, i) => (
            <button
              key={product.id}
              type="button"
              aria-label={`Ir para ${product.title}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-gold" : "w-1.5 bg-cream/20 hover:bg-cream/35"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Produto anterior"
            disabled={active === 0}
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/40 hover:text-gold-light disabled:opacity-30 disabled:hover:border-cream/15 disabled:hover:text-cream"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximo produto"
            disabled={active === products.length - 1}
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/40 hover:text-gold-light disabled:opacity-30 disabled:hover:border-cream/15 disabled:hover:text-cream"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
