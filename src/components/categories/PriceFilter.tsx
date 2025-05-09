"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PriceFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative w-fit text-right'>
      <div
        className='flex items-center gap-2 cursor-pointer border border-tusi/20 text-tusi sm:text-sm text-[10px] px-2 sm:px-4 sm:py-2 py-2.5 rounded shadow-sm bg-white hover:bg-gray-50 transition-all'
        onClick={() => setOpen(!open)}>
        <FaFilter />
        <span>فیلتر قیمت</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className='absolute mt-2 z-20 right-0 bg-lighter border-tusi/20 border shadow-lg rounded p-4 space-y-3 w-60'>
            <div>
              <label className='block text-tusi text-xs mb-1'>حداقل قیمت</label>
              <input
                type='number'
                value={minPrice || ""}
                placeholder='0'
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className='w-full px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-tusi'
              />
            </div>
            <div>
              <label className='block text-xs mb-1 text-tusi'>
                حداکثر قیمت
              </label>
              <input
                type='number'
                value={maxPrice === Infinity ? "" : maxPrice}
                placeholder='بی‌نهایت'
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value ? Number(e.target.value) : Infinity
                  )
                }
                className='w-full text-tusi px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-tusi'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
