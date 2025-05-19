
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <div className='mt-20'>
      <Login />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "ورود به حساب کاربری",
    description: "برای دسترسی به حساب کاربری خود وارد شوید.",
  };
}
