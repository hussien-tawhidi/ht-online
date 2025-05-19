import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const SearchPageClient = dynamic(
  () => import("../../components/header/search/SearchPage"),
  {
    ssr: false,
  }
);

export default function SearchUserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
