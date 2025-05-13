interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  discount: number;
  finalTotal: number;
  cartItemLength: number;
  remainingForFreeShipping: number;
}

export default function CartSummary({
  totalQuantity,
  totalPrice,
  discount,
  finalTotal,
  cartItemLength,
  remainingForFreeShipping,
}: CartSummaryProps) {
  return (
    <div className='rounded-xl p-5 shadow-md sticky bg-lighter top-24 h-fit'>
      <h2 className='text-lg font-bold text-tusi mb-5'>خلاصه سبد خرید</h2>

      <div className='space-y-3 text-sm text-gray-700'>
        <div className='flex justify-between text-tusi'>
          <span>تعداد آیتم‌ها:</span>
          <span className='font-medium'>{cartItemLength}</span>
        </div>
        <div className='flex text-tusi justify-between'>
          <span>مجموع تعداد:</span>
          <span className='font-medium'>{totalQuantity}</span>
        </div>
        <div className='flex justify-between text-tusi'>
          <span>جمع کل:</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>
        {discount > 0 && (
          <div className='flex justify-between text-tusi'>
            <span>تخفیف:</span>
            <span>{(totalPrice * discount).toLocaleString()} تومان</span>
          </div>
        )}
        <div className='flex justify-between border-t pt-3 font-semibold text-tusi'>
          <span>مجموع نهایی:</span>
          <span>{finalTotal.toLocaleString()} تومان</span>
        </div>
      </div>

      {/* Free Shipping Info */}
      {remainingForFreeShipping > 0 ? (
        <div className='bg-yellow-50 p-3 rounded-md text-sm mt-3'>
          فقط {remainingForFreeShipping.toLocaleString()} تومان تا ارسال رایگان
          باقی مانده!
        </div>
      ) : (
        <div className='bg-tusi/20 text-tusi p-3 rounded-md text-sm mt-3'>
          تبریک! سفارش شما شامل ارسال رایگان است 🎉
        </div>
      )}
    </div>
  );
}
