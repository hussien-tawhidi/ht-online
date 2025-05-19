import Categories from "@/components/categories/Categories";
import { header } from "@/components/header/data";
import { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const param = await params;
  console.log("🚀 ~ Page ~ param:", param);

  return (
    <div className='p-4 mt-20'>
      <Categories category={param.categories} />
    </div>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { categories: string };
}): Promise<Metadata> {
  const cate = header.find((item) => item.href === `/${params.categories}`);

  return {
    title: ` دسته بندی - ${cate?.title}`,
    description: `مشخصات و جزئیات محصول ${cate?.title}`,
  };
}
