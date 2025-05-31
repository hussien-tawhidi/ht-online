import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/components/provider/ReduxProvider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rc-slider/assets/index.css";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/taost/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی HT | خرید آنلاین با بهترین قیمت و کیفیت",
  description:
    "HT یک فروشگاه اینترنتی مدرن با بهترین قیمت‌ها و کیفیت برتر است. از تکنولوژی Next.js برای ارائه تجربه‌ای سریع، امن و کاربرپسند استفاده شده است.",
  keywords: [
    "فروشگاه اینترنتی",
    "HT",
    "خرید آنلاین",
    "Next.js",
    "فروشگاه مدرن",
  ],
  authors: [{ name: "HT Dev Team", url: "https://ht-online.vercel.app/" }],
  creator: "HT",
  metadataBase: new URL("https://ht-online.vercel.app/"),
  openGraph: {
    title: "فروشگاه اینترنتی HT | خرید سریع و مطمئن",
    description:
      "با فروشگاه اینترنتی HT، از تجربه خرید آنلاین لذت ببرید. تنوع بالا، قیمت مناسب، و طراحی سریع با Next.js.",
    url: "https://ht-online.vercel.app/",
    siteName: "HT Online Store",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    title: "فروشگاه HT | تجربه‌ای نو در خرید آنلاین",
    description: "محصولات با کیفیت و تحویل سریع در HT. طراحی شده با Next.js.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='fa'
      dir='rtl'
      className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel='icon' href='/logo.ico' sizes='any' />
      </head>
      <body className='antialiased bg-white text-darker'>
        <SessionProvider>
          <ReduxProvider>
            <ToastProvider>
              <Header />
              <main className='min-h-screen'>{children}</main>
              <Footer />
            </ToastProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
