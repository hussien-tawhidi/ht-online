import { Metadata } from "next";

export const metadata: Metadata = {
  title: "نتیجه جستجو",
  description: "ای صفحه برای نمونه کار با قریمورک nextjs ساخته شده",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
