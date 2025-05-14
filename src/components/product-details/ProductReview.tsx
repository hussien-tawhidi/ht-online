"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// Dummy review data (replace with your real data)
const reviews = [
  { id: 1, rating: 5, comment: "محصول عالی بود!" },
  { id: 2, rating: 4, comment: "خیلی راضی‌ام، ممنون" },
  { id: 3, rating: 3, comment: "متوسط بود" },
  { id: 4, rating: 2, comment: "انتظار بیشتری داشتم" },
];

export default function ProductReview() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating >= selectedRating)
    : reviews;

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewReview((prev) => ({ ...prev, comment: event.target.value }));
  };

  const handleSubmit = () => {
    // You can implement backend API call to submit the review here.
    reviews.push({ ...newReview, id: reviews.length + 1 });
    setNewReview({ rating: 0, comment: "" }); // Reset form
    alert("Review submitted successfully!");
  };

  return (
    <div className='rounded-lg p-4 text-sm'>
      {/* Add Review Form */}
      <div className='mt-6'>
        <div className='flex items-center gap-2 mb-4'>
          {[5, 4, 3, 2, 1].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`cursor-pointer ${
                newReview.rating >= star ? "text-[#f9a603]" : "text-darker/20"
              }`}
            />
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={handleCommentChange}
          placeholder='نظر خود را بنویسید...'
          rows={4}
          className='w-full p-2 border-0 resize-none focus:border-0 focus:ring-0 rounded-lg mb-4 bg-transparent focus:outline-none'
        />
        <button
          onClick={handleSubmit}
          className='w-full bg-tusi text-lighter py-2 rounded-lg'>
          ارسال نظر
        </button>
      </div>
      <div className='my-4'>
        <h2 className='text-lg font-semibold text-tusi mb-1'>نظرات کاربران</h2>
        <div className='flex items-center gap-2 text-[#f9a603]'>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(averageRating)
                  ? "text-[#f9a603]"
                  : "text-darker/20"
              }
            />
          ))}
          <span className='text-tusi text-xs mt-[1px]'>
            ({averageRating.toFixed(1)} از ۵)
          </span>
        </div>
      </div>

      {/* Filter */}
      <div className='mb-4 flex flex-wrap gap-2'>
        <button
          className={`border rounded px-3 py-1 text-xs ${
            selectedRating === null ? "bg-tusi text-lighter" : "text-tusi"
          }`}
          onClick={() => setSelectedRating(null)}>
          همه
        </button>
        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            className={`border rounded px-3 py-1 text-xs flex items-center gap-1 ${
              selectedRating === star ? "bg-tusi text-lighter" : "text-tusi"
            }`}
            onClick={() => setSelectedRating(star)}>
            {star}+ <FaStar className='text-[#f9a603] text-[12px]' />
          </button>
        ))}
      </div>

      {/* Review List */}
      {filteredReviews.length > 0 ? (
        <ul className='space-y-3'>
          {filteredReviews.map((review) => (
            <motion.li
              key={review.id}
              className='border-b border-tusi/30 p-3 rounded'
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}>
              <div className='flex items-center gap-1 text-[#f9a603] text-sm mb-1'>
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className='text-tusi'>{review.comment}</p>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className='text-darker/50'>هیچ نظری با این امتیاز وجود ندارد.</p>
      )}
    </div>
  );
}
