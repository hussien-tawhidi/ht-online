"use client";

import Slider, { CustomArrowProps } from "react-slick";
import { features } from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
// Always visible Next Arrow
const NextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    type='button'
    aria-label='بعدی'
    onClick={onClick}
    className='absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-lighter shadow-md p-2 rounded-full text-tusi hover:text-darker cursor-pointer transition-all duration-300'>
    <FaChevronLeft />
  </button>
);

// Always visible Prev Arrow
const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    type='button'
    aria-label='قبلی'
    onClick={onClick}
    className='absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-lighter shadow-md p-2 rounded-full text-tusi hover:text-darker cursor-pointer transition-all duration-300'>
    <FaChevronRight />
  </button>
);

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 2 },
    },
  ],
};

export default function Features() {
  return (
    <div className='w-[90%] mx-auto mt-10'>
      <section className='mx-auto relative'>
        <Slider {...settings}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className='px-2'>
              <div className='sm:h-[160px] h-[90px] flex flex-col items-center justify-between border border-tusi/30 rounded-2xl shadow-sm text-center sm:p-6 p-1'>
                <div className='sm:text-3xl text-xl text-tusi'>
                  {feature.icon && <feature.icon />}
                </div>
                <div>
                  <h3 className='font-bold sm:text-lg text-[10px] mt-2 text-tusi'>
                    {feature.title}
                  </h3>
                  <p className='sm:text-sm text-[10px] text-tusi font-thin mt-1'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
