import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (val: number) => void;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <div className='flex justify-center items-center gap-4 mt-8'>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className='px-3 py-1 border rounded disabled:opacity-50'>
        قبلی
      </button>
      <span>
        صفحه {page} از {totalPages}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className='px-3 py-1 border rounded disabled:opacity-50'>
        بعدی
      </button>
    </div>
  );
};
