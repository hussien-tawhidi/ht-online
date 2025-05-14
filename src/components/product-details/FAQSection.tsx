"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    q: "آیا این محصول گارانتی دارد؟",
    a: "بله، این محصول دارای ۱۲ ماه گارانتی می‌باشد.",
  },
  {
    q: "مدت زمان تحویل چقدر است؟",
    a: "تحویل بین ۱ تا ۳ روز کاری خواهد بود.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className='mt-6'>
      <h3 className='text-sm font-bold text-darker/50 mb-3'>سوالات متداول</h3>
      <div className='space-y-2'>
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              className='flex items-center justify-between w-full text-sm font-medium text-darker/50 bg-tusi/10 p-2 rounded'
              onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              {faq.q}
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}>
                <IoIosArrowDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  className='px-2 pt-1 text-xs text-darker/50'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
