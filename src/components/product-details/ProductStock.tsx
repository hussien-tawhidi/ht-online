"use client";
import { motion } from "framer-motion";
import AddToCartButton from "../AddToCartButton";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { PiShoppingBagThin } from "react-icons/pi";

interface productProps {
  _id: string;
  name: string;
  description: string;
  images: { url: string; public_id: string }[];
  price: number;
  stock: number;
  brand: string;
  sku: string;
  discount?: number;
}

export default function ProductStock({
  stock,
  product,
  stockWarning,
}: {
  stock: number;
  product: productProps;
  stockWarning?: boolean;
}) {
  return (
    <div className='text-sm flex sm:flex-row flex-col sm:items-center justify-between'>
      {/* Add to Cart */}
      <div className='flex items-center justify-center gap-1 border rounded-md px-4  text-tusi cursor-pointer transition-all hover:bg-tusi hover:text-lighter border-tusi/30'>
        <AddToCartButton
          Icon={PiShoppingBagThin}
          _id={product._id}
          discountPrice={product.discount || 0}
          image={product.images} text="همین حالا خرید کنید"
          name={product.name}
          price={product.price}
          color={[{ name: "black", hex: "#000" }]}
          className='w-full text-center py-2 text-tusi hover:bg-tusi/10 hover:text-lighter transition'
        />
      </div>
      <div className='mt-4 flex md:items-center lg:flex-row md:flex-col flex-row gap-3 text-sm'>
        {stock > 0 ? (
          <span className='inline-flex items-center gap-1 bg-tusi/20 text-tusi px-2 py-1 rounded-full'>
            <MdCheckCircle className='text-base' />
            موجود در انبار
          </span>
        ) : (
          <span className='inline-flex items-center gap-1 bg-[#8b0000]/20 text-[#8b0000] px-2 py-1 rounded-full'>
            <MdError className='text-base' />
            ناموجود
          </span>
        )}

        {stockWarning && stock > 0 && (
          <motion.span
            className='inline-flex items-center gap-1 bg-[#f9a603]/20 text-[#f9a603] px-2 py-1 rounded-full text-xs'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <MdWarning className='text-base' />
            فقط {stock} عدد باقی مانده!
          </motion.span>
        )}
      </div>
    </div>
  );
}
