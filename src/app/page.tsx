// import Image from "next/image";
"use client";

import SearchHome from "@/components/shared/Home/SearchHome";
import CarMap from "@/components/shared/Home/CarMap";
import BenefitBooking from "@/components/shared/Home/BenefitBooking";
import Working from "@/components/shared/Home/Working";
import { Pricing } from "@/components/shared/Home/Pricing";
import Rate from "@/components/shared/Home/Rate";

export default function HomePage() {
  return (
    <div>
      <div className="">
        <SearchHome />
      </div>
      <div className="">      
        <BenefitBooking />
      </div>
      <div>
         <CarMap />
      </div>
      <div>
        <Working />
      </div>
      <div>
        <Pricing />
      </div>
      <div>
        <Rate />
      </div>
    </div>
  );
}
