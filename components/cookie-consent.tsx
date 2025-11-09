"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface CookieConsentProps {
  translations: {
    title: string;
    description: string;
    accept: string;
    decline: string;
  }
}

export const CookieConsent = ({ translations }: CookieConsentProps) => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowConsent(false);
  };

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      role="dialog"
      aria-label={translations.title || "Cookie consent"}
      className="fixed bottom-8 right-8 z-50 max-w-[400px] -translate-x-1/2 rounded-lg bg-white border border-gray-200 shadow-lg p-6"
    >
      <div className="">
        <div className="flex-1">
          <h3 className="text-2xl md:text-[28px] font-semibold text-[#2F324A] mb-4">
            {translations.title || "Protection of your Privacy"}
          </h3>

          <div className="">
            {/* If translations.description is plain text, show it first 
            {translations.description && (
              <p className="mb-4">{translations.description}</p>
            )}
              */}

            {/* Bulleted purposes as in image */}
            {translations.description && (
            <div className='details-cookie'>
              {translations.description}
            </div>
            )}
            
          </div>
        </div>

        <div className="flex flex-col md:items-end md:justify-between min-w-[220px]">
          <div className="flex gap-4 mt-2 md:mt-0 w-full">
            <button
              onClick={declineCookies}
              className="w-full md:[50%] px-6 py-[8px]  border border-[#2F324A] text-[#2F324A] bg-white hover:bg-gray-50 transition"
            >
              {translations.decline || "Refuse"}
            </button>

            <button
              onClick={acceptCookies}
              className="w-full md:w-[50%] px-6 py-[8px]  bg-[#2F324A] text-white shadow-sm hover:opacity-95 transition"
            >
              {translations.accept || "Accept All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
