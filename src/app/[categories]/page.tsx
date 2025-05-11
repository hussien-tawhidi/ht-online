import Categories from "@/components/categories/Categories";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const param = await params;
  console.log("🚀 ~ Page ~ param:", param)

  return (
    <div className='p-4 mt-20'>
      <Categories category={param.categories} />
    </div>
  );
}
