"use client"; 
import { strapiImage } from '@/lib/strapi/strapiImage';
import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import parse from "html-react-parser";

export const Services = ({
  ServiceDetails,
  serviceDetails,
  heading = "",
  sub_heading = "",
  // capture any other props that manager may pass
  ...rest
}: {
  ServiceDetails?: any;
  serviceDetails?: any;
  heading?: string;
  sub_heading?: string;
  [key: string]: any;
}) => {
  // Gather servicedetails (repeatable) from common locations
  //  - props.ServiceDetails / props.serviceDetails
  //  - rest.servicedetails (most likely when component used inside dynamic_zone)
  //  - props.attributes.servicedetails or rest.attributes.servicedetails
  const gatherServicedetails = () => {
    // helper to unwrap common shapes into array
    const toArray = (v: any): any[] => {
      if (!v) return [];
      if (Array.isArray(v)) return v;
      if (v?.data && Array.isArray(v.data)) return v.data;
      return [v];
    };

    // explicit props first
    if (ServiceDetails) return toArray(ServiceDetails);
    if (serviceDetails) return toArray(serviceDetails);

    // explicit common key on rest (servicedetails is the field shown in Strapi UI)
    if (rest?.servicedetails) return toArray(rest.servicedetails);
    if (rest?.serviceDetails) return toArray(rest.serviceDetails);
    if (rest?.service_details) return toArray(rest.service_details);

    // attributes container (e.g. props.attributes.servicedetails)
    if ((rest as any).attributes) {
      const a = (rest as any).attributes;
      if (a.servicedetails) return toArray(a.servicedetails);
      if (a.serviceDetails) return toArray(a.serviceDetails);
      if (a.service_details) return toArray(a.service_details);
    }

    // fallback: search any array in rest that looks like service-details
    for (const k of Object.keys(rest || {})) {
      const v = (rest as any)[k];
      if (Array.isArray(v) && v.length) {
        const first = v[0];
        const looksLike = first?.__component?.toLowerCase?.().includes?.("service") ||
          first?.attributes?.title || first?.title || first?.details || first?.attributes?.details;
        if (looksLike) return toArray(v);
      }
    }
    return [];
  };

  const detailsRaw = gatherServicedetails();

  // normalize each item: unwrap attributes/data if needed
  const normalizeItem = (it: any) => {
    if (!it) return null;
    if (it.attributes && typeof it.attributes === "object") return it.attributes;
    if (it.data && it.data.attributes) return it.data.attributes;
    return it;
  };

  const details: any[] = useMemo(() => {
    return detailsRaw.map(normalizeItem).filter(Boolean);
  }, [detailsRaw]);

  // helper: extract a human-readable HTML/text string from many possible Strapi shapes
  const extractString = (v: any): string => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    if (Array.isArray(v)) return v.map((x) => extractString(x)).filter(Boolean).join("\n");
    if (v.attributes) return extractString(v.attributes.details ?? v.attributes.detail ?? v.attributes.text ?? v.attributes.title ?? v.attributes.body ?? v.attributes);
    if (v.data && v.data.attributes) return extractString(v.data.attributes.details ?? v.data.attributes.detail ?? v.data.attributes.text ?? v.data.attributes.title ?? v.data.attributes.body ?? v.data.attributes);
    if (v?.html && typeof v.html === "string") return v.html;
    if (v?.content && typeof v.content === "string") return v.content;
    if (v?.text) return extractString(v.text);
    if (v?.detail) return extractString(v.detail);
    if (v?.title) return extractString(v.title);
    try { return JSON.stringify(v); } catch { return String(v); }
  };

  const [open, setOpen] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!details || !Array.isArray(details)) return;
    details.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      el.style.overflow = 'hidden';
      el.style.transition = 'height 220ms ease, opacity 200ms ease';
      if (open === idx) {
        const target = el.scrollHeight;
        el.style.height = target + 'px';
        el.style.opacity = '1';
        const t = setTimeout(() => { el.style.height = ''; }, 240);
        return () => clearTimeout(t);
      } else {
        el.style.height = el.scrollHeight + 'px';
        el.offsetHeight;
        el.style.height = '0px';
        el.style.opacity = '0';
      }
    });
  }, [open, details]);

  if (!details || !Array.isArray(details) || details.length === 0) {
    return <div className="text-center py-10 text-gray-400">No service details found.</div>;
  }


