"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/store/slice/cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import type { RootState, AppDispatch } from "@/store/store";

interface ProductPriceProps {
  price: number;
  id: string;
  name: string;
  image: { url: string; public_id: string }[];
}

export default function ProductPrice({
  price,
  id,
  name,
  image,
}: ProductPriceProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.cart.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const exists = favorites.some((item) => item._id === id);
    setIsFavorite(exists);
  }, [favorites, id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      // Add with default quantity and color since your CartItem requires them
      dispatch(
        addToFavorites({
          _id: id,
          name,
          price,
          image,
          quantity: 1, // default
          color: [], // default empty array
          discountPrice: 0, // default or adapt as needed
        })
      );
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='text-xl font-semibold text-tusi'>
        {price.toLocaleString("fa-IR")} تومان
      </div>
      <button onClick={handleToggleFavorite} className='text-[#8b0000]'>
        {isFavorite ? (
          <FaHeart className='text-xl' />
        ) : (
          <FaRegHeart className='text-xl' />
        )}
      </button>
    </div>
  );
}
