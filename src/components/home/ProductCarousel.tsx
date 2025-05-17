"use client";
import Link from "next/link";
import Slider, { CustomArrowProps } from "react-slick";
import { motion } from "framer-motion";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductTypes } from "../../../types/product.types";
import ProductCard from "./CarouselCard";

interface Props {
  specail?: boolean;
  title: string;
  products: ProductTypes[];
  showAllLink?: string;
  isNew?: boolean;
}

// Custom arrow components
const NextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    aria-label='بعدی'
    onClick={onClick}
    className='absolute cursor-pointer -left-4 top-1/2 transform -translate-y-1/2 z-10 
               bg-white shadow-md p-2 rounded-full text-tusi 
               hover:text-primary transition-all duration-300 opacity-0 
               group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
               lg:opacity-0 lg:group-hover:opacity-100 
               group-hover:scale-110 group-hover:shadow-lg'>
    <FaChevronLeft />
  </button>
);

const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    aria-label='قبلی'
    onClick={onClick}
    className='absolute cursor-pointer -right-4 top-1/2 transform -translate-y-1/2 z-10 
               bg-white shadow-md p-2 rounded-full text-tusi 
               hover:text-primary transition-all duration-300 opacity-0 
               group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
               lg:opacity-0 lg:group-hover:opacity-100 
               group-hover:scale-110'>
    <FaChevronRight />
  </button>
);

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  rtl: true,
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

const ProductCarousel = ({
  title,
  products,
  showAllLink,
  specail = false,
  isNew = false,
}: Props) => {
  return (
    <section className='text-right md:px-4 md:py-12 overflow-hidden'>
      <div className='flex items-center justify-between mb-6'>
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='md:text-2xl font-bold text-tusi'>
          {title}
        </motion.h2>
        {showAllLink && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <Link
              href={showAllLink}
              className='sm:text-sm text-[10px] text-tusi hover:underline transition'>
              مشاهده همه
            </Link>
          </motion.div>
        )}
      </div>

      <div className='relative group'>
        <Slider {...settings}>
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.05,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className='px-2'>
              <ProductCard
                product={product}
                special={specail}
                isNew={isNew}
                index={i}
              />
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
