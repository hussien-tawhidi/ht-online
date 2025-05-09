import SubCategory from "@/components/categories/sub-categories/SubCategory";

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
