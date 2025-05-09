export default function AddToCart() {
  return (
    <div className='relative w-full overflow-hidden h-[35px] text-tusi mt-2 border border-tusi/30 cursor-pointer flex items-center rounded-lg transition-all duration-300 group'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text group-hover:translate-y-[-100%] transition-all duration-500'>
          خرید کنید
        </div>
        <span className='icon absolute top-[100%] left-1/2 transform -translate-x-1/2 group-hover:top-2 transition-all duration-500'>
          <svg
            viewBox='0 0 16 16'
            className='bi bi-cart2'
            fill='currentColor'
            height='16'
            width='16'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
