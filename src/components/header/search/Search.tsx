"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

// Simulate a list of suggestions (replace this with dynamic data as needed)
const suggestions = [
  "خدمات پشتیبانی 24 ساعته",
  "امکانات پرداخت امن",
  "برنامه وفاداری و جوایز",
  "سیستم ارسال سریع و رایگان",
  "پیگیری سفارشات و وضعیت ارسال",
  "مشاوره خرید شخصی",
  "گارانتی و خدمات پس از فروش",
  "آخرین به‌روزرسانی‌ها و اخبار فروشگاه",
];

export default function Search({ search }: { search: boolean }) {
  const [query, setQuery] = useState(""); // Track the search input

  // Filter suggestions based on the search query
  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {search && (
        <motion.ul
          key='mobile-menu'
          className='absolute md:top-[10vh] top-[7vh] right-0  bg-lighter/30 backdrop-blur-[2px] overflow-hidden w-full h-[90vh] z-10 flex flex-col items-start sm:gap-10 gap-7 shadow-md [&::-webkit-scrollbar]:hidden'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}>
          <div className='bg-lighter w-full mx-auto rounded-lg md:py-10 py-5'>
            {/* Search input container */}
            <div className='md:px-14 lg:px-48 mx-auto'>
              <div className='flex items-center border-none w-full pr-3 gap-2 bg-transparent h-[46px] rounded-[5px] overflow-hidden'>
                <CiSearch className='md:text-2xl text-gray-500' />
                <input
                  className='w-full h-full pl-5 outline-none placeholder-gray-500 text-sm focus:ring-0 rounded-[5px]'
                  placeholder='جستجو کنید ...'
                  type='text'
                  aria-label='Search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)} // Update query as user types
                />
              </div>

              {/* Suggested Items */}
              <motion.div
                className='w-full mt-5 rounded-lg overflow-hidden'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth overall transition
              >
                <ul className='md:pr-10 pr-5'>
                  {filteredSuggestions.map((item, index) => (
                    <motion.li
                      key={index}
                      className='cursor-pointer p-2 hover:bg-gray-200 transition-all rounded-md'
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.1,
                        delay: 0.1 * index, // Delay based on the index
                        ease: "easeInOut", // Smooth easing for each item
                      }}>
                      <span className='text-[12px] font-thin opacity-80 transition-all hover:opacity-100'>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
