"use client";

interface PresetButtonsProps {
  setLocalMin: (value: number | "") => void;
  setLocalMax: (value: number | "") => void;
}

const presets = [
  { label: "زیر ۱۰۰ هزار", min: 0, max: 100000 },
  { label: "۱۰۰ تا ۵۰۰ هزار", min: 100000, max: 500000 },
  { label: "۵۰۰ تا ۱ میلیون", min: 500000, max: 1000000 },
  { label: "بیشتر از ۱ میلیون", min: 1000000, max: "9" },
];

export default function PresetButtons({
  setLocalMin,
  setLocalMax,
}: PresetButtonsProps) {
  return (
    <div className='flex flex-wrap gap-2 text-xs text-tusi mb-2'>
      {presets.map(({ label, min, max }) => (
        <button
          key={label}
          onClick={() => {
            setLocalMin(min);
            setLocalMax(max === "" ? "" : Number(max));
          }}
          className='border border-tusi/40 px-2 py-1 rounded hover:bg-tusi hover:text-lighter transition'
          type='button'>
          {label}
        </button>
      ))}
    </div>
  );
}
