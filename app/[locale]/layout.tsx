import React from 'react';

import { Metadata } from 'next';
import { Inter, Barlow } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { FooterProvider } from '@/context/FooterContext';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { i18n } from '@/i18n.config'
import { CookieConsent } from '@/components/cookie-consent';
import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

const barlow = Barlow({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
    params,
}: {
    params: { locale: string; slug: string };
}): Promise<Metadata> {
    const pageData = await fetchContentType(
        'global',
        {
            filters: { locale: params.locale },
            populate: "seo.metaImage",
        },
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    return metadata;
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const currentLocale = locale || i18n.defaultLocale;

    const pageData = await fetchContentType('global', { 
        filters: { locale: currentLocale },
        populate: '*'
    }, true);

    // Fetch menu data from Strapi collection-type "menu"
    const menuData = await fetchContentTypeClient('menus', {
        filters: { locale: currentLocale },
        populate: '*'
    });

    const cookieTranslations = {
        title: pageData?.cookie_consent?.title || 'Cookies',
        description: pageData?.cookie_consent?.description || 'We use cookies to improve your experience.',
        accept: pageData?.cookie_consent?.accept_button || 'Accept',
        decline: pageData?.cookie_consent?.decline_button || 'Decline'
    };

    if (!pageData) {
        console.error('Failed to fetch global data');
    }

    return (
        <html lang={currentLocale}>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            inter.className,
                            barlow.className,
                            "bg-white antialiased h-full w-full"
                        )}
                    >
                        <Navbar 
                            data={menuData?.data || {}}
                            logo={pageData?.logo || {}}
                            footer={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />

                        <FooterProvider data={pageData?.footer || {}}>
                            {children}
                        </FooterProvider>

                        <Footer 
                            data={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />

                        <CookieConsent translations={cookieTranslations} />
                    </body>
                </CartProvider>
            </ViewTransitions>
        </html>
    );
}