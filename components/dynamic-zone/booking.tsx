"use client";
import React from "react";
import { Button } from "../elements/button";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Link from "next/link";

interface BookingProps {
  title: string;
  description: string;
  CTA: {
    id: number;
    text: string;
    URL: string;
    target: string | null;
    variant: "simple" | "outline" | "primary" | "muted";
  };
  background: {
    url: string;
  };
}

export const Booking = ({ title, description, CTA, background }: BookingProps) => {
   
  return (
    <>
    <section className="bg-primary background-image-nc02-bk">
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-25 py-[74px] md:py-25 lg:py-25">
            <div className="absolute left-0 bottom-0 max-w-[475px] w-full h-[125px] md:h-[135px] bg-cover bg-center bg-no-repeat z-10" style={{ backgroundImage: "url('/images/bg-nc02.svg')" }}></div>
        </div>
    </section>
    
    <section className="relative bg-no-repeat bg-cover bg-center min-h-[622px] md:min-h-[662px]" 
    style={{ backgroundImage: `url('${strapiImage(background?.url)}')` }}
    > 
    
    <div className="bg-[linear-gradient(180deg,rgba(27,36,49,0)_0%,#1B2431_100%)] absolute left-0 right-0 bottom-0 z-10">
        <Container className="py-16 md:py-20">
        <div className="items-center flex flex-col md:flex-row gap-5 lg:gap-25"> 
            <div className="w-full md:w-[calc(100%-250px)]">
            <h2 className="text-[34px] leading-[40px] w-full lg:w-[95%] md:text-5xl md:leading-[55px] font-inter font-bold mb-5 text-white">
                {title}
            </h2>
            <p className="font-inter font-normal text-white text-base leading-relaxed">
                {description}
            </p>
            </div>
            <div className="w-full md:w-[250px] flex justify-end"> 
              {CTA && (
                <Button as={Link} href={`/${CTA.URL}`} variant={CTA.variant}>
                  {CTA.text}
                </Button>
              )}
            </div>
        </div>
        </Container>
    </div>
    </section>
    </>
  );
};