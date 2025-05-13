import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";

interface OrderSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: any[];
  totalPrice: number;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const OrderSummary = ({
  cartItems,
  totalPrice,
  handleSubmit,
  isSubmitting,
}: OrderSummaryProps) => {
  return (
    <div className='lg:col-span-1'>
      <div className='bg-lighter rounded-xl shadow-sm border border-darker/10 p-6 sticky top-24'>
        <h2 className='text-xl font-bold text-darker mb-6 flex items-center gap-2'>
          <FiShoppingBag className='text-tusi' />
          خلاصه سفارش
        </h2>

        <div className='space-y-4 mb-6'>
          {cartItems.map((item) => (
            <div key={item._id} className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-darker/5 rounded-md flex items-center justify-center'>
                  <span className='text-xs text-darker/50'>
                    {item.quantity}x
                  </span>
                </div>
                <span className='text-sm font-medium text-darker'>
                  {item.name}
                </span>
              </div>
              <span className='text-sm font-medium text-darker'>
                {(item.price * item.quantity).toLocaleString()} تومان
              </span>
            </div>
          ))}
        </div>

        <div className='border-t border-darker/10 pt-4 mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-darker/80'>جمع کل</span>
            <span className='text-darker font-medium'>
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-darker/80'>هزینه ارسال</span>
            <span className='text-darker font-medium'>رایگان</span>
          </div>
          <div className='flex justify-between items-center mt-4 pt-4 border-t border-darker/10'>
            <span className='text-darker font-bold'>مبلغ قابل پرداخت</span>
            <span className='text-tusi font-bold text-lg'>
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='w-full bg-tusi hover:bg-tusi/90 text-lighter py-3 rounded-lg font-medium transition shadow-sm disabled:opacity-70 flex items-center justify-center gap-2'>
          {isSubmitting ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-lighter'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
              در حال ثبت سفارش...
            </>
          ) : (
            "تایید و پرداخت"
          )}
        </motion.button>

        <div className='mt-4 text-xs text-darker/50 text-center'>
          با کلیک بر روی دکمه پرداخت، شرایط و قوانین فروشگاه را پذیرفته اید.
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
