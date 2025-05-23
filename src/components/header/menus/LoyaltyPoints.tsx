"use client";

import { motion } from "framer-motion";

type RewardTier = {
  icon: React.ReactNode;
  label: string;
  min: number;
};

type LoyaltyPointsProps = {
  currentPoints: number;
  nextTierPoints: number;
  progress: number;
  rewardTiers: RewardTier[];
};

const LoyaltyPoints = ({
  currentPoints,
  nextTierPoints,
  progress,
  rewardTiers,
}: LoyaltyPointsProps) => {
  const remainingPoints = nextTierPoints - currentPoints;

  return (
    <section
      aria-label='Loyalty Points Summary'
      className='rounded-md bg-[#faf9f3]  p-4'>
      {/* Title */}
      <h2 className='text-sm font-semibold text-[#a24f18] mb-1'>
        امتیازهای وفاداری شما
      </h2>

      {/* Points Display */}
      <p className='text-xs text-[#a24f18] mb-3'>
        شما <span className='font-bold text-[#954814]'>{currentPoints}</span>{" "}
        امتیاز دارید
      </p>

      {/* Progress Bar */}
      <div className='relative w-full h-2 rounded-full overflow-hidden bg-[#fff085]'>
        <motion.div
          className='h-full rounded-full bg-[#f9b76b]'
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Remaining to Next Tier */}
      <p className='mt-2 text-xs text-[#954814]'>
        {remainingPoints > 0
          ? `${remainingPoints} امتیاز تا پاداش بعدی!`
          : "تبریک! شما به بالاترین سطح رسیده‌اید 🎉"}
      </p>

      {/* Reward Tiers */}
      <div className='mt-5 flex items-center justify-between text-xs gap-1'>
        {rewardTiers.map((tier, idx) => {
          const isActive = currentPoints >= tier.min;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center transition-colors duration-200 ${
                isActive ? "text-[#954814] font-bold" : "text-darker/40"
              }`}
              title={tier.label}>
              <span className='text-xl sm:text-2xl'>{tier.icon}</span>
              <span className='text-[10px] sm:text-xs mt-1'>{tier.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LoyaltyPoints;
