"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/elements/button";
import { Logo } from "@/components/logo";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { LocaleSwitcher } from "../locale-switcher";
import { MenuOpenIcon, MenuCloseIcon, PhoneIcon } from "@/components/icons/menu-icons";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { SvgLoader } from '@/components/svg-loader';
import { i18n } from "@/i18n.config";
import Image from 'next/image';
import { useScrollLock } from '@/hooks/useScrollLock';

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
  footer: any;
};

export const MobileNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale, footer }: Props) => {
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  const getLocalizedHref = (path: string) => {
    return `${locale === i18n.defaultLocale ? '' : `/${locale}`}${path}`;
  };

  useScrollLock(open);

  return (
    <div
      className={cn(
        "relative flex justify-between bg-transparent items-center w-full px-5 md:px-10 py-4 transition duration-200 leading-none",
        showBackground &&
        " bg-white"
      )}
    >
      <Logo locale={locale} image={logo?.image} company={logo?.company} active={showBackground} />

      <div className="flex flex-row gap-10 items-center">
        <div className="hidden sm:block"><LocaleSwitcher currentLocale={locale} /></div>

        {footer?.phone && (
        <a href={`tel:${footer.phone.replace(/\s+/g, '')}`}><PhoneIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
          /></a>
        )}

        {open ? (
          <MenuCloseIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <MenuOpenIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <div className="absolute top-full right-5 md:right-10 mt-5 bg-white w-[335px] rounded-[10px] z-50 flex flex-col items-start justify-start pt-6 text-base">
         
          <div className="mobile-menu flex flex-col w-full items-center justify-start px-6 pb-6 text-primary2 font-semibold">
            {leftNavbarItems.map((navItem: any, idx: number) => (
              <>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map((childNavItem: any, idx: number) => (
                      <Link
                        key={`link=${idx}`}
                        href={getLocalizedHref(childNavItem.URL)}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem]"
                      >
                        <span className="block">
                          {childNavItem.text}
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    key={`link=${idx}`}
                    href={getLocalizedHref(navItem.URL)}
                    onClick={() => setOpen(false)}
                    className="relative w-full text-center py-6"
                  >
                    <span className="block">
                      {navItem.text}
                    </span>
                  </Link>
                )}
              </>
            ))}
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-2.5  px-8 pb-4 ">
            {rightNavbarItems.map((item, index) => (
              <Button 
                key={item.text} 
                variant={index === rightNavbarItems.length - 1 ? 'primary' : 'simple'} 
                as={Link} 
                href={getLocalizedHref(item.URL)}
                onClick={() => setOpen(false)}
              >
                {item.text}
              </Button>
            ))}
          </div>

          {footer?.social && footer.social.length > 0 && (
            <div className="header-social-links mt-2 flex flex-row w-full items-center justify-center px-8 pb-6 gap-5">
              {footer.social.map((item: any) => (
                <a 
                  key={item.id} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 flex items-center justify-center"
                >
                  {item.icon && (
                    item.icon.url.endsWith('.svg') ? (
                      <SvgLoader 
                        url={strapiImage(item.icon.url)}
                        className="w-5 h-5"
                      />
                    ) : (
                      <Image 
                        src={strapiImage(item.icon.url)} 
                        alt={item.icon.name} 
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        priority
                      />
                    )
                  )}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-row items-center justify-center w-full px-8 pb-6 gap-5 sm:hidden"><LocaleSwitcher currentLocale={locale} variant="inline" /></div>


        </div>
      )}
    </div>
  );
};