"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { userLinks } from "../data";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [userMenu, setUserMenu] = useState(false);

  const toggleMenu = () => setUserMenu((prev) => !prev);

  const currentPoints = 1250;
  const nextTierPoints = 2000;
  const progress = Math.min((currentPoints / nextTierPoints) * 100, 100);

  const rewardTiers = [
    { label: "برنز", min: 0, icon: "🥉" },
    { label: "نقره‌ای", min: 1000, icon: "🥈" },
    { label: "طلایی", min: 2000, icon: "🥇" },
  ];

  if (status === "loading") {
    return <div className='w-8 h-8 rounded-full bg-lighter/20 animate-pulse' />;
  }

  if (!session) {
    return (
      <Link href='/login' className='text-xl'>
        <CiUser />
      </Link>
    );
  }

  return (
    <div className='md:relative text-right'>
      <button
        onClick={toggleMenu}
        className='focus:outline-none flex items-center'>
        <Image
          src={session.user?.image || "/placeholder.png"}
          width={32}
          height={32}
          alt={`${session.user?.name} عکس برای`}
          className='rounded-full w-8 h-8 object-cover'
        />
      </button>

      <AnimatePresence>
        {userMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute left-0 mt-2 md:w-80 md:right-auto md:h-auto right-0 w-[98%] mx-auto bg-lighter rounded-xl shadow-lg z-50 md:p-4 p-2 text-sm'
            dir='rtl'>
            {/* User Info */}
            <div className='flex items-center flex-row-reverse justify-start gap-3 border-b pb-4 border-darker/20'>
              <Image
                src={session.user?.image || "/placeholder.png"}
                alt='User'
                width={40}
                height={40}
                className='rounded-full w-10 h-10 object-cover'
              />
              <div className='text-left'>
                <p className='font-bold text-sm text-darker/80'>
                  {session.user?.name}
                </p>
                <p className='text-xs text-darker/50 truncate'>
                  {session.user?.email}
                </p>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className='bg-yellow-50 dark:bg-yellow-900 rounded-md border border-yellow-300 dark:border-yellow-700 p-3'>
              <p className='text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1'>
                امتیازهای وفاداری شما
              </p>
              <p className='text-xs text-yellow-700 dark:text-yellow-300 mb-3'>
                شما{" "}
                <span className='font-bold text-yellow-900 dark:text-yellow-100'>
                  {currentPoints}
                </span>{" "}
                امتیاز دارید
              </p>
              <div className='w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2 overflow-hidden'>
                <motion.div
                  className='bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </div>
              <p className='mt-1 text-xs text-yellow-700 dark:text-yellow-300'>
                {nextTierPoints - currentPoints} امتیاز تا پاداش بعدی!
              </p>

              {/* Reward Tiers */}
              <div className='mt-5 flex items-center justify-between text-xs'>
                {rewardTiers.map((tier, idx) => {
                  const isActive = currentPoints >= tier.min;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center ${
                        isActive
                          ? "text-yellow-900 dark:text-yellow-100 font-bold"
                          : "text-gray-400"
                      }`}>
                      <span className='text-lg'>{tier.icon}</span>
                      <span>{tier.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menu Links */}
            <nav className='flex flex-col gap-4 text-darker/70 text-sm mt-3'>
              {userLinks.map((l, i) => (
                <Link
                  key={i}
                  href={`/user/${session.user?.name}/${l.href}`}
                  className='flex items-center sm:gap-4 hover:text-darker justify-end font-thin gap-2'>
                  {l.title} {l.icon && <l.icon />}
                </Link>
              ))}
            </nav>

            <div className='mt-auto'>
              <button
                onClick={() => signOut()}
                className='flex items-center justify-center bg-tusi flex-row-reverse sm:gap-4 hover:bg-tusi/80 my-1 py-2 gap-2 text-lighter w-full text-sm'>
                <FiLogOut />
                خروج از حساب
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
