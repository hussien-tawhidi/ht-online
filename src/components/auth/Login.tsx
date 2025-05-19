"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className='bg-gray-50 py-20 min-h-screen '>
      <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto bg-white border border-tusi/20 rounded-xl shadow-sm p-8'>
        <form
          action=''
          className=' '>
          <h2 className='text-2xl font-bold text-center text-tusi mb-8'>
            فورم ورود
          </h2>

          <input
            type='text'
            placeholder='ایمیل شما'
            className='w-full mb-4 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
          />

          <input
            type='password'
            placeholder='رمز عبور'
            className='w-full mb-2 border border-tusi/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tusi transition'
          />

          <div className='text-right mb-4'>
            <Link href='#' className='text-sm text-tusi hover:underline'>
              رمز عبور خود را فراموش کرده‌اید؟
            </Link>
          </div>

          <button
            type='submit'
            className='w-full bg-tusi text-lighter py-3 rounded-lg font-semibold hover:bg-tusi/90 transition'>
            ورود
          </button>
        </form>
        <button
          onClick={() => signIn("google")}
          className='flex items-center justify-center w-full border py-2 gap-2 max-w-md border-tusi/30 text-tusi my-3'>
          ورود با <FcGoogle />
        </button>
        <p className='mt-6 text-center text-sm'>
          هنوز ثبت‌نام نکرده‌اید؟{" "}
          <Link
            href='/register'
            className='text-tusi mr-2 font-medium hover:underline'>
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
