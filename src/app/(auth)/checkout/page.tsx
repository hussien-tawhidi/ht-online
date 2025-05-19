import Checkout from "@/components/checkout/Checkout";

export default function CheckoutPage() {
  return <Checkout />;
}

export async function generateMetadata() {
  return {
    title: "تسویه‌حساب – پرداخت سفارش شما",
    description:
      "در این صفحه اطلاعات ارسال را وارد کنید و روش پرداخت را انتخاب کنید تا سفارش خود را نهایی نمایید.",
  };
}
