"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

type LightBoxProps = {
  product: {
    images: { url: string }[];
  };
  isLightboxOpen: boolean;
  setIsLightboxOpen: (value: boolean) => void;
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
};
// Accept product and visibility control props
export default function LightBox({
  product,
  isLightboxOpen,
  setIsLightboxOpen,
  selectedImage,
  setSelectedImage,
}: LightBoxProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus on modal to listen for key events
  useEffect(() => {
    if (isLightboxOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isLightboxOpen]);

  const goNext = () => {
    setSelectedImage((prev: number) => (prev + 1) % product.images.length);
  };

  const goPrev = () => {
    setSelectedImage((prev: number) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  return (
    <AnimatePresence>
      {isLightboxOpen && (
        <motion.div
          ref={modalRef}
          className='fixed inset-0 bg-darker/80 z-50 flex items-center justify-center p-4 outline-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "ArrowRight") goNext();
            else if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "Escape") setIsLightboxOpen(false);
          }}
          tabIndex={0}>
          {/* Previous Arrow */}
          <button
            className='absolute left-4 text-lighter rounded-full md:px-2 px-1 md:py-2 py-1 md:text-3xl text-xl z-50 bg-darker/40 backdrop-blur-sm'
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}>
            <HiOutlineArrowLongLeft />
          </button>

          {/* Image with transition */}
          <motion.img
            key={selectedImage}
            src={product.images[selectedImage]?.url}
            alt='Lightbox'
            className='max-h-[90vh] max-w-full rounded-lg shadow-lg'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Arrow */}
          <button
            className='absolute right-4 text-lighter rounded-full md:px-2 px-1 md:py-2 py-1 md:text-3xl text-xl z-50 bg-darker/40 backdrop-blur-sm'
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}>
            <HiOutlineArrowLongLeft className='rotate-180' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
