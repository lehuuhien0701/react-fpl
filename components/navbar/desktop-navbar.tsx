/* eslint-disable react/no-unescaped-entities */

"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/elements/button";
import { NavbarItem } from "./navbar-item";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { LocaleSwitcher } from "../locale-switcher";
import { i18n } from "@/i18n.config";
import { Container } from "../container";
import Image from "next/image";

type Props = {
  leftNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
};

export const DesktopNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale }: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });
  return (
    <motion.div
      className={cn(
        "w-full relative py-5 transition duration-200 bg-transparent mx-auto"
      )}
      animate={{
        width: showBackground ? "100%" : "100%",
        background: showBackground ? "white" : "transparent",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <Container className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Logo locale={locale} image={logo?.image} company={logo?.company} active={showBackground} />
          
        </div>
        <div className="flex space-x-3 items-center">

          <div className={`flex items-center gap-1.5 ${showBackground ? 'text-secondary' : 'text-white'}`}>
            {leftNavbarItems.map((item) => (
              <NavbarItem 
                href={item.URL as never}
                key={item.text} 
                target={item.target}
              >
                {item.text}
              </NavbarItem>
            ))}
          </div>


          {rightNavbarItems.map((item, index) => (
            <Button 
              key={item.text} 
              variant={index === rightNavbarItems.length - 1 ? 'primary' : 'simple'} 
              as={Link} 
              href={`${locale === i18n.defaultLocale ? '' : `/${locale}`}${item.URL}`}
            >
              {item.text}
            </Button>
          ))}

          <div className="pl-5">
            <LocaleSwitcher currentLocale={locale} />
          </div>

        </div>
      </Container>
      <nav className="bg-navy border-b border-white/10 sticky top-0 z-50">
        <div className="px-20 h-[69px] flex items-center justify-between">
          <Image 
            src="./Meta.svg" 
            alt="FIL Logo" 
            className="h-[69px] w-[248px]"
            width={248}
            height={69}
            priority
          />
          <div className="flex items-center gap-10">
            <a href="#" className="text-white text-sm leading-[14px]">Members Directory</a>
            <a href="#" className="text-white text-sm leading-[14px]">Who We Are</a>
            <a href="#" className="text-white text-sm leading-[14px]">Members' Area</a>
            <a href="#" className="text-white text-sm leading-[14px]">News</a>
            <a href="#" className="text-white text-sm leading-[14px]">Professions</a>
            <button className="flex items-center gap-2.5 px-5 h-10 rounded-full border border-beige/20 bg-navy text-white text-sm leading-[14px]">
              Contact
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.19727 12.1203L9.0006 8.31703C9.44977 7.86787 9.44977 7.13287 9.0006 6.6837L5.19727 2.88037" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="w-10 h-10 flex items-center justify-center">
              
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};
