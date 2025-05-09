import { header } from "@/components/header/data";

export default async function Page({
  params,
}: {
  params: { categories: string; slug: string };
}) {
  const param = await params;
  const cate = header.find((item) => item.href === `/${param.categories}`);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>
        Category: {cate?.title || "Not found"}
      </h1>
    </div>
  );
}
