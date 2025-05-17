"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: "default", label: "مرتب‌سازی" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "name-asc", label: "نام (A-Z)" },
  { value: "name-desc", label: "نام (Z-A)" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterText, setFilterText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown only when clicking outside button AND dropdown container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(null);
        setSearchTerm("");
        setFilterText("");
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Filter options by search
  useEffect(() => {
    setFilterText(searchTerm);
  }, [searchTerm]);

  // Filtered options to display
  const filteredOptions = options.filter((opt) =>
    opt.label.includes(filterText)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      className='relative inline-block sm:w-40 w-28 text-sm text-right'>
      <motion.button
        ref={buttonRef}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between bg-lighter text-tusi border border-tusi/20 rounded px-3 py-2 hover:border-tusi focus:outline-none transition-all'>
        {options.find((opt) => opt.value === value)?.label}
        <FaChevronDown
          className={`text-xs ml-1 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='dropdown'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={dropdownRef}
            className='absolute z-10 w-full mt-1 bg-lighter rounded shadow-lg max-h-60 overflow-auto flex flex-col'>
            <input
              type='search'
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='جستجو...'
              className='px-3 py-2 border-b border-tusi/20 text-tusi focus:outline-none focus:ring-1 focus:ring-tusi'
            />

            <ul className='max-h-44 overflow-auto custom-scrollbar'>
              {filteredOptions.length ? (
                filteredOptions.map((opt, index) => (
                  <motion.li
                    key={opt.value}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchTerm("");
                      setFilterText("");
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-4 py-2 cursor-pointer hover:bg-tusi/20 text-tusi transition-all ${
                      value === opt.value
                        ? "bg-tusi/10 font-semibold"
                        : highlightedIndex === index
                        ? "bg-tusi/10"
                        : "font-thin"
                    }`}>
                    {opt.label}
                  </motion.li>
                ))
              ) : (
                <li className='px-4 py-2 text-gray-400'>گزینه‌ای یافت نشد</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
