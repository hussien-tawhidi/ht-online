// components/CategoryFilter.tsx
"use client";

import { MdClear } from "react-icons/md";

interface CategoryFilterProps {
  categories: string[];
  active: string[];
  onToggle: (cat: string) => void;
  clearAll?: () => void;
}

export default function CategoryFilter({
  categories,
  active,
  onToggle,
  clearAll,
}: CategoryFilterProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((cat) => {
        const isActive = active.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`
              px-3 py-1 rounded-full border text-sm transition
              ${
                isActive
                  ? "bg-tusi text-lighter border-tusi"
                  : "bg-lighter text-darker/70 border-darker/30 hover:bg-darker/10"
              }
            `}>
            {cat}
          </button>
        );
      })}

      {clearAll && active.length > 0 && (
        <button
          onClick={clearAll}
          className='
            px-3 py-1 rounded-full border border-[#8b0000]/30
            text-[#8b0000] hover:bg-[#8b0000]/10 text-sm
          '>
          <MdClear />
        </button>
      )}
    </div>
  );
}
