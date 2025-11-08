import { Container } from "@/components/container";
import { HtmlParser } from "../html-parser";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const FeatureHighlight = ({ title, description, bottom_image, right_image, right_bottom_image }: { title: string, description: string, bottom_image: { url: string }, right_image: { url: string }, right_bottom_image: { url: string } }) => {
  return (
    <Container className="mt-25 mb-20 lg:!pr-14">
       <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 lg:gap-32">
        
        <div className="mt-[35px] md:mt-0 flex flex-col justify-between"> 
          <div className="sm:mt-0 lg:mt-20">
            <h3 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-bold lg:mb-10  text-secondary">
              {title}
            </h3>
            {description && (
            <p className="mt-6 md:mt-10 font-normal text-gray-500 leading-relaxed text-base">
              <HtmlParser html={description} />
            </p>
            )}
          </div>
          <div className="aspect-video mt-10 lg:mt-25 hidden lg:block">
            {bottom_image?.url && (
              <Image
                src={strapiImage(bottom_image.url)} 
                alt="Modern interior"
                width={800}
                height={294}
                className="w-[90%] h-[294px] object-cover rounded-[10px]"
              />
            )}
          </div>
        </div>

        <div className="relative pb-0 lg:pb-0 mt-0 lg:mt-[-34px]">
          <div className="aspect-[4/3] w-full">
            {right_image?.url && (
              <Image
                src={strapiImage(right_image.url)}
                alt="Luxury interior"
                width={1024}
                height={690}
                className="w-full h-[400px] lg:h-[690px] object-cover rounded-[10px]"
                priority
              />
            )}
          </div>
          <div className="absolute right-[0px] top-[64%] bottom-auto w-full left-[0px] rounded-[10px]">
            {right_bottom_image?.url && (
              <Image
                src={strapiImage(right_bottom_image.url)}
                alt="Detail shot"
                width={285}
                height={294}
                className="w-[249px] h-[182px] m-auto lg:ml-[-90px] lg:w-[285px] lg:h-[294px] object-cover rounded-[10px]"
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
