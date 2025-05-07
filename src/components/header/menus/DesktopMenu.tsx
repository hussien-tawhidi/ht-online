"use client";

import Image from "next/image";
import { header } from "../data";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Search from "../search/Search";

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export default function DesktopMenu() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [search, setSearch] = useState(false);

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
            onClick={() => {
              if (!item.submenu?.length) router.push("/");
            }}
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
              onClick={() => setHoveredItem(null)}
              className={`${
                hoveredItem === item.id ? "opacity-100" : "opacity-70"
              } hover:opacity-100 py-10 px-2 font-thin transition-all hover:text-tusi`}>
              {item.title}
            </span>

            {/* Underline animation */}
            <span className='absolute bottom-0 right-0 h-[1px] w-0 bg-tusi transition-all duration-300 hover:w-full' />

            {/* Animated submenu */}
            <AnimatePresence>
              {hoveredItem === item.id && item.submenu?.length > 0 && (
                <motion.div
                  key='submenu-container'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setHoveredItem(null)}
                  className='absolute top-12 right-0 left-0 mt-2 w-full h-screen mx-auto z-30 backdrop-blur-[2px] overflow-hidden'>
                  {/* Submenu List */}
                  <div className='flex items-center xl:px-64 lg:px-32 md:px-16 w-full justify-between bg-lighter py-10 gap-10'>
                    <motion.ul className='rounded py-2 grid grid-cols-2 gap-4'>
                      {item.submenu.map((sub) => (
                        <motion.li
                          key={sub.id}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ ...spring, duration: 0.2 }}
                          className='px-4 py-2 font-thin transition-all hover:text-tusi duration-300 text-sm text-right cursor-pointer hover:bg-gray-100'
                          onClick={() => router.push(sub.href)}>
                          <span>{sub.title}</span>
                        </motion.li>
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

        {/* Search Icon */}
        <motion.li
          onClick={() => setSearch(!search)}
          className='text-xl cursor-pointer transition-all hover:text-tusi'
          whileHover={{ scale: 1.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, duration: 0.5, delay: 0.4 }}>
          <CiSearch />
        </motion.li>

        <Search search={search} />

        {/* Cart Icon */}
        <motion.li
          className='text-xl font-thin cursor-pointer transition-all hover:text-tusi'
          whileHover={{ scale: 1.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, duration: 0.5, delay: 0.5 }}>
          <CiShoppingCart />
        </motion.li>
      </ul>
    </motion.div>
  );
}
