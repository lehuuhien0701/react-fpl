import React from 'react';
import dynamic from 'next/dynamic';

interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
  locale: string;
}

const componentMapping: { [key: string]: any } = { 
  'dynamic-zone.thank-you-page': dynamic(() => import('./thank-you').then(mod => mod.ThankYouPage), { ssr: false }),
  'dynamic-zone.content-page-services': dynamic(() => import('./content-page-services').then(mod => mod.ContentPageService), { ssr: false }),
  'dynamic-zone.question': dynamic(() => import('./services').then(mod => mod.Services), { ssr: false }),
  'dynamic-zone.practice-areas': dynamic(() => import('./practice-areas').then(mod => mod.PracticeAreas), { ssr: false }),
  'dynamic-zone.hero': dynamic(() => import('./hero').then(mod => mod.Hero), { ssr: false }),
  //'dynamic-zone.text-content': dynamic(() => import('./text-content').then(mod => mod.TextContent), { ssr: false }),
  //'dynamic-zone.reviews': dynamic(() => import('./reviews').then(mod => mod.Reviews), { ssr: false }),
  //'dynamic-zone.two-column-intro': dynamic(() => import('./two-column-intro').then(mod => mod.TwoColumnIntro), { ssr: false }),
  'dynamic-zone.blog': dynamic(() => import('./blog').then(mod => mod.Blog), { ssr: false }),
  //'dynamic-zone.introduction': dynamic(() => import('./introduction').then(mod => mod.Introduction), { ssr: false }),
  //'dynamic-zone.feature-highlight': dynamic(() => import('./feature-highlight').then(mod => mod.FeatureHighlight), { ssr: false }),
  //'dynamic-zone.portfolio': dynamic(() => import('./portfolio').then(mod => mod.Portfolio), { ssr: false }),
  //'dynamic-zone.images-and-text-section': dynamic(() => import('./images-and-text-section').then(mod => mod.ImagesAndTextSection), { ssr: false }),
  //'dynamic-zone.video-and-text-section': dynamic(() => import('./video-and-text-section').then(mod => mod.VideoAndTextSection), { ssr: false }),
  //'dynamic-zone.who-i-work-with': dynamic(() => import('./who-i-work-with').then(mod => mod.WhoIWorkWith), { ssr: false }),
  //'dynamic-zone.booking': dynamic(() => import('./booking').then(mod => mod.Booking), { ssr: false }),
  //'dynamic-zone.features': dynamic(() => import('./features').then(mod => mod.Features), { ssr: false }),
  //'dynamic-zone.testimonials': dynamic(() => import('./testimonials').then(mod => mod.Testimonials), { ssr: false }),
  //'dynamic-zone.brands': dynamic(() => import('./brands').then(mod => mod.Brands), { ssr: false }),
  //'dynamic-zone.pricing': dynamic(() => import('./pricing').then(mod => mod.Pricing), { ssr: false }),
  //'dynamic-zone.launches': dynamic(() => import('./launches').then(mod => mod.Launches), { ssr: false }),
 // 'dynamic-zone.cta': dynamic(() => import('./cta').then(mod => mod.CTA), { ssr: false }),
  //'dynamic-zone.form-next-to-section': dynamic(() => import('./form-next-to-section').then(mod => mod.FormNextToSection), { ssr: false }),
  //'dynamic-zone.faq': dynamic(() => import('./faq').then(mod => mod.FAQ), { ssr: false }),
  //'dynamic-zone.related-products': dynamic(() => import('./related-products').then(mod => mod.RelatedProducts), { ssr: false }),
  //'dynamic-zone.related-articles': dynamic(() => import('./related-articles').then(mod => mod.RelatedArticles), { ssr: false })
}

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone, locale }) => {
  return (
    <div>
      {
        dynamicZone.map((componentData) => {
          const Component = componentMapping[componentData.__component];
          if (!Component) {
            console.warn(`No component found for: ${componentData.__component}`);
            return null;
          }
          return <Component key={componentData.id} {...componentData} locale={locale} />;
        })}
    </div>
  );
};

export default DynamicZoneManager;
