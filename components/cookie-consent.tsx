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
    <div className="fixed bottom-10 w-[370px] left-1/2 md:left-10 transform -translate-x-1/2 md:transform-none bg-secondary rounded-[10px] z-50 p-[30px] md:p-6 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-10">
        <div className="flex-1">
          <h3 className="text-[34px] font-bold text-primary mb-2">
            {translations.title}
          </h3>
          <p className="text-sm leading-5 text-white">
            {translations.description}
          </p>
        </div>
        <div className="flex gap-6 w-full">
          <a className="text-base w-full font-bold py-[10px] border border-primary text-primary text-center rounded-[40px] cursor-pointer" onClick={declineCookies}>
            {translations.decline}
          </a>
          <a className="text-base w-full font-bold py-[10px] bg-primary text-black text-center rounded-[40px] cursor-pointer" onClick={acceptCookies}>
            {translations.accept}
          </a>
        </div>
      </div>
    </div>
  );
};
