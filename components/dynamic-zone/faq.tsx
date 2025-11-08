import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const FAQ = ({ heading, sub_heading, faqs, image }: { heading: string, sub_heading: string, faqs: any[], image: { url: string } }) => {
  return (
    <>
    <div id="faqs"></div>
    <section className="bg-secondary pt-20 md:pt-24"> 
      <Container className="pr-0 px-5 md:pr-0 md:px-0">
        <div className="flex flex-col md:flex-row">

          <div className="w-full hidden lg:block md:w-4/12 pr-0">
            {(image?.url &&
            <Image 
              src={strapiImage(image.url)} 
              alt="FAQ section" 
              width={500}
              height={800}
              className="w-full h-full object-cover"
            />
            )}
          </div>

          
          <div className="w-full lg:w-8/12 md:pl-10">
          
            <article className="px-0 md:px-0 lg:px-15 pb-15">
              <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-inter font-bold mb-5 text-primary">
                {heading}
              </h2>
              <p className="font-inter font-normal text-white text-base leading-relaxed">
                {sub_heading}
              </p>
            </article>

          
            <article className="bg-primary px-5 md:px-10 lg:px-15 pt-10 md:pt-15 h-[90%]">
              {(faqs && 
              <ul className="">
                {faqs.map((faq: { question: string, answer: string }, index: number) => (
                <li className={`${index === 0 ? '' : 'mt-4'} ${index === faqs.length - 1 ? '' : 'border-b border-[#BAA48D]'} pb-4`} key={index}>
                  <h3 className="font-inter font-bold text-xl mb-2 text-secondary">{index + 1}. {faq.question}</h3>
                  <p className="font-inter text-secondary text-base leading-relaxed opacity-60">
                    {faq.answer}
                  </p>
                </li>
                ))}
              </ul>
              )}
            </article>
          </div> 
        </div>

        <div className="hidden lg:block w-full bg-primary min-h-24">

          </div>
      </Container>
    </section>
    </>
  );
};