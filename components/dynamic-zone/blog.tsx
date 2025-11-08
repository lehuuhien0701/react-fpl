"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Link from "next/link";
import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';
import { useParams } from 'next/navigation';
import { i18n } from "@/i18n.config";
import Image from "next/image";

const POSTS_PER_PAGE = 9;

export const Blog = ({ 
  layout,
  title,
  description,
  button_text,
  button_link,
  readmore,
  locale,
}: {
  layout: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  readmore: string;
  locale: string;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);

  const extractMediaUrl = (media: any): string | null => {
    if (!media) return null;
    if (typeof media === "string") return media;
    if (media.url) return media.url;
    if (media.attributes?.url) return media.attributes.url;
    if (media.data?.attributes?.url) return media.data.attributes.url;
    if (media.data && Array.isArray(media.data) && media.data[0]?.attributes?.url) return media.data[0].attributes.url;
    if (media.formats?.thumbnail?.url) return media.formats.thumbnail.url;
    if (media.attributes?.formats?.thumbnail?.url) return media.attributes.formats.thumbnail.url;
    return null;
  };

  const normalizeArticles = useCallback((items: any[]) => {
    return items.map((item: any) => {
      if (!item) return item;
      const attrs = item.attributes ?? (item.data?.attributes ?? item);
      const id = item.id ?? item.data?.id ?? attrs?.id;
      const normalized: any = { id, ...attrs };

      const possibleImage = attrs.image ?? attrs.Image ?? attrs.thumbnail ?? attrs.media;
      const rawUrl = extractMediaUrl(possibleImage);
      if (rawUrl) {
        try {
          normalized.image = { url: strapiImage(rawUrl) ?? rawUrl };
        } catch {
          normalized.image = { url: rawUrl };
        }
      }

      return normalized;
    });
  }, []); // Empty dependency array because it doesn't depend on external variables

  const extractTextFromRichContent = (content: any): string => {
    if (!content) return "";
    const walk = (node: any): string => {
      if (node == null) return "";
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(walk).join(" ");
      if (node.children) return walk(node.children);
      if (node.text) return String(node.text);
      if (typeof node === "object") return Object.values(node).map(walk).join(" ");
      return "";
    };
    return walk(content).replace(/\s+/g, " ").trim();
  };

  const top3Posts = useMemo(() => posts.slice(0, 3), [posts]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const pageSize = POSTS_PER_PAGE;
        const articles = await fetchContentTypeClient("articles", {
          filters: locale ? { locale } : {},
          populate: "*",
          sort: ["publishedAt:desc"],
          pagination: { page: currentPage, pageSize },
        });

        let data = articles?.data ?? [];

        if ((!data || data.length === 0) && locale) {
          const fallback = await fetchContentTypeClient("articles", {
            populate: "*",
            sort: ["publishedAt:desc"],
            pagination: { page: 1, pageSize },
          });
          data = fallback?.data ?? [];
        }

        const normalized = normalizeArticles(data);
        setPosts(normalized);
        setTotalPages((articles?.meta?.pagination?.pageCount) ?? 1);
      } catch (error) {
        console.error("Lỗi khi fetch bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, currentPage, normalizeArticles]);

  const isInternalLink = (link: string) => {
    return link?.startsWith?.("/") || link?.startsWith?.("#");
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
    }

    const onGoto = (e: React.MouseEvent, p: number) => {
      e.preventDefault();
      if (p < 1 || p > totalPages) return;
      setCurrentPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
      <div className="wp-pageNavi flex justify-between items-center w-full">
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            className="flex items-center font-normal text-sm leading-[26px] text-primary"
            aria-label="Previous page"
          >
            <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675" stroke="#2F324A" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {translations[currentLocale]?.previous || translations[i18n.defaultLocale].previous}
          </a>
        </div>

        <div className="flex items-center font-normal text-sm leading-[26px] text-primary">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dot-${idx}`} className="w-10 h-10 flex items-center justify-center">
                ...
              </span>
            ) : (
              <a
                key={p}
                href="#"
                onClick={(e) => onGoto(e, Number(p))}
                className={`w-10 h-10 flex items-center justify-center ${p === currentPage ? "text-white bg-primary rounded" : ""}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </a>
            )
          )}
        </div>

        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }}
            className="flex items-center font-normal text-sm leading-[26px] text-primary"
            aria-label="Next page"
          >
            {translations[currentLocale]?.next || translations[i18n.defaultLocale].next}
            <svg className="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334" stroke="#2F324A" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    );
  };

  // normalize layout prop and decide which section to show
  const normalizedLayout = String(layout ?? "").trim().toLowerCase();
  const showDefaultLayout = normalizedLayout === "defaultgrid";
  const showPaginatedLayout = normalizedLayout === "paginatedgrid" || !showDefaultLayout;


  return (
    <div className="py-20 md:py-[120px] relative">
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20">
        {/* HEADER */}
        

        {/* DefaultGrid section */}
        {showDefaultLayout && (
          <div className="layout-DefaultGrid">
            <div className="flex items-start justify-between mb-[60px]">
              {title && <h2 className="font-normal text-2xl leading-[34px] text-primary">{title}</h2>}
              {button_text && (
                <div className="font-normal text-sm leading-[26px] flex items-center">
                  {button_link ? (
                    isInternalLink(button_link) ? (
                      <Link href={button_link} className="font-normal text-sm leading-[26px] flex items-center" data-discover="true">
                        {button_text}
                        <svg className='ml-[17px]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9" stroke="#2F324A" stroke-linecap="round" stroke-linejoin="round"/>
                         </svg> 
                      </Link>
                    ) : (
                      <a href={button_link} className="font-normal text-sm leading-[26px] flex items-center" data-discover="true" target="_blank" rel="noopener noreferrer">
                        {button_text}
                      </a>
                    )
                  ) : (
                    <span className="font-normal text-sm leading-[26px]">{button_text}</span>
                  )}
                </div>
              )}
            </div>
            <div className="mt-6">
              <div className="grid md:grid-cols-3 gap-10">
                {loading && currentPage === 1 ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[380/250] bg-gray-200 rounded-lg mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    </div>
                  ))
                ) : top3Posts && top3Posts.length > 0 ? (
                  top3Posts.map((item: any) => {
                    const imgSrc = item.image?.url ?? item.image ?? "/thumbnail02.jpg";
                    const title = String(item.title ?? item.Title ?? "");
                    const date = item.publishedAt ?? item.published_at ?? item.createdAt ?? item.created_at ?? "";
                    const dateText = date ? new Date(date).toLocaleDateString() : "";
                    const company = item.company ?? item.author ?? "Fiduciaire Premier Luxembourg S.A.";
                    const rawExcerpt = item.description ?? item.excerpt ?? item.summary ?? extractTextFromRichContent(item.content) ?? "";
                    const excerptText = String(rawExcerpt);
                    const href = `/blog/${item.slug ?? item.slug_current ?? item.id}`;

                    return (
                      <div key={item.id ?? href}>
                        <div className="mb-[20px]">
                          <Link href={href} className="">
                          <Image
                            className="w-full h-[195px] object-cover"
                            alt={title}
                            src={String(imgSrc)}
                            width={800}
                            height={195}
                            unoptimized={/^(https?:)?\/\//.test(String(imgSrc))}
                          />
                          </Link>
                        </div>
                        <div> 
                          <h3 className="font-medium text-xl leading-[30px] text-primary mb-3">
                              <Link href={href}>{title.length > 80 ? title.slice(0, 55) + "..." : title}</Link>
                            </h3>
                          <strong className="font-bold text-xs leading-3 text-[#9CA3AF] mb-3 block">{dateText ? `${dateText} / ${company}` : company}</strong>
                          <div className="opacity-60 mb-4">
                            <p>{excerptText.length > 160 ? excerptText.slice(0, 100) + "..." : excerptText}</p>
                          </div>
                          <Link href={href} className="text-center inline-block w-full sm:w-auto text-sm leading-[44px] font-medium text-white bg-primary h-11 px-10 hover:bg-[#CCAB80] hover:text-[#2F324A] transition duration-200">
                            {readmore?.trim() ? readmore : "Read more"}
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  !loading && <div className="text-center text-gray-500 col-span-3">No posts found.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PaginatedGrid section */}
        {showPaginatedLayout && (
          <div className="layout-PaginatedGrid">
           
               
              {loading && currentPage > 1 ? (
                <div className="grid md:grid-cols-3 gap-10">
                  {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[380/250] bg-gray-200 rounded-lg mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-10">
                    {posts.map((item: any) => {
                      const imgSrc = item.image?.url ?? item.image ?? "/thumbnail02.jpg";
                      const title = String(item.title ?? item.Title ?? "");
                      const date = item.publishedAt ?? item.published_at ?? item.createdAt ?? item.created_at ?? "";
                      const dateText = date ? new Date(date).toLocaleDateString() : "";
                      const company = item.company ?? item.author ?? "Fiduciaire Premier Luxembourg S.A.";
                      const rawExcerpt = item.description ?? item.excerpt ?? item.summary ?? extractTextFromRichContent(item.content) ?? "";
                      const excerptText = String(rawExcerpt);
                      const href = `/blog/${item.slug ?? item.slug_current ?? item.id}`;

                      return (
                        <div key={item.id ?? href}>
                          <div className="mb-[20px]">
                            <Link href={href} className="">
                            <Image
                              className="w-full h-[195px] object-cover"
                              alt={title}
                              src={String(imgSrc)}
                              width={800}
                              height={195}
                              unoptimized={/^(https?:)?\/\//.test(String(imgSrc))}
                            />
                            </Link>
                          </div>
                          <div>
                            <h3 className="font-medium text-xl leading-[30px] text-primary mb-3">
                              <Link href={href}>{title.length > 80 ? title.slice(0, 55) + "..." : title}</Link>
                            </h3>
                            <strong className="font-bold text-xs leading-3 text-[#9CA3AF] mb-3 block">{dateText ? `${dateText} / ${company}` : company}</strong>
                            <div className="opacity-60 mb-4">
                              <p>{excerptText.length > 160 ? excerptText.slice(0, 100) + "..." : excerptText}</p>
                            </div>
                            <Link href={href} className="text-center inline-block w-full sm:w-auto text-sm leading-[44px] font-medium text-white bg-primary h-11 px-10 hover:bg-[#CCAB80] hover:text-[#2F324A] transition duration-200">
                              {readmore?.trim() ? readmore : "Read more"} 
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex items-center justify-between">{renderPagination()}</div>
                </>
              )}
            
          </div>
        )}
      </div>
    </div>
  );
};