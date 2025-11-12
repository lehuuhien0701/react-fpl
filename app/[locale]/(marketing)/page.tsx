import { Metadata } from 'next';

import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from './ClientSlugHandler';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage({ params }: { params: { locale: string } }) {

  const pageData = await fetchContentType(
  'pages',
  {
    filters: {
      slug: "homepage",
      locale: params.locale,
    },
    populate: {
      localizations: { populate: "*" },
      dynamic_zone: {
        on: {
          "dynamic-zone.question": {
            populate: {
              servicedetails: {
                populate: ["icon"], // chỉ rõ cần populate trường icon (image)
              },
            },
          },
          // Các component khác trong dynamic_zone nếu cần
          "dynamic-zone.hero": { populate: "*" },
          "dynamic-zone.practice-areas": { populate: "*" },
          "dynamic-zone.blog": { populate: "*" },
        },
      },
    },
  },
  true
);

  const localizedSlugs = pageData?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = "";
      return acc;
    },
    { [params.locale]: "" }
  );

  return <>
    <ClientSlugHandler localizedSlugs={localizedSlugs} />
    <PageContent pageData={pageData} />
  </>;
}
