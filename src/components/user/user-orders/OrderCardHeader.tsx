"use client";

import { BiChevronDown } from "react-icons/bi";
import { FC } from "react";
import { OrderStatus } from "./OrderCard";

interface OrderCardHeaderProps {
  id: string;
  date: string;
  items: number;
  total: string;
  status: OrderStatus;
  isOpen: boolean;
  toggleOpen: () => void;
}

const OrderCardHeader: FC<OrderCardHeaderProps> = ({
  id,
  date,
  items,
  total,
  status,
  isOpen,
  toggleOpen,
}) => {
  const statusLabel = {
    delivered: "تحویل‌شده",
    pending: "در انتظار",
    cancelled: "لغو‌شده",
  }[status];

  const statusClass = {
    delivered: "bg-[#dcfce7] text-[#016630]",
    pending: "bg-[#fed3c2] text-[#ba5026]",
    cancelled: "bg-[#8b0000]/10 text-[#8b0000]",
  }[status];

  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 sm:gap-6'>
      {/* Order Info */}
      <div className='space-y-1 text-sm text-darker/90'>
        <p>
          <span className='font-semibold'>کد سفارش:</span> {id}
        </p>
        <p>
          <span className='font-semibold'>تاریخ:</span> {date}
        </p>
        <p>
          <span className='font-semibold'>تعداد کالاها:</span> {items}
        </p>
      </div>

      {/* Order Summary */}
      <div className='space-y-1 text-sm text-darker/90 text-right'>
        <p>
          <span className='font-semibold'>مبلغ کل:</span> {total}
        </p>
        <p>
          <span className='font-semibold'>وضعیت:</span>{" "}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${statusClass}`}>
            {statusLabel}
          </span>
        </p>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className='ml-auto sm:ml-0 mt-2 sm:mt-0 text-darker/70 hover:text-darker transition-transform'
        aria-label='جزئیات سفارش'
        aria-expanded={isOpen}>
        <BiChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

export default OrderCardHeader;
