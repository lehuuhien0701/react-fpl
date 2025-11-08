import { Container } from "@/components/container";
import { HtmlParser } from "../html-parser";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const Introduction = ({ title, description, image }: { title: string, description: string, image: { url: string } }) => {
  return (
    <>
    <div id="about"></div>
    <Container className="my-25">
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
        <div className="w-full md:w-7/12 lg:w-1/3">
        {image?.url && (
          <Image 
            src={strapiImage(image.url)}
            alt="Marc Careri"
            width={400}
            height={600}
            className="rounded-[10px] w-full object-cover"
            priority
          />
        )}
        </div>
        <div className="w-full md:w-5/12 lg:w-2/3">
          <h3 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-bold mb-5 lg:mb-10 text-secondary">{title}</h3> 
          {description && (
          <p className="font-normal text-gray-500 leading-relaxed text-base">
            <HtmlParser html={description} />
          </p>
          )}
        </div>
      </div>
    </Container>
    </>
  );
};
