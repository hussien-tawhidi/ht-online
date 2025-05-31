"use client";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../taost/ToastContext";
import AddToCartButton from "../AddToCartButton";
import { PiShoppingBagThin } from "react-icons/pi";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import {motion} from "framer-motion"
import { updateQuantity } from "@/store/slice/cartSlice";
interface productProps {
  _id: string;
  name: string;
  description: string;
  images: { url: string; public_id: string }[];
  price: number;
  stock: number;
  brand: string;
  sku: string;
  discount?: number;
}
export default function ProductStock({
  stock,
  product,
  stockWarning,
}: {
  stock: number;
  product: productProps;
  stockWarning?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const existItem = cartItems.find((item) => item._id === product._id);

  if (!mounted) {
    // During SSR and before client hydration, render AddToCartButton for consistency
    return (
      <div className='text-sm flex sm:flex-row flex-col sm:items-center justify-between'>
        <div className='flex items-center gap-1'>
          <AddToCartButton
            Icon={PiShoppingBagThin}
            _id={product._id}
            discountPrice={product.discount || 0}
            image={product.images}
            text='همین حالا خرید کنید'
            name={product.name}
            price={product.price}
            color={[{ name: "black", hex: "#000" }]}
            className='w-full text-center py-2 px-3 rounded text-tusi hover:bg-tusi hover:text-lighter transition'
          />
        </div>
        <div className='mt-4 flex md:items-center lg:flex-row md:flex-col flex-row gap-3 text-sm'>
          {stock > 0 ? (
            <span className='inline-flex items-center gap-1 bg-tusi/20 text-tusi px-2 py-1 rounded-full'>
              <MdCheckCircle className='text-base' />
              موجود در انبار
            </span>
          ) : (
            <span className='inline-flex items-center gap-1 bg-[#8b0000]/20 text-[#8b0000] px-2 py-1 rounded-full'>
              <MdError className='text-base' />
              ناموجود
            </span>
          )}

          {stockWarning && stock > 0 && (
            <motion.span
              className='inline-flex items-center gap-1 bg-[#f9a603]/20 text-[#f9a603] px-2 py-1 rounded-full text-xs'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <MdWarning className='text-base' />
              فقط {stock} عدد باقی مانده!
            </motion.span>
          )}
        </div>
      </div>
    );
  }

  // Now that we're mounted, render the real UI with quantity controls
  const handleDecrease = () => {
    if (existItem && existItem.quantity > 1) {
      dispatch(
        updateQuantity({ _id: product._id, quantity: existItem.quantity - 1 })
      );
      addToast(`${product.name} تعداد کم شد`, "success");
    }
  };

  const handleIncrease = () => {
    if (existItem && existItem.quantity < product.stock) {
      dispatch(
        updateQuantity({ _id: product._id, quantity: existItem.quantity + 1 })
      );
      addToast(`${product.name} تعداد بیشتر شد`, "success");
    }
  };

  return (
    <div className='text-sm flex sm:flex-row flex-col sm:items-center justify-between'>
      <div className='flex items-center gap-1'>
        {!existItem ? (
          <AddToCartButton
            Icon={PiShoppingBagThin}
            _id={product._id}
            discountPrice={product.discount || 0}
            image={product.images}
            text='همین حالا خرید کنید'
            name={product.name}
            price={product.price}
            color={[{ name: "black", hex: "#000" }]}
            className='w-full text-center py-2 px-3 rounded text-tusi hover:bg-tusi hover:text-lighter transition'
          />
        ) : (
          <div className='flex items-center gap-3'>
            <button
              onClick={handleDecrease}
              disabled={existItem.quantity <= 1}
              className='text-xl px-2 py-1 rounded bg-tusi/10 text-tusi disabled:opacity-50'>
              -
            </button>
            <span className='px-2'>{existItem.quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={existItem.quantity >= product.stock}
              className='text-xl px-2 py-1 rounded bg-tusi/10 text-tusi disabled:opacity-50'>
              +
            </button>
          </div>
        )}
      </div>

      <div className='mt-4 flex md:items-center lg:flex-row md:flex-col flex-row gap-3 text-sm'>
        {stock > 0 ? (
          <span className='inline-flex items-center gap-1 bg-tusi/20 text-tusi px-2 py-1 rounded-full'>
            <MdCheckCircle className='text-base' />
            موجود در انبار
          </span>
        ) : (
          <span className='inline-flex items-center gap-1 bg-[#8b0000]/20 text-[#8b0000] px-2 py-1 rounded-full'>
            <MdError className='text-base' />
            ناموجود
          </span>
        )}

        {stockWarning && stock > 0 && (
          <motion.span
            className='inline-flex items-center gap-1 bg-[#f9a603]/20 text-[#f9a603] px-2 py-1 rounded-full text-xs'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <MdWarning className='text-base' />
            فقط {stock} عدد باقی مانده!
          </motion.span>
        )}
      </div>
    </div>
  );
}
