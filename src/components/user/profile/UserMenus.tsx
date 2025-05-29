"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { userLinkMenu, userProfileQuickLink } from "../data";

export default function UserMenus() {
  const { data: session } = useSession();

  return (
    <div className='lg:col-span-1 w-full space-y-6 border-r border-darker/10 lg:pr-4'>
      {/* User Info */}
      <div className='flex items-center gap-4 px-4 sm:px-0'>
        <Image
          src={session?.user?.image || "/placeholder.png"}
          alt={session?.user?.name + " image"}
          width={64}
          height={64}
          className='rounded-full object-cover ring-2 ring-tusi/30'
        />
        <div className='flex-1'>
          <p className='text-sm font-medium text-darker truncate'>
            {session?.user?.name}
          </p>
          <p className='text-xs text-gray-500 truncate'>
            {session?.user?.email}
          </p>
          <button className='mt-2 flex items-center gap-1 text-xs text-tusi hover:underline'>
            <BiEditAlt className='text-base' />
            ویرایش پروفایل
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className='rounded-lg bg-lighter p-4 shadow-sm sm:px-6'>
        <ul className='space-y-4'>
          {userLinkMenu.map((item, index) => (
            <li key={index}>
              <Link
                href={`/user/${session?.user?.name}/${item.link}`}
                className='flex items-center justify-between text-sm text-darker/60 hover:text-tusi transition'>
                <span className='flex items-center gap-2'>
                  <item.icon className='text-lg' />
                  {item.title}
                </span>
                <IoIosArrowRoundBack className='text-xl' />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className='rounded-lg bg-lighter p-4 shadow-sm sm:px-6'>
        <h3 className='font-semibold text-sm text-darker/80 mb-4'>
          اقدامات سریع
        </h3>
        <ul className='space-y-3'>
          {userProfileQuickLink.map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className='flex items-center gap-2 text-sm text-gray-600 hover:text-tusi transition'>
                <item.icon className='text-base' />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        className='relative overflow-hidden rounded-full bg-light text-[#8b0000] shadow-[10px_10px_20px_rgba(0,0,0,0.05)] border-none cursor-pointer group'
        style={{ "--clr": "#8b0000" } as React.CSSProperties}>
        <div className='absolute inset-0 bg-[var(--clr)] text-lighter translate-x-[-100%] transition-transform duration-300 z-0 group-hover:translate-x-0'></div>

        <div className='relative z-10 flex items-center font-semibold'>
          <span className='w-12 h-10 bg-[var(--clr)] grid text-lighter place-items-center'>
            <CiLogout className='text-lg' />
          </span>
          <span className='px-6 py-2 pl-3 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis transition-colors duration-200 group-hover:text-lighter'>
            خروج از حساب کاربری
          </span>
        </div>
      </button>
    </div>
  );
}
