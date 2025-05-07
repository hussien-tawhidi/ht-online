import Blog from "@/components/home/Blog";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import FlashDeals from "@/components/home/FlashDeals";
import Hero from "@/components/home/Hero";
import IntroText from "@/components/home/Intro";
import RecommendedProducts from "@/components/home/RecommendedProducts";
import TopCatgories from "@/components/home/TopCatgories";
import TrendingProducts from "@/components/home/TrendingProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <TrendingProducts />
      <Categories />
      <RecommendedProducts />
      <FlashDeals />
      <TopCatgories />
      <Blog />
      <IntroText />
    </main>
  );
}
