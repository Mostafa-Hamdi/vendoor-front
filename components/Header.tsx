"use client";
import Globe from "@/icons/Globe";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";

const Header = ({ headerData }: any) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavLinks = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget
      .getAttribute("data-target")
      ?.toLocaleLowerCase();
    if (!target) return;

    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 150) {
      headerRef?.current?.classList?.add("sticky-top");
    } else {
      headerRef?.current?.classList?.remove("sticky-top");
    }
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, handleClickOutside]);

  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleLang = () => {
    const parts = pathname.split("/");
    const currentLocale = parts[1] || "en";
    const targetLocale = currentLocale === "ar" ? "en" : "ar";

    const restParts = parts.slice(2);
    const restPath = restParts.join("/");

    let newPath: string;
    if (targetLocale === "en") {
      newPath = `/${restPath || ""}`;
    } else {
      newPath = `/ar${restPath ? "/" + restPath : ""}`;
    }

    router.push(newPath);
  };

  const parts = pathname.split("/");
  const currentLocale = parts[1] || "en";
  const langLabel = currentLocale === "ar" ? "EN" : "Ar";

  return (
    <header
      className="py-[21.5px] shadow-[0px_2px_4px_0px_#00000026] bg-white transition-normal relative z-[600] "
      ref={headerRef}
    >
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
        <Link href="/" className="logo">
          <Image
            src={`${headerData?.logo?.url}`}
            alt="Logo"
            aria-label="Logo"
            width={172}
            height={32}
            className="w-auto h-6 sm:h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {headerData?.menuItems?.link?.map((link: any) => (
            <li key={link?.id}>
              <div
                data-target={link?.sectionToScroll}
                className={`text-[var(--gray-color)] text-[16px] !leading-[24px] cursor-pointer ${
                  link?.text.toLowerCase() === "faq"
                    ? "uppercase"
                    : "capitalize"
                }`}
                onClick={handleNavLinks}
              >
                {link?.text}
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex gap-4 items-center actions">
          <div
            className="lang-switcher cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-gray-200"
            onClick={toggleLang}
          >
            <Globe />
            <span className="text-sm font-medium">{langLabel}</span>
          </div>
          <div className="flex flex-row gap-4 items-center">
            {headerData?.buttons?.map((btn: any, index: any) => (
              <Link
                href={btn?.URL}
                key={index}
                className={`${btn.isBtn ? btn?.btnType + "-btn" : null} capitalize transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {btn?.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-10 flex flex-col gap-1 w-6 h-6 justify-center items-center z-[70] relative"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-gray-800 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-800 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-800 transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-[72px] left-0 w-full bg-white z-50 shadow-xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <ul className="flex flex-col gap-5 mb-6">
            {headerData?.menuItems?.link?.map((link: any) => (
              <li key={link?.id}>
                <div
                  data-target={link?.sectionToScroll}
                  className={`text-[var(--gray-color)] text-lg !leading-[26px] block py-2 cursor-pointer ${
                    link?.text.toLowerCase() === "faq"
                      ? "uppercase"
                      : "capitalize"
                  }`}
                  onClick={(e) => {
                    handleNavLinks(e);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link?.text}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4 border-t border-gray-200">
            <div
              className="lang-switcher flex items-center gap-2 w-fit cursor-pointer"
              onClick={toggleLang}
            >
              <Globe />
              <span className="text-sm font-medium">{langLabel}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap w-full">
              {headerData?.buttons?.map((btn: any, index: any) => (
                <Link
                  href={btn?.URL}
                  key={index}
                  className={`${btn?.btnType}-btn capitalize w-full sm:w-auto text-center`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {btn?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
