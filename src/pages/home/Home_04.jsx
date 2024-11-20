import Footer_04 from "../../components/footer/Footer_04";
import Header from "../../components/header/Header";
import Content_03 from "../../components/sections/home_04/Content_03";
import Cta from "../../components/sections/home_04/Cta";
import Hero from "../../components/sections/home_04/Hero";
import Promo from "../../components/sections/home_04/Promo";
import Service from "../../components/sections/home_04/Service";

const Home_04 = () => {
  return (
    <>
      <div className="page-wrapper relative z-[1] bg-black text-white mb-8">
        <Header
          loginCSS="hidden border-b-2 border-transparent font-bold text-white transition-all duration-300 hover:border-colorGreen hover:text-colorGreen lg:inline-block"
          signupCSS="button hidden h-full rounded border-none bg-colorGreen py-3 text-base text-black after:border-none after:bg-white lg:inline-block"
          navColor="is-text-white"
          light
        />
        <main className="main-wrapper relative overflow-hidden">
          {/*...::: Hero Section Start :::... */}
          <Hero />
          {/*...::: Hero Section End :::... */}
          {/*...::: Promo Section Start :::... */}
          <Promo />
          {/*...::: Promo Section End :::... */}
          {/*...::: Content Section-1 Start :::... */}

          {/* Separator */}
          {/*...::: Service Section Start :::... */}
          <Service />
          {/*...::: Service Section End :::... */}
          {/*...::: Text Slide Section Start :::... */}

          <Content_03 />
          {/*...::: Content Section-3 End :::... */}
          {/*...::: Content Section-4 Start :::... */}

          <Cta />
          {/*...::: CTA Section End :::... */}
        </main>
      </div>
    </>
  );
};

export default Home_04;
