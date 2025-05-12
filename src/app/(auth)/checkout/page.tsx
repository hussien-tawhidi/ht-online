// pages/checkout.tsx
"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("✅ Order submitted:", {
      ...data,
      cart: cartItem,
      totalPrice,
    });

    // Redirect or clear cart here...
    router.push("/order-success");
  };

  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null; // or a skeleton loader

  return (
    <div className='p-4 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='lg:col-span-2 border p-6 rounded-lg shadow-sm space-y-4'>
        <h1 className='text-2xl font-bold text-tusi mb-4'>اطلاعات سفارش</h1>

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>
            نام و نام خانوادگی
          </label>
          <input
            {...register("name", { required: "این فیلد ضروری است" })}
            className='w-full border p-2 rounded'
          />
          {errors.name?.message && (
            <p className='text-red-500 text-sm'>
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>شماره تماس</label>
          <input
            {...register("phone", { required: "شماره تماس را وارد کنید" })}
            className='w-full border p-2 rounded'
          />
          {errors.phone && (
            <p className='text-red-500 text-sm'>
              {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>آدرس کامل</label>
          <textarea
            {...register("address", { required: "آدرس را وارد کنید" })}
            className='w-full border p-2 rounded'
            rows={3}
          />
          {errors.address && (
            <p className='text-red-500 text-sm'>
              {errors.address.message as string}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-tusi hover:bg-tusi/90 text-white py-3 rounded text-sm'>
          ثبت سفارش
        </button>
      </form>

      {/* Summary */}
      <div className='border p-4 rounded-lg shadow-sm h-fit'>
        <h2 className='text-lg font-semibold text-tusi mb-4'>خلاصه خرید</h2>
        <div className='text-sm text-gray-700 space-y-2'>
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
      </div>
    </div>
  );
}
