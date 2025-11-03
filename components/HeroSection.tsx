"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const HeroSection = ({ heroData, sectionID }: any) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Define all media-based animations
    mm.add("(max-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(".hero-section img", {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
          .from(".hero-section h1", {
            x: 200,
            opacity: 0,
            ease: "back",
            duration: 2,
          })
          .from(
            ".hero-section p",
            { x: -150, opacity: 0, ease: "back", duration: 1 },
            "<0.6",
          )
          .from(
            ".hero-section a",
            { scale: 0, opacity: 0, stagger: 0.3, duration: 0.7 },
            "<0.01",
          );
      }, sectionRef);

      return () => ctx.revert();
    });
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(".hero-section h1", {
          x: 200,
          opacity: 0,
          ease: "back",
          duration: 2,
        })
          .from(
            ".hero-section p",
            { x: -150, opacity: 0, ease: "back", duration: 1 },
            "<0.6",
          )
          .from(
            ".hero-section a",
            { scale: 0, opacity: 0, stagger: 0.3, duration: 0.7 },
            "<0.01",
          )
          .from(
            ".hero-section img",
            { scale: 0.8, opacity: 0, ease: "power2.out" },
            "<0.5",
          );
      }, sectionRef);

      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="hero-section pt-[76px] sm:pt-[92px] lg:pt-[108px] pb-[32px] px-4 lg:px-0"
      id={sectionID || "home"}
      ref={sectionRef}
    >
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        spaceBetween={20}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[60%_40%] items-center gap-6 lg:gap-6">
            {/* Content Section */}
            <div className="content order-2 lg:order-1 lg:text-left">
              <h1 className="text-[var(--gray-color)] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] font-bold mb-6 lg:mb-10 capitalize leading-tight max-w-[500px] lg:text-left">
                {heroData?.heading}
                <span className="text-[var(--orange-color)]">
                  {heroData?.coloredHeading}
                </span>
              </h1>
              <p className="text-[var(--gray-color)] text-[16px] sm:text-[18px] lg:text-[20px] mb-6 lg:mb-10 max-w-full lg:max-w-[543px] mx-auto lg:mx-0">
                {heroData?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-[22px] justify-center md:justify-start">
                {heroData?.buttons?.map((btn: any) => (
                  <Link
                    href={btn?.URL ?? "/"}
                    className={`${btn?.btnType}-btn text-center`}
                    key={btn?.id}
                  >
                    {btn?.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="image w-full rounded-[16px] overflow-hidden order-1 md:order-2 max-w-[400px] sm:max-w-[500px] md:max-w-none mx-auto lg:mx-0">
              <Image
                src={`${heroData?.image?.url}`}
                alt="Vendoor Platform Preview"
                width={561}
                height={457}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
