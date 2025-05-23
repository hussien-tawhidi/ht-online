"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { userLinks } from "../data";
import LoyaltyPoints from "./LoyaltyPoints";
import { RiArrowDropDownFill } from "react-icons/ri";

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
        className='focus:outline-none flex items-center cursor-pointer '>
        <motion.div
          animate={{ rotate: userMenu ? 180 : 0 }}
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: userMenu ? 0.4 : 0.5,
            delay: userMenu ? 0 : 0.15,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`self-end -ml-2 -mb-2 text-xl transition-colors duration-300 ${
            userMenu ? "text-tusi" : "text-darker/60"
          }`}>
          <RiArrowDropDownFill />
        </motion.div>
        <Image
          src={session.user?.image || "/placeholder.png"}
          width={32}
          height={32}
          alt={`${session.user?.name} عکس برای`}
          className='rounded-full w-8 h-8 object-cover'
        />{" "}
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
            <div className='flex items-center flex-row-reverse justify-start gap-3 pb-4'>
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
            <LoyaltyPoints
              currentPoints={currentPoints}
              nextTierPoints={nextTierPoints}
              progress={progress}
              rewardTiers={rewardTiers}
            />

            {/* Menu Links */}
            <nav className='flex flex-col gap-4 text-darker/70 text-sm mt-3'>
              {userLinks.map((l, i) => (
                <Link
                  key={i}
                  href={`/user/${session.user?.name}/${l.href}`}
                  onClick={toggleMenu}
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
