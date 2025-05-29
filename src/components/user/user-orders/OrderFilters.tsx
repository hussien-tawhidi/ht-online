"use client";

import { FC, RefObject, useRef } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

interface OrderFiltersProps {
  statuses: string[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  startDate: string;
  endDate: string;
  clearFilters: () => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

const OrderFilters: FC<OrderFiltersProps> = ({
  statuses,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  startDate,
  endDate,
  clearFilters,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const renderStatusLabel = (status: string) => {
    switch (status) {
      case "all":
        return "همه";
      case "delivered":
        return "تحویل‌شده";
      case "pending":
        return "در انتظار";
      case "canceled":
        return "لغو‌شده";
      default:
        return status;
    }
  };

  return (
    <div className='flex flex-col sm:items-center gap-3 w-full sm:w-auto'>
      {/* Filters */}
      <div className='flex flex-wrap gap-3 flex-1'>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm whitespace-nowrap
              ${
                statusFilter === status
                  ? "bg-tusi text-lighter shadow-lg shadow-tusi/40 border border-tusi"
                  : "bg-lighter text-darker/70 border border-darker/30 hover:bg-tusi hover:text-lighter hover:border-tusi"
              }`}
            aria-pressed={statusFilter === status}>
            {renderStatusLabel(status)}
          </button>
        ))}

        {/* Clear Filters */}
        {(statusFilter !== "all" ||
          searchTerm !== "" ||
          startDate !== "" ||
          endDate !== "") && (
          <button
            onClick={clearFilters}
            className='px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm whitespace-nowrap bg-[#8b0000]/10 text-[#8b0000] border border-[#8b0000] hover:bg-red-200'
            aria-label='پاک کردن فیلترها'>
            پاک کردن فیلترها <IoMdClose className='inline-block mr-1' />
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className='relative flex items-center w-full sm:w-64 border border-darker/30 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-tusi'>
        <IoMdSearch className='absolute left-3 text-darker/40' size={20} />
        <input
          ref={searchInputRef}
          type='search'
          placeholder='جستجو بر اساس کد یا تاریخ'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='pr-10 py-2 w-full text-sm text-darker placeholder:text-darker/40 outline-none'
          aria-label='جستجو سفارش‌ها بر اساس کد سفارش یا تاریخ'
        />
      </div>
    </div>
  );
};

export default OrderFilters;
