const Promo = () => {
  return (
    <div id="promo-section">
      <div className="relative z-[1] pt-20 md:-mt-[135px] md:pt-0">
        {/* Section Container */}
        <div className="global-container">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <li
              className="jos rounded-[10px] bg-[#121212] p-[30px] text-white"
              data-jos_delay="0.1"
            >
              <div className="mb-6 flex items-center gap-x-6">
                <div className="h-[50px] w-[50px]">
                  <img
                    src="assets/svgs/start-up.svg"
                    alt="icon-black-promo"
                    width={50}
                    height={50}
                    className="h-full w-auto"
                  />
                </div>
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  For Startups
                </div>
              </div>
              <p className="text-[21px] leading-[1.4]">
                Pitch your idea, get feedback from the AI, and refine your
                presentation. Use the AI to help you prepare for real-world
                investors with quick and clear feedback.
              </p>
            </li>
            <li
              className="jos rounded-[10px] bg-[#121212] p-[30px] text-white"
              data-jos_delay="0.2"
            >
              <div className="mb-6 flex items-center gap-x-6">
                <div className="h-[50px] w-[50px]">
                  <img
                    src="assets/svgs/VC.svg"
                    alt="icon-black-promo"
                    width={50}
                    height={50}
                    className="h-full w-auto"
                  />
                </div>
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  For VCs
                </div>
              </div>
              <p className="text-[21px] leading-[1.4]">
                Listen to pitches on your behalf, without being present in
                person. After each call, you’ll receive a summary of the pitch
                and feedback from the AI to help you make informed decisions.
              </p>
            </li>
            <li
              className="jos rounded-[10px] bg-[#121212] p-[30px] text-white"
              data-jos_delay="0.3"
            >
              <div className="mb-6 flex items-center gap-x-6">
                <div className="h-[50px] w-[50px]">
                  <img
                    src="assets/svgs/after-call.svg"
                    alt="icon-black-promo"
                    width={50}
                    height={50}
                    className="h-full w-auto"
                  />
                </div>
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  After the Call
                </div>
              </div>
              <p className="text-[21px] leading-[1.4]">
                Once the call ends, the AI sends a feedback summary via email,
                so you're always up to date on the pitch and next steps.
              </p>
            </li>
          </ul>
        </div>
        {/* Section Container */}
      </div>
    </div>
  );
};

export default Promo;
