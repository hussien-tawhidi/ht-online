"use client";

import { HiOutlineShoppingBag } from "react-icons/hi";

export default function AddToCard({ text }: { text?: string }) {
  return (
    <button className='px-7 py-2 text-lg rounded-mdtransition-all  duration-300  shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(47,47,47,0)]  active:text-[rgba(102,102,102,1)] active:shadow-[inset_4px_4px_12px_tusi,inset_-4px_-4px_12px_rgba(31,31,31,1)]'>
      <HiOutlineShoppingBag />
      {text}
    </button>
  );
}
