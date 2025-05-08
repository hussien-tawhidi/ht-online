"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "./data";
import { motion } from "framer-motion";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

export default function Blog() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='w-[90%] mx-auto my-12'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-xl font-bold text-tusi mb-6 text-center'></motion.h2>
      <div className='flex items-center justify-between mb-6'>
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='sm:text-xl text-sm md:text-2xl font-bold text-tusi'>
          مطالب پیشنهادی برای شما
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.03 }}
          className='sm:text-sm text-[10px] text-tusi border border-tusi px-3 py-1 rounded-md hover:bg-tusi/10 transition'>
          مشاهده همه
        </motion.button>
      </div>
      <Slider {...settings}>
        {blogs.map((blog, index) => (
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
            className='px-3'>
            <div className='bg-white border border-tusi/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full'>
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                className='w-full h-52 object-cover'
              />
              <div className='p-4 flex flex-col justify-between h-[200px]'>
                <div>
                  <h3 className='font-bold text-right text-lg text-tusi mb-2'>
                    {blog.title}
                  </h3>
                  <p className='text-sm text-tusi font-thin text-right'>
                    {blog.description}
                  </p>
                </div>
                <Link
                  href={`/blog/${blog.id}`}
                  className='mt-4 inline-block hover:underline font-medium text-sm'>
                  مطالعه مقاله →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </motion.section>
  );
}
