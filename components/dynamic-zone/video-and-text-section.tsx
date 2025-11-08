"use client";
import React, { useState } from "react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

const TextRenderer = ({ text }: { text: string }) => {
  const htmlContent = text.replace(/\n/g, '<br />');
  return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export const VideoAndTextSection = ({ title, content, image, video }: { title: string; content: BlocksContent; image: { url: string }; video: { url: string }; }) => { 
  const [showVideo, setShowVideo] = useState(false);

  const blocks = {
    paragraph: ({ children, ...props }: any) => (
      <p className="mb-4 whitespace-pre-line" {...props}>{children}</p>
    ),
    text: ({ text }: any) => <TextRenderer text={text} />
  };

  return (
    <section className="bg-white my-20 md:my-25">
        <Container className="items-center grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-25 px-5">
           
          <div className="aspect-[1.01] relative rounded-[10px] overflow-hidden group cursor-pointer" onClick={() => setShowVideo(true)}>
            <Image 
              src={strapiImage(image?.url)} 
              alt={title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[50px] h-[50px] rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-secondary border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col justify-center">
            <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-inter font-bold mb-5 md:mb-10 lg:mb-16 text-secondary">
              {title}
            </h2> 
            <div className="font-inter font-normal text-gray-500 leading-relaxed text-base mb-6">
              <BlocksRenderer content={content} blocks={blocks} />
            </div>
          </div>
        </Container>

        {/* Video Popup */}
        {showVideo && video?.url && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
            <div className="relative w-full max-w-4xl aspect-video">
              <video
                className="w-full h-full"
                controls
                autoPlay
              >
                <source src={strapiImage(video?.url)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-[-40px] right-0 text-white text-xl p-2"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
  );
};