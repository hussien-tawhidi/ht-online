import React from "react";

interface PriceInputsProps {
  localMin: number | "";
  localMax: number | "";
  setLocalMin: React.Dispatch<React.SetStateAction<number | "">>;
  setLocalMax: React.Dispatch<React.SetStateAction<number | "">>;
  error: string;
  handleApply: () => void;
  handleReset: () => void;
}

export function PriceInputs({
  localMin,
  localMax,
  setLocalMin,
  setLocalMax,
  error,
  handleApply,
  handleReset,
}: PriceInputsProps) {
  return (
    <>
      <div>
        <label className='block text-tusi text-xs mb-1'>حداقل قیمت</label>
        <input
          type='number'
          value={localMin}
          placeholder='0'
          onChange={(e) =>
            setLocalMin(e.target.value === "" ? "" : Number(e.target.value))
          }
          className='w-full px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-tusi'
        />
      </div>
      <div>
        <label className='block text-xs mb-1 text-tusi'>حداکثر قیمت</label>
        <input
          type='number'
          value={localMax}
          placeholder='بی‌نهایت'
          onChange={(e) =>
            setLocalMax(e.target.value === "" ? "" : Number(e.target.value))
          }
          className='w-full px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-tusi'
        />
      </div>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

      {/* Buttons */}
      <div className='flex justify-between items-center pt-3'>
        <button
          onClick={handleReset}
          className='text-xs text-darker/50 hover:text-darker/70 transition'>
          بازنشانی
        </button>
        <button
          onClick={handleApply}
          className='bg-tusi text-lighter text-xs px-3 py-1.5 rounded hover:bg-opacity-90 transition'>
          اعمال
        </button>
      </div>
    </>
  );
}
