import { BlogDetails } from "@/components/blog/BlogDetails";
import { BlogType } from "@/components/blog/data";

// 🔁 Replace this with a real DB or fetch function
const mockBlogs: BlogType[] = {
  id: "1",
  title: "عنوان مقاله نمونه",
  description: "توضیح کوتاه",
  image: "/sample.jpg",
  content: "<p>محتوای کامل مقاله به صورت HTML...</p>",
  author: "نویسنده تستی",
  publishedAt: "2024-01-15",
  tags: ["تست", "مقاله", "برنامه‌نویسی"],
};

export default async function BlogPage({ params }: { params: { id: string } }) {


  return <BlogDetails blog={mockBlogs} />;
}
