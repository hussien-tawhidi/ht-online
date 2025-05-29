"use client";
import { RefundType } from "../data";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BiCheckCircle, BiError, BiTimeFive } from "react-icons/bi";
import DesktopRefundRow from "./DesktopRefundRow";
import MobileRefundRow from "./MobileRefundRow";

type Props = {
  data: RefundType[];
};

const ITEMS_PER_PAGE = 10;

export default function RefundsTable({ data }: Props) {
  const session = useSession();

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleToggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className='flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
            <BiCheckCircle className='w-4 h-4' />
            تأیید شده
          </span>
        );
      case "rejected":
        return (
          <span className='flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium'>
            <BiError className='w-4 h-4' />
            رد شده
          </span>
        );
      default:
        return (
          <span className='flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium'>
            <BiTimeFive className='w-4 h-4' />
            در انتظار
          </span>
        );
    }
  };

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full text-sm text-right bg-white border-separate border-spacing-y-2'>
          {/* Table Head - Desktop Only */}
          <thead className='hidden md:table-header-group bg-gray-50 text-gray-700 font-medium'>
            <tr>
              {["", "شناسه", "محصول", "مبلغ", "وضعیت", "عملیات"].map(
                (item, index) => (
                  <th className='p-3 whitespace-nowrap' key={index}>
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {paginatedData.map((refund, index) => (
              <React.Fragment key={refund.id}>
                <DesktopRefundRow
                  refund={refund}
                  index={index}
                  expandedRow={expandedRow}
                  handleToggleRow={handleToggleRow}
                  getStatusBadge={getStatusBadge}
                  session={session}
                />
                <MobileRefundRow
                  refund={refund}
                  expandedRow={expandedRow}
                  handleToggleRow={handleToggleRow}
                  getStatusBadge={getStatusBadge}
                  session={session}
                />
              </React.Fragment>
            ))}

            {/* Empty State */}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className='text-center py-6 text-gray-500'>
                  هیچ بازپرداختی برای نمایش وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > ITEMS_PER_PAGE && (
        <div className='flex justify-center items-center gap-4 py-4'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className='text-sm px-3 py-1 border rounded disabled:opacity-50'>
            قبلی
          </button>
          <span className='text-sm text-gray-600'>
            صفحه {currentPage} از {Math.ceil(data.length / ITEMS_PER_PAGE)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(Math.ceil(data.length / ITEMS_PER_PAGE), p + 1)
              )
            }
            disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}
            className='text-sm px-3 py-1 border rounded disabled:opacity-50'>
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}
