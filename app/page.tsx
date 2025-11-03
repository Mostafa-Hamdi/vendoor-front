import AboutSection from "@/components/AboutSection";
import CallToActionSection from "@/components/CallToActionSection";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowWork from "@/components/HowWork";
import Tutorial from "@/components/Tutorial";

const getData = async (locale: any) => {
  try {
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
                menuItems { link { id text sectionToScroll} }
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
          fetchPolicy: "network-only",
        }),
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};

// Add this to enable revalidation at the page level
export const revalidate = 10; // Revalidate every 10 seconds

export default async function Home({ params: { locale } }: any) {
  const data = await getData(locale);
  if (!data) {
    return <p>Failed to load data.</p>;
  }
  return (
    <>
      <Header headerData={data?.homePage?.Header} />
      <main>
        <HeroSection
          heroData={data?.homePage?.HeroSection}
          sectionID={data?.homePage?.Header?.menuItems?.link[0]?.sectionToScroll?.toLowerCase()}
        />
        <AboutSection
          aboutData={data?.homePage?.About}
          sectionID={data?.homePage?.Header?.menuItems?.link[1]?.sectionToScroll?.toLowerCase()}
        />
        <CallToActionSection data={data?.homePage?.transformBusiness} />
        <HowWork
          howData={data?.homePage?.HowWork}
          sectionID={data?.homePage?.Header?.menuItems?.link[2]?.sectionToScroll?.toLowerCase()}
        />
        <Tutorial
          main={data}
          tutorialData={data?.homePage?.tutorials}
          sectionID={data?.homePage?.Header?.menuItems?.link[3]?.sectionToScroll?.toLowerCase()}
        />
        <CallToActionSection data={data?.homePage?.joinVendoor} />
        <FaqSection
          faqData={data?.homePage?.Faq}
          sectionID={data?.homePage?.Header?.menuItems?.link[4]?.sectionToScroll?.toLowerCase()}
        />
        <Contact
          contactData={data?.homePage?.Contact}
          sectionID={data?.homePage?.Header?.menuItems?.link[5]?.sectionToScroll?.toLowerCase()}
        />
      </main>
      <Footer
        footerData={data?.homePage?.Footer}
        copyright={data?.homePage?.footerCopyright}
      />
    </>
  );
}
