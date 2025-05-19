
import dynamic from "next/dynamic";

const SearchClient = dynamic(
  () => import("@/components/header/search/SearchPage"),
  {
    ssr: false, // ensure it only renders on the client
  }
);
export default function SearchUserPage() {
  return <SearchClient />;
}

export async function generateMetadata() {
  return {
    title: "نتایج جستجو",
    description: "نمایش نتایج جستجو و فیلترهای مربوطه.",
  };
}
