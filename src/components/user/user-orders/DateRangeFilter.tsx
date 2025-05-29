"use client";

import { FC } from "react";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const DateRangeFilter: FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className='flex gap-3 items-center justify-center flex-wrap mt-3 sm:mt-0'>
      <label className='flex flex-col text-sm text-darker/80'>
        از تاریخ
        <input
          type='date'
          value={startDate}
          max={endDate || undefined}
          onChange={(e) => onStartDateChange(e.target.value)}
          className='mt-1 rounded-lg border border-gray-300 px-3 py-1 text-sm text-darker outline-none focus:ring-2 focus:ring-tusi'
          aria-label='فیلتر از تاریخ'
        />
      </label>

      <label className='flex flex-col text-sm text-darker/80'>
        تا تاریخ
        <input
          type='date'
          value={endDate}
          min={startDate || undefined}
          onChange={(e) => onEndDateChange(e.target.value)}
          className='mt-1 rounded-lg border border-darker/30 px-3 py-1 text-sm text-darker outline-none focus:ring-2 focus:ring-tusi'
          aria-label='فیلتر تا تاریخ'
        />
      </label>
    </div>
  );
};

export default DateRangeFilter;
