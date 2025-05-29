"use client";

import { FC } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("…");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className='mt-8 overflow-x-auto scrollbar-hide'
      role='navigation'
      aria-label='صفحه‌بندی نظرات'>
      <div className='flex justify-center items-center gap-2 sm:gap-4 min-w-max'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className='p-2 sm:p-3 rounded-full bg-lighter border border-darker/30 text-darker hover:bg-tusi hover:text-lighter disabled:opacity-40'
          aria-label='صفحه قبلی'>
          <IoIosArrowForward size={18} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, idx) => {
          const key =
            typeof page === "number" ? `page-${page}` : `ellipsis-${idx}`;
          return typeof page === "string" ? (
            <span key={key} className='px-2 sm:px-3 text-darker/50'>
              …
            </span>
          ) : (
            <button
              key={key}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold transition
      ${
        page === currentPage
          ? "bg-tusi text-lighter shadow-lg shadow-tusi/40 border border-tusi"
          : "bg-lighter text-darker/70 border border-darker/30 hover:bg-tusi hover:text-lighter hover:border-tusi"
      }`}>
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className='p-2 sm:p-3 rounded-full bg-lighter border border-darker/30 text-darker hover:bg-tusi hover:text-lighter disabled:opacity-40'
          aria-label='صفحه بعدی'>
          <IoIosArrowBack size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
