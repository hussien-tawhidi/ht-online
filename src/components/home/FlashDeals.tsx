"use client";

import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "./data";
import { CiClock1 } from "react-icons/ci";
import { sampleProducts } from "@/products-samples";
import AddToCart from "../addToCart";

// Convert English digits to Persian
const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

const FlashDeals = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
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
  const flashDiscount = sampleProducts.filter(
    (item) => item.category === "اکسسوری" || item.category === "ساعت"
  );

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
          {flashDiscount.map((product, index) => (
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
              whileHover={{ scale: 1.03 }}>
              <div className='rounded-xl h-fit mx-3 relative overflow-hidden group'>
                <span className='absolute top-2 right-2 bg-tusi text-lighter text-xs px-2 py-1 rounded'>
                  ٪{product.discount ? product.discount : "10"}
                  تخفیف
                </span>

                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={product.name}
                    width={300}
                    height={300}
                    className='rounded-xl w-full h-full object-cover'
                  />
                ))}

                <h3 className='text-tusi font-semibold sm:text-sm text-xs whitespace-nowrap mt-3'>
                  {product.name}
                </h3>
                <p className='sm:text-xs text-[9px] text-tusi mt-1'>
                  {product.category}
                </p>

                <div className='flex  justify-betweenitems-center gap-2 mt-2'>
                  <span className='text-tusi text-sm font-bold'>
                    {hasMounted
                      ? `${toPersianDigits(
                          product.price.toLocaleString()
                        )} تومان`
                      : `${product.price} تومان`}
                  </span>
                  <span className='line-through text-[10px] text-tusi/50'>
                    {hasMounted
                      ? `${toPersianDigits(
                          product.price.toLocaleString()
                        )} تومان`
                      : `${product.price} تومان`}
                  </span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  {hasMounted && (
                    <div className='mt-3 text-sm flex gap-1.5 items-center font-medium'>
                      {timeLeft[index]}
                      <CiClock1 />
                    </div>
                  )}
                  <AddToCart />
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
