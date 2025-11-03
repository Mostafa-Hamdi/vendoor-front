"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import { usePathname } from "next/navigation";

const FaqSection = ({ faqData, sectionID }: any) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // GSAP animation setup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".faq",
          start: "top 80%",
        },
      });
      const itemsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".faq .accordion",
          start: "top 80%",
        },
      });

      gsap.to(".faq h2", {
        text: `${faqData?.heading}`,
        ease: "power1.in",
        duration: 2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.2,
      });

      tl.from(".faq .container > p", {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: "power2.out",
      });
      itemsTl.fromTo(
        ".faq .item",
        {
          opacity: 0,
          // scaleY: 0,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          // scaleY: 1,
          duration: 2,
          stagger: 0.2,
          ease: "power2.out",
        },
      );
    }, sectionRef);

    // Accordion logic
    const items = sectionRef.current?.querySelectorAll(".item") || [];
    const handleClick = (item: Element) => (e: Event) => {
      e.stopPropagation();
      items.forEach((el) => el.classList.remove("open"));
      item.classList.toggle("open");
    };

    items.forEach((item) => {
      const title = item.querySelector(".title");
      if (title) {
        title.addEventListener("click", handleClick(item));
      }
    });

    // Cleanup
    return () => {
      ctx.revert(); // Clean GSAP context

      items.forEach((item) => {
        const title = item.querySelector(".title");
        if (title) {
          title.replaceWith(title.cloneNode(true)); // remove all listeners
        }
      });
    };
  }, [pathname, faqData]);

  return (
    <section
      className="faq py-6 sm:py-7 lg:py-8  px-4 lg:px-0"
      id={sectionID || "faq"}
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <h2 className="min-h-[45px] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-[var(--dark-color)] font-bold mb-4 lg:mb-[18px] text-center">
          {/* Animated by GSAP */}
        </h2>
        <p className="text-[var(--gray-color)] text-[16px] sm:text-[18px] lg:text-[20px] mb-6 lg:mb-8 text-center max-w-[800px] mx-auto">
          {faqData?.description}
        </p>
        <div className="accordion px-0 sm:px-4 md:px-8 lg:px-[85px]">
          {faqData?.questions?.map((item: any) => (
            <div
              className="item border border-gray-200 rounded-lg mb-3 lg:mb-4 bg-white hover:shadow-md transition-all duration-300"
              key={item?.id}
            >
              <div className="title flex justify-between items-center p-4 lg:p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[var(--dark-color)] pr-4 leading-[1.4]">
                  {item?.ques}
                </span>
                <span className="icon text-[20px] lg:text-[24px] font-bold text-[var(--orange-color)] flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center transition-transform duration-300">
                  +
                </span>
              </div>
              <div className="content px-4 pb-4 lg:px-5 lg:pb-5 text-[var(--gray-color)] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.5] lg:leading-[1.6] hidden">
                {item?.response}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .item.open .content {
          display: block;
          animation: slideDown 0.3s ease-in-out;
        }

        .item.open .icon {
          transform: rotate(45deg);
        }

        .item .icon {
          transition: transform 0.3s ease-in-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }

        @media (min-width: 1024px) {
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
              padding-top: 0;
              padding-bottom: 0;
            }
            to {
              opacity: 1;
              max-height: 200px;
              padding-top: 1.25rem;
              padding-bottom: 1.25rem;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default FaqSection;
