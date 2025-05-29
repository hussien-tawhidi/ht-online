interface Review {
  id: number;
  product: string;
  rating: number;
  text: string;
  date: string;
}

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const { product, rating, text, date } = review;

  return (
    <li className='p-4 border border-darker/5 rounded shadow-sm hover:shadow-md transition-shadow'>
      <h2 className='text-xl font-semibold mb-1'>{product}</h2>
      <p className='text-[#da7f25] mb-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "" : "text-darker/50"}>
            ★
          </span>
        ))}
      </p>
      <p className='mb-2'>{text}</p>
      <small className='text-darker/40'>
        تاریخ ثبت نظر: {new Date(date).toLocaleDateString("fa-IR")}
      </small>
    </li>
  );
};
