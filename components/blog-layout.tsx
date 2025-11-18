import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Article } from "@/types/types";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { headers } from "next/headers";
import { i18n } from "@/i18n.config";

import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';

export async function BlogLayout({ 
  article,
  locale,
  currentLocale,
  children,
}: {
  article: Article;
  locale: string;
  currentLocale: Locale;
  children: React.ReactNode;
}) {
  
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shareUrl = `${protocol}://${domain}${
    locale === i18n.defaultLocale ? "" : `/${locale}`
  }/blog/${article.slug}`;


  // normalize published date and company/author fields from various shapes
  const normalizePublished = (a: any) => {
    return (
      a?.published ??
      a?.publishedAt ??
      a?.published_at ??
      a?.createdAt ??
      a?.created_at ??
      a?.date ??
      null
    );
  };

  const normalizeCompany = (a: any) => {
    return (
      a?.company ??
      a?.author ??
      a?.author_name ??
      a?.company_name ??
      a?.attributes?.company ??
      a?.attributes?.author ??
      null
    );
  };

  const publishedRaw = normalizePublished(article as any);
  const publishedDateStr = publishedRaw ? new Date(publishedRaw).toLocaleDateString() : "date";
  const companyName = normalizeCompany(article as any) ?? "Fiduciaire Premier Luxembourg S.A.";

  return (
    <>
      <div>
        <div className='max-w-[880px] lg:max-w-[960px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10 pb-[60px] pt-16'>
          <div className='font-bold text-xs leading-none text-gray-400'>
            <p>{publishedDateStr} / <span> {companyName}</span></p>
          </div>
          <h3 className='font-medium text-5xl leading-[56px] text-primary'>
            {article.title}
          </h3>
        </div>

        <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 mb-16'>
          <Image
            className='w-full'
            alt={article.title}
            src={article.image ? (strapiImage(article.image.url) ?? "/thumbnail04.jpg") : "/thumbnail04.jpg"}
            width={1400}
            height={600}
            priority={false}
          />
        </div>

        <div className='max-w-[880px] lg:max-w-[960px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10 pb-[60px]'>
          {/*
            children chứa nội dung đã được parse/hoạt động (HtmlParser) từ trang single.
            Nếu bạn muốn dùng HtmlParser tại đây thay vì truyền children, thay {children} bằng <HtmlParser html={article.content} />.
          */}
          <div className="[&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_img]:my-6">
          {children}
          </div>

          <div className='mt-4'>
              <p className='text-center'>{(translations as any)[currentLocale]?.share_label || (translations as any)[i18n.defaultLocale]?.share_label || "Share this post"} </p>
              <div className='flex justify-center gap-6'>
                  <div className="flex items-center gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0374 34H16.9626C7.60952 34 0 26.3905 0 17.0374V16.9626C0 7.60954 7.60952 0 16.9626 0H17.0374C26.3905 0 34 7.60954 34 16.9626V17.0374C34 26.3905 26.3905 34 17.0374 34ZM16.9626 1.15087C8.24364 1.15087 1.15086 8.24366 1.15086 16.9626V17.0374C1.15086 25.7564 8.24364 32.8491 16.9626 32.8491H17.0374C25.7564 32.8491 32.8491 25.7564 32.8491 17.0374V16.9626C32.8491 8.24366 25.7564 1.15087 17.0374 1.15087H16.9626Z" fill="#2F324A"/>
                      <path d="M19.2878 13.1879V16.7659H23.7141L23.0132 21.5857H19.2878V32.6904C18.5409 32.794 17.7768 32.8481 17.0011 32.8481C16.1057 32.8481 15.2264 32.7768 14.3702 32.6387V21.5857H10.2881V16.7659H14.3702V12.388C14.3702 9.67199 16.5718 7.46924 19.289 7.46924V7.47154C19.2971 7.47154 19.304 7.46924 19.312 7.46924H23.7152V11.6377H20.8381C19.983 11.6377 19.289 12.3316 19.289 13.1867L19.2878 13.1879Z" fill="#2F324A"/>
                      </svg>

                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        shareUrl
                      )}&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.31753 14.7093H5.29504V8.42092H7.31753V14.7093ZM6.37624 7.46482H6.36175C5.71448 7.46482 5.29536 6.98299 5.29536 6.37984C5.29536 5.76565 5.72551 5.29517 6.38727 5.29517C7.04904 5.29517 7.45398 5.76219 7.46848 6.37984C7.46816 6.98299 7.04904 7.46482 6.37624 7.46482ZM14.7092 14.7093H12.6867V11.2709C12.6867 10.4472 12.3923 9.88437 11.6606 9.88437C11.1016 9.88437 10.7707 10.2625 10.6235 10.6309C10.5684 10.7633 10.5536 10.9435 10.5536 11.1275V14.7093H8.53108V8.42092H10.5536V9.29603C10.8479 8.87691 11.3077 8.27375 12.3775 8.27375C13.7052 8.27375 14.7095 9.14886 14.7095 11.0355L14.7092 14.7093Z" fill="#2F324A"/>
                      <path d="M2.08319 9.99992C2.08319 6.26797 2.08319 4.40199 3.24256 3.24262C4.40193 2.08325 6.26791 2.08325 9.99986 2.08325C13.7318 2.08325 15.5978 2.08325 16.7572 3.24262C17.9165 4.40199 17.9165 6.26797 17.9165 9.99992C17.9165 13.7318 17.9165 15.5978 16.7572 16.7573C15.5978 17.9166 13.7318 17.9166 9.99986 17.9166C6.26791 17.9166 4.40193 17.9166 3.24256 16.7573C2.08319 15.5978 2.08319 13.7318 2.08319 9.99992Z" stroke="#2F324A" stroke-linejoin="round"/>
                      </svg>

                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0374 34H16.9626C7.60952 34 0 26.3905 0 17.0374V16.9626C0 7.60951 7.60952 0 16.9626 0H17.0374C26.3905 0 34 7.60951 34 16.9626V17.0374C34 26.3905 26.3905 34 17.0374 34ZM16.9626 1.15087C8.24365 1.15087 1.15087 8.24363 1.15087 16.9626V17.0374C1.15087 25.7564 8.24365 32.8491 16.9626 32.8491H17.0374C25.7564 32.8491 32.8491 25.7564 32.8491 17.0374V16.9626C32.8491 8.24363 25.7564 1.15087 17.0374 1.15087H16.9626Z" fill="#2F324A"/>
                      <path d="M7.23664 8.01221L14.8116 18.1398L7.18945 26.3743H8.9054L15.5793 19.1653L20.9711 26.3743H26.8094L18.8086 15.677L25.9037 8.01221H24.1877L18.0421 14.6516L13.0761 8.01221H7.23778H7.23664ZM9.75933 9.27588H12.4409L24.2844 25.1106H21.6029L9.75933 9.27588Z" fill="#2F324A"/>
                      </svg>

                    </a>
                  </div>
              </div>
          </div>  

        </div>
      </div>

    
    </>
  );
}