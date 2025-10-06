import AboutUs from "@/components/shared/AboutUs/AboutUs";
import OurMission from "@/components/shared/AboutUs/OurMission";
import Partner from "@/components/shared/AboutUs/Partner";
import Stats from "@/components/shared/AboutUs/Stats";
import TimeLine from "@/components/shared/AboutUs/TimeLine";
import React from "react";

const AboutUsPage = () => {
  return (
    <div className="">
      <div className="">
        <AboutUs />
      </div>
      <div>
        <OurMission />
      </div>
      <div>
        <Stats />
      </div>
      <div>
        <TimeLine />
      </div>
      <div>
        <Partner />
      </div>
    </div>
  );
};

export default AboutUsPage;
