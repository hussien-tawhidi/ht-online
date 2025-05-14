"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import LightBox from "./LightBox";

export interface ImageGalleryProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: { url: string; public_id: string }[];
    price: number;
    stock: number;
    brand: string;
    category: string;
    sku: string;
  };
  variants: { name: string; hex: string }[];
  stockWarning?: boolean;
}

export default function ImageGallery({ product }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className='grid md:grid-cols-2 gap-10'>
      {/* IMAGE GALLERY */}
      <div className='space-y-4'>
        {/* Main Image */}
        <motion.div
          className='relative group cursor-zoom-in'
          onClick={() => handleImageClick(selectedImage)}
          whileHover={{ scale: 1.02 }}>
          <Image
            src={product.images[selectedImage]?.url || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={600}
            className='rounded-lg w-full h-auto object-cover border'
          />
          <div className='absolute inset-0 hidden group-hover:block bg-darker/5 rounded-lg transition-all'></div>
        </motion.div>

        {/* Thumbnail Images */}
        <div className='flex gap-2 overflow-x-auto'>
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img.url}
              alt={`thumbnail-${i}`}
              width={80}
              height={80}
              onClick={() => setSelectedImage(i)}
              className={`rounded-lg cursor-pointer border ${
                selectedImage === i ? "border-tusi" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <ProductInfo
        product={product}
        variants={[
          { name: "قرمز", hex: "#FF0000" },
          { name: "آبی", hex: "#3399ff" },
          { name: "مشکی", hex: "#000000" },
        ]}
        stockWarning={product.stock < 5}
      />

      {/* LIGHTBOX MODAL */}
      <LightBox
        isLightboxOpen={isLightboxOpen}
        product={product}
        selectedImage={selectedImage}
        setIsLightboxOpen={setIsLightboxOpen}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
