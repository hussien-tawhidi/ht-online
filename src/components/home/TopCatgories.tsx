"use client";

import Image from "next/image";
import { topCategories } from "./data";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function TopCatgories() {
  const router = useRouter();
  return (
    <div className='w-[90%] mx-auto md:my-16 my-10'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-2'>
        {topCategories.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => router.push(item.link)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className='cursor-pointer'>
            <div className='md:my-5 my-2'>
              <h3 className='text-xl font-semibold text-tusi'>{item.title}</h3>
              <p className='text-tusi text-sm font-thin'>بر اساس سلیقه شما</p>
            </div>
            <div className='rounded-2xl overflow-hidden grid grid-cols-2'>
              {item.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}>
                  <Image
                    key={index}
                    src={image}
                    alt={`${item.title}`}
                    width={300}
                    height={300}
                    className='object-cover w-auto h-auto'
                  />
                </motion.div>
              ))}
            </div>
            <button className='text-tusi flex items-center mt-3 gap-2 text-sm'>
              دیدن همه
              <MdOutlineKeyboardArrowLeft />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
