import { FiCreditCard } from "react-icons/fi";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (newMethod: string) => void;
}

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) => {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-darker/10 p-6 mb-6'>
      <div className='bg-white rounded-xl shadow-sm border border-darker/10 p-6 mb-6'>
        <h2 className='text-xl font-bold text-darker mb-6 flex items-center gap-2'>
          <FiCreditCard className='text-tusi' />
          روش پرداخت
        </h2>
        <div className='space-y-4'>
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "creditCard"
                ? "border-tusi bg-tusi/5"
                : "border-darker/20 hover:border-darker/30"
            }`}
            onClick={() => setPaymentMethod("creditCard")}>
            <div className='flex items-center gap-3'>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  paymentMethod === "creditCard"
                    ? "border-tusi bg-tusi"
                    : "border-darker/30"
                }`}>
                {paymentMethod === "creditCard" && (
                  <div className='w-2 h-2 rounded-full bg-white'></div>
                )}
              </div>
              <span className='font-medium text-darker'>
                پرداخت آنلاین با کارت بانکی
              </span>
              <div className='flex-1 flex justify-end'>
                <div className='flex gap-1'>
                  <div className='w-8 h-5 bg-darker/10 rounded-sm'></div>
                  <div className='w-8 h-5 bg-darker/10 rounded-sm'></div>
                  <div className='w-8 h-5 bg-darker/10 rounded-sm'></div>
                </div>
              </div>
            </div>
            {paymentMethod === "creditCard" && (
              <div className='mt-3 text-sm text-darker/70'>
                پس از ثبت سفارش به درگاه پرداخت بانک منتقل خواهید شد.
              </div>
            )}
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "cashOnDelivery"
                ? "border-tusi bg-tusi/5"
                : "border-darker/20 hover:border-darker/30"
            }`}
            onClick={() => setPaymentMethod("cashOnDelivery")}>
            <div className='flex items-center gap-3'>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  paymentMethod === "cashOnDelivery"
                    ? "border-tusi bg-tusi"
                    : "border-darker/30"
                }`}>
                {paymentMethod === "cashOnDelivery" && (
                  <div className='w-2 h-2 rounded-full bg-white'></div>
                )}
              </div>
              <span className='font-medium text-darker'>
                پرداخت در محل (پس از دریافت)
              </span>
            </div>
            {paymentMethod === "cashOnDelivery" && (
              <div className='mt-3 text-sm text-darker/70'>
                هزینه سفارش در زمان تحویل کالا دریافت خواهد شد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
