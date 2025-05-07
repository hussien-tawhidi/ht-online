"use client";

import Image from "next/image";
import { cate } from "./data";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <div className='mx-auto w-[90%] flex justify-center mt-10 flex-col items-center py-10'>
      <p className='h-1 md:text-3xl text-xl font-extrabold text-tusi mb-3 opacity-80'>
        کتگوری های محبوب
      </p>
      <div className='w-[95%] relative mt-10 grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
        {cate.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className='px-2 group cursor-pointer border-tusi/30 rounded-2xl p-2'
            custom={index}>
            <Image
              src={item.image}
              alt={`عکس برای ${item.title}`}
              width={160}
              height={160}
              className='object-cover w-32 h-32 mx-auto rounded-full mb-4 transition duration-300 group-hover:scale-105'
            />
            <h2 className='text-base font-medium text-tusi group-hover:text-darker text-center transition'>
              {item.title}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
