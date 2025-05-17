"use client";

import { formatPrice } from "@/libs/formatPrice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceSliderProps {
  localMin: number | "";
  localMax: number | "";
  onChange: (min: number, max: number | "") => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function PriceSlider({
  localMin,
  localMax,
  onChange,
  min = 0,
  max = 10000000,
  step = 1000,
}: PriceSliderProps) {
  return (
    <div className='mb-3'>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={[
          typeof localMin === "number" ? localMin : min,
          typeof localMax === "number" ? localMax : max,
        ]}
        onChange={(value) => {
          const [minVal, maxVal] = value as [number, number];
          onChange(minVal, maxVal === max ? "" : maxVal);
        }}
      />
      <div className='flex justify-between text-xs mt-1 text-darker/60'>
        <span>{formatPrice(localMin)} تومان</span>
        <span>
          {localMax === "" ? "بی‌نهایت" : `${formatPrice(localMax)} تومان`}
        </span>
      </div>
    </div>
  );
}
