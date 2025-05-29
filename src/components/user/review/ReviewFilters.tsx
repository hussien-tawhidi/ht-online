// components/ReviewFilters.tsx
"use client";

import { CustomSelect } from "../../CustomSelect";
import { FaStar, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface FiltersProps {
  sortBy: string;
  setSortBy: (val: string) => void;
  minRatingFilter: number;
  setMinRatingFilter: (val: number) => void;
}

export const ReviewFilters: React.FC<FiltersProps> = ({
  sortBy,
  setSortBy,
  minRatingFilter,
  setMinRatingFilter,
}) => {
  return (
    <div className='flex flex-wrap gap-4 mb-6 items-center'>
      <CustomSelect
        label='مرتب‌سازی:'
        value={sortBy}
        onChange={setSortBy}
        options={[
          { label: "جدیدترین", value: "date", icon: <FaSortAmountDown /> },
          {
            label: "بالاترین امتیاز",
            value: "rating",
            icon: <FaSortAmountUp />,
          },
        ]}
      />

      <CustomSelect
        label='حداقل امتیاز:'
        value={minRatingFilter}
        onChange={setMinRatingFilter}
        options={[
          {
            label: "همه",
            value: 0,
            icon: <FaStar className='text-gray-400' />,
          },
          {
            label: "۱ ستاره +",
            value: 1,
            icon: <FaStar className='text-yellow-400' />,
          },
          {
            label: "۲ ستاره +",
            value: 2,
            icon: <FaStar className='text-yellow-400' />,
          },
          {
            label: "۳ ستاره +",
            value: 3,
            icon: <FaStar className='text-yellow-400' />,
          },
          {
            label: "۴ ستاره +",
            value: 4,
            icon: <FaStar className='text-yellow-400' />,
          },
          {
            label: "۵ ستاره",
            value: 5,
            icon: <FaStar className='text-yellow-400' />,
          },
        ]}
      />
    </div>
  );
};
