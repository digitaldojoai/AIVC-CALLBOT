import VoiceCall from "../../voice-call/VoiceCall";

const Hero = () => {
  return (
    <section id="hero-section">
      <div className="relative z-[1] overflow-hidden text-center text-white">
        {/* Section Spacer */}
        <div className=" bg-cover bg-no-repeat pb-20 pt-28 md:pb-[265px] md:pt-40 lg:pt-44 xl:pt-[224px]">
          {/* Section Container */}
          <div className="global-container">
            <h1 className="jos mb-6 font-spaceGrotesk leading-none -tracking-[3px] text-white">
              Welcome to Hollo AI’s VC Platform
            </h1>
            <div className="mx-auto max-w-[1090px]">
              <p className="leading-[1.33] lg:text-xl xl:text-2xl">
                Hollo AI connects startups and VCs, making it easy to pitch
                ideas and receive valuable feedback. Whether you're pitching or
                listening on behalf of your business, our platform helps you
                move forward.
              </p>
            </div>
            <div className="md:m-8">
              <VoiceCall />
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Background Gradient */}
        <div className="absolute left-1/2 top-[80%] -z-[1] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t  blur-[250px]"></div>
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Hero;
