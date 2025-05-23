"use client";

import Image from "next/image";
import { header } from "../data";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import Link from "next/link";
import CartDropdown from "@/components/cart/CartDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserMenu from "./UserMenu";

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export default function DesktopMenu() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [search, setSearch] = useState(false);
  const [showCartItems, setShowCartItems] = useState(false);
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <motion.div
      className='flex items-center relative h-[10vh] justify-center'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ...spring }}>
      <ul className='flex items-center lg:gap-14 md:gap-8'>
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

        {/* Menu Items */}
        {header.map((item, index) => (
          <motion.li
            key={item.id}
            className='relaive cursor-pointer'
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ...spring,
              delay: 0.2 + index * 0.1,
              duration: 0.5,
            }}>
            <span
              onClick={() => {
                setHoveredItem(null);
                if (item.href) router.push(item.href);
              }}
              // onClick={() => setHoveredItem(null)}
              className={`${
                hoveredItem === item.id ? "opacity-100" : "opacity-70"
              } hover:opacity-100 py-10 px-2 font-thin transition-all hover:text-tusi`}>
              {item.title}
            </span>

            {/* Animated submenu */}
            <AnimatePresence>
              {hoveredItem === item.id && item.submenu?.length > 0 && (
                <motion.div
                  key='submenu-container'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  // onClick={() => setHoveredItem(null)}
                  className='absolute top-12 right-0 left-0 mt-2 w-full h-screen mx-auto z-30 backdrop-blur-[2px] overflow-hidden'>
                  {/* Submenu List */}
                  <div className='flex items-center xl:px-64 lg:px-32 md:px-16 w-full justify-between bg-lighter py-10 gap-10'>
                    <motion.ul className='rounded py-2 grid grid-cols-2 gap-4'>
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          onClick={() => setHoveredItem(null)}>
                          <motion.li
                            key={sub.id}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ ...spring, duration: 0.2 }}
                            className='px-4 py-2 font-thin transition-all hover:text-tusi duration-300 text-sm text-right cursor-pointer hover:bg-gray-100'>
                            {sub.title}
                          </motion.li>
                        </Link>
                      ))}
                    </motion.ul>

                    {/* Banner Image */}
                    {item.image && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={500}
                          className='object-cover w-80 h-auto rounded-lg'
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
        <CartDropdown
          showCartItems={showCartItems}
          setShowCartItems={setShowCartItems}
        />

        {/* Search Icon */}
        <div className='flex items-center gap-7'>
          <motion.li
            onClick={() => setSearch(!search)}
            className='text-xl font-thin cursor-pointer transition-all hover:text-tusi'
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, duration: 0.5, delay: 0.5 }}>
            <CiSearch />
          </motion.li>

          <Search search={search} setSearch={setSearch} />

          {/* Cart Icon */}
          <motion.li
            className='text-xl font-thin cursor-pointer relative transition-all hover:text-tusi'
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0 }}
            onClick={() => setShowCartItems(!showCartItems)}
            animate={{ opacity: 1 }}
            transition={{ ...spring, duration: 0.5, delay: 0.5 }}>
            <motion.span
              key={cartItem.length}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className='absolute -top-2 -right-2 bg-red-700 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center'>
              {mounted ? cartItem.length : 0}
            </motion.span>

            {/* Cart Icon */}
            <CiShoppingCart />
          </motion.li>
          <motion.li>
            <UserMenu />
            
          </motion.li>
        </div>
      </ul>
    </motion.div>
  );
}
