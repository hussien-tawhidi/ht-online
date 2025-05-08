"use client";

import { AnimatePresence, motion } from "framer-motion";
import { header } from "../data";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export default function MobileMenuDropDown({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleItemClick = (itemId: number, href?: string) => {
    const selectedItem = header.find((h) => h.id === itemId);
    if (selectedItem?.submenu?.length) {
      setActiveItem(activeItem === itemId ? null : itemId); // toggle submenu
    } else {
      if (href) router.push(href);
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className='fixed top-[7vh] right-0 backdrop-blur-[2px] w-full h-screen overflow-y-auto z-30 '>
          <motion.ul
            key='mobile-menu'
            className='flex flex-col items-start sm:w-[70%] w-full pr-5 pt-10 sm:gap-10 gap-7 py-4 bg-lighter min-h-screen'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}>
            {header.map((item, index) => (
              <motion.li
                key={item.id}
                className='cursor-pointer group w-full'
                onClick={() => handleItemClick(item.id, item.href)}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{
                  ...spring,
                  delay: 0.1 + index * 0.05,
                  duration: 0.3,
                }}>
                <span
                  className={`${
                    activeItem === item.id
                      ? "opacity-100 bg-tusi/20 p-3"
                      : "opacity-70"
                  } group-hover:opacity-100 text-right transition-all group-hover:text-tusi flex justify-between`}>
                  {item.title}

                  {/* Submenu arrow animation */}
                  {item.submenu?.length > 0 && (
                    <motion.div
                      className='ml-10'
                      initial={{ rotate: 0 }}
                      animate={{ rotate: activeItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <MdKeyboardArrowDown />
                    </motion.div>
                  )}
                </span>

                {/* Submenu */}
                <AnimatePresence>
                  {activeItem === item.id && item.submenu?.length > 0 && (
                    <motion.ul
                      className='flex flex-col gap-3 pr-4 mt-3 text-sm'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}>
                      {item.submenu.map((subItem, subIndex) => (
                        <motion.li
                          key={subItem.id}
                          className='px-4 py-2 text-sm text-gray-700 hover:bg-tusi hover:text-white cursor-pointer rounded transition-all'
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{
                            ...spring,
                            delay: 0.1 + subIndex * 0.05,
                            duration: 0.3,
                          }}
                          onClick={() => router.push(subItem.href)}>
                          {subItem.title}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}
    </AnimatePresence>
  );
}
