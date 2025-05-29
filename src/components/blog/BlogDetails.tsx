"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BlogMeta } from "./BlogMeta";
import { BlogType } from "./data";

export const BlogDetails = ({ blog }: { blog: BlogType }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className='max-w-4xl mx-auto px-4 py-10'>
      <h1 className='text-3xl md:text-4xl font-extrabold text-right text-tusi mb-6'>
        {blog.title}
      </h1>

      <BlogMeta blog={blog} />

      <div className='relative w-full h-[300px] rounded-xl overflow-hidden my-6'>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 800px'
        />
      </div>

      <div className='prose prose-tusi prose-lg dark:prose-invert max-w-none text-right'>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </motion.article>
  );
};
