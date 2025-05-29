// components/AnimatedBlogCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface BlogType {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface AnimatedBlogCardProps {
  blog: BlogType;
  index: number;
}

export const AnimatedBlogCard: React.FC<AnimatedBlogCardProps> = ({
  blog,
  index,
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      className='px-3'>
      <div className='bg-white border border-tusi/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full'>
        <Image
          src={blog.image}
          alt={blog.title}
          width={400}
          height={250}
          className='w-full h-52 object-cover'
        />
        <div className='p-4 flex flex-col justify-between h-[200px]'>
          <div>
            <h3 className='font-bold text-right text-lg text-tusi mb-2'>
              {blog.title}
            </h3>
            <p className='text-sm text-tusi font-thin text-right'>
              {blog.description}
            </p>
          </div>
          <Link
            href={`/blog/${blog.id}`}
            className='mt-4 inline-block hover:underline font-medium text-sm'>
            مطالعه مقاله →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
