"use client";
import React, { useEffect } from "react";
import parse from "html-react-parser"; 
import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image"; 

export const Hero = ({
  layout,
  heading = "Test heading", 
  background
}: {
  layout?: string;
  heading?: string; 
  background:any[];
}) => {

  // helper to safely get strapi image url or fallback
  const safeImageSrc = (media: any, fallback: string) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return strapiImage(url) ?? fallback;
    } catch {
      return fallback;
    }
  };

  // scroll to next section when clicking elements with .arrow-scroll
  useEffect(() => {
    const selector = ".arrow-scroll";
    const $ = (window as any).jQuery || (window as any).$;

    const handler = (e: Event) => {
      e.preventDefault();
      const btn = (e.currentTarget || e.target) as HTMLElement;
      const hero = btn.closest(".relative.flex.items-center") || btn.closest("div");
      const target = hero?.nextElementSibling as HTMLElement | null;
      if (target) {
        try { target.scrollIntoView({ behavior: "smooth" }); } catch { target.scrollIntoView(); }
      }
    };

    if ($) {
      // use namespaced event so we can remove it reliably
      $(selector).on("click.scrollToNext", handler);
    } else {
      document.querySelectorAll<HTMLElement>(selector).forEach(el => el.addEventListener("click", handler));
    }

    return () => {
      if ($) {
        $(selector).off("click.scrollToNext");
      } else {
        document.querySelectorAll<HTMLElement>(selector).forEach(el => el.removeEventListener("click", handler));
      }
    };
  }, []);

  if (layout === "Small") {
    return (
      <div
        className='relative flex items-center'
        style={{
          backgroundImage: `url(${safeImageSrc(background, "/thumbnail01111.jpg")})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          height: '430px',
        }}
      >
        <div className='absolute top-0 left-0 right-0 bottom-0 mix-blend-multiply bg-[linear-gradient(0deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3))] lg:bg-[linear-gradient(270deg,rgba(26,27,30,0)_65.39%,#1A1B1E_100%)]'></div>
        <div className='max-w-[1400px] mx-auto w-full px-10 lg:px-20 relative z-10'>
          <div className='lg:max-w-[560px]'>
            {heading && (
              <h1 className='text-center lg:text-left mt-9 mb-[70px] font-medium text-[35px] leading-[50px] md:text-[70px] md:leading-[70px] text-white break-words whitespace-normal break-words'>
                {heading ? parse(heading) : null}
              </h1>
            )}
            <Image
              className='cursor-pointer m-auto lg:m-0 block arrow-scroll'
              alt=""
              src="/arrow-down-scroll.svg"
              width={85}
              height={85}
              priority
            />
          </div>
        </div>
        <Image
          className='absolute bottom-0 right-0'
          alt=""
          src="/Vector01.svg"
          width={842}
          height={352}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className='relative flex items-center'
      style={{
        backgroundImage: `url(${safeImageSrc(background, "/thumbnail01.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '645px',
      }}
    >
      <div className='absolute top-0 left-0 right-0 bottom-0 mix-blend-multiply bg-[linear-gradient(0deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3))] lg:bg-[linear-gradient(270deg,rgba(26,27,30,0)_35.39%,#1A1B1E_100%)]'></div>
      <div className='max-w-[1400px] mx-auto w-full px-10 lg:px-20 relative z-10'>
        <div className='lg:max-w-[60%]'>
          {heading && (
            <h1 className='text-center lg:text-left mt-9 mb-[70px] font-medium text-[35px] leading-[50px] md:text-[70px] md:leading-[70px] text-white break-words whitespace-normal break-words'>
              {heading ? parse(heading) : null}
            </h1>
          )}
          <Image
            className='cursor-pointer m-auto lg:m-0 block arrow-scroll'
            alt=""
            src="/arrow-down-scroll.svg"
            width={85}
            height={85}
            priority
          />
        </div>
      </div>
      <Image
        className='absolute bottom-0 right-0'
        alt=""
        src="/Vector01.svg"
        width={842}
        height={352}
        priority
      />
    </div>
  );
};
