"use client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductPrice({ price }: { price: number }) {
  const [wishlist, setWishlist] = useState(false);

  return (
    <div className='flex items-center justify-between'>
      <div className='text-xl font-semibold text-tusi'>
        {price.toLocaleString("fa-IR")} تومان
      </div>
      <button onClick={() => setWishlist(!wishlist)} className='text-[#8b0000]'>
        {wishlist ? (
          <FaHeart className='text-xl' />
        ) : (
          <FaRegHeart className='text-xl' />
        )}
      </button>
    </div>
  );
}
