"use client";

import Image from "next/image";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.7,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}>
      <Image
        src={"/home/hero-banner.jpg"}
        alt='home banner'
        width={1000}
        height={500}
        className='object-cover w-full'
      />
    </motion.div>
  );
}
