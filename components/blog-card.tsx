import { Link } from "next-view-transitions";
import React from "react";
import { BlurImage } from "@/components/blur-image";
import { truncate } from "@/lib/utils";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Article } from "@/types/types";
import { ReadMoreIcon } from "./icons/ReadMoreIcon";

export const BlogCard = ({ article, locale }: { article: Article, locale: string }) => {
  return (
    <Link
      className="blogcard w-full overflow-hidden transition duration-200 group"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div className="post-image mb-6">
        {article.image ? (
          <div className="aspect-[1.582/1] relative">
            <BlurImage
              src={strapiImage(article.image.url || "")}
              alt={article.title}
              fill
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className=" h-64 md:h-96 flex items-center justify-center">
            {/* <Logo /> */}
          </div>
        )}
      </div>
      <div className="post-details flex flex-col justify-between">
        <div className="description">
          <h3 className="text-xl font-semibold mb-4 text-secondary hover:text-primary line-clamp-3 transition-all duration-200 ease-linear">
              {article.title}
          </h3>
        
          <p className="text-left text-gray-500 text-sm md:text-base mt-2 line-clamp-2">
            {truncate(article.description, 500)}
          </p>
        </div>
        <div className="mt-6">
          <ReadMoreIcon className="text-[#D0BFAC] transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        </div>
      </div>
    </Link>
  );
};



export const BlogCardSmall = ({ article, locale }: { article: Article, locale: string }) => {
  return (
    <Link
      className="blogcard w-full overflow-hidden transition duration-200 group flex flex-col lg:flex-row gap-[14px]"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div className="post-image w-full lg:w-[45%] mb-6">
        {article.image ? (
          <div className="aspect-[1.582/1] lg:aspect-[1/1] relative">
            <BlurImage
              src={strapiImage(article.image.url || "")}
              alt={article.title}
              fill
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className=" h-64 md:h-96 flex items-center justify-center">
            {/* <Logo /> */}
          </div>
        )}
      </div>
      <div className="post-details  w-full lg:w-[55%]">
        <div className="description">
          <h3 className="text-xl font-semibold text-secondary hover:text-primary line-clamp-3 transition-all duration-200 ease-linear">
              {article.title}
          </h3>
        
          <p className="text-left text-gray-500 text-sm md:text-base mt-2 line-clamp-2">
            {truncate(article.description, 500)}
          </p>
        </div>
        <div className="mt-4">
          <ReadMoreIcon className="text-[#D0BFAC] transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        </div>
      </div>
        
    </Link>
  );
};
