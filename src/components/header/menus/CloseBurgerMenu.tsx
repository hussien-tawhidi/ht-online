"use client";
export default function CloseBurgerMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      aria-label='Open main menu'
      className='text-gray-500 w-10 h-10 relative focus:outline-none bg-white'>
      <div className='block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {/* Top Line */}
        <span
          aria-hidden='true'
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        {/* Middle Line */}
        <span
          aria-hidden='true'
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Bottom Line */}
        <span
          aria-hidden='true'
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  );
}
