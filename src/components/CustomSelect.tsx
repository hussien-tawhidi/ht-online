// components/CustomSelect.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface Option<T> {
  label: string;
  value: T;
  icon?: React.ReactNode;
}

interface CustomSelectProps<T extends string | number> {
  label?: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}

export function CustomSelect<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className='relative w-48' ref={ref}>
      {label && (
        <label className='block mb-1 font-medium text-right'>{label}</label>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 bg-white shadow-sm hover:border-gray-400 transition text-sm'>
        <div className='flex items-center gap-2 truncate'>
          {selected?.icon && <span>{selected.icon}</span>}
          <span>{selected?.label}</span>
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg text-sm max-h-64 overflow-auto'>
            {options.map((opt) => (
              <motion.li
                key={`${opt.value}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
                  opt.value === value ? "bg-gray-100 font-medium" : ""
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
