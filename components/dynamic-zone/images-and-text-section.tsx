"use client";
import React from "react";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const ImagesAndTextSection = ({ layout = "Text Right - 3 Images Left", title, description, main_image, small_left_image, small_right_image }: { layout: string;title: string; description: string; main_image: { url: string }; small_left_image: { url: string }; small_right_image: { url: string }; }) => {
  return (
    <>
    {layout === "Text Right - 3 Images Left" ? (
    <Container className="mt-10 lg:mt-25 mb-25 lg:mb-[183px]">
        <div className="md:flex gap-[115px] md:gap-[40px] lg:gap-[120px] md:flex-row">
         
          <div className="relative pl-[26px] md:pl-[46px] md:w-6/12 lg:w-7/12 mb-32 lg:mb-0">
            {main_image?.url && (
             <Image 
                src={strapiImage(main_image.url)}
                alt="Main interior shot"
                width={800}
                height={568}
                className="w-full h-[450px] lg:h-[568px] lg:w-[95%] object-cover rounded-[10px]"
              />
            )}
            {small_left_image?.url && (
            <div className="absolute bottom-[-30px] md:bottom-[-30px] lg:bottom-[60px] left-0 lg:left-0">
              <Image 
                src={strapiImage(small_left_image.url)} 
                alt="Detail view"
                width={238}
                height={325}
                className="w-[173px] h-[216px] lg:w-[238px] lg:h-[325px] object-cover rounded-[10px]"
              />
            </div>  
            )}

            {small_right_image?.url && (
            <div className="absolute bottom-[-83px] right-0 md:bottom-[-83px] md:right-0 lg:right-[-20px]"> 
              <Image 
                src={strapiImage(small_right_image.url)} 
                alt="Secondary view"
                width={285}
                height={294}
                className="w-[150px] h-[167px] lg:w-[285px] lg:h-[294px] object-cover rounded-[10px]"
              />
            </div>
            )}
            
          </div>

          
          <div className="flex flex-col justify-center md:w-6/12 lg:w-5/12">
            <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] lg:mt-10 font-bold mb-5 md:mb-12 lg:mb-16 text-secondary">
              {title}
            </h2>
            <p className="font-normal text-gray-500 leading-relaxed text-base">{description}</p>
          </div>
        </div>
    </Container>
    ) : (
    <section className="bg-primary mx-auto pt-15 pb-40 md:pb-16">
        <Container className="md:flex gap-10 lg:gap-10">
          
          <div className="md:w-6/12 lg:w-5/12 flex flex-col justify-center mb-10 md:mb-0">
            <h2 className="w-full md:w-[90%] text-[34px] leading-[40px] md:text-5xl md:leading-[55px]font-inter font-bold mb-5 lg:mb-16 text-secondary">
              {title}
            </h2>
            <p className="font-inter font-normal text-secondary leading-relaxed text-base opacity-[.6]">{description}</p>
          </div>

         
          <div className="md:w-6/12 lg:w-7/12 relative">
            {main_image?.url && (
            <div className="pr-[32px] lg:px-[65px]">
              <Image 
                src={strapiImage(main_image.url)} 
                alt="Main view"
                width={800}
                height={590}
                className="w-full h-[400px] lg:h-[590px] object-cover rounded-[10px]"
              />
            </div>
            )}

            {small_right_image?.url && (
            <div className="absolute bottom-[-100px] md:bottom-[-10px] lg:bottom-[-30px] right-0">
              <Image 
                src={strapiImage(small_right_image.url)} 
                alt="Detail view"
                width={375}
                height={294}
                className="w-[375px] w-[191px] h-[240px] lg:h-[294px] object-cover rounded-[10px]"
              />
            </div>
            )}
          </div>
        </Container>
      </section>
    )}
    </>
  );
};