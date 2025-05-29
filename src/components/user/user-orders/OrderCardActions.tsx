"use client";

import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderStatus } from "./OrderCard";
import Link from "next/link";
import { PiDownloadSimpleThin } from "react-icons/pi";

interface OrderCardActionsProps {
  orderId: string;
  status: OrderStatus;
  isOpen: boolean;
}

const OrderCardActions: FC<OrderCardActionsProps> = ({
  orderId,
  status,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className='overflow-hidden flex flex-wrap items-center gap-2 pt-3 border-t border-darker/10 mt-4'>
          <Link
            href={`/user/orders/${orderId}`}
            className='flex items-center gap-2 px-4 py-2 border border-darker/20 text-darker text-sm rounded-full hover:bg-muted transition'>
            دانلود <PiDownloadSimpleThin />
          </Link>
          {/* Track Order */}
          {(status === "delivered" || status === "pending") && (
            <button
              className='flex items-center gap-2 px-4 py-2 border border-darker/20 text-darker text-sm rounded-full hover:bg-muted transition'
              onClick={() => alert(`پیگیری سفارش ${orderId}`)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
              پیگیری سفارش
            </button>
          )}

          {/* Repeat Order */}
          <button
            className='flex items-center gap-2 px-4 py-2 border border-darker/20 text-darker text-sm rounded-full hover:bg-muted transition'
            onClick={() => alert(`تکرار سفارش ${orderId}`)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582M20 20v-5h-.582M7.11 7.11A6 6 0 1017 17.89'
              />
            </svg>
            تکرار سفارش
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderCardActions;
