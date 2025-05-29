"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import PaginationControls from "./PaginationControls";
import OrderList from "./OrderList";
import DateRangeFilter from "./DateRangeFilter";
import OrderFilters from "./OrderFilters";

export const statuses = ["all", "delivered", "pending", "canceled"];
const ORDERS_PER_PAGE = 5;

function parseDate(dateStr: string) {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export interface Order {
  _id: string;
  date: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function UserOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // format: YYYY-MM-DD
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch orders from API with proper error handling
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Ensure data is always an array
        const ordersArray = Array.isArray(data) ? data : [];
        setOrders(ordersArray);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later.");
        setOrders([]); // Reset to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Safe filtered Orders with array check
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return []; // Fallback to empty array

    return orders.filter((order) => {
      const statusMatch =
        statusFilter === "all" || order.status === statusFilter;

      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        order._id?.toLowerCase().includes(searchLower) ||
        order.date?.toLowerCase().includes(searchLower);

      const orderDate = parseDate(order.date);
      const start = startDate ? parseDate(startDate) : null;
      const end = endDate ? parseDate(endDate) : null;

      const dateMatch =
        (!start || (orderDate && orderDate >= start)) &&
        (!end || (orderDate && orderDate <= end));

      return statusMatch && searchMatch && dateMatch;
    });
  }, [orders, statusFilter, searchTerm, startDate, endDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  );
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm, startDate, endDate]);

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
      if (e.target instanceof HTMLInputElement) return;

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

  if (isLoading) {
    return (
      <div className='max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[150px]'>
        <svg
          className='animate-spin h-10 w-10 text-red-500 mb-4'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          aria-label='Loading spinner'
          role='img'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
          />
        </svg>
        <p className='text-gray-700 text-lg font-medium'>
          در حال بارگذاری سفارش‌ها...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[150px] bg-red-50 border border-red-300 rounded-md'>
        <svg
          className='h-10 w-10 text-red-600 mb-3'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          role='img'
          aria-label='Error icon'>
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8 8l8 8M16 8l-8 8'
          />
        </svg>
        <p className='text-red-700 text-lg font-semibold mb-2'>
          خطا در بارگذاری سفارش‌ها
        </p>
        <p className='text-red-600'>{error}</p>
      </div>
    );
  }
  

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      <div className='sticky top-0 bg-lighter z-20 border-b border-darker/20 py-4 flex flex-col sm:items-center justify-between gap-4'>
        <h1 className='text-3xl font-extrabold text-darker/70 select-none'>
          سفارش‌های من
        </h1>

        <OrderFilters
          statuses={statuses}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startDate={startDate}
          endDate={endDate}
          clearFilters={clearFilters}
          searchInputRef={searchInputRef}
        />

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className='text-center py-8'>
          {orders.length === 0
            ? "No orders found"
            : "No orders match your filters"}
        </div>
      ) : (
        <>
          <OrderList orders={paginatedOrders} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
