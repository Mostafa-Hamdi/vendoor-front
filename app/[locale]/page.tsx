// app/[locale]/page.tsx

import AboutSection from "@/components/AboutSection";
import CallToActionSection from "@/components/CallToActionSection";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowWork from "@/components/HowWork";
import Tutorial from "@/components/Tutorial";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

const getData = async (locale: string) => {
  try {
    // First, let's test if your Strapi actually has Arabic data
    // Try without the locale variable first
    const testQuery = `
      query {
        homePage(locale: "ar") {
          Header {
            logo { url }
          }
        }
      }
    `;

    const testResponse = await fetch(
      "https://appealing-bird-15faeb61dc.strapiapp.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: testQuery,
        }),
      },
    );

    const testJson = await testResponse.json();
    // If test fails, try fallback to English
    if (!testJson.data?.homePage) {
      locale = "en";
    }

    // Now do the main query
    const response = await fetch(
      "https://appealing-bird-15faeb61dc.strapiapp.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query HomePage($locale: I18NLocaleCode) {
            homePage(locale: $locale) {
              Header {
                logo { url }
                menuItems { link { id text sectionToScroll } }
                buttons { label URL isBtn btnType }
              }
              HeroSection {
                image { url }
                heading
                coloredHeading
                description
                buttons { id label URL btnType }
              }
              About {
                heading
                description
                image { url }
                points { id title paragraph }
              }
              Faq {
                heading
                description
                questions { id ques response }
              }
              transformBusiness {
                heading
                description
                button { label URL isBtn btnType }
              }
              joinVendoor {
                heading
                description
                button { URL label isBtn btnType }
              }
              HowWork {
                heading
                description
                stepOne { title paragraph }
                stepTwo { title paragraph }
                stepThree { title paragraph }
                stepFour { title paragraph }
              }
              Contact {
                heading
                paragraphOne
                paragraphTwo
                button { label URL btnType }
              }
              Footer {
                footerLogo {
                  logo { url }
                  description
                }
                footerProducts {
                  heading
                  product { id text }
                }
                footerCompany {
                  heading
                  link { id text }
                }
                footerSupport {
                  id
                  heading
                  link { id label URL }
                }
              }
              footerCopyright {
                logo { url }
                copyright
                policyLinks { label URL }
                socialLinks { label URL }
              }
              tutorials {
                title
                subtitle
                videoSource {
                  id
                  link
                }
              }
            }
          }
        `,
          variables: { locale },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL errors for locale", locale, ":", json.errors);
    }

    return json.data;
  } catch (error) {
    console.error(`Failed to fetch data for locale ${locale}:`, error);

    // If Arabic fails, try English as fallback
    if (locale === "ar") {
      return getData("en");
    }

    return null;
  }
};

export default async function Page({ params }: { params: { locale: string } }) {
  const data = await getData(params.locale);

  return (
    <>
      <Header headerData={data?.homePage?.Header} />
      <main>
        <HeroSection heroData={data?.homePage?.HeroSection} />
        <AboutSection aboutData={data?.homePage?.About} />
        <CallToActionSection data={data?.homePage?.transformBusiness} />
        <HowWork howData={data?.homePage?.HowWork} />
        <Tutorial
          tutorialData={data?.homePage?.tutorials}
          sectionID={data?.homePage?.Header?.menuItems?.link[3]?.sectionToScroll?.toLowerCase()}
        />
        <CallToActionSection data={data?.homePage?.joinVendoor} />
        <FaqSection faqData={data?.homePage?.Faq} />
        <Contact contactData={data?.homePage?.Contact} />
        <Footer
          footerData={data?.homePage?.Footer}
          copyright={data?.homePage?.footerCopyright}
        />
      </main>
    </>
  );
}
