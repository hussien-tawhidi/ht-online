"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
export interface props {
  toggleSearchField: () => void;
  query: string;
  cate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
}
const SearchResult = ({ results, toggleSearchField, cate, query }: props) => {
  const router = useRouter();
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className='text-slate-700 bg-slate-300 font-bold'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  return (
    <ul className='mt-4 border rounded-lg'>
      <p className='text-sm border-b p-3 uppercase'>
        {results.length} products found
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {results.map((product: any) => (
        <li
          key={product._id}
          onClick={() => router.push(`/product_detials/${product._id}`)}
          className='px-4 py-2 border-b last:border-none md:gap-5 gap-3 cursor-pointer hover:bg-gray-100 flex items-center text-sm'>
          <Image
            src={product.images[0].url}
            width={100}
            height={100}
            alt={`image for ${product.name}`}
            className='object-cover h-12 w-12 rounded'
          />
          <div>
            <p className='flex flex-col'>
              <span> {highlightText(product.name, query)}</span>
              <span className='text-[12px] font-light'>
                {product.description.slice(0, 50)}...
              </span>
            </p>
            <p className='flex gap-2 py-1'>
              <span>
                {(
                  product.price -
                  (product.price * product.discountPrice) / 100
                ).toFixed(2)}
                $
              </span>
              <del className='text-[10px] opacity-80 font-normal'>
                {product.price}$
              </del>
              <span className='uppercase text-[10px]'>{product.category}</span>
            </p>
          </div>
        </li>
      ))}
      <div className='' onClick={toggleSearchField}>
        <button
          className='w-full border-t bg-slate-50 transition-all hover:bg-slate-200'
          onClick={() =>
            router.push(
              `/search?query=${query}&category=${cate}&allResults=true`
            )
          }>
          View All Results
        </button>
      </div>
    </ul>
  );
};

export default SearchResult;
