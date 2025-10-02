import { Icon } from "@iconify/react";
import React from "react";

const CarMap = () => {
  return (
    <div className="min-h-180 relative mx-auto bg-gray-50 dark:bg-gray-950">
      <div className="w-11/12 mx-auto py-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
          <Icon icon="mdi:car-electric" className="h-4 w-4" />
          Thuê xe điện
        </div>
        <div className="text-center text-3xl md:text-5xl font-semibold dark:text-white mt-2">
          Đa dạng xe điện cho mọi hành trình
        </div>
        <div className="text-lg text-muted-foreground text-pretty leading-relaxed">
          Từ xe sedan sang trọng đến SUV rộng rãi, chúng tôi có đầy đủ các dòng xe điện phù hợp với nhu cầu của bạn
        </div>
        <div className="w-full h-96 dark:bg-gray-950 flex items-center justify-center">
          <span className="text-2xl text-gray-500 dark:text-gray-400">
            [Car Map Here]
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarMap;
