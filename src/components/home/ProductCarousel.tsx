"use client";

import Image from "next/image";
import Link from "next/link";
import Slider, { CustomArrowProps } from "react-slick";
import { motion } from "framer-motion";
import { PiShoppingBagThin } from "react-icons/pi";
import { LiaGrinStars } from "react-icons/lia";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  _id: string;
  title: string;
  image: string;
  category: string;
  price: number;
}

interface Props {
  specail?: boolean;
  title: string;
  products: Product[];
  showAllLink?: string;
  isNew?: boolean;
}

// Convert English digits to Persian
const toPersianDigits = (num: number | string): string => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

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
    <section className='text-right px-4 py-12 overflow-hidden'>
      <div className='flex items-center justify-between mb-6'>
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-xl md:text-2xl font-bold text-tusi'>
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
              className='text-sm text-tusi hover:underline transition'>
              مشاهده همه
            </Link>
          </motion.div>
        )}
      </div>

      <div className='relative group'>
        <Slider {...settings}>
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className='px-2'>
              <div className='bg-white p-4 rounded-2xl hover:shadow-md transition relative'>
                {specail && (
                  <span className='absolute flex items-center gap-1 top-2 left-2 bg-tusi text-lighter text-xs px-2 py-1 rounded-full z-10'>
                    پیشنهاد ویژه
                    <LiaGrinStars />
                  </span>
                )}
                {isNew && (
                  <span className='absolute flex items-center gap-1 top-2 left-2 bg-tusi text-lighter text-xs px-2 py-1 rounded-full z-10'>
                    جدید
                    <LiaGrinStars />
                  </span>
                )}

                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className='rounded-xl object-cover w-full'
                  sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw'
                />

                <h3 className='text-sm text-tusi mt-3 font-medium line-clamp-1'>
                  {product.title}
                </h3>
                <p className='text-xs text-gray-500 mt-1 text-tusi'>
                  {product.category}
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <p className=' font-semibold'>
                    {toPersianDigits(product.price).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "٬"
                    )}{" "}
                    تومان
                  </p>

                  <button
                    className='group relative flex items-center text-tusi hover:text-tusi transition'
                    aria-label='افزودن به سبد خرید'>
                    <PiShoppingBagThin className='text-xl' />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
