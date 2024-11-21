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
                  AI-Driven Startup Pitching
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Startups can confidently present their ideas to the AI VC, which
                listens, analyzes, and provides immediate insights to enhance
                their pitch effectiveness.
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
                  Smart Investor Briefing
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                VCs receive well-structured summaries of pitches, highlighting
                essential metrics, business potential, and market fit, saving
                time and improving decision-making.
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
                  Personalized Guidance for Founders
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Tailored recommendations help startups fine-tune their business
                models, storytelling, and value propositions based on AI-driven
                feedback.
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
                  Effortless Meeting Summaries
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Automated post-call emails deliver actionable summaries to both
                parties, ensuring clarity and alignment for follow-up actions.
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
                  Dynamic Two-Way Engagement
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                The AI VC adapts to the needs of both investors and founders,
                fostering productive conversations that benefit both sides of
                the table.
              </p>
            </li>
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.5"
            >
              <div className="mb-8 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Scalable Pitch and Feedback Platform
                </div>
              </div>
              <p className="mb-7 text-[21px] leading-[1.4]">
                Whether it’s 10 pitches or 100, the AI VC scales effortlessly,
                providing consistent quality insights and reports to all users.
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
