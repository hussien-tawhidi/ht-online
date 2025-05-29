"use client";

import { useState } from "react";
import RefundsFilters from "./RefundsFilters";
import RefundsTable from "./RefundsTable";
import { refunds } from "../data";

export default function RefundsPage() {
  const [statusFilters, setStatusFilters] = useState<string[]>(["all"]);

  // Filter refunds based on status
  const filteredRefunds = statusFilters.includes("all")
    ? refunds
    : refunds.filter((refund) => statusFilters.includes(refund.status));

  return (
    <div className='space-y-4 p-6 lg:w-[90%] w-[98%] mx-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-tusi'>درخواست‌های بازپرداخت</h1>
      </div>

      <RefundsFilters
        status={statusFilters}
        onStatusChange={(newFilters) => setStatusFilters(newFilters)}
      />
      <RefundsTable data={filteredRefunds} />
    </div>
  );
}
