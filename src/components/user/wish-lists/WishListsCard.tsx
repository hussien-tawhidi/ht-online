"use client";

import Image from "next/image";
import Link from "next/link";
import { BiCartAdd, BiShow, BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";

type WishListsCardProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    image: { url: string }[];
  };
  onRemove: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMoveToCart: (product: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPreview: (product: any) => void;
};

export default function WishListsCard({
  product,
  onRemove,
  onMoveToCart,
  onPreview,
}: WishListsCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={product._id}
      className='relative border border-darker/10 rounded-xl p-4 shadow hover:shadow-lg bg-lighter transition'>
      {/* Remove Button */}
      <button
        onClick={() => onRemove(product._id)}
        className='absolute top-2 left-2 text-[#8b0000]/90 hover:text-[#8b0000]'
        aria-label='حذف'>
        <BiXCircle className='w-6 h-6' />
      </button>

      {/* Product Image */}
      <Image
        src={product.image[0].url}
        alt={product.name}
        width={500}
        height={300}
        className='w-full h-48 object-cover rounded-md mb-3'
      />

      {/* Product Info */}
      <h2 className='text-lg font-semibold text-tusi truncate'>
        {product.name}
      </h2>
      <p className='text-tusi font-bold text-sm'>
        {Number(product.price).toLocaleString()} تومان
      </p>

      {/* Action Buttons */}
      <div className='flex justify-between items-center mt-4 gap-2 text-sm'>
        <button
          onClick={() => onMoveToCart(product)}
          className='flex-1 px-3 py-1 bg-tusi/90 text-lighter rounded hover:bg-tusi transition flex items-center justify-center gap-1'>
          <BiCartAdd />
          افزودن به سبد
        </button>
        <button
          onClick={() => onPreview(product)}
          className='flex-1 px-3 py-1 bg-darker/10 text-darker rounded hover:bg-darker/30 transition flex items-center justify-center gap-1'>
          <BiShow />
          پیش‌نمایش
        </button>
      </div>

      {/* Product Link */}
      <Link
        href={`/product-detials/${product._id}`}
        className='block mt-3 text-tusi hover:underline text-sm text-center'>
        مشاهده جزئیات محصول
      </Link>
    </motion.div>
  );
}
