"use client";

import { BiXCircle } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: { url: string }[];
};

type ProductPreviewDrawerProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductPreviewDrawer({
  product,
  onClose,
}: ProductPreviewDrawerProps) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key='drawer-backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-darker/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center px-0 md:px-4'
          onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='w-full md:max-w-md bg-lighter md:rounded-lg md:p-6 p-5 rounded-t-3xl shadow-xl max-h-screen overflow-y-auto'>
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold truncate'>{product.name}</h2>
              <button
                onClick={onClose}
                className='absolute top-2 left-2 text-[#8b0000]/90 hover:text-[#8b0000]'>
                <BiXCircle className='w-6 h-6' />
              </button>
            </div>

            {/* Product Image */}
            <Image
              src={product.image[0].url}
              alt={product.name}
              width={600}
              height={400}
              className='w-full h-64 object-cover rounded mb-4'
            />

            {/* Price */}
            <p className='text-tusi font-bold text-lg mb-3'>
              {Number(product.price).toLocaleString()} تومان
            </p>

            {/* Link to Product */}
            <Link
              href={`/products/${product._id}`}
              className='block text-center px-4 py-2 bg-darker text-lighter rounded hover:bg-opacity-90 transition'>
              مشاهده محصول کامل
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
