"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const CallToActionSection = ({ data }: any) => {
  const pathname = usePathname();

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const ctx = gsap.context(() => {
      const h2 = sectionRef.current?.querySelector("h2");
      const p = sectionRef.current?.querySelector("p");
      const a = sectionRef.current?.querySelector("a");

      if (!h2) return;

      const splitText = new SplitText(h2, {
        type: pathname.includes("/ar") ? "words" : "chars",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          // markers: true,
        },
      });

      tl.from(pathname.includes("/ar") ? splitText.words : splitText.chars, {
        y: 50,
        opacity: 0,
        ease: "back(2)",
        stagger: 0.05,
      });

      if (p) {
        tl.fromTo(
          p,
          {
            opacity: 0,
            rotateX: 90,
            transformOrigin: "top center",
          },
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "<0.5",
        );
      }

      if (a) {
        tl.fromTo(
          a,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "elastic",
            duration: 0.3,
          },
          "<0.3",
        );
      }
    }, sectionRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname, data]);

  return (
    <section
      ref={sectionRef}
      className="call-to-action py-8 sm:py-12 md:py-16 lg:py-[63px] bg-[image:var(--radial-graient)] px-4 lg:px-0"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-[var(--white-color)] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[110%] sm:leading-[105%] lg:leading-[100%] tracking-[0] mb-4 lg:mb-5 max-w-[840px] mx-auto">
          {data?.heading}
        </h2>
        <p className="text-[var(--light-grey-color)] text-[16px] sm:text-[18px] lg:text-[20px] leading-[120%] sm:leading-[110%] lg:leading-[100%] tracking-[0] mb-6 lg:mb-8 max-w-[600px] mx-auto">
          {data?.description}
        </p>
        <Link
          href={`${data?.button?.URL}`}
          className={`${data?.button?.btnType}-btn inline-block transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg`}
        >
          {data?.button?.label}
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
