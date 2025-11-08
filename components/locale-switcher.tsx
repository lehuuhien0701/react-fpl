"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSlugContext } from "@/app/context/SlugContext";
import { BlurImage } from "./blur-image";
import { i18n } from "@/i18n.config";

type LocaleSwitcherProps = {
  currentLocale: string;
  variant?: "dropdown" | "inline";
};

export function LocaleSwitcher({
  currentLocale,
  variant = "dropdown",
}: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname(); // Current path
  const segments = pathname.split("/"); // Split path into segments

  // Generate localized path for each locale
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    if (
      Object.keys(localizedSlugs).length > 0 &&
      localizedSlugs[locale] &&
      segments.length === 2
    ) {
      return locale === i18n.defaultLocale
        ? `/${localizedSlugs[locale]}`
        : `/${locale}/${localizedSlugs[locale]}`;
    }
    
    // Blog detail page: /[locale]/blog/[slug] or /blog/[slug]
    const isBlogDetail =
      (segments[1] === "blog" && segments.length === 3) || // /blog/[slug]
      (i18n.locales.includes(segments[1] as any) && segments[2] === "blog" && segments.length === 4); // /[locale]/blog/[slug]

    if (isBlogDetail) {
      // Fallback: nếu không có localizedSlugs[locale], dùng slug của defaultLocale hoặc currentLocale
      const fallbackSlug =
        localizedSlugs[locale] ||
        localizedSlugs[i18n.defaultLocale] ||
        localizedSlugs[currentLocale] ||
        segments[segments.length - 1]; // fallback cuối cùng là slug hiện tại

      return locale === i18n.defaultLocale
        ? `/blog/${fallbackSlug}`
        : `/${locale}/blog/${fallbackSlug}`;
    }

    // Special handling for /blog route (blog index)
    if (pathname === '/blog' || segments[2] === 'blog') {
      return locale === i18n.defaultLocale ? '/blog' : `/${locale}/blog`;
    }

    // Handle homepage (e.g., "/en" -> "/fr")
    if (segments.length <= 2) {
      return locale === i18n.defaultLocale ? '/' : `/${locale}`;
    }

    // Handle dynamic paths (e.g., "/en/[something]")
    if (localizedSlugs[locale]) {
      segments[1] = locale; // Replace the locale
      segments[segments.length - 1] = localizedSlugs[locale]; // Replace slug if available
      return segments.join("/");
    }

    // Fallback to replace only the locale
    segments[1] = locale;
    return segments.join("/");
  };

  if (variant === "inline") {
    // Định nghĩa các ngôn ngữ được hỗ trợ
    const supportedLocales = pathname.includes('/blog') 
      ? i18n.locales // Lấy danh sách ngôn ngữ từ config
      : Object.keys(localizedSlugs).length > 0 
        ? Object.keys(localizedSlugs) 
        : i18n.locales;

    return (
      <div className="flex gap-4">
        {supportedLocales.map((locale) => (
          <Link
            key={locale}
            href={generateLocalizedPath(locale)}
            className={locale === currentLocale ? "opacity-50" : ""}
          >
            <div className="flex items-center justify-center">
              <BlurImage
                src={`/${locale}.svg`}
                alt={locale}
                width={30}
                height={30}
                className=""
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex gap-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <BlurImage
            src={`/${currentLocale}.svg`}
            alt={currentLocale}
            width={30}
            height={30}
            className="mr-2"
          />
          {currentLocale.toUpperCase()}
          <svg className="ml-2" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.75 10.875L0.125 6.28125C0.0416667 6.19792 0 6.10938 0 6.01562C0 5.92188 0.03125 5.83333 0.09375 5.75L0.71875 5.125C0.802083 5.0625 0.895833 5.03125 1 5.03125C1.10417 5.03125 1.1875 5.0625 1.25 5.125L5 8.84375L8.75 5.125C8.8125 5.0625 8.89583 5.03125 9 5.03125C9.10417 5.03125 9.19792 5.0625 9.28125 5.125L9.90625 5.75C9.96875 5.83333 10 5.92188 10 6.01562C10 6.10938 9.96875 6.19792 9.90625 6.28125L5.28125 10.875C5.19792 10.9375 5.10417 10.9688 5 10.9688C4.89583 10.9688 4.80208 10.9375 4.71875 10.875H4.75Z" fill="#2F324A"/>
          </svg> 
        </div>
      </div>

      {isOpen && !pathname.includes("/products/") && (
        <div className="absolute top-full left-[-10px] z-10 pt-6 flex flex-wrap-reverse gap-3 bg-white w-20 pb-[10px]">
          {(pathname.includes('/blog') 
            ? i18n.locales 
            : Object.keys(localizedSlugs).length > 0 
              ? Object.keys(localizedSlugs) 
              : i18n.locales
          )
            .filter((locale) => locale !== currentLocale)
            .map((locale) => (
              <Link
                key={locale}
                href={generateLocalizedPath(locale)}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center px-[10px]">
                  <BlurImage
                    src={`/${locale}.svg`}
                    alt={locale}
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                  {locale.toUpperCase()}
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
