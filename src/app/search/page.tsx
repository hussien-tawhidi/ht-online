
import SearchPage from "@/components/header/search/SearchPage";

export default function SearchUserPage() {
  return <SearchPage />;
}

export async function generateMetadata() {
  return {
    title: "نتایج جستجو",
    description: "نمایش نتایج جستجو و فیلترهای مربوطه.",
  };
}
