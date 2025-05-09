"use client";

import React, { useState } from "react";
import Image from "next/image";
import { header } from "../header/data";
import { sampleProducts } from "@/products-samples";
import { motion } from "framer-motion";
import CategoryToolbar from "./CategoryToolbar";
import AddToCart from "../addToCart";
export default function Categories({ category }: { category: string }) {
  const cate = header.find((item) => item.href === `/${category}`);

  // Use title to filter products
  const filtered = sampleProducts.filter(
    (item) => item.category === cate?.title
  );

  // Sort & filter states
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const sorted = [...filtered]
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });
  const defaultSort = "default";
  const defaultMinPrice = 0;
  const defaultMaxPrice = Infinity;

  const clearFilters = () => {
    setSort("default");
    setMinPrice(0);
    setMaxPrice(Infinity);
  };
  return (
    <div className='p-4'>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.3 }}
        className='text-xl text-tusi font-semibold mb-4'>
        دسته‌بندی: {cate?.title || "نامشخص"}{" "}
        {sort.length > 0 && (
          <p className='text-sm font-thin mt-3 flex items-center'>
            {sort.length} - محصول
          </p>
        )}
      </motion.h1>

      {/* Filters */}
      <div className='flex flex-wrap gap-4 mb-6'>
        <CategoryToolbar
          defaultSort={defaultSort}
          defaultMinPrice={defaultMinPrice}
          defaultMaxPrice={defaultMaxPrice}
          sort={sort}
          setSort={setSort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          clearFilters={clearFilters}
        />
      </div>

      {/* Product Grid */}
      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {sorted.length > 0 ? (
          sorted.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              key={index}
              className='sm:p-4 p-2 rounded border border-tusi/10'>
              <Image
                width={300}
                height={300}
                src={product.images[0].url}
                alt={product.name}
                className='object-cover rounded mb-2'
              />
              <h2 className='text-sm font-semibold text-tusi'>
                {product.name}
              </h2>
              <p className='text-xs text-tusi'>{product.description}</p>
              <p className='text-tusi mt-1 text-xs'>
                قیمت: {product.price} تومان
              </p>
              <AddToCart />
            </motion.div>
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>
            محصولی یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}
