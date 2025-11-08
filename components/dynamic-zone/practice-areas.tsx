"use client";
import React from "react";
import parse from "html-react-parser"; 
import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image";

interface PracticeAreasProps {
  heading?: string;
  button_title?: string;
  boxtext1?: string;
  boxtext2?: string;
  background?: any;
  // ...add other fields if needed
}

export const PracticeAreas = ({ heading, button_title, background, boxtext1 = "Test boxtext1", boxtext2 = "Test boxtext2" }: PracticeAreasProps) => { 
  // helper to safely get strapi image url or fallback
  const safeImageSrc = (media: any, fallback: string) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return strapiImage(url) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const scrollToFooter = () => {
    const el = document.getElementById('site-footer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  return (

      <>
         <div className='relative'>
            <div className='absolute top-0 left-0 right-0 bottom-0 mix-blend-multiply bg-[linear-gradient(360deg,#D8D6CC33_22.7%,#E8E6DF_97.34%)]'> </div>
            <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 py-20 md:py-[100px] relative z-10'>
                <div className='flex flex-wrap relative z-10'>
                    <div className='w-full md:w-[240px] lg:w-[400px]'>
                        <div className='md:flex items-start'>
                          <Image
                            className='mb-6 md:mb-0 mr-[22px]'
                            alt=""
                            src="/setting.svg"
                            width={30}
                            height={30}
                            priority
                          />
                          {heading && (
                            <h2 className='font-normal text-2xl leading-[34px] flex items-start pb-7 mb-7 border-b border-[#2F324A]'>
                              {parse(heading)}
                            </h2>        
                          )}                  
                        </div>
                        {button_title && (
                        <div className='md:pl-[52px]'>
                          <button onClick={scrollToFooter} className='text-sm font-medium text-white bg-primary h-11 px-10 hover:bg-[#CCAB80] hover:text-[#2F324A] transition duration-200'>{button_title}</button>
                        </div>
                        )}
                    </div>
                    <div className='mt-10 md:mt-0 w-full md:w-[calc(100%-240px)] lg:w-[calc(100%-400px)] flex md:justify-end'>
                        <div className='md:max-w-[647px] flex flex-col md:flex-row gap-6 font-normal leading-[26px]'>
                            <div>
                                {parse(boxtext1)}
                            </div>
                            <div>
                                {parse(boxtext2)} 
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                  className='absolute bottom-0 left-0'
                  alt=""
                  src="/Vector02.svg"
                  width={496}
                  height={292}
                  priority
                />
            </div>
            
        </div>  
      
      </>

 
  );
};
