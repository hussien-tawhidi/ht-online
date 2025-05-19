import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/components/provider/ReduxProvider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rc-slider/assets/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی - HT",
  description: "ای صفحه برای نمونه کار با قریمورک nextjs ساخته شده",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir='rtl'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className='text-darker'>
          <link
            rel='icon'
            href='/logo.ico'
            sizes='any'
            className='h-auto w-3'
          />
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
