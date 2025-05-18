"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { suggestions } from "../data";
import { sampleProducts } from "@/products-samples";
import { ProductTypes } from "../../../../types/product.types";
import { SearchResultCard } from "./SearchResultCard";

type SearchProps = {
  onSearch?: (query: string) => void;
  search: boolean;
  setSearch: (search: boolean) => void;
};

export default function Search({ search, setSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductTypes[]>([]);
  const [mode, setMode] = useState<"typing" | "results">("typing");
  const debounceRef = useRef<number | null>(null);

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMode("typing");
      return;
    }

    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const found = sampleProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(found);
      setMode("results");
    }, 300);

    return () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setMode("typing");
  };
  // In Search.tsx, inside your results branch (above grid):

  // derive categories
  const categories = Array.from(new Set(results.map((p) => p.category)));

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // toggle a filter
  const toggleFilter = (cat: string) => {
    setActiveFilters((f) =>
      f.includes(cat) ? f.filter((x) => x !== cat) : [...f, cat]
    );
  };

  // filteredResults after both text-search and category
  const filteredResults = results.filter((p) =>
    activeFilters.length ? activeFilters.includes(p.category) : true
  );

  const clearFilters = () => setActiveFilters([]);

  // Highlight query matches in product names
  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className='bg-tusi text-lighter'>
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <AnimatePresence>
      {search && (
        <motion.ul
          key='mobile-menu'
          className={`
            absolute md:top-[10vh] top-[6vh] right-0
            w-screen h-[90vh] z-10 flex flex-col
            bg-lighter/30 backdrop-blur-[2px]
            [&::-webkit-scrollbar]:hidden
            shadow-md
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}>
          {/* Search bar */}
          <div className='bg-lighter w-full rounded-lg  py-5 px-4'>
            <div className='flex pr-3 gap-2 bg-transparent rounded-[5px] overflow-hidden mx-auto md:px-14 lg:px-48 flex-col w-full'>
              <div className='w-full flex items-center'>
                <div className='flex items-center w-full border-b py-3 border-darker/50'>
                  {!query && (
                    <CiSearch className='md:text-2xl text-darker/50' />
                  )}
                  <input
                    className='w-full h-full pl-5 outline-none placeholder-darker/50 text-sm focus:ring-0 rounded-[5px]'
                    placeholder='جستجو کنید ...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                {mode === "results" && (
                  <button className='px-3 text-darker/60' onClick={clearSearch}>
                    <MdClear className='text-xl' />
                  </button>
                )}
              </div>
              <div className='flex flex-wrap gap-2 mb-3'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`
        px-3 py-1 rounded-full text-sm border
        ${
          activeFilters.includes(cat)
            ? "bg-tusi text-lighter border-tusi"
            : "bg-lighter text-darker/60 border-darker/50"
        }
      `}>
                    {cat}
                  </button>
                ))}
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className='ml-auto px-3 py-1 rounded-full text-sm border border-[#8b0000]/40 text-[#8b0000] hover:bg-[#8b0000]/5'>
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results container */}
          <motion.div
            className='flex-1 bg-lighter w-full overflow-y-auto rounded-lg px-4 md:px-14 lg:px-48'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            {mode === "results" ? (
              results.length > 0 ? (
                <div>
                  <div
                    className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-3 gap-1.5'
                    onClick={() => setSearch(false)}>
                    {filteredResults.map((p) => (
                      <li key={p._id}>
                        <SearchResultCard
                          product={{
                            ...p,
                            name: (
                              <span>{highlightMatch(p.name, query)}</span>
                            ) as unknown as string,
                          }}
                        />
                      </li>
                    ))}
                  </div>
                </div>
              ) : (
                <li className='p-2 text-darker/50'>نتیجه‌ای یافت نشد.</li>
              )
            ) : (
              <ul>
                {filteredSuggestions.map((item, index) => (
                  <motion.li
                    key={index}
                    className='cursor-pointer p-2 hover:text-darker/50 transition-all rounded-md md:pr-10 pr-5'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.1,
                      delay: 0.1 * index,
                      ease: "easeInOut",
                    }}
                    onClick={() => setQuery(item)}>
                    <span className='text-[12px] font-thin opacity-80 transition-all hover:opacity-100'>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
