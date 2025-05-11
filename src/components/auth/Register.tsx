"use client";

import Link from "next/link";

export default function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4'>
      <form
        action=''
        className='w-full max-w-md bg-white border border-tusi/20 rounded-xl shadow-sm p-8 animate-fade-in'>
        <h2 className='text-2xl font-bold text-center text-tusi mb-8'>
          فورم ورود
        </h2>

        <input
          type='text'
          placeholder='ایمیل شما'
          className='w-full mb-4 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
        />

        <input
          type='text'
          placeholder='شماره تماس'
          className='w-full mb-2 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
        />

        <input
          type='password'
          placeholder='رمز عبور'
          className='w-full mb-2 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
        />
        <input
          type='password'
          placeholder='تکرار رمز عبور'
          className='w-full mb-2 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
        />

        <button
          type='submit'
          className='w-full bg-tusi text-lighter py-3 rounded-lg font-semibold hover:bg-tusi/90 transition'>
          ورود
        </button>

        <p className='mt-6 text-center text-sm'>
          قبلا ثبت‌نام کرده‌اید؟
          <Link
            href='/login'
            className='text-tusi mr-2 font-medium hover:underline'>
            ورود
          </Link>
        </p>
      </form>
    </div>
  );
}