// helper: extract url from common Strapi media shapes
const extractMediaUrl = (media: any) => {
  if (!media) return null;
  if (typeof media === "string") return media;
  
  // 1. Strapi v4 Media đơn (Phổ biến nhất cho trường Icon)
  if (media.data?.attributes?.url) return media.data.attributes.url;

  // 2. Media object trực tiếp
  if (media.attributes?.url) return media.attributes.url;
  
  // 3. Kiểm tra Array Media
  if (Array.isArray(media.data) && media.data[0]?.attributes?.url) return media.data[0].attributes.url;
  
  // 4. URL trực tiếp hoặc thumbnail
  if (media.url) return media.url;
  if (media.formats?.thumbnail?.url) return media.formats.thumbnail.url;
  if (media.attributes?.formats?.thumbnail?.url) return media.attributes.formats.thumbnail.url;

  return null;
};

// helper: trả về URL đã được xử lý (tuyệt đối) hoặc URL gốc/fallback.
const safeImageSrc = (media: any, fallback: string) => {
  try {
    const url = extractMediaUrl(media);
    if (!url) return fallback;
    
    // 1. Cố gắng xử lý URL bằng strapiImage (thêm domain)
    const processedUrl = strapiImage(url); 
    
    // 2. Nếu processedUrl có giá trị, dùng nó. Nếu không, dùng URL gốc. 
    // Nếu cả hai đều thất bại, dùng fallback.
    // Điều này đảm bảo nếu strapiImage lỗi, ta vẫn có URL tương đối (url) để thử.
    return processedUrl || url || fallback;
  } catch (e) {
    // console.error("Lỗi xử lý ảnh icon:", e); // Bật dòng này để debug
    return fallback;
  }
};

  return (
    <div className='pb-14 py-20 md:py-[100px] min-h-[900px] relative'>
      <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 z-50 relative'>
        <div className='max-w-[840px] m-auto relative z-[9]'>
          <div className='box-question'>
            {/* Lặp qua servicedetails (dynamic-zone.service-details) trực tiếp, không lồng qua question */}
            {details.map((service: any, idx: number) => {
              const serviceObj = service?.attributes ?? service;
              return (
                <div key={idx} className='bg-white border-2 border-[#CDCCD8] shadow-[0px_20px_50px_-12px_rgba(0,0,0,0.08)] p-6 mb-4'>
                  <div className='flex items-center'>
                    <Image
                      className='mr-4'
                      alt={serviceObj.title || "Service Icon"}
                      src={safeImageSrc(serviceObj.icon, `/service-icon${idx + 1}.svg`)}
                      width={30}
                      height={30}
                      priority
                    />
                    <h3
                      onClick={() => setOpen(open === idx ? null : idx)}
                      className='font-medium text-xl leading-[30px] text-secondary relative pr-10 w-full cursor-pointer'
                    >
                      {extractString(serviceObj.title) ? parse(extractString(serviceObj.title)) : null}
                      <span className={`absolute top-0 right-0 w-[30px] h-[30px] rounded-full flex items-center justify-center ${open === idx ? 'bg-[#2F324A]' : 'bg-[#ffffff] shadow-[6px_10px_20px_rgba(0,0,0,0.12)]'}`}>
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                          style={{ transform: open === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms ease' }}
                        >
                          <path
                            d="M1 2L6 7L11 2"
                            stroke={open === idx ? "#FFFFFF" : "#2F324A"}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </h3>
                  </div>
                  <div
                    ref={el => { contentRefs.current[idx] = el; }}
                    className=''
                    style={{ height: open === idx ? undefined : 0, opacity: open === idx ? 1 : 0 }}
                  >
                    {open === idx && (
                      <div className='mt-5 ct-services-details'>
                        {extractString(serviceObj.details) ? (
                          <div>{parse(extractString(serviceObj.details))}</div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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