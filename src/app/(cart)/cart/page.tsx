import UserCart from "@/components/cart/UserCart";

export default function UserCartPage() {
  return <UserCart />;
}

export async function generateMetadata() {
  return {
    title: "سبد خرید – جزئیات محصولات انتخاب‌شده",
    description:
      "در این صفحه می‌توانید همه محصولاتی که به سبد خریدتان اضافه کرده‌اید مشاهده کنید، تعداد آن‌ها را تغییر دهید و مراحل نهایی پرداخت را انجام دهید.",
  };
}
