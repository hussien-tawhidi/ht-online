"use client";
export default function StickyBuyBar({ price }: { price: number }) {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-lighter border-t p-3 flex items-center justify-between md:hidden'>
      <span className='text-tusi font-bold'>
        {price.toLocaleString("fa-IR")} تومان
      </span>
      <button className='bg-tusi text-lighter px-4 py-2 rounded font-semibold'>
        افزودن به سبد خرید
      </button>
    </div>
  );
}
