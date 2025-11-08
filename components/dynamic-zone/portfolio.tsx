"use client";
import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';
import Slider from "react-slick";
import { Button } from "@/components/elements/button";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Portfolio = ({ Slider_Item }: { Slider_Item: any[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{url: string} | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  return (
    <>
    <div id="portfolio"></div>
    <section className="bg-secondary text-white relative">
        <Container className="py-20 md:pt-32 pb-20 px-5 md:px-10 lg:px-24 relative">
          <div className="absolute left-0 top-0 max-w-[485px] w-full h-[167px] md:h-[167px] bg-cover bg-center bg-no-repeat z-1"
            style={{ backgroundImage: "url('/images/bg-nc03.svg')" }}
          ></div>

          <Slider className="relative z-10" ref={sliderRef} {...settings}>
            {Slider_Item.map((item, index) => (
              <div key={index} className="slider-item">
                <article className="grid grid-cols-12 md:grid-cols-12 md:gap-[40px] relative z-10">
                  <div className="col-span-12 lg:col-span-4 flex items-center"> 
                    <div className="inner w-full grid grid-cols-12 lg:block pb-16 md:pb-0">
                      <div className="mb-10 md:mb-0 text-center md:text-left col-span-12 md:col-span-8 lg:col-span-12">
                        <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-inter font-bold text-primary">
                          {item.title}
                        </h2>
                        <p className="font-inter font-normal text-base text-white mt-8">{item.description}</p>
                      </div>
                      <div className="col-span-12 md:col-span-4 text-center md:text-right lg:text-left lg:col-span-12">
                        <Button as="a" href={item.button.URL} className="inline-block w-full sm:w-auto place-self-start bg-primary hover:bg-[#C4AD94] hover:text-white relative z-10 text-black text-base md:text-sm transition font-bold duration-200 rounded-[12px] px-11 py-4 items-center justify-center shadow-[0px_2px_4px_rgba(0,0,0,0.15)] mt-0 lg:mt-10">
                          {item.button.text}
                        </Button>
                        <a href={item.bottom_content_link} className="font-inter font-semibold text-base text-primary hover:text-white mt-4 transition duration-200 block">{item.bottom_content}</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-12 gap-[10px] mb-[10px]">
                      {item.image1?.url && (
                        <Image 
                          src={strapiImage(item.image1.url)}
                          alt="Portfolio image 1"
                          width={400}
                          height={208}
                          className="w-full col-span-4 h-[208px] object-cover"
                        />
                      )}
                      {item.image2?.url && (
                        <Image 
                          src={strapiImage(item.image2.url)}
                          alt="Portfolio image 2"
                          width={400}
                          height={208}
                          className="w-full col-span-4 h-[208px] object-cover"
                        />
                      )}
                      {item.image3?.url && (
                        <Image 
                          src={strapiImage(item.image3.url)}
                          alt="Portfolio image 3"
                          width={400}
                          height={208}
                          className="w-full col-span-4 h-[208px] object-cover"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-12 gap-[10px]"> 
                      {item.image4?.url && (
                        <Image 
                          src={strapiImage(item.image4.url)}
                          alt="Portfolio image 4"
                          width={500}
                          height={208}
                          className="w-full col-span-5 h-[208px] object-cover"
                        />
                      )}
                      {item.image5?.url && (
                        <Image 
                          src={strapiImage(item.image5.url)}
                          alt="Portfolio image 5"
                          width={300}
                          height={208}
                          className="w-full col-span-3 h-[208px] object-cover"
                        />
                      )}
                      {item.image6?.url && (
                        <Image 
                          src={strapiImage(item.image6.url)}
                          alt="Portfolio image 6"
                          width={400}
                          height={208}
                          className="w-full col-span-4 h-[208px] object-cover"
                        />
                      )}
                    </div>
                  </div>
                </article>  
                <article>
                  <div className="grid grid-cols-12 gap-[10px] mt-[10px]">
                      <div className="relative col-span-6 lg:col-span-5">
                        {item.image7?.url && (
                          <Image 
                            src={strapiImage(item.image7.url)}
                            alt="Portfolio image 7"
                            width={500}
                            height={208}
                            className="w-full h-[208px] object-cover"
                          />
                        )}
                      </div>
                      <div className="relative col-span-6 lg:col-span-3">
                        {item.image8?.url && (
                          <Image 
                            src={strapiImage(item.image8.url)}
                            alt="Portfolio image 8"
                            width={300}
                            height={208}
                            className="w-full h-[208px] object-cover"
                          />
                        )}
                      </div>
                      <div className="relative col-span-6 lg:col-span-2">
                        {item.image9?.url && (
                          <Image 
                            src={strapiImage(item.image9.url)}
                            alt="Portfolio image 9"
                            width={200}
                            height={208}
                            className="w-full h-[208px] object-cover"
                          />
                        )}
                      </div>
                      <div className="relative col-span-6 lg:col-span-2">
                        {item.image10?.url && (
                          <Image 
                            src={strapiImage(item.image10.url)}
                            alt="Portfolio image 10"
                            width={200}
                            height={208}
                            className="w-full h-[208px] object-cover"
                          />
                        )}
                      </div>
                  </div>
                  <div className="grid grid-cols-12 gap-[10px] mt-[10px]">
                    <div className="relative col-span-6">
                      {item.video1?.image?.url && (
                        <div className="relative">
                          <Image 
                            src={strapiImage(item.video1.image.url)}
                            alt="Video thumbnail 1"
                            width={600}
                            height={300}
                            className="w-full h-[300px] object-cover"
                          />
                          {item.video2?.video?.url && (
                          <div className="absolute inset-0 flex items-center justify-center cursor-pointer"
                               onClick={() => {setShowVideo1(true); setCurrentVideo({url: item.video1.video.url})}}>
                            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25.5" cy="25.8994" r="25" fill="white"/>
<path d="M35.6562 24.5894C36.6979 25.1716 36.6979 26.6272 35.6562 27.2094L21.5937 35.0695C20.5521 35.6517 19.25 34.9239 19.25 33.7595L19.25 18.0393C19.25 16.8749 20.5521 16.1471 21.5938 16.7293L35.6562 24.5894Z" fill="#1B2431"/>
</svg>

                          </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="relative col-span-6">
                      {item.video2?.image?.url && (
                        <div className="relative">
                          <Image 
                            src={strapiImage(item.video2.image.url)}
                            alt="Video thumbnail 2"
                            width={600}
                            height={300}
                            className="w-full h-[300px] object-cover"
                          />
                          {item.video2?.video?.url && (
                          <div className="absolute inset-0 flex items-center justify-center cursor-pointer"
                               onClick={() => {setShowVideo2(true); setCurrentVideo({url: item.video2.video.url})}}>
                            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25.5" cy="25.8994" r="25" fill="white"/>
<path d="M35.6562 24.5894C36.6979 25.1716 36.6979 26.6272 35.6562 27.2094L21.5937 35.0695C20.5521 35.6517 19.25 34.9239 19.25 33.7595L19.25 18.0393C19.25 16.8749 20.5521 16.1471 21.5938 16.7293L35.6562 24.5894Z" fill="#1B2431"/>
</svg>

                          </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>

          {/* Slider Navigation */}
          <div className="hero-dots flex gap-5 mt-12 items-center justify-center">
            {Slider_Item.map((_, index) => (
              <button
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`w-[27px] h-[27px] border rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'opacity-100 border-white/70' : 'opacity-80 border-transparent'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Video Popups */}
          {showVideo1 && currentVideo && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
                 onClick={() => setShowVideo1(false)}>
              <div className="relative w-full max-w-4xl aspect-video">
                <video className="w-full h-full" controls autoPlay>
                  <source src={strapiImage(currentVideo.url)} type="video/mp4" />
                </video>
                <button 
                  onClick={() => setShowVideo1(false)}
                  className="absolute top-[-40px] right-0 text-white text-xl p-2"
                >✕</button>
              </div>
            </div>
          )}

          {showVideo2 && currentVideo && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
                 onClick={() => setShowVideo2(false)}>
              <div className="relative w-full max-w-4xl aspect-video">
                <video className="w-full h-full" controls autoPlay>
                  <source src={strapiImage(currentVideo.url)} type="video/mp4" />
                </video>
                <button 
                  onClick={() => setShowVideo2(false)}
                  className="absolute top-[-40px] right-0 text-white text-xl p-2"
                >✕</button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
