import { FaStar } from "react-icons/fa";

export default function StarRatingSummary({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-1 text-[#f9a603]'>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-[#f9a603]" : "text-darker/20"}
        />
      ))}
      <span className='text-sm text-darker/50'>({rating})</span>
    </div>
  );
}
