// import Image from "next/image";
"use client";

import SearchHome from "@/components/shared/Home/SearchHome";
import CarMap from "@/components/shared/Home/CarMap";
import BenefitBooking from "@/components/shared/Home/BenefitBooking";
import Working from "@/components/shared/Home/Working";

export default function HomePage() {
  return (
    <div>
      <div className="">
        <SearchHome />
      </div>
      <div className="">
        <CarMap />
      </div>
      <div>
        <BenefitBooking />
      </div>
      <div>
        <Working />
      </div>
    </div>
  );
}
