"use client";

import React from "react";
import { Container } from "../container";
import { cn } from "@/lib/utils";
import { Button } from "../elements/button";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from "next/image";
import { HtmlParser } from "../html-parser";

type Perks = {
  [key: string]: string;
}

type CTA = {
  [key: string]: string;
}

type Plan = {
  icon: {
    url: string;
  };
  name: string;
  sub_text: string;
  features_title: string;
  features_description: string;
  bottom_content: string;
  price: number;
  perks: Perks[];
  additional_perks: Perks[];
  description: string;
  number: string;
  featured?: boolean;
  CTA?: CTA | undefined;
};

export const Pricing = ({ plans }: { plans: any[] }) => {
  const onClick = (plan: Plan) => {
    console.log("click", plan);
  };
  return (
    <div className="pricing my-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] lg:items-start">
          {plans.map((plan) => (
            <Card key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const Card = ({ plan }: { plan: Plan; }) => {
  return (
    <div
      className={cn(
        "p-7 rounded-[10px] border border-primary h-full flex flex-col justify-between",
        plan.featured && "border-secondary bg-secondary"
      )}
    >
      <div
        className="pricing-top"
      >
        
      <div className="flex-col flex justify-start items-start">
        {plan.icon?.url && (
        <Image
          src={strapiImage(plan.icon.url)}
          alt=""
          width={30}
          height={30}
          className="object-cover mb-2"
        />
        )}
        {plan.name && (
        <p className={cn("font-semibold text-xl text-secondary", plan.featured && "text-white")}>
          {plan.name}
        </p>
        )}

        {plan.sub_text && (
        <p className={cn("text-sm text-gray-500 mt-6", plan.featured && "text-white")}>
          {plan.sub_text}
        </p>
        )}
        
      </div>
        

      <div className="w-[90px] h-[1px] bg-primary my-[18px]"></div>

      <div className="pricing-features">
        {plan.features_title && (
          <p className={cn("text-base text-secondary font-medium mb-6", plan.featured && "text-white")}>
            {plan.features_title}
          </p>
          )}

        {plan.features_description && (
          <p className={cn("text-sm text-gray-500 mb-6", plan.featured && "text-gray-200")}>
            <HtmlParser html={plan.features_description} />
          </p>
          )}

        {plan.perks.map((feature, idx) => (
          <Step featured={plan.featured} key={idx}>
            {feature.text}
          </Step>
        ))}
      </div>

      <div className="w-[90px] h-[1px] bg-primary my-[18px]"></div>
    
      </div>
        
      <div className="pricing-bottom">
        {plan.bottom_content && (
          <p className={cn("text-sm text-gray-500 mt-6", plan.featured && "text-white")}>
            {plan.bottom_content}
          </p>
          )}

        <Button
          variant="primary"
          className={cn(
            "w-full mt-[18px] border-none"
          )}
          as="a" href={plan.CTA?.URL || "#" }
        >
          {plan?.CTA?.text}
        </Button>
      </div>
    </div>
  );
};

const Step = ({
  children,
  additional,
  featured,
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  return (
    <div className="flex items-center justify-start gap-2 my-2">
      <svg style={{ minWidth: "15px" }} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0.299988C3.3645 0.299988 0 3.66449 0 7.79999C0 11.9355 3.3645 15.3 7.5 15.3C11.6355 15.3 15 11.9355 15 7.79999C15 3.66449 11.6355 0.299988 7.5 0.299988ZM6.00075 11.1097L3.216 8.33099L4.275 7.26899L5.99925 8.99024L9.96975 5.01974L11.0303 6.08024L6.00075 11.1097Z" fill="#D0BFAC"/>
      </svg>

      <div
        className={cn(
          "text-gray-500 text-[15px]",
          featured && "text-white"
        )}
      >
        {children}
      </div>
    </div>
  );
};