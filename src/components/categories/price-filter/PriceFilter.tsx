"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import PriceSlider from "./PriceSlider";
import PresetButtons from "./PersetBtn";
import { PriceInputs } from "./PriceInputs";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PriceFilterProps) {
  const [open, setOpen] = useState(false);
  const [localMin, setLocalMin] = useState<number | "">("");
  const [localMax, setLocalMax] = useState<number | "">(Infinity);
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 640);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const savedMin = localStorage.getItem("minPrice");
    const savedMax = localStorage.getItem("maxPrice");
    if (savedMin) setMinPrice(Number(savedMin));
    if (savedMax)
      setMaxPrice(savedMax === "Infinity" ? Infinity : Number(savedMax));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("minPrice", String(minPrice));
    localStorage.setItem("maxPrice", String(maxPrice));
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (open) {
      setLocalMin(minPrice);
      setLocalMax(maxPrice === Infinity ? "" : maxPrice);
    }
  }, [open, minPrice, maxPrice]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleApply = () => {
    if (localMin !== "" && localMax !== "" && localMin > localMax) {
      setError("حداقل قیمت نمی‌تواند بیشتر از حداکثر باشد.");
      return;
    }
    setError("");
    setMinPrice(localMin === "" ? 0 : localMin);
    setMaxPrice(localMax === "" ? Infinity : localMax);
    setOpen(false);
  };

  const handleReset = () => {
    setLocalMin("");
    setLocalMax("");
    setMinPrice(0);
    setMaxPrice(Infinity);
    setError("");
    setOpen(false);
    localStorage.removeItem("minPrice");
    localStorage.removeItem("maxPrice");
  };

  return (
    <div className='relative w-fit text-right' ref={ref}>
      <div
        className='flex items-center gap-2 cursor-pointer border border-tusi/20 text-tusi sm:text-sm text-[10px] px-2 sm:px-4 sm:py-2 py-2.5 rounded shadow-sm bg-lighter hover:bg-darker/10 transition-all'
        onClick={() => setOpen(!open)}>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <FaFilter />
        </motion.div>
        <span>فیلتر قیمت</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={` ${
              isMobile ? "inset-0 fixed" : "absolute mt-2 left-0"
            } z-50 bg-lighter sm:bg-lighter border border-tusi/20 shadow-lg rounded sm:p-4 p-6 sm:space-y-3 sm:w-60 h-full sm:h-auto overflow-y-auto`}>
            {/* Header for mobile */}
            {isMobile && (
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-tusi font-bold text-base'>فیلتر قیمت</h2>
                <button
                  onClick={() => setOpen(false)}
                  className='text-sm text-darker/50 hover:text-darker'>
                  ✕
                </button>
              </div>
            )}

            {/* SLIDER */}
            <PriceSlider
              localMin={localMin}
              localMax={localMax}
              onChange={(min, max) => {
                setLocalMin(min);
                setLocalMax(max);
              }}
            />
            <PresetButtons
              setLocalMin={setLocalMin}
              setLocalMax={setLocalMax}
            />
            <PriceInputs
              localMin={localMin}
              localMax={localMax}
              setLocalMin={setLocalMin}
              setLocalMax={setLocalMax}
              error={error}
              handleApply={handleApply}
              handleReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
