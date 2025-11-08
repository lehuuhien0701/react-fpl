import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const WhoIWorkWith = ({ title, icon_box }: { title: string, icon_box: any[] }) => {
  return (
    <section className="bg-[#F9FAFB] py-20 md:py-25">
        <Container>
            <div className="mb-16 md:mb-20">
            <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] text-center font-inter font-bold text-secondary">
                {title}
            </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 gap-y-12 [&>*:last-child]:col-span-2 [&>*:last-child]:md:col-span-1 [&>*:last-child]:mx-auto">
                {icon_box && icon_box.map((item) => (
                <div key={item.id || item.title} className="flex flex-col items-center text-center">
                    <div className="mb-7 p-5 w-[76px] h-[76px] flex items-center bg-white shadow-[0px_10px_10px_-5px_rgba(208,191,172,0.1)] rounded-full">  
                        {(item.icon?.url && 
                        <Image 
                          src={strapiImage(item.icon?.url)} 
                          alt={item.title || 'Icon'} 
                          width={48}
                          height={48}
                          className="w-12 h-12" 
                        />
                        )}
                    </div>
                    <p className="text-xl font-inter font-semibold text-secondary">{item.title}</p>
                </div>
                ))}
            </div>
        </Container>
    </section>
  );
};
