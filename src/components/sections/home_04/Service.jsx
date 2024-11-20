const Service = () => {
  return (
    <section id="service-section">
      {/* Section Spacer */}
      <div className="pb-20 pt-20 xl:pb-[130px] xl:pt-[150px]">
        {/* Section Container */}
        <div className="global-container">
          {/* Section Content Block */}
          <div className="jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]">
            <h2 className="font-spaceGrotesk text-4xl font-medium leading-[1.06] -tracking-[2px] text-white sm:text-[44px] lg:text-[56px] xl:text-[70px]">
              Hollo VC's FEATURES
            </h2>
          </div>
          {/* Section Content Block */}
          {/* Service List */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Service Item */}
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.1"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Pitch & Feedback
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Pitch your startup or hear pitches for your business.
              </p>
            </li>
            {/* Service Item */}
            {/* Service Item */}
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.2"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  AI Feedback
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Get actionable feedback automatically after each pitch.
              </p>
            </li>
            {/* Service Item */}
            {/* Service Item */}
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.3"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Network Security
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Network traffic attempts and can take automated actions to
                block.
              </p>
            </li>
            {/* Service Item */}
            {/* Service Item */}
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.4"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Easy Calls
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Start your pitch or listen to a pitch with just one click.
              </p>
            </li>
            {/* Service Item */}
            {/* Service Item */}
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.5"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Personalized Experience
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                The AI tailors feedback for both startups and VCs.
              </p>
            </li>
          </ul>
          {/* Service List */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Service;
