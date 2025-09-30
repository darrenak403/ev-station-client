import React from "react";

const CarMap = () => {
  return (
    <div className="w-full relative mx-auto mb-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-11/12 mx-auto py-10">
        <div className="text-center text-4xl font-semibold dark:text-white">
          Các loại xe dành cho bạn
        </div>
        <div className="text-center text-lg mt-2 mb-5 dark:text-white">
          Chúng tôi có nhiều loại xe để phục vụ nhu cầu của bạn
        </div>
        <div className="w-full h-96 dark:bg-gray-900 flex items-center justify-center">
          <span className="text-2xl text-gray-500 dark:text-gray-400">
            [Car Map Here]
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarMap;
