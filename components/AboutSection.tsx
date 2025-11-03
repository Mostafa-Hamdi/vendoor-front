"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";
import { usePathname } from "next/navigation";
type Props = {};

const AboutSection = ({ aboutData, sectionID }: any) => {
  const pathname = usePathname();
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);
  const mm = gsap.matchMedia();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);
    mm.add("(max-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
          },
        });

        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about .grid",
            start: "top 90%",
          },
        });

        // Text animation (heading)
        gsap.to(".about h2", {
          text: aboutData?.heading,
          ease: "power1.in",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2,
        });

        // Description fade-in
        tl.from(".about .container > p", {
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.out",
        });

        // Grid content animations
        gridTl.from(".about .image", {
          opacity: 0,
          x: pathname.includes("/ar") ? "-100%" : "100%",
          duration: 1,
          ease: "power2.out",
        });
        const points = gsap.utils.toArray(".about .point");

        points.forEach((point: any) => {
          gsap.from(point, {
            scrollTrigger: {
              trigger: point,
              start: "top 85%", // adjust as needed
              toggleActions: "play none none none", // optional: play once
            },
            opacity: 0,
            x: pathname.includes("/ar") ? "100%" : "-100%",
            duration: 1,
            ease: "power2.out",
          });
        });

        ScrollTrigger.refresh();
      }, ".about");

      return () => ctx.revert();
    });
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
          },
        });

        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about .grid",
            start: "top 90%",
          },
        });

        // Text animation (heading)
        gsap.to(".about h2", {
          text: aboutData?.heading,
          ease: "power1.in",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2,
        });

        // Description fade-in
        tl.from(".about .container > p", {
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.out",
        });

        // Grid content animations
        gridTl
          .from(".content", {
            opacity: 0,
            x: pathname.includes("/ar") ? "100%" : "-100%",
            duration: 1,
            ease: "power2.out",
          })
          .from(
            ".about .image",
            {
              opacity: 0,
              x: pathname.includes("/ar") ? "-100%" : "100%",
              duration: 1,
              ease: "power2.out",
            },
            "<",
          );

        ScrollTrigger.refresh();
      }, ".about");

      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [pathname, aboutData]);

  return (
    <section className="about py-8 px-4 lg:px-0" id={sectionID || "about"}>
      <div className="container mx-auto">
        <h2 className="h-[43px] text-[var(--dark-color)] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] mb-[18px] text-center font-bold">
          {/* {aboutData?.heading} */}
        </h2>
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[var(--gray-color)] text-center max-w-full lg:max-w-[1141px] mx-auto mb-6 lg:mb-8 px-4 lg:px-0">
          {aboutData?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.42fr]  xl:grid-cols-[554px_645px] justify-center lg:justify-between items-center gap-8 lg:gap-0">
          {/* Content Section */}
          <div className="content order-2 lg:order-1">
            {aboutData?.points?.map((point: any) => (
              <div
                className="point mb-8 lg:mb-[50px] text-center md:text-left"
                key={point?.id}
              >
                <h3 className="text-[var(--orange-color)] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] !leading-[28px] sm:!leading-[32px] md:!leading-[36px] lg:!leading-[40px] font-bold mb-3 lg:mb-4 capitalize">
                  {point?.title}
                </h3>
                <p className="text-[var(--gray-color)] text-[16px] lg:text-lg !leading-[24px] sm:!leading-[26px] lg:!leading-[30px] max-w-[600px] lg:max-w-none mx-auto lg:mx-0">
                  {point?.paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="image rounded-[16px] overflow-hidden order-1 lg:order-2 max-w-[400px] sm:max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
            <Image
              src={`${aboutData?.image?.url}`}
              alt=""
              width={645}
              height={514}
              className="w-full h-auto lg:max-h-[514px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
