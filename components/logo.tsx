import React from "react";
import { i18n } from "@/i18n.config";

import { Link } from "next-view-transitions";
import { BlurImage } from "./blur-image";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";

export const Logo = ({ image, locale, company, active }: { image?: Image, locale?: string, company?: string, active?: boolean }) => {
  const href = locale === i18n.defaultLocale ? '/' : `/${locale || ''}`;
  
    return (
      <Link
        href={href}
        className="font-normal flex space-x-2 items-center mr-4 relative z-20"
      >
        {image && (
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="h-10 w-10 rounded-xl mr-2"
        />
        )}

        <span className={`text-[28px] sm:text-[40px] font-bold ${active ? 'text-secondary' : 'text-white'}`}>{company}</span>
      </Link>
    );
  

  return;
};
