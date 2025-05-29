"use client";

import React, { useState } from "react";
import {
  BiCheckCircle,
  BiChevronDown,
  BiChevronUp,
  BiTrash,
} from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
type FilterType = "all" | "read" | "unread";

interface NotificationToolbarProps {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  setCurrentPage: (page: number) => void;
  markAllRead: () => void;
  clearAll: () => void;
  notifications: { read: boolean }[];
}

const filterLabels: Record<FilterType, string> = {
  all: "همه",
  read: "خوانده‌شده",
  unread: "خوانده‌نشده",
};

export default function NotificationToolbar({
  filter,
  setFilter,
  setCurrentPage,
  markAllRead,
  clearAll,
  notifications,
}: NotificationToolbarProps) {
  const isAllRead = notifications.every((n) => n.read);
  const isEmpty = notifications.length === 0;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 rtl'
      dir='rtl'>
      {/* فیلترها */}
      <div className='w-full sm:w-auto'>
        <div className='sm:hidden'>
          <button
            className='flex items-center justify-between w-full px-3 py-2 bg-darker/5 text-darker/70 rounded hover:bg-darker/70'
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span>فیلتر: {filterLabels[filter]}</span>
            {dropdownOpen ? (
              <BiChevronUp className='w-4 h-4' />
            ) : (
              <BiChevronDown className='w-4 h-4' />
            )}
          </button>

          {dropdownOpen && (
            <div className='mt-2 space-y-1 bg-lighter rounded shadow'>
              {(["all", "read", "unread"] as const).map((type) => (
                <button
                  key={type}
                  className={`block w-full text-right px-3 py-2 text-sm ${
                    filter === type
                      ? "bg-darker/60 text-lighter"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setFilter(type);
                    setCurrentPage(1);
                    setDropdownOpen(false);
                  }}>
                  {filterLabels[type]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='hidden sm:flex items-center gap-2'>
          <FiFilter className='w-5 h-5 text-darker/60' />
          {(["all", "read", "unread"] as const).map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded transition text-sm ${
                filter === type
                  ? "bg-darker/60 text-lighter"
                  : "bg-darker/5 text-darker/70 hover:bg-darker/30"
              }`}
              onClick={() => {
                setFilter(type);
                setCurrentPage(1);
              }}>
              {filterLabels[type]}
            </button>
          ))}
        </div>
      </div>

      {/* عملیات */}
      <div className='flex gap-2 w-full sm:w-auto'>
        <button
          onClick={markAllRead}
          disabled={isAllRead}
          className='flex items-center gap-1 px-3 py-1 rounded bg-darker/60 text-lighter hover:bg-darker/70 disabled:bg-darker/20 text-sm w-full sm:w-auto justify-center'
          title={
            isAllRead
              ? "همه اعلان‌ها خوانده شده‌اند"
              : "علامت‌گذاری همه به‌عنوان خوانده‌شده"
          }>
          <BiCheckCircle className='w-4 h-4' />
          <span>خواندن همه</span>
        </button>

        <button
          onClick={clearAll}
          disabled={isEmpty}
          className='flex items-center gap-1 px-3 py-1 rounded bg-[#8b0000] text-lighter hover:bg-[#8b0000]/80 disabled:bg-[#8b0000]/10 text-sm w-full sm:w-auto justify-center'
          title={isEmpty ? "اعلانی برای حذف وجود ندارد" : "حذف همه اعلان‌ها"}>
          <BiTrash className='w-4 h-4' />
          <span>حذف همه</span>
        </button>
      </div>
    </div>
  );
}
