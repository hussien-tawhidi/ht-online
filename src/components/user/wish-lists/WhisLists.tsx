"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromFavorites, addToCart } from "@/store/slice/cartSlice";
import Link from "next/link";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import WishListsCard from "./WishListsCard";
import ProductPreviewDrawer from "./ProductPreviewDrawer";

export default function WhisLists() {
  const wishlist = useSelector((state: RootState) => state.cart.favorites);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);

  const handleRemove = (id: string) => {
    dispatch(removeFromFavorites(id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMoveToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(removeFromFavorites(product._id));
  };

  return (
    <div dir='rtl' className='max-w-7xl mx-auto px-4 py-10 font-vazir'>
      <h1 className='text-3xl font-bold mb-8 text-darker/70'>
        لیست علاقه‌مندی‌های من
      </h1>

      {wishlist.length === 0 ? (
        <div className='text-center text-darker/50 mt-28 space-y-4'>
          <Image
            src='/empty-wishlist.svg'
            alt='لیست خالی'
            width={200}
            height={200}
            className='mx-auto'
          />
          <p className='text-lg'>لیست علاقه‌مندی‌های شما خالی است.</p>
          <Link
            href='/'
            className='inline-block px-6 py-2 bg-darker text-lighter rounded-md hover:bg-opacity-90 transition'>
            بازگشت به فروشگاه
          </Link>
        </div>
      ) : (
        <motion.div
          layout
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {wishlist.map((product) => (
            <WishListsCard
              key={product._id}
              product={product}
              onRemove={handleRemove}
              onMoveToCart={handleMoveToCart}
              onPreview={setPreviewProduct}
            />
          ))}
        </motion.div>
      )}

      {/* 🔍 Quick Preview Modal */}
      <ProductPreviewDrawer
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  );
}
