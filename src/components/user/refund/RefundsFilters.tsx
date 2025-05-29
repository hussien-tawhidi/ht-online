"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import {
  BiCheck,
  BiChevronDown,
  BiHourglass,
  BiCheckCircle,
  BiXCircle,
  BiLayer,
} from "react-icons/bi";

type Option = {
  value: string;
  label: string;
  icon: ReactNode;
};

const statusOptions: Option[] = [
  {
    value: "all",
    label: "همه",
    icon: <BiLayer className='w-4 h-4 text-gray-500' />,
  },
  {
    value: "pending",
    label: "در انتظار بررسی",
    icon: <BiHourglass className='w-4 h-4 text-yellow-500' />,
  },
  {
    value: "approved",
    label: "تأیید شده",
    icon: <BiCheckCircle className='w-4 h-4 text-green-600' />,
  },
  {
    value: "rejected",
    label: "رد شده",
    icon: <BiXCircle className='w-4 h-4 text-red-600' />,
  },
];

type Props = {
  status: string[]; // now accepts multiple values
  onStatusChange: (statuses: string[]) => void;
};

export default function RefundsFilters({ status, onStatusChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (value === "all") {
      onStatusChange(["all"]);
    } else {
      const updated = status.includes(value)
        ? status.filter((s) => s !== value)
        : [...status.filter((s) => s !== "all"), value];
      onStatusChange(updated);
    }
  };

  const selectedLabels = status.includes("all")
    ? ["همه"]
    : statusOptions
        .filter((opt) => status.includes(opt.value))
        .map((opt) => opt.label);

  return (
    <div
      className='flex gap-4 items-center pb-4 relative z-10'
      ref={dropdownRef}>
      <label className='text-sm font-medium'>وضعیت:</label>

      <div className='relative w-64'>
        <button
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          className='w-full flex justify-between items-center border border-darker/20 text-darker/80 px-3 py-2 rounded text-sm bg-lighter shadow-sm hover:shadow transition'>
          <span className='truncate text-right'>
            {selectedLabels.join(", ") || "انتخاب وضعیت"}
          </span>
          <BiChevronDown
            className={`w-5 h-5 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul className='absolute z-20 mt-2 w-full bg-lighter border border-darker/10 rounded shadow-lg text-sm max-h-60 overflow-auto'>
            {statusOptions.map((option) => {
              const isSelected = status.includes(option.value);
              return (
                <li
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className='flex items-center border-b border-darker/5 justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <BiCheck className='text-primary w-5 h-5' />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
