"use client";
import Image from 'next/image';
import React from "react";
import parse from "html-react-parser"; 
import { HtmlParser } from "./html-parser";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { usePathname } from "next/navigation";  
import { BookingForm } from "./booking-form";
import Link from "next/link";

export const Footer = ({ data, locale }: { data: any, locale: string }) => {
  const pathname = usePathname(); // Get the current URL path
  const isThankYouPage = pathname?.includes('/thank-you'); // Check if the current page is "thank-you"

  // Do not render the footer if it's the "thank-you" page
  if (isThankYouPage) {
    return null;
  }

  const copyright = data?.copyright ?? "Copyright © Fiduciaire Premier Luxembourg S.A. 2025 | All rights reserved |";
  const privacy_policy_text = data?.privacy_policy_text ?? "Privacy Policy";
  const privacy_policy_link = data?.privacy_policy_link ?? "/privacy-policy";
  const cookie_policy_text = data?.cookie_policy_text ?? "Cookie Policy";
  const cookie_policy_link = data?.cookie_policy_link ?? "/cookie-policy";
  const designed_developed_by = data?.designed_developed_by ?? "Designed By";

  return (
    <footer id="site-footer" className="bg-[linear-gradient(180deg,#383842_0%,#19191D_100%)]">
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 pt-20">
        <div className="border-b border-[#9CA3AF] mb-10 pb-20">
          <div className="md:flex md:gap-10 lg:gap-20">
            <div className="mb-10 md:mb-0 md:max-w-[482px] w-full"> 
              <h2 className="mb-4 font-normal text-2xl leading-[34px] text-secondary">{data?.contact_title || "Contact Us"}</h2>
              <div className="font-normal text-lg leading-6 text-[#CDCCD8] mb-8">
                <HtmlParser html={data?.contact_description || ""} />
              </div>
              <div>
              {data.phone && (
              <a href={`tel:${data?.phone}`} className="text-[#CDCCD8] block mb-6 mr-5">
                <Image src="/footer-icon1.svg" alt="" width={20} height={20} className="inline-block mr-3" />
                {data?.phone}
              </a>
              )}

              {data.phone2 && (
              <a href={`tel:${data?.phone2}`} className="text-[#CDCCD8] block mb-6">
                <Image src="/footer-icon2.svg" alt="" width={20} height={20} className="inline-block mr-3" />
                {data?.phone2}
              </a>
              )}

              {data.email && (
              <a href={`mailto:${data?.email}`} className="text-[#CDCCD8] block mb-6">
                <Image src="/footer-icon3.svg" alt="" width={20} height={20} className="inline-block mr-3" />
                {data?.email}
              </a>
              )}

              {data.address && (
              <span className="text-[#CDCCD8] flex items-center mb-6">
                <Image src="/footer-icon4.svg" alt="" width={20} height={20} className="inline-block mr-3" />
                <span>
                  <HtmlParser html={data.address} />
                </span>
              </span>
              )}

              </div>
              <div>
              {Array.isArray(data.social) && data.social.length > 0 && (
                data.social.map((s: any, i: number) => {
                  const iconUrl = s.icon?.url ? strapiImage(s.icon.url) : undefined;
                  const link = s.link ?? s.url ?? "#";
                  return (
                    <a
                      key={`social-${i}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mr-3"
                    >
                      {iconUrl && (
                        <Image src={iconUrl} alt={s.icon?.name ?? `social-${i}`} width={20} height={20} />
                      )}
                    </a>
                  );
                })
              )}
              </div>
            </div>

            <div className='w-full'> 
              {/*  --- Booking form ---  */}
             <BookingForm data={data} />
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full pt-0 py-20">
          <div className="xl:flex items-center text-[#CDCCD8] justify-between">
            <div className='text-center xl:text-left'>
							<p>
                {parse(copyright)}{" "}
                <Link href={privacy_policy_link} className="cursor-pointer">
                  {privacy_policy_text}
                </Link>{" "}
                |{" "}
                <Link href={cookie_policy_link} className="cursor-pointer">
                  {cookie_policy_text}
                </Link>
              </p>
						</div>
						<div className='justify-center xl:justify-end flex items-center flex-wrap designed_developed_by'>
							<p className='flex items-center'>{parse(designed_developed_by)}</p>
						</div>
          </div>
        </div> 
      </div>
    </footer> 
  );
};