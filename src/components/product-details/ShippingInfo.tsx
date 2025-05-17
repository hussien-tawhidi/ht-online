import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

export default function ShippingInfo() {
  const [showShipping, setShowShipping] = useState(false);

  return (
    <div className='p-3 mt-6 text-sm text-darker/50 border rounded-md border-tusi/30'>
      {/* Toggle Button */}
      <button
        onClick={() => setShowShipping(!showShipping)}
        className='flex items-center gap-1 font-semibold text-tusi  justify-between w-full'>
        اطلاعات ارسال و گارانتی
        <motion.span
          animate={{ rotate: showShipping ? 0 : 180 }}
          transition={{ duration: 0.3 }}>
          <IoIosArrowUp className='text-lg' />
        </motion.span>
      </button>

      {/* Animated Section */}
      <AnimatePresence initial={false}>
        {showShipping && (
          <motion.div
            key='shipping-info'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden space-y-3 mt-3'>
            <div className='flex items-start gap-2'>
              <span className='text-xl'>🚚</span>
              <p className='leading-relaxed'>
                ارسال رایگان برای سفارش‌های بالای{" "}
                <span className='font-medium text-tusi'>۵۰۰ هزار تومان</span>
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <span className='text-xl'>🔁</span>
              <p className='leading-relaxed'>
                <span className='font-medium text-tusi'>
                  ۷ روز ضمانت بازگشت
                </span>{" "}
                بی‌قید و شرط
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <span className='text-xl'>🛡️</span>
              <p className='leading-relaxed'>
                <span className='font-medium text-tusi'>
                  گارانتی اصالت و سلامت فیزیکی
                </span>{" "}
                کالا
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
