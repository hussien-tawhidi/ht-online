"use client";

import Link from "next/link";
import Image from "next/image";
import { LiaGrinStars } from "react-icons/lia";
import { HiStar } from "react-icons/hi2";
import { motion } from "framer-motion";
import { ProductTypes } from "../../../types/product.types";
import { BsEye, BsTruck } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";

interface ProductCardProps {
  product: ProductTypes & {
    stock: number;
    deliveryDays?: number;
    variants?: { name: string; hex: string }[];
    originalPrice?: number;
  };
  special?: boolean;
  isNew?: boolean;
  index?: number;
}

const toPersianDigits = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[+x]);
};

const formatPrice = (price: number): string =>
  `${toPersianDigits(price).replace(/\B(?=(\d{3})+(?!\d))/g, "٬")} تومان`;

const Badge = ({
  text,
  icon,
  className = "",
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`absolute flex items-center gap-1 top-2 left-2 text-[10px] px-2 py-0.5 rounded-full z-10 ${className}`}>
    {icon} {text}
  </span>
);

export default function ProductCard({
  product,
  special,
  isNew,
  index,
}: ProductCardProps) {
  const hasDiscount = !!product.discount && !!product.originalPrice;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className='group relative bg-lighter p-3 sm:p-4 rounded-2xl hover:shadow-lg transition duration-300 border border-tusi/30 hover:border-tusi/20'>
      {/* Badges */}
      {special && (
        <Badge
          text='پیشنهاد ویژه'
          icon={<LiaGrinStars />}
          className='bg-pink-500 text-white'
        />
      )}
      {isNew && (
        <Badge
          text='جدید'
          icon={<LiaGrinStars />}
          className='bg-blue-500 text-white top-10'
        />
      )}
      {hasDiscount && (
        <Badge
          text={`٪${product.discount}`}
          icon={<LiaGrinStars />}
          className='bg-red-500 text-white right-2 left-auto'
        />
      )}

      {/* Quick Actions */}
      <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
        <button
          aria-label='علاقه‌مندی'
          className='p-1 bg-white rounded-full shadow hover:scale-105 transition'>
          <BiHeart className='w-4 h-4 text-tusi' />
        </button>
        <button
          aria-label='پیش‌نمایش سریع'
          className='p-1 bg-white rounded-full shadow hover:scale-105 transition'>
          <BsEye className='w-4 h-4 text-tusi' />
        </button>
      </div>

      {/* Image */}
      <Link
        href={`/product-detials/${product._id}`}
        className='block rounded-xl focus:ring-2 ring-tusi/50'>
        <div className='aspect-square overflow-hidden rounded-xl relative'>
          <Image
            src={product.images?.[0]?.url ?? "/placeholder.png"}
            alt={`تصویر ${product.name}`}
            width={300}
            height={300}
            className='object-cover w-full h-full group-hover:scale-105 transition-transform'
            priority={index !== undefined && index < 3}
            placeholder='blur'
            blurDataURL='/placeholder.png'
          />
        </div>
        {/* Info */}
        <div className='md:mt-3 mt-1 sm:space-y-1'>
          <h3
            title={product.name}
            className='md:text-sm text-[10px] md:font-medium text-tusi line-clamp-1'>
            {product.name}
          </h3>
          {/* Color Swatches */}
          <div className='flex gap-1'>
            {product.variants?.map((v, i) => (
              <span
                key={i}
                className='sm:w-4 sm:h-4 w-2 h-2 rounded-full border border-gray-300'
                style={{ backgroundColor: v.hex }}
                title={v.name}
              />
            ))}
          </div>
          <p className='text-xs sm:flex hidden text-gray-500'>
            {product.category}
          </p>
          {/* Rating */}
          <div className='flex items-center text-yellow-400 sm:text-xs text-[9px] mt-0.5'>
            {[...Array(5)].map((_, i) => (
              <HiStar
                key={i}
                className={
                  i < Math.round(product.ratings ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className='ml-1 text-[10px] text-gray-500'>
              <span className='sm:flex hidden'>
                {(product.ratings ?? 0).toFixed(1)}
              </span>{" "}
              ({toPersianDigits(product.numReviews ?? 0)})
            </span>
          </div>
        </div>
      </Link>

      {/* Price & Add to Cart */}
      <div className='md:mt-4 mt-1.5 space-y-1'>
        {hasDiscount && (
          <p className='sm:text-xs text-[8px] line-through text-gray-400'>
            {formatPrice(product.originalPrice!)}
          </p>
        )}
        <p className='font-semibold sm:text-sm text-[10px] text-tusi flex items-baseline gap-1'>
          {formatPrice(product.price)}
          {hasDiscount && (
            <span className='text-red-500 text-xs'>٪{product.discount}</span>
          )}
        </p>
        {/* Shipping Tag */}
        <span className='flex items-center text-center w-fit mx-auto gap-1 bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full'>
          <BsTruck className='w-3 h-3' /> ارسال رایگان
        </span>
      </div>
    </motion.div>
  );
}
