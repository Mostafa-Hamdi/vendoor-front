import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "ar"],
  // },
  typescript: {
    // 🚨 Use with caution — this lets Next.js build even if types fail
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "appealing-bird-15faeb61dc.media.strapiapp.com",
    ],
  },
  devIndicators: false,
  // devIndicators: {
  //   buildActivity: false, // 🔧 This disables the icon
  // },
  // defaultLocale: "en",
};

export default nextConfig;
