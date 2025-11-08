import { Container } from "@/components/container";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const TwoColumnIntro = ({ Heading, Content }: { Heading: string, Content: any }) => {
  return (
    <Container className="flex flex-col md:flex-row items-center justify-between mt-25 mb-20 gap-10 lg:gap-25">
      <h2 className="font-bold text-[34px] md:text-5xl leading-snug text-secondary md:w-1/2 text-center md:text-left">
        {Heading}
      </h2>
      <div className="intro text-base text-gray-500 md:w-1/2 text-center md:text-left"> 
        <BlocksRenderer content={Content} />
      </div>
    </Container>
  );
};
