"use client";

import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Search from "../search/Search";
import MobileMenuDropDown from "./MobileMenuDropDown";
import CloseBurgerMenu from "./CloseBurgerMenu";

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  // const toggleMenu = () => setIsOpen((prev) => !prev);
  const router = useRouter();

  return (
    <motion.div
      className='flex items-center h-[7vh] w-[90%] mx-auto bg-lighter'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ...spring }}>
      <ul className='flex items-center justify-between w-full lg:gap-14 md:gap-8'>
        {/* Logo */}
        <motion.li
          className='cursor-pointer'
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, duration: 0.5, delay: 0.1 }}>
          <Image
            width={30}
            height={30}
            className='object-cover w-8 h-auto'
            alt='logo ht-online'
            src={"/logo.png"}
          />
        </motion.li>

        {/* Animated Mobile Menu Items */}
        <MobileMenuDropDown open={open} setOpen={setOpen} />
        {/* search */}
        <Search search={search} />
        {/* Right Icons */}
        <li className='flex items-center gap-5 text-2xl relative z-20'>
          {/* Search Icon */}
          <motion.span
            onClick={() => setSearch(!search)}
            className='cursor-pointer transition-all hover:text-tusi'
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, duration: 0.5, delay: 0.4 }}>
            <CiSearch />
          </motion.span>

          {/* Cart Icon */}
          <motion.span
            className='font-thin cursor-pointer transition-all hover:text-tusi'
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, duration: 0.5, delay: 0.5 }}>
            <CiShoppingCart />
          </motion.span>

          {/* Mobile Menu Toggle */}
          <CloseBurgerMenu open={open} setOpen={setOpen} />
        </li>
      </ul>
    </motion.div>
  );
}
