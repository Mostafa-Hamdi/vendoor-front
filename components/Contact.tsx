"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Contact = ({ contactData, sectionID }: any) => {
  const pathname = usePathname();
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const animation = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
      animation
        .from(".contact h2", {
          x: 200,
          opacity: 0,
          ease: "back",
          duration: 1,
        })
        .from(
          ".contact p",
          { x: -150, opacity: 0, ease: "back", duration: 1 },
          "<0.6",
        )
        .fromTo(
          ".contact a",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1 },
          "<0.01",
        )
        .fromTo(
          ".contact .form",
          {
            scaleY: 0,
            opacity: 0,
            ease: "power2.out",
            transformOrigin: "top center",
          },
          { scaleY: 1, opacity: 1 },
          "<0.2",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [pathname, contactData]);
  const initialValues = {
    fName: "",
    lName: "",
    phone: "",
    email: "",
    message: "",
  };

  const isArabic = pathname?.includes("/ar");

  const validationSchema = Yup.object({
    fName: Yup.string().required(
      isArabic ? "الاسم الأول مطلوب" : "First Name is required",
    ),
    lName: Yup.string().required(
      isArabic ? "اسم العائلة مطلوب" : "Last Name is required",
    ),
    phone: Yup.string().required(
      isArabic ? "رقم الهاتف مطلوب" : "Phone is required",
    ),
    email: Yup.string()
      .email(isArabic ? "بريد إلكتروني غير صالح" : "Invalid email")
      .required(isArabic ? "البريد الإلكتروني مطلوب" : "Email is required"),
    message: Yup.string().required(
      isArabic ? "الرسالة مطلوبة" : "Message is required",
    ),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await fetch(
        "https://appealing-bird-15faeb61dc.strapiapp.com/api/contact-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: values }),
        },
      );
      Swal.fire({
        title: pathname?.includes("/ar") ? "تم الإرسال!" : "Success!",
        text: pathname?.includes("/ar")
          ? "تم إرسال رسالتك بنجاح."
          : "Your message has been sent.",
        icon: "success",
        confirmButtonText: pathname?.includes("/ar") ? "حسنًا" : "OK",
      });

      const result = await response.json();
      resetForm();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="contact py-8 sm:py-10 md:py-12 lg:py-[49px] bg-[image:var(--linear-gradient)] px-4 lg:px-0"
      id={sectionID || "contact"}
      ref={sectionRef}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[42%_53%] justify-center lg:justify-between items-start lg:items-center gap-8 lg:gap-0">
        {/* Content Section */}
        <div className="content text-center md:text-left order-1 ">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] !leading-[32px] sm:!leading-[36px] lg:!leading-[40px] text-[var(--white-color)] mb-4 capitalize">
            {contactData?.heading}
          </h2>
          <p className="text-[#FFFFFFE5] text-[16px] sm:text-[17px] lg:text-lg !leading-[24px] sm:!leading-[26px] lg:!leading-[28px] mb-6 lg:mb-8 max-w-[500px] mx-auto lg:mx-0">
            {contactData?.paragraphOne}
            <br />
            {contactData?.paragraphTwo}
          </p>
          <Link
            href={`${contactData?.button?.url}`}
            className={`${contactData?.button?.btnType}-btn transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg`}
          >
            {contactData?.button?.label}
          </Link>
        </div>

        {/* Form Section */}
        <div className="form order-1 lg:order-2 w-full max-w-[500px] mx-auto lg:mx-0 lg:max-w-none">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="fName"
                    className="block mb-1 text-white font-medium text-sm sm:text-base"
                  >
                    {isArabic ? "الاسم الأول" : "First Name"}
                  </label>
                  <Field
                    name="fName"
                    id="fName"
                    placeholder={isArabic ? "الاسم الأول" : "First Name"}
                    className="w-full p-3 rounded bg-white/10 border border-white/30 text-white placeholder-white/80 text-sm sm:text-base focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                  />
                  <ErrorMessage
                    name="fName"
                    component="div"
                    className="text-red-400 bg-[#d4d4d4] font-bold px-4 py-3 rounded-[6px] text-xs sm:text-sm mt-1"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lName"
                    className="block mb-1 text-white font-medium text-sm sm:text-base"
                  >
                    {isArabic ? "الاسم الأخير" : "Last Name"}
                  </label>
                  <Field
                    name="lName"
                    id="lName"
                    placeholder={isArabic ? "الاسم الأخير" : "Last Name"}
                    className="w-full p-3 rounded bg-white/10 border border-white/30 text-white placeholder-white/80 text-sm sm:text-base focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                  />
                  <ErrorMessage
                    name="lName"
                    component="div"
                    className="text-red-400 bg-[#d4d4d4] font-bold px-4 py-3 rounded-[6px] text-xs sm:text-sm mt-1"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-white font-medium text-sm sm:text-base"
                >
                  {isArabic ? "رقم الهاتف" : "Phone Number"}
                </label>
                <Field
                  name="phone"
                  id="phone"
                  placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                  className="w-full p-3 rounded bg-white/10 border border-white/30 text-white placeholder-white/80 text-sm sm:text-base focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-400 bg-[#d4d4d4] font-bold px-4 py-3 rounded-[6px] text-xs sm:text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-white font-medium text-sm sm:text-base"
                >
                  {isArabic ? "البريد الإلكتروني" : "Business Email"}
                </label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
                  className="w-full p-3 rounded bg-white/10 border border-white/30 text-white placeholder-white/80 text-sm sm:text-base focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 bg-[#d4d4d4] font-bold px-4 py-3 rounded-[6px] text-xs sm:text-sm mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-white font-medium text-sm sm:text-base"
                >
                  {isArabic ? "الرسالة" : "Message"}
                </label>
                <Field
                  name="message"
                  id="message"
                  as="textarea"
                  rows="4"
                  placeholder={isArabic ? "رسالتك" : "Message"}
                  className="w-full h-[100px] sm:h-[110px] lg:h-[122px] p-3 rounded bg-white/10 border border-white/30 text-white placeholder-white/80 text-sm sm:text-base focus:border-white/50 focus:bg-white/15 transition-all duration-300 resize-none"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-400 bg-[#d4d4d4] font-bold px-4 py-3 rounded-[6px] text-xs sm:text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="white-btn w-full cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base"
              >
                {isArabic ? "ارسل رسالة" : "Send Message"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Contact;
