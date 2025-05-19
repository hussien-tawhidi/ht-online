"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { sampleProducts } from "@/products-samples";
import { SearchResultCard } from "@/components/header/search/SearchResultCard";
import PriceFilter from "@/components/categories/price-filter/PriceFilter";
import SortDropdown from "@/components/categories/SortSelect";
import CategoryFilter from "@/components/CategoryFilter";
import { MdClear } from "react-icons/md";
import { ProductTypes } from "../../../../types/product.types";

const ITEMS_PER_PAGE = 12;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<ProductTypes[]>([]);
  const [sortKey, setSortKey] = useState<
    "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc"
  >("default");
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const debounceRef = useRef<number | null>(null);

  // 1) Debounce user typing
  useEffect(() => {
    window.clearTimeout(debounceRef.current!);
    debounceRef.current = window.setTimeout(() => {
      setDebounced(query.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(debounceRef.current!);
  }, [query]);

  // 2) Filter, sort, and set categories
  useEffect(() => {
    if (!debounced) {
      setResults([]);
      setCategories([]);
      return;
    }
    // text match
    const filtered = sampleProducts.filter((p) =>
      p.name.toLowerCase().includes(debounced.toLowerCase())
    );

    // sort
    if (sortKey === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortKey === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortKey === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // default sort behavior (optional)
      // e.g., leave order as is or apply a fallback sort
    }

    // categories
    setCategories(Array.from(new Set(filtered.map((p) => p.category))));
    setResults(filtered);
  }, [debounced, sortKey]);

  // 3) Apply category + price filters
  const finalResults = results
    .filter((p) => (activeCats.length ? activeCats.includes(p.category) : true))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // 4) Highlight
  const highlight = (text: string) => {
    const parts = text.split(new RegExp(`(${debounced})`, "gi"));
    return (
      <>
        {parts.map((t, i) =>
          t.toLowerCase() === debounced.toLowerCase() ? (
            <mark key={i} className='bg-tusi text-lighter px-1'>
              {t}
            </mark>
          ) : (
            <span key={i}>{t}</span>
          )
        )}
      </>
    );
  };

  // 5) Pagination slice
  const paged = finalResults.slice(0, page * ITEMS_PER_PAGE);
  const canLoadMore = finalResults.length > paged.length;

  const clearSearch = () => {
    setQuery("");
    setResults([]);

    setActiveCats([]);
    setMinPrice(0);
    setMaxPrice(Infinity);
    setSortKey("default");
  };

  return (
    <Suspense fallback={"loading"}>
      <div className='min-h-screen bg-lighter py-10 px-4 md:px-14 lg:px-48 mt-10'>
        {/* Search Input */}
        <div className='flex sm:flex-row flex-col items-center justify-center gap-2 mb-6'>
          <input
            className='flex-1 border border-tusi/30 w-full rounded px-4 sm:py-2'
            placeholder='جستجو کنید...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => setQuery("")}
            className='px-4 py-2 bg-tusi text-lighter rounded sm:w-auto h-full w-full flex items-center justify-center'>
            <MdClear />
          </button>
        </div>

        {/* Filters Panel */}
        <div className='flex flex-wrap gap-3 mb-6'>
          {/* Categories */}
          <CategoryFilter
            categories={categories}
            active={activeCats}
            onToggle={(cat) =>
              setActiveCats((f) =>
                f.includes(cat) ? f.filter((x) => x !== cat) : [...f, cat]
              )
            }
            clearAll={clearSearch}
          />

          {/* Price Range */}
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
     
          <SortDropdown
            value={sortKey}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(v) => setSortKey(v as any)}
          />
        </div>

        {/* Results Grid */}
        {paged.length > 0 ? (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 list-none p-0'>
            {paged.map((p) => (
              <ul key={p._id}>
                <SearchResultCard
                  product={{
                    ...p,
                    name: highlight(p.name) as unknown as string,
                  }}
                />
              </ul>
            ))}
          </div>
        ) : (
          <p className='text-center text-darker/50'>هیچ محصولی یافت نشد.</p>
        )}

        {/* Load More */}
        {canLoadMore && (
          <button
            onClick={() => setPage((x) => x + 1)}
            className='block mx-auto mt-6 px-4 py-2 bg-tusi text-lighter rounded'>
            بارگذاری بیشتر
          </button>
        )}
      </div>
    </Suspense>
  );
}
