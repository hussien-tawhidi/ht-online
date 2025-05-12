"use client";

import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "@/store/slice/cartSlice";

export default function UserCartPage() {
  const [isClient, setIsClient] = useState(false);
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => setIsClient(true), []);
  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const router = useRouter();
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  if (!isClient) return null;

  return (
    <div className='p-4 mt-20'>
      <h1 className='text-2xl font-bold mb-6 text-tusi'>سبد خرید شما</h1>

      {cartItem.length === 0 ? (
        <>
          <p className='text-tusi text-center mb-4'>سبد خرید شما خالی است</p>
          <button
            onClick={() => router.push("/")}
            className='mx-auto block bg-tusi text-lighter px-4 py-2 rounded-md hover:bg-tusi/90 transition'>
            ادامه خرید
          </button>
        </>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cartItem.map((item) => (
              <div
                key={item._id}
                className='flex items-center justify-between rounded-lg p-4 shadow-sm'>
                <div className='flex items-center gap-4'>
                  <Image
                    src={item.image[0]?.url || "/placeholder.png"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className='rounded object-cover'
                  />
                  <div>
                    <h2 className='font-semibold text-tusi'>{item.name}</h2>
                    <p className='text-sm text-tusi'>
                      قیمت: {item.price.toLocaleString()} تومان
                    </p>
                    <div className='flex items-center gap-2 mt-2'>
                      <button
                        onClick={() => dispatch(decreaseQty(item._id))}
                        disabled={item.quantity === 1}
                        className='border px-2 rounded hover:bg-gray-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed'>
                        <AiOutlineMinus />
                      </button>
                      <motion.span
                        key={item.quantity}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.2 }}
                        className='min-w-[20px] text-center font-medium'>
                        {item.quantity}
                      </motion.span>
                      <button
                        onClick={() => dispatch(increaseQty(item._id))}
                        className='border px-2 rounded hover:bg-gray-100 text-sm'>
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className='text-tusi text-xl transition'>
                  <MdOutlineDelete />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className='border rounded-lg p-4 shadow-sm h-fit sticky top-24'>
            <h2 className='text-lg font-semibold text-tusi mb-4'>
              خلاصه سبد خرید
            </h2>
            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              <div className='flex justify-between'>
                <span>تعداد آیتم‌ها:</span>
                <span>{cartItem.length}</span>
              </div>
              <div className='flex justify-between'>
                <span>مجموع تعداد:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className='flex justify-between font-semibold text-tusi'>
                <span>جمع کل:</span>
                <span>{totalPrice.toLocaleString()} تومان</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className='mt-6 w-full bg-tusi hover:bg-tusi/90 text-lighter py-3 rounded-lg text-sm transition'>
              ادامه فرآیند خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
