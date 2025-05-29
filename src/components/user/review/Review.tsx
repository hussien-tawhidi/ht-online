"use client";

import { useEffect, useState } from "react";
import { ReviewFilters } from "./ReviewFilters";
import { ReviewCard } from "./ReviewCard";
import { PaginationControls } from "./PaginationControls";
import { data, ReviewType } from "../data";

const REVIEWS_PER_PAGE = 2;

export default function Review() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((res) => setTimeout(res, 800));

      setReviews(data);
    } catch (err) {
      console.log("🚀 ~ fetchReviews ~ err:", err);
      setError("خطا در بارگذاری نظرات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filtered = reviews.filter((r) => r.rating >= minRatingFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / REVIEWS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  return (
    <div dir='rtl' className='max-w-3xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-darker/70'>نظرات من</h1>

      <ReviewFilters
        sortBy={sortBy}
        setSortBy={(val) => {
          setPage(1);
          setSortBy(val);
        }}
        minRatingFilter={minRatingFilter}
        setMinRatingFilter={(val) => {
          setPage(1);
          setMinRatingFilter(val);
        }}
      />

      {loading ? (
        <p className='text-center'>در حال بارگذاری...</p>
      ) : error ? (
        <p className='text-center text-[#8b0000] font-semibold'>{error}</p>
      ) : paginated.length === 0 ? (
        <p className='text-center italic text-darker/50'>هیچ نظری یافت نشد.</p>
      ) : (
        <ul className='space-y-6'>
          {paginated.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}

      {!loading && !error && totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
}
