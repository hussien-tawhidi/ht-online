"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ImageGalleryProps } from "./ImageGallery";
import ShippingInfo from "./ShippingInfo";
import ProductStock from "./ProductStock";
import ProductSpecifications from "./ProductSpecifications";
import ProductHighlights from "./ProductHighlights";
import ColorChoosed from "./ColorChoosed";

import FAQSection from "./FAQSection";
import Breadcrumbs from "./Breadcrumbs";
import StarRatingSummary from "./StarRatingSummary";
import ProductPrice from "./ProductPrice";
import StickyBuyBar from "./StickyBuyBar";

export default function ProductInfo({ product, variants }: ImageGalleryProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  return (
    <>
      <motion.div
        className='space-y-4'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}>
        <Breadcrumbs category={product.category || "دسته‌بندی"} />

        <h1 className='text-2xl font-bold text-tusi'>{product.name}</h1>
        <StarRatingSummary rating={4} />

        <p className='text-darker/50'>{product.description}</p>

        <ProductPrice price={product.price} />

        <ColorChoosed
          variants={variants}
          selectedVariant={selectedVariant}
          onVariantSelect={setSelectedVariant}
        />

        <div className='my-10'>
          <ProductStock
            product={product}
            stock={product.stock}
            stockWarning={product.stock < 5}
          />
          <ProductSpecifications brand={product.brand} sku={product.sku} />
          <ProductHighlights />
          <ShippingInfo />
        </div>

        <FAQSection />
      </motion.div>

      <StickyBuyBar price={product.price} />
    </>
  );
}
