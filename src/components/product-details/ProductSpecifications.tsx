"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { BsBoxSeam, BsCpu, BsPalette, BsTag } from "react-icons/bs";

export default function ProductSpecifications({
  brand,
  sku,
}: {
  brand?: string;
  sku?: string;
}) {
  const [showSpecs, setShowSpecs] = useState(true);

  return (
    <div className='border rounded-md border-tusi/30 p-3 mt-10'>
      <button
        className='text-tusi font-semibold flex items-center gap-1.5 justify-between w-full'
        onClick={() => setShowSpecs(!showSpecs)}>
        ویژگی‌ها
        <motion.div
          animate={{ rotate: showSpecs ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className='md:text-xl text-sm origin-center'>
          <IoIosArrowUp />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {showSpecs && (
          <motion.ul
            key='specs'
            className='grid sm:grid-cols-2 gap-3 text-sm text-darker/50 mt-4 overflow-hidden'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <li className='flex items-center gap-2'>
              <BsTag className='text-tusi' />
              <span>برند: {brand || "نامشخص"}</span>
            </li>

            <li className='flex items-center gap-2'>
              <BsCpu className='text-tusi' />
              <span>مدل: {sku || "مدل پیش‌فرض"}</span>
            </li>

            <li className='flex items-center gap-2'>
              <BsPalette className='text-tusi' />
              <span>رنگ: مشکی</span>
            </li>

            <li className='flex items-center gap-2'>
              <BsBoxSeam className='text-tusi' />
              <span>وزن: ۱ کیلوگرم</span>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
