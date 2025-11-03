import Facebook from "@/icons/Facebook";
import Globe from "@/icons/Globe";
import Instagram from "@/icons/Instagram";
import Whats from "@/icons/Whats";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = ({ footerData, copyright }: any) => {
  return (
    <footer className="bg-[var(--border-color)] pt-6 pb-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo & Description */}
          <div className="sm:col-span-2 md:col-span-1 text-center lg:text-left">
            <Link href={"/"} className="logo inline-block">
              <Image
                src={`${footerData?.footerLogo?.logo?.url}`}
                alt="logo"
                aria-label="Logo"
                width={172}
                height={32}
                className="w-auto h-6 sm:h-8"
              />
            </Link>
            <p className="text-[14px] sm:text-[16px] !leading-[20px] sm:!leading-[24px] text-[var(--white-color)] mt-3 lg:mt-5 max-w-[300px] mx-auto lg:mx-0">
              {footerData?.footerLogo?.description}
            </p>
          </div>

          {/* Products */}
          <div className="text-center lg:text-left">
            <h3 className="text-[16px] text-[var(--white-color)] !leading-[24px] capitalize font-semibold mb-3 lg:mb-4">
              {footerData?.footerProducts?.heading}
            </h3>
            {footerData?.footerProducts?.product?.map((item: any) => (
              <span
                className="block text-[14px] lg:text-[16px] text-[#DBDBDB] !leading-[20px] lg:!leading-[24px] mb-2 capitalize"
                key={item?.id}
              >
                {item?.text}
              </span>
            ))}
          </div>

          {/* Company */}
          <div className="text-center lg:text-left">
            <h3 className="text-[16px] text-[var(--white-color)] !leading-[24px] capitalize font-semibold mb-3 lg:mb-4">
              {footerData?.footerCompany?.heading}
            </h3>
            {footerData?.footerCompany?.link?.map((item: any) => (
              <span
                className="block text-[14px] lg:text-[16px] text-[#DBDBDB] !leading-[20px] lg:!leading-[24px] mb-2 capitalize"
                key={item?.id}
              >
                {item?.text}
              </span>
            ))}
          </div>

          {/* Support */}
          <div className="text-center lg:text-left">
            <h3 className="text-[16px] text-[var(--white-color)] !leading-[24px] capitalize font-semibold mb-3 lg:mb-4">
              {footerData?.footerSupport?.heading}
            </h3>
            {footerData?.footerSupport?.link?.map((item: any) => (
              <Link
                href={`${item?.url}`}
                className="block text-[14px] lg:text-[16px] text-[#DBDBDB] !leading-[20px] lg:!leading-[24px] mb-2 capitalize hover:text-white transition-colors duration-300"
                key={item?.id}
              >
                {item?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* Mobile/Tablet Layout */}
        <div className="block lg:hidden space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href={"/"} className="logo">
              <Image
                src={`${copyright?.logo?.url}`}
                alt=""
                aria-label="Logo"
                width={172}
                height={32}
                className="w-auto h-6 sm:h-8"
              />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-[14px] sm:text-[16px] !leading-[20px] sm:!leading-[24px] text-[var(--white-color)]">
              {copyright?.copyright}
            </p>
          </div>

          {/* Social Links & Policies */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Social Links */}
            <div className="social-links flex items-center gap-3 sm:gap-4">
              {copyright?.socialLinks?.map((link: any, index: number) => (
                <Link
                  href={link?.URL}
                  key={index}
                  aria-label="social link"
                  className="hover:opacity-75 transition-opacity duration-300"
                >
                  {link?.label == "facebook" && <Facebook />}
                  {link?.label == "instagram" && <Instagram />}
                  {link?.label == "whatsapp" && <Whats />}
                </Link>
              ))}
            </div>

            {/* Policy Links */}
            <div className="policies flex gap-3 sm:gap-4 items-center">
              {copyright?.policyLinks?.map((link: any, index: number) => (
                <Link
                  href={link?.URL}
                  key={index}
                  className="text-[14px] sm:text-[16px] !leading-[20px] sm:!leading-[24px] text-[var(--white-color)] capitalize hover:opacity-75 transition-opacity duration-300"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex justify-center">
            <div className="lang-switcher py-1 px-2.5 rounded-[4px] border-[0.5px] border-[#FFFFFF80] cursor-pointer flex items-center gap-2 w-fit text-[var(--white-color)] hover:bg-white/10 transition-colors duration-300">
              <Globe icon={true} />
              <span className="text-sm">Ar</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <Link href={"/"} className="logo">
            <Image
              src={`${copyright?.logo?.url}`}
              alt=""
              aria-label="Logo"
              width={172}
              height={32}
            />
          </Link>
          <p className="text-[16px] !leading-[24px] text-[var(--white-color)]">
            {copyright?.copyright}
          </p>
          <div className="flex items-center">
            <div className="social-links mr-4 flex items-center gap-4">
              {copyright?.socialLinks?.map((link: any, index: number) => (
                <Link
                  href={link?.URL}
                  key={index}
                  aria-label="social link"
                  className="hover:opacity-75 transition-opacity duration-300"
                >
                  {link?.label == "facebook" && <Facebook />}
                  {link?.label == "instagram" && <Instagram />}
                  {link?.label == "whatsapp" && <Whats />}
                </Link>
              ))}
            </div>
            <div className="policies flex gap-4 items-center mr-2.5">
              {copyright?.policyLinks?.map((link: any, index: number) => (
                <Link
                  href={link?.URL}
                  key={index}
                  className="text-[16px] !leading-[24px] text-[var(--white-color)] capitalize hover:opacity-75 transition-opacity duration-300"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
            <div className="lang-switcher py-1 px-2.5 rounded-[4px] border-[0.5px] border-[#FFFFFF80] cursor-pointer flex items-center gap-2 w-fit text-[var(--white-color)] hover:bg-white/10 transition-colors duration-300">
              <Globe icon={true} />
              Ar
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
