
import Register from "@/components/auth/Register";

export default function RegisterPage() {
  return (
    <div className='mt-20'>
      <Register />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "ثبت‌نام کاربر",
    description: "صفحه ثبت‌نام و ایجاد حساب کاربری جدید.",
  };
}
