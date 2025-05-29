"use client";

import React, { useState } from "react";

interface Coupon {
  id: number;
  code: string;
  description: string;
  discount: string;
  expiryDate: string;
  active: boolean;
}

const sampleCoupons: Coupon[] = [
  {
    id: 1,
    code: "SAVE10",
    description: "دریافت ۱۰٪ تخفیف در خرید بعدی",
    discount: "۱۰٪",
    expiryDate: "۲۰۲۵-۱۲-۳۱",
    active: true,
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "ارسال رایگان برای سفارش‌های بالای ۵۰ دلار",
    discount: "ارسال رایگان",
    expiryDate: "۲۰۲۵-۰۸-۱۵",
    active: false,
  },
  {
    id: 3,
    code: "WELCOME5",
    description: "۵ دلار تخفیف خوش‌آمدگویی برای سفارش اول",
    discount: "۵ دلار",
    expiryDate: "۲۰۲۶-۰۱-۰۱",
    active: true,
  },
];

type FilterType = "all" | "active" | "inactive";

export default function Coupons() {
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter coupons based on active status
  const filteredCoupons = sampleCoupons.filter((c) => {
    if (filter === "active") return c.active;
    if (filter === "inactive") return !c.active;
    return true;
  });

  // Copy coupon code to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`کد "${code}" کپی شد!`);
  };

  // Apply coupon (just a placeholder alert for now)
  const handleApply = (code: string) => {
    alert(`کد "${code}" اعمال شد!`);
  };

  return (
    <div dir='rtl' className='max-w-3xl mx-auto p-6 font-vazir'>
      <h1 className='text-3xl font-bold mb-6 text-darker/70'>کوپن‌های موجود</h1>

      {/* Filter Buttons */}
      <div className='mb-6 flex justify-center gap-4'>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md border transition ${
            filter === "all"
              ? "bg-darker/60 text-lighter border-darker/60"
              : "border-darker/30 text-darker/70 hover:bg-darker/10"
          }`}>
          همه
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md border transition ${
            filter === "active"
              ? "bg-darker/60 text-lighter border-darker/60"
              : "border-darker/30 text-darker/70 hover:bg-darker/10"
          }`}>
          فعال‌ها
        </button>
        <button
          onClick={() => setFilter("inactive")}
          className={`px-4 py-2 rounded-md border transition ${
            filter === "inactive"
              ? "bg-darker/60 text-lighter border-darker/60"
              : "border-darker/30 text-darker/70 hover:bg-darker/10"
          }`}>
          غیرفعال‌ها
        </button>
      </div>

      <ul className='space-y-4'>
        {filteredCoupons.length === 0 ? (
          <p className='text-center text-gray-500'>
            کوپنی برای نمایش وجود ندارد.
          </p>
        ) : (
          filteredCoupons.map(
            ({ id, code, description, discount, expiryDate, active }) => (
              <li
                key={id}
                className={`p-4 rounded-md border flex flex-col md:flex-row justify-between items-center gap-4 ${
                  active
                    ? "border-darker/50 bg-darker/5"
                    : "border-darker/30 bg-darker/5 opacity-60"
                }`}>
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-1'>
                    <h2 className='font-semibold text-lg'>{code}</h2>
                    <span className='text-sm font-medium'>{discount}</span>
                  </div>
                  <p className='text-sm mb-2'>{description}</p>
                  <small className='text-xs text-darker/60'>
                    تاریخ انقضا: {expiryDate}
                  </small>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={() => handleApply(code)}
                    disabled={!active}
                    className={`px-4 py-2 rounded-md text-lighter transition ${
                      active
                        ? "bg-darker/60 hover:bg-darker/70"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}>
                    اعمال
                  </button>
                  <button
                    onClick={() => handleCopy(code)}
                    className='px-4 py-2 rounded-md border border-darker/50 hover:bg-darker/20 transition'>
                    کپی کد
                  </button>
                </div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}
