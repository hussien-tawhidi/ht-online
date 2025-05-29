"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div
      className='flex justify-center items-center mt-6 space-x-3 rtl:space-x-reverse'
      dir='rtl'>
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border text-sm transition ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "border-gray-400 hover:bg-gray-100"
        }`}>
        قبلی
      </button>

      {/* Page numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border text-sm transition ${
              currentPage === page
                ? "bg-darker/60 text-lighter border-darker/60"
                : "border-darker/40 hover:bg-darker/10"
            }`}>
            {page}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border text-sm transition ${
          currentPage === totalPages
            ? "text-darker/40 border-darker/30 cursor-not-allowed"
            : "border-darker/50 hover:bg-darker/10"
        }`}>
        بعدی
      </button>
    </div>
  );
}
