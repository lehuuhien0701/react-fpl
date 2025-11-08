"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../elements/button";
import { Container } from "../container";
import Link from "next/link";

export const CTA = ({ heading, sub_heading, CTAs, layout = "Full CTA" }: { heading: string; sub_heading: string; CTAs: any[], layout: string }) => {
  return (
    <div className="relative bg-secondary">
      {layout === "Full CTA" && (
        <div 
          className="absolute top-1/2 right-0 max-w-64 w-full h-[347px] -translate-y-1/2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg-nc01.svg')" }}
        ></div>
      )}
      
      {layout === "Full CTA" ? (
        <Container className="flex flex-col md:flex-row justify-between items-center w-full py-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-25">
            <div>
              <motion.h2 className="text-[34px] leading-[40px] w-full lg:w-[95%] md:text-5xl md:leading-[55px] font-bold text-primary">
                {heading}
              </motion.h2>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-normal text-white text-base leading-relaxed mb-5 lg:mb-10">{sub_heading}</p>
              {CTAs && CTAs.map((cta, index) => (
                <Button as={Link} key={index} href={`/${cta.URL}`} variant={cta.variant}>
                  {cta.text}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      ) : (
        <Container className="flex flex-col md:flex-row justify-between items-center w-full py-30">
          <div className="flex flex-col md:flex-row gap-5 lg:gap-25">
            <div className="w-full md:w-[calc(100%-300px)]">
              <h2 className="text-[34px] leading-[40px] w-full lg:w-[95%] md:text-5xl md:leading-[55px] font-bold mb-0 text-primary">
                {heading}
              </h2>
              {sub_heading &&  (
              <p className="font-normal text-white text-base leading-relaxed mb-5 lg:mb-10">{sub_heading}</p>
              )}
            </div>
            <div className="w-full md:w-[300px] flex items-center justify-center">
              {CTAs && CTAs.map((cta, index) => (
                <Button as={Link} key={index} href={`/${cta.URL}`} variant={cta.variant}>
                  {cta.text}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};