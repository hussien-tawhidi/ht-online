"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdSearch,
  IoMdClose,
} from "react-icons/io";
import { mockOrders } from "../data";

const statuses = ["all", "delivered", "pending", "canceled"];
const ORDERS_PER_PAGE = 5;

function parseDate(dateStr: string) {
  // Parse date from format "YYYY-MM-DD" or similar
  return new Date(dateStr);
}

export default function UserOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState(""); // YYYY-MM-DD
  const [currentPage, setCurrentPage] = useState(1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter orders by status, search term, and date range
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // Status filter
      const statusMatch =
        statusFilter === "all" || order.status === statusFilter;

      // Search by ID or date text
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        order.id.toLowerCase().includes(searchLower) ||
        order.date.toLowerCase().includes(searchLower);

      // Date range filter
      const orderDate = parseDate(order.date);
      const start = startDate ? parseDate(startDate) : null;
      const end = endDate ? parseDate(endDate) : null;

      const dateMatch =
        (!start || orderDate >= start) && (!end || orderDate <= end);

      return statusMatch && searchMatch && dateMatch;
    });
  }, [statusFilter, searchTerm, startDate, endDate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Reset page when filters/search/date change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm, startDate, endDate]);

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter("all");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    searchInputRef.current?.focus();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return; // skip if typing in input

      switch (e.key) {
        case "ArrowRight":
          setCurrentPage((p) => Math.min(p + 1, totalPages));
          break;
        case "ArrowLeft":
          setCurrentPage((p) => Math.max(p - 1, 1));
          break;
        case "/":
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      {/* Sticky Filter + Search + Date Range Bar */}
      <div className='sticky top-0 bg-lighter z-20 border-b border-darker/20 py-4 flex flex-col sm:items-center justify-between gap-4'>
        <h1 className='text-3xl font-extrabold text-darker select-none'>
          سفارش‌های من
        </h1>

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
                {status === "all"
                  ? "همه"
                  : status === "delivered"
                  ? "تحویل‌شده"
                  : status === "pending"
                  ? "در انتظار"
                  : "لغو‌شده"}
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

        {/* Date Range Inputs */}
        <div className='flex gap-3 items-center justify-center flex-wrap mt-3 sm:mt-0'>
          <label className='flex flex-col text-sm text-darker/80'>
            از تاریخ
            <input
              type='date'
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => setStartDate(e.target.value)}
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
              onChange={(e) => setEndDate(e.target.value)}
              className='mt-1 rounded-lg border border-darker/30 px-3 py-1 text-sm text-darker outline-none focus:ring-2 focus:ring-tusi'
              aria-label='فیلتر تا تاریخ'
            />
          </label>
        </div>
      </div>

      {/* Orders List */}
      <div className='space-y-5'>
        <AnimatePresence mode='wait'>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className='border border-darker/20 rounded-2xl shadow-md hover:shadow-xl p-5 bg-lighter cursor-pointer select-none'
                role='article'
                tabIndex={0}
                aria-label={`سفارش شماره ${order.id} با وضعیت ${order.status}`}>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                  <div className='space-y-1 text-sm text-darker/90'>
                    <p>
                      <span className='font-semibold'>کد سفارش:</span>{" "}
                      {order.id}
                    </p>
                    <p>
                      <span className='font-semibold'>تاریخ:</span> {order.date}
                    </p>
                    <p>
                      <span className='font-semibold'>تعداد کالاها:</span>{" "}
                      {order.items}
                    </p>
                  </div>
                  <div className='space-y-1 text-sm text-right text-darker/90'>
                    <p>
                      <span className='font-semibold'>مبلغ کل:</span>{" "}
                      {order.total}
                    </p>
                    <p>
                      <span className='font-semibold'>وضعیت:</span>{" "}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide
                          ${
                            order.status === "delivered"
                              ? "bg-[#dcfce7] text-[#016630]"
                              : order.status === "pending"
                              ? "bg-[#fed3c2] text-[#ba5026]"
                              : "bg-[#8b0000]/10 text-[#8b0000]"
                          }`}>
                        {order.status === "delivered"
                          ? "تحویل‌شده"
                          : order.status === "pending"
                          ? "در انتظار"
                          : "لغو‌شده"}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              key='empty'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col items-center justify-center py-16 text-center text-darker/40 select-none'
              aria-live='polite'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-auto mb-4 h-20 w-20 text-darker/30'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 17v-2a4 4 0 00-4-4H5m8-4v2a4 4 0 004 4h1m-5 4h.01M6 18h.01M18 18h.01M8 21h8a2 2 0 002-2v-1H6v1a2 2 0 002 2z'
                />
              </svg>
              سفارشی با این وضعیت پیدا نشد.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className='flex justify-center items-center gap-5 mt-8 select-none'
          role='navigation'
          aria-label='صفحه بندی سفارش‌ها'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className='flex items-center justify-center p-3 rounded-full bg-lighter border border-darker/30 text-darker transition hover:bg-tusi hover:text-lighter disabled:opacity-40'
            aria-label='صفحه قبلی'>
            <IoIosArrowForward size={20} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition
                ${
                  page === currentPage
                    ? "bg-tusi text-lighter shadow-lg shadow-tusi/40 border border-tusi"
                    : "bg-lighter text-darker/70 border border-darker/30 hover:bg-tusi hover:text-lighter hover:border-tusi"
                }`}>
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className='flex items-center justify-center p-3 rounded-full bg-lighter border border-darker/30 text-darker transition hover:bg-tusi hover:text-lighter disabled:opacity-40'
            aria-label='صفحه بعدی'>
            <IoIosArrowBack size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
