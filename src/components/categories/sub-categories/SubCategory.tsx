"use client";

import AddToCart from "@/components/addToCart";
import { header } from "@/components/header/data";
import { sampleProducts } from "@/products-samples";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SubCategory({
  subCategory,
  category,
}: {
  subCategory: string;
  category: string;
}) {
  const cate = header.find((item) => item.href === `/${category}`);
  const subCate = cate?.submenu.find(
    (item) => item.href === `/${category}/${subCategory}`
  );

  const filtered = sampleProducts.filter(
    (item) => item.subcategories === subCate?.title
  );

  if (!subCate) {
    return (
      <div className='text-center mt-20 text-red-500 font-bold'>
        زیر‌دسته‌ای با این مشخصات یافت نشد.
      </div>
    );
  }

  return (
    <motion.div
      className='max-w-7xl mx-auto px-4 mt-24'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <h2 className='md:text-2xl sm:xl: text-sm font-bold mb-8 text-right text-tusi border-r-4 border-tusi border-black pr-3'>
        محصولات مربوط به: {subCate.title}
      </h2>

      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}>
        {filtered.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            key={i}
            className='sm:p-4 p-2 rounded border border-tusi/10'>
            <Image
              width={300}
              height={300}
              src={item.images[0].url}
              alt={item.name}
              className='object-cover rounded mb-2'
            />
            <h2 className='text-sm font-semibold text-tusi'>{item.name}</h2>
            <p className='text-xs text-tusi'>{item.description}</p>
            <p className='text-tusi mt-1 text-xs'>قیمت: {item.price} تومان</p>
            <AddToCart />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
