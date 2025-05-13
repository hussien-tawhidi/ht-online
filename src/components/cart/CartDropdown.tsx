"use client";

import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { removeFromCart } from "@/store/slice/cartSlice";
import { MdOutlineDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function CartDropdown({
  showCartItems,
  setShowCartItems,
}: {
  showCartItems: boolean;
  setShowCartItems: (value: boolean) => void;
}) {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {showCartItems && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={() => setShowCartItems(false)}
          className='absolute z-50 w-full backdrop-blur-[2px] shadow-2xl rounded-xl top-0 h-screen flex items-start justify-end left-0'>
          {/* Close Button */}
          <button
            onClick={() => setShowCartItems(false)}
            className='absolute top-2 left-5 text-2xl md:hidden flex text-tusi hover:text-red-500 transition'
            aria-label='Close cart'>
            <IoClose />
          </button>
          {cartItem.length > 0 ? (
            <div
              className='lg:w-[30%] md:w-[60%] sm:w-[80%] p-10 w-full bg-lighter h-screen'
              onClick={(e) => e.stopPropagation()}>
              <div className=''>
                {cartItem.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    key={item._id}
                    className='flex items-center gap-3 border-b pb-3 last:border-0'>
                    <Image
                      src={item.image[0]?.url}
                      alt={item.name}
                      width={50}
                      height={50}
                      className='rounded-md object-cover'
                    />
                    <div className='flex-1 text-tusi'>
                      <p className='text-sm font-semibold'>{item.name}</p>
                      <p className='text-xs text-gray-500'>
                        {item.quantity} × {item.price.toLocaleString()} تومان
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className='text-xl text-tusi transition'>
                      <MdOutlineDelete />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Total and CTA */}
              <div className='pt-4 mt-4 border-t text-tusi'>
                <div className='flex justify-between font-semibold text-sm mb-3'>
                  <span>جمع کل:</span>
                  <span>{totalPrice.toLocaleString()} تومان</span>
                </div>
                <Link
                  href='/cart'
                  onClick={() => setShowCartItems(false)}
                  className='block w-full text-center bg-tusi hover:bg-tusi/90 transition text-lighter py-2 rounded-lg text-sm'>
                  مشاهده سبد خرید
                </Link>
              </div>
            </div>
          ) : (
            <div className='text-center py-10 text-gray-500 text-sm'>
              کارت شما خالی است
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
