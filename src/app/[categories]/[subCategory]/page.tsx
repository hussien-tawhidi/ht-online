import SubCategory from "@/components/categories/sub-categories/SubCategory";
import { header } from "@/components/header/data";
import { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const param = await params;

  return (
    <div className='p-4 mt-20'>
      <SubCategory
        subCategory={param.subCategory}
        category={param.categories}
      />
    </div>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { categories: string; subCategory: string };
}): Promise<Metadata> {
  const cate = header.find((item) => item.href === `/${params.categories}`);
  const subCate = cate?.submenu.find(
    (item) => item.href === `/${params.categories}/${params.subCategory}`
  );
  return {
    title: ` دسته بندی - ${subCate?.title}`,
    description: `مشخصات و جزئیات محصول ${subCate?.title}`,
  };
}
