"use client";

import { motion } from "framer-motion";
import SortDropdown from "./SortSelect";
import PriceFilter from "./PriceFilter";
import { MdClear } from "react-icons/md";

interface CategoryToolbarProps {
  sort: string;
  setSort: (value: string) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  clearFilters: () => void;
  defaultSort: string;
  defaultMinPrice: number;
  defaultMaxPrice: number;
}

export default function CategoryToolbar({
  sort,
  setSort,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  clearFilters,
  defaultSort,
  defaultMinPrice,
  defaultMaxPrice,
}: CategoryToolbarProps) {
  const isFilterChanged =
    sort !== defaultSort ||
    minPrice !== defaultMinPrice ||
    maxPrice !== defaultMaxPrice;

  return (
    <motion.div
      className='w-full flex flex-col items-center justify-between gap-4 sm:px-4 px-2 sm:py-3 py-1.5 rounded-md bg-lighter mb-6'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className='flex items-center justify-between gap-4 w-full'>
        <SortDropdown value={sort} onChange={setSort} />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      {/* Clear Filters Button */}
      {isFilterChanged && (
        <motion.button
          onClick={clearFilters}
          className='mt-3 bg-tusi text-lighter px-4 py-2 rounded-md text-sm transition-all duration-300 flex items-center gap-1'
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}>
          <MdClear />
          پاک کردن فیلترها
        </motion.button>
      )}
    </motion.div>
  );
}
