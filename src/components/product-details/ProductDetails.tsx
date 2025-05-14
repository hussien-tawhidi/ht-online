"use client";

import { sampleProducts } from "@/products-samples";
import AddToCartButton from "../AddToCartButton";
import RelatedProducts from "./RelatedProducts";
import ProductReview from "./ProductReview";
import { PiShoppingBagThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageGallery from "./ImageGallery";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

export default function ProductDetails({ productId }: { productId: string }) {
  const product = sampleProducts.find((item) => item._id === productId);
  const [wishlist, setWishlist] = useState(false);

  if (!product) return null;

  const handleWishlistToggle = () => setWishlist(!wishlist);

  return (
    <div className='container mx-auto px-4 py-8 mt-16'>
      {/* Breadcrumbs */}
      <motion.div
        className='text-sm text-gray-400 mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <Link href='/'>خانه</Link> / <Link href='/products'>محصولات</Link> /{" "}
        {product.name}
      </motion.div>

      <ImageGallery
        product={product}
        variants={[
          { name: "قرمز", hex: "#FF0000" },
          { name: "آبی", hex: "#0000FF" },
          { name: "مشکی", hex: "#000000" },
        ]}
        stockWarning={product.stock < 5}
      />

      {/* FAQs */}
      <motion.div
        className='mt-12'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h3 className='font-semibold text-lg mb-3 text-darker/50'>
          سوالات متداول
        </h3>
        <ul className='space-y-2 text-sm text-darker/50'>
          <li> چگونه سفارش خود را پیگیری کنم؟</li>
          <li> آیا امکان تعویض کالا وجود دارد؟</li>
        </ul>
      </motion.div>

      {/* Product Reviews */}
      <motion.div
        className='mt-12'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}>
        <ProductReview />
      </motion.div>

      {/* Related Products */}
      <motion.div
        className='mt-12'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}>
        <RelatedProducts currentId={product._id} />
      </motion.div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className='fixed top-16 right-4 z-30 p-3 bg-lighter rounded-full shadow-md hover:bg-darker/10 transition'>
        <FaRegHeart
          className={`text-xl ${
            wishlist ? "text-[#8b0000]" : "text-darker/40"
          }`}
        />
      </button>

      {/* Sticky bar for mobile */}
      <div className='fixed bottom-0 left-0 right-0 bg-lighter border-t shadow-md p-4 flex justify-between items-center md:hidden z-30'>
        <span className='text-tusi font-semibold'>
          {product.price.toLocaleString("fa-IR")} تومان
        </span>
        <AddToCartButton
          Icon={PiShoppingBagThin}
          _id={product._id}
          discountPrice={10}
          image={product.images}
          name={product.name}
          price={product.price}
          color={[{ name: "black", hex: "#000" }]}
        />
      </div>

      {/* Delivery Estimator */}
      <div className='mt-12 text-sm text-darker/50'>
        <h3 className='font-semibold text-lg mb-3'>محاسبه هزینه ارسال</h3>
        <p>📍 ارسال به تهران: رایگان، ارسال به سایر استان‌ها: ۱۵ هزار تومان</p>
      </div>
    </div>
  );
}
