import React, { Suspense } from "react";
import SearchPageClient from "../../components/header/search/SearchPage";

export default function SearchUserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
