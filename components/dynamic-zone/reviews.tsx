"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "../container";


export const Reviews = ({ title, description, review_items }: { title: string; description: string; review_items: any[] }) => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="absolute right-1/2 sm:right-5 lg:right-0 xl:right-25  -mr-[80px] sm:mr-0 -bottom-[135px] sm:bottom-auto sm:-top-[164px] z-10"
        onClick={onClick}
      >
        <Image src="/images/next.svg" alt="Next" width={64} height={64} />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="absolute right-1/2 sm:right-25 lg:right-20 xl:right-[187px] -ml-[80px] sm:ml-0 -bottom-[135px] sm:bottom-auto sm:-top-[164px] z-10"
        onClick={onClick}
      >
        <Image src="/images/prev.svg" alt="Previous" width={64} height={64} />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="relative bg-white text-secondary py-25 overflow-hidden">
      <Container>
        <h3 className="text-[34px] sm:text-5xl font-bold ">{title}</h3>
        <div className="mt-2 md:mt-8 text-base ">
          {description}
        </div>
        <div className="reviews-slider relative mt-15 sm:mt-20 -ml-5 pb-25 sm:pb-0">
          <Slider {...settings}>
            {review_items && review_items.map((item) => (
              <div key={item.name} className="px-[15px]">
                <div className="border border-primary p-[30px]">
                    <div className="flex gap-4 flex-col-reverse items-start sm:flex-row sm:items-center">
                      <div className="flex flex-col">
                        {item.name && (
                          <h3 className="text-xl text-secondary font-semibold">{item.name}</h3>
                        )}
                        {item.company && (
                          <p className="text-sm text-gray-500">{item.company}</p>
                        )}
                        {item.social_link && item.social_text && (
                          <a href={item.social_link} className="text-primary text-sm font-bold">{item.social_text}</a>
                        )}
                      </div>
                      <div className="flex flex-row sm:ml-auto gap-[5px]">
                        {[...Array(item.stars)].map((_, index) => (
                          <svg key={index} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.27466 1.84231C9.04735 0.524344 10.9527 0.524346 11.7253 1.84231L13.4512 4.78606C13.7332 5.26702 14.2031 5.60846 14.7477 5.72801L18.0807 6.45971C19.5729 6.78731 20.1617 8.59937 19.147 9.74152L16.8806 12.2926C16.5103 12.7094 16.3308 13.2618 16.3854 13.8167L16.7195 17.2126C16.869 18.7331 15.3276 19.853 13.9278 19.2409L10.8013 17.8738C10.2904 17.6504 9.70956 17.6504 9.19873 17.8738L6.0722 19.2409C4.6724 19.853 3.13097 18.7331 3.28054 17.2126L3.61459 13.8167C3.66917 13.2618 3.48967 12.7094 3.11938 12.2926L0.853022 9.74151C-0.161664 8.59937 0.427111 6.78731 1.91935 6.45971L5.25233 5.72801C5.79689 5.60846 6.26683 5.26702 6.54881 4.78606L8.27466 1.84231Z" fill="#FBBF24"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="w-[90px] h-[1px] bg-primary my-4"></div>
                    <div className="text-base text-secondary">
                      {item.review_content}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};
