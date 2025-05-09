"use client";

import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiShoppingBagThin } from "react-icons/pi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "./data";
import { CiClock1 } from "react-icons/ci";

// Convert English digits to Persian
const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

const FlashDeals = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const getTimeLeft = (end: string) => {
    const diff = new Date(end).getTime() - new Date().getTime();
    if (diff <= 0) return "۰۰:۰۰:۰۰";
    const hours = Math.floor(diff / 1000 / 60 / 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, "0");
    return `${toPersianDigits(hours)}:${toPersianDigits(
      minutes
    )}:${toPersianDigits(seconds)}`;
  };

  const [timeLeft, setTimeLeft] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setTimeLeft(products.map((p) => getTimeLeft(p.expiresAt)));
    const interval = setInterval(() => {
      setTimeLeft(products.map((p) => getTimeLeft(p.expiresAt)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='py-10 md:mt-20 mt-10 text-right  w-full overflow-hidden'>
      <div className='w-[90%] mx-auto'>
        <div className='mb-6 flex justify-between sm:items-center sm:gap-1 gap-2.5 sm:flex-row flex-col'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className='text-2xl font-bold text-tusi'>
            تخفیف های شگفت انگیز
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
            className='text-sm text-tusi border border-tusi px-3 py-1 rounded-md hover:bg-tusi/10 transition'>
            مشاهده همه
          </motion.button>
        </div>

        <Slider {...settings}>
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}>
              <div className='rounded-xl mx-3 relative overflow-hidden group'>
                <span className='absolute top-2 right-2 bg-tusi text-lighter text-xs px-2 py-1 rounded'>
                  ٪
                  {toPersianDigits(
                    Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )
                  )}{" "}
                  تخفیف
                </span>

                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className='rounded-xl w-full h-auto object-cover'
                />

                <h3 className='text-tusi font-semibold mt-3'>
                  {product.title}
                </h3>
                <p className='text-xs text-tusi mt-1'>{product.category}</p>

                <div className='flex items-center gap-2 mt-2'>
                  <span className='text-tusi font-bold'>
                    {hasMounted
                      ? `${toPersianDigits(
                          product.price.toLocaleString()
                        )} تومان`
                      : `${product.price} تومان`}
                  </span>
                  <span className='line-through text-sm text-tusi/50'>
                    {hasMounted
                      ? `${toPersianDigits(
                          product.oldPrice.toLocaleString()
                        )} تومان`
                      : `${product.oldPrice} تومان`}
                  </span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  {hasMounted && (
                    <div className='mt-3 text-sm flex gap-1.5 items-center font-medium'>
                      {timeLeft[index]}
                      <CiClock1 />
                    </div>
                  )}

                  <button className='mt-4 flex items-center justify-center hover:text-darker cursor-pointer text-tusi text-sm py-2 rounded transition'>
                    <PiShoppingBagThin className='text-lg' />
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

export default FlashDeals;
