"use client";

import { motion } from "framer-motion";
import { ProductTypes } from "../../../../types/product.types";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";

type SearchResultCardProps = {
  product: ProductTypes;
};

export function SearchResultCard({ product }: SearchResultCardProps) {
  const router = useRouter();
  return (
    <motion.li
      onClick={() => router.push(`/product-detials/${product._id}`)}
      className='relative flex flex-col bg-lighter rounded-2xl shadow-md overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}>
      {/* Image */}
      <div className=' bg-lighter'>
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={400}
          height={400}
          className='object-cover mx-auto md:w-full w-[50%]'
        />

        {/* Overlay button: hidden by default, appears on hover */}
        <motion.button
          className='absolute inset-0 flex items-center justify-center cursor-pointer bg-tusi/0'
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
            backgroundColor: "rgba(145, 160, 129, 0.6)",
          }}
          transition={{ duration: 0.2 }}>
          <div className='bg-tusi text-lighter transition-all hover:text-tusi hover:bg-lighter px-4 py-2 rounded-full flex items-center gap-1'>
            <CiShoppingCart className='text-xl' />
            خرید
          </div>
        </motion.button>
      </div>

      {/* Content */}
      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-md font-semibold text-darker/90 mb-1 line-clamp-2'>
          {product.name}
        </h3>
        <p className='text-sm text-darker/60 flex-1 line-clamp-3 mb-2'>
          {product.description}
        </p>
        <div className='text-lg font-bold text-tusi self-end'>
          {product.price.toLocaleString("fa-IR")} تومان
        </div>
      </div>
    </motion.li>
  );
}
