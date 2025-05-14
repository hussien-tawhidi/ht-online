import Link from "next/link";

export default function Breadcrumbs({ category }: { category: string }) {
  return (
    <nav className='text-xs text-darker/60 mb-2'>
      <ol className='flex space-x-1 rtl:space-x-reverse'>
        <li>
          <Link href='/' className='hover:underline'>
            خانه
          </Link>{" "}
          /
        </li>
        <li>
          <Link href='/products' className='hover:underline'>
            محصولات
          </Link>{" "}
          /
        </li>
        <li className='text-darker'>{category}</li>
      </ol>
    </nav>
  );
}
