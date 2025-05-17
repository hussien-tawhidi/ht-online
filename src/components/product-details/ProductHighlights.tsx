"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp, IoIosCheckmark } from "react-icons/io";

export default function ProductHighlights() {
  const [showHighlights, setShowHighlights] = useState(true);

  return (
    <div className='border rounded-md border-tusi/30 mt-5 p-3'>
      <button
        className='text-tusi font-semibold flex items-center gap-1.5 justify-between w-full'
        onClick={() => setShowHighlights(!showHighlights)}>
        چرا این محصول؟{" "}
        <motion.div
          animate={{ rotate: showHighlights ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className='md:text-xl text-sm'>
          <IoIosArrowUp />
        </motion.div>
      </button>
      <AnimatePresence>
        {showHighlights && (
          <motion.ul
            className='space-y-2 text-sm text-darker/50 mt-3'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <li className='flex items-center gap-1'>
              <IoIosCheckmark className='text-2xl' /> کیفیت ساخت بالا
            </li>
            <li className='flex items-center gap-1'>
              <IoIosCheckmark className='text-2xl' /> قیمت مناسب نسبت به رقبا
            </li>
            <li className='flex items-center gap-1'>
              <IoIosCheckmark className='text-2xl' /> ارسال سریع و رایگان
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
