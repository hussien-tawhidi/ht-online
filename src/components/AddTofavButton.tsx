"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToFavorites, CartItem } from "@/store/slice/cartSlice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

const AddTofavButton = ({
  _id,
  color,
  discountPrice,
  image,
  name,
  price,
  quantity,
}: CartItem) => {
  const fave = useSelector((state: RootState) => state.cart.favorites);
  const isFavorited = fave.some((fav) => fav?._id === _id);
  const dispatch = useDispatch();

  const addToFav = () => {
    dispatch(
      addToFavorites({
        _id,
        color,
        discountPrice,
        image,
        name,
        price,
        quantity,
      })
    );
  };

  return (
    <button onClick={addToFav}>
      {!isFavorited ? <CiHeart /> : <FaHeart className='text-red-600' />}
    </button>
  );
};

export default AddTofavButton;
