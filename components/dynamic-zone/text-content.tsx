"use client";
import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const TextContent = ({ content }: { content: any; }) => { 
  return (
    <div className="mt-10 post-content text-base text-gray-500 w-full mx-auto max-w-[800px]">
      <BlocksRenderer content={content} />
    </div>
  );
};
