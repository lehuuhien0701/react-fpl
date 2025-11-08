/* eslint-disable react/no-unescaped-entities */

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "../container";
import Link from "next/link";
import Image from 'next/image'; 
import parse from "html-react-parser"; 
// Đảm bảo bạn đã import hoặc định nghĩa hàm này
import { strapiImage } from '@/lib/strapi/strapiImage'; 

// --- CÁC INTERFACE VÀ HÀM XỬ LÝ DỮ LIỆU/MEDIA ---

interface BlockContentItem {
  title?: string; 
  content?: string; 
  details?: string;
}

interface ContentPageServiceProps {
  icon?: any; 
  title?: string; 
  content?: { data?: { attributes?: BlockContentItem }[] } | BlockContentItem[] | any; // dùng field content (repeatable details-content-service)
  [key: string]: any; // Giữ lại cho các props Dynamic Zone khác (như __typename)
}

const toArray = (v: any): any[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (v?.data && Array.isArray(v.data)) return v.data;
  return [v];
};

const normalizeItem = (it: any) => {
  if (!it) return null;
  if (it.attributes && typeof it.attributes === "object") return it.attributes;
  if (it.data && it.data.attributes) return it.data.attributes;
  return it;
};

const extractMediaUrl = (media: any) => {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (media.data?.attributes?.url) return media.data.attributes.url;
  if (media.attributes?.url) return media.attributes.url;
  if (media.url) return media.url;
  return null;
};

const safeImageSrc = (media: any, fallback: string) => {
  try {
    const url = extractMediaUrl(media);
    if (!url) return fallback;
    const processedUrl = strapiImage(url); 
    return processedUrl || url || fallback;
  } catch {
    return fallback;
  }
};
// -----------------------------------------------------------------------------

// Khai báo lại, đã xóa CTAs và layout
export const ContentPageService = ({ icon, title, content }: ContentPageServiceProps) => {
  const rawDetails = toArray(content);
  const details: BlockContentItem[] = rawDetails.map(normalizeItem).filter(Boolean);
  const iconSrc = safeImageSrc(icon, "/icon1.svg");
  return (
    <div className='pb-14 py-20 md:py-[100px] min-h-[900px] relative'>
      <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20'>
        <div className='max-w-[840px] m-auto relative z-20'>
          <div className='box-question'>
            <div className='bg-white border-2 border-[#CDCCD8] shadow-[0px_20px_50px_-12px_rgba(0,0,0,0.08)] p-6 mb-4'>
              <div className='flex items-center'>
                <Image
                  className='mr-4'
                  alt={title || "Service Icon"}
                  src={iconSrc}
                  width={30}
                  height={30}
                  priority
                />
                <h3 className='font-medium text-xl leading-[30px] text-secondary relative w-full'>
                  {title ? parse(title) : "Tiêu đề dịch vụ"}
                </h3>
              </div>
              <div className='ct-services-details'>
                <div className='mt-5 border-2 border-[#EDECF6]'>
                  {/* LẶP QUA content (repeatable details-content-service) */}
                  {details.map((block, blockIdx) => (
                    <div
                      key={blockIdx}
                      className={`custom-h2 px-5 pt-5 ${blockIdx < details.length - 1 ? 'border-b-2 border-[#EDECF6]' : ''}`}
                    >
                      <div className="pb-5 opacity-80">
                        {block.details ? parse(block.details) : `[Contenu détaillé #${blockIdx + 1} vide]`}
                      </div>
                    </div>
                  ))}
                  {details.length === 0 && (
                    <div className='p-5 text-gray-400'>Il n'y a plus rien à faire avec ce lien.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div
          className="min-h-[332px] absolute z-10 left-0 right-0 bottom-0 overflow-hidden"
          style={{ backgroundImage: "url('/Vector3.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "bottom center", backgroundSize: "cover" }}
        >
        </div>
      </div>
    </div>
  );
};