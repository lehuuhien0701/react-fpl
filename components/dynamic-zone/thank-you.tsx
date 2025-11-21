import React from "react";
import Link from "next/link";
import { i18n } from "@/i18n.config";

export const ThankYouPage = ({
  title,
  message,
  button_text,
  locale,
}: {
  title?: string;
  message?: string;
  button_text?: string;
  locale?: string;
}) => {
  return (
    <>
        <div className='pb-14 py-20 md:py-[100px] min-h-[900px] relative bg-[linear-gradient(180deg,_#383842_0%,_#19191D_100%)]'>
            <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20'>
                <div className='max-w-[840px] m-auto relative z-[9999]'>
                    <div className='box-question text-center'>
                        <h1 className="italic-normal font-medium text-[70px] leading-[70px] text-secondary mb-6">{title || "Thank you !"}</h1>
                        <p className="italic-normal font-normal text-sm text-center leading-[26px] text-[#CDCCD8] mb-14">
                            {message || "We have received your message and we will contact you soon !"}
                        </p>
                        
                        <Link
                          href={locale === i18n.defaultLocale ? "/" : `/${locale}`}
                          className="inline-block leading-[44px] w-full sm:w-auto text-sm font-medium text-primary bg-secondary h-11 px-10 hover:bg-white transition duration-200"
                        >
                          {button_text || "Back to home"}
                        </Link>
                    </div>
                </div>
                <div className=''>
                <div 
                    className="min-h-[332px] absolute z-10 left-0 right-0 bottom-0 overflow-hidden" 
                    style={{ backgroundImage: "url('/Vector3-black.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "bottom center", backgroundSize: "cover" }}
                > 
                </div>
                </div> 
            </div>
        </div>
    </>



  );
};
