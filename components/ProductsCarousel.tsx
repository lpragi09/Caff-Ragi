"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductsCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isJumping = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = products.length;
  const loop = count > 1;
  const slides = loop ? [products[count - 1], ...products, products[0]] : products;

  function slideAt(index: number) {
    const track = trackRef.current;
    return track?.children[index] as HTMLElement | undefined;
  }

  function scrollToSlide(index: number, smooth = true) {
    const track = trackRef.current;
    const slide = slideAt(index);
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }

  function closestIndex(track: HTMLDivElement) {
    const children = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let minDistance = Infinity;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - track.scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });
    return closest;
  }

  // Start on the first real slide (index 1 in the cloned array), no animation.
  useLayoutEffect(() => {
    if (!loop) return;
    isJumping.current = true;
    scrollToSlide(1, false);
    requestAnimationFrame(() => {
      isJumping.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function handleScroll() {
      if (!track || isJumping.current) return;
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        const idx = closestIndex(track);

        if (loop && idx === 0) {
          isJumping.current = true;
          scrollToSlide(count, false);
          requestAnimationFrame(() => {
            isJumping.current = false;
          });
          setActive(count - 1);
        } else if (loop && idx === slides.length - 1) {
          isJumping.current = true;
          scrollToSlide(1, false);
          requestAnimationFrame(() => {
            isJumping.current = false;
          });
          setActive(0);
        } else {
          setActive(loop ? idx - 1 : idx);
        }
      }, 120);
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, loop]);

  function goToDot(index: number) {
    scrollToSlide(loop ? index + 1 : index);
  }

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    scrollToSlide(closestIndex(track) + direction);
  }

  return (
    <div className="relative mt-8">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {slides.map((product, i) => (
          <div
            key={`${product.id}-${i}`}
            className="w-[82%] flex-none snap-start sm:w-[60%] md:w-[45%] lg:w-[31%]"
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
              onClick={() => goToDot(i)}
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
            onClick={() => step(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/40 hover:text-gold-light"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximo produto"
            onClick={() => step(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/40 hover:text-gold-light"
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
