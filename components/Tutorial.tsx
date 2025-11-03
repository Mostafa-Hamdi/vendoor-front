"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { usePathname } from "next/navigation";

export default function TutorialPreview({ tutorialData }: any) {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const ctx = gsap.context(() => {
      const isArabic = pathname?.includes("/ar"); // Detect RTL
      const directionMultiplier = isArabic ? 1 : -1;

      gsap.to(".tutorials h2", {
        text: `${tutorialData?.title}`,
        ease: "power1.inOut",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.2,
      });

      gsap.from(".tutorials .container > p", {
        scrollTrigger: {
          trigger: ".tutorials",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: "power2.out",
      });

      gsap.from(".tutorials .swiper-slide", {
        scrollTrigger: {
          trigger: ".tutorials .videos",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0,
        x: directionMultiplier * 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [pathname, tutorialData]);

  return (
    <section
      className="tutorials py-8 bg-white "
      id="tutorial"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <h2 className="min-h-[43px] text-gray-900 text-4xl text-center font-bold mb-4">
          {/* {tutorialData?.title || "aa"} */}
        </h2>
        <p className="text-gray-600 text-xl text-center mb-10">
          {tutorialData?.subtitle}
        </p>
      </div>

      <div className="videos relative ">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          loop={true}
          loopAdditionalSlides={2}
          spaceBetween={25}
          navigation={{
            prevEl: ".custom-prev-btn",
            nextEl: ".custom-next-btn",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="tutorial-swiper"
        >
          {tutorialData?.videoSource?.map((video: any) => (
            <SwiperSlide key={video?.id}>
              <div className="slide-content px-2">
                <div className="relative rounded-2xl overflow-hidden  hover:shadow-xl transition-shadow duration-300 bg-gray-100">
                  <iframe
                    className="w-full aspect-video h-[250px]"
                    src={video?.link}
                    title={`YouTube video player ${video?.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="custom-prev-btn absolute left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#FF7A1D] rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="arrow-left"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className="custom-next-btn absolute right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#FF7A1D] rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="arrow-right"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .tutorial-swiper .swiper-slide {
          height: auto;
        }

        .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
