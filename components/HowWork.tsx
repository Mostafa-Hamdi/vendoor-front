"use client";
import React, { useEffect, useRef } from "react";
import WorkStep from "./WorkStep";
import Register from "@/icons/Register";
import Cart from "@/icons/Cart";
import Share from "@/icons/Share";
import Earning from "@/icons/Earning";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import { usePathname } from "next/navigation";
const HowWork = ({ howData, sectionID }: any) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".how-work",
        start: "top 80%",
        // markers: true,
        // scrub: 0.2,
      },
    });
    const steps = gsap.timeline({
      scrollTrigger: {
        trigger: ".how-work .grid",
        start: "top 90%",
        // markers: true,
        // scrub: 0.2,
      },
    });
    mm.add("(max-width:768px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".how-work h2", {
          text: `${howData?.heading}`,
          ease: "power1.in",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2,
        });
        // ********************************
        tl.from(".how-work .container > p", {
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.out", // ✅ valid ease
        });
        const steps = gsap.utils.toArray(".how-work .step");
        steps.forEach((step: any) => {
          gsap.from(step, {
            opacity: 0,
            y: 200,
            scrollTrigger: {
              trigger: step,
              start: "top 95%",
            },
            duration: 1,
            ease: "power2.out",
          });
        });
        ScrollTrigger.refresh();
      }, sectionRef);
      return () => ctx.revert();
    });
    mm.add("(min-width:768px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".how-work h2", {
          text: `${howData?.heading}`,
          ease: "power1.in",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2,
        });
        // ********************************
        tl.from(".how-work .container > p", {
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.out", // ✅ valid ease
        });
        steps.from(".how-work .step", {
          opacity: 0,
          y: 200,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        });
        ScrollTrigger.refresh();
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [pathname, howData]);
  return (
    <section
      className="how-work py-6 sm:py-7 lg:py-8 px-4 lg:px-0"
      id={sectionID || "howitwork"}
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <h2 className="min-h-[43px] text-[var(--dark-color)] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-center font-bold mb-3 lg:mb-4">
          {/* {howData?.heading} */}
        </h2>
        <p className="text-[var(--gray-color)] text-[16px] sm:text-[18px] lg:text-[20px] text-center mb-8 sm:mb-10 md:mb-12 lg:mb-[56px] max-w-[800px] mx-auto">
          {howData?.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-[51px]">
          <WorkStep stepContent={howData?.stepOne}>
            <Register />
          </WorkStep>
          <WorkStep stepContent={howData?.stepTwo}>
            <Cart />
          </WorkStep>
          <WorkStep stepContent={howData?.stepThree}>
            <Share />
          </WorkStep>
          <WorkStep stepContent={howData?.stepFour}>
            <Earning />
          </WorkStep>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
