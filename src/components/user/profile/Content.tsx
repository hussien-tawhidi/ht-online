"use client";
import { toPersianDigits } from "@/libs/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { FaArrowsAltH, FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { numbers } from "../data";

export default function Content() {
  return (
    <div className='lg:col-span-3 space-y-8'>
      {/* آمار سفارشات */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
        {numbers.map((item, index) => (
          <div
            className={`sm:p-5 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between ${item.className}`}
            key={index}>
            <div className='flex flex-col sm:gap-3 gap-1.5 whitespace-nowrap'>
              <h3 className='font-medium text-gray-700'>{item.title}</h3>
              <p className='text-2xl font-bold text-gray-800'>{item.numb}</p>
              <Link
                href={item.link}
                className='mt-2 inline-block text-sm py-1.5 px-4 rounded-full bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-200 shadow-xs'>
                {item.linkTitle}
              </Link>
            </div>
            <div className='p-3 bg-white/50 rounded-full'>
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className='object-contain'
              />
            </div>
          </div>
        ))}
      </div>

      {/* تبلیغات */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {/* Main promotion */}
        <div className='lg:col-span-2 rounded-xl'>
          <Image
            src={"/userMenu/off.png"}
            alt='Special offer'
            height={300}
            width={600}
            className='object-cover w-full rounded-xl lg:h-48'
          />
          <div className='grid md:grid-cols-2 mt-5 rounded-xl overflow-hidden'>
            <div className='flex flex-col lg:h-64 md:h-96 pb-2.5'>
              <Image
                src={"/userMenu/IMG_1135.jpeg"}
                alt='Promotion 1'
                width={300}
                height={300}
                className='object-cover h-full w-full'
              />
              <button className='flex items-center px-2.5 py-1.5 h-full text-lighter w-full text-center justify-center bg-tusi mx-auto text-2xl'>
                ویژه شما
              </button>
            </div>
            <div className='bg-tusi/20 p-7'>
              <button className='flex items-center px-2.5 py-1.5 bg-lighter w-full justify-center rounded-xl gap-1.5 mx-auto mb-3 '>
                پسندیده ها <FaArrowsAltH />
              </button>
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col items-center gap-1'>
                  <Image
                    src={"/userMenu/IMG_1137.jpeg"}
                    alt='Promotion 2'
                    width={200}
                    height={200}
                    className='object-cover lg:h-36 md:h-48 h-full md:w-auto w-full'
                  />
                  <button className='p-2 text-sm text-darker/70 border w-full'>
                    همه
                  </button>
                </div>
                <div className='flex'>
                  <Image
                    src={"/userMenu/IMG_1138.jpeg"}
                    alt='Promotion 3'
                    width={200}
                    height={200}
                    className='object-cover rounded-xl md:w-auto w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side promotion */}
        <div className='relative overflow-hidden'>
          <Image
            src={"/home-categories/w1.jpg"}
            alt='Side promotion'
            width={200}
            height={300}
            className='object-cover lg:h-96 w-full'
          />
          <div className='rounded-xl'>
            <p className='w-full flex items-center justify-between px-3 text-tusi'>
              <span>ساعت شیک و باکلاس</span>
              <span className='flex items-center gap-1.5'>
                {toPersianDigits("4.5")}{" "}
                <FaStar className='-mt-1 text-[#fecf9a]' />
              </span>
            </p>
            <p className='flex justify-between items-center my-3 px-3'>
              <span className='bg-darker/80 py-0.5 px-2 text-sm text-lighter rounded-2xl'>
                تخفیف
              </span>
              <span className='md:text-xl flex gap-1 flex-row-reverse'>
                {toPersianDigits("2000000")}{" "}
                <span className='text-[12px]'>
                  {toPersianDigits("3240000")}
                </span>
              </span>
            </p>
            <p className='bg-[#fecf9a] flex flex-col p-5 rounded-xl'>
              <span className='text-xl'>تخفیف های فصلی</span>
              <span className='flex items-center gap-1'>
                <IoIosArrowRoundForward className='text-2xl mt-1.5' />
                بروز بمانید
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
