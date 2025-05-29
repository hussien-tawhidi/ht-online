
import { format } from "date-fns-jalali";
import { BlogType } from "./data";
import { BiCalendar, BiTag, BiUser } from "react-icons/bi";

export const BlogMeta = ({ blog }: { blog: BlogType }) => {
  return (
    <div className='text-sm text-tusi/70 flex flex-wrap items-center justify-end gap-4 mb-4'>
      {blog.publishedAt && (
        <span className='flex items-center gap-1'>
          <BiCalendar className='w-4 h-4' />
          {format(new Date(blog.publishedAt), "yyyy/MM/dd")}
        </span>
      )}
      {blog.author && (
        <span className='flex items-center gap-1'>
          <BiUser className='w-4 h-4' />
          {blog.author}
        </span>
      )}
      {blog.tags?.length > 0 && (
        <span className='flex items-center gap-1'>
          <BiTag className='w-4 h-4' />
          <span>{blog?.tags.join("، ")}</span>
        </span>
      )}
    </div>
  );
};
