// import Image from "next/image";
"use client";

import SearchHome from "@/components/shared/Home/SearchHome";
import CarMap from "@/components/shared/Home/CarMap";

export default function HomePage() {
  return (
    <div>
      <div className="">
        <SearchHome />
      </div>
      <div className="mt-20">
        <CarMap />
      </div>
    </div>
  );
}
