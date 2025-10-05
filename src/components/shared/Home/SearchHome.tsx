import TextType from "@/components/styled/TextType/TextType";
import React from "react";

const SearchHome = () => {
  return (
    <div className=" min-h-180 bg-background relative overflow-hidden">
      <div className="mx-auto relative flex items-center justify-center">
        <video
          src="/Images/Bookings.mp4"
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          className="w-300 h-[600px] rounded-2xl object-cover brightness-50"
        />
      </div>
      <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg">
        <div className="text-center w-250">
          <div className="text-6xl font-bold mb-4 text-white">
            <TextType
              text={[
                "THDV - ĐỈNH CAO TRẢI NGHIỆM",
                "MỖI CHUYẾN ĐI LÀ MỘT KỶ NIỆM",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
          <hr className="border-t border-white w-1/2 mx-auto" />
          <p className="mt-4 text-lg text-white">
            Uy tín với hơn{" "}
            <span className="font-bold !text-green-500">
              10 năm kinh nghiệm
            </span>{" "}
            trong lĩnh vực này
          </p>
        </div>
        <div className=" relative top-40 w-1/2  mx-auto text-center bg-green-500 text-white px-3 py-3 rounded-t-2xl rounded-b-none text-xl font-semibold shadow-lg hover:bg-green-600 cursor-pointer">
          Xe Tự Lái
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 mx-auto relative top-40 right-3 h-30 relative dark:bg-black">
          <div className="flex items-center mb-4 p-2 rounded dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="m15.801 2.037l-3.496 3.978a3 3 0 0 1 2.614 2.291l3.42-3.894A7.9 7.9 0 0 0 15.8 2.037Zm-1.426-.649l-4.222 4.803l-3.237-3.217C8.276 1.752 10.064 1 12 1c.826 0 1.624.137 2.375.388m4.72 4.436L8.693 17.67q.31.395.62.807c.996 1.34 1.383 2.457 1.656 3.245c.282.815.443 1.279 1.031 1.279s.749-.464 1.031-1.279c.273-.788.66-1.905 1.657-3.245c.434-.585.878-1.14 1.313-1.685c1.908-2.385 3.651-4.565 3.651-8.139a7.5 7.5 0 0 0-.557-2.828ZM7.743 16.478l3.947-4.494a3 3 0 0 1-2.611-2.299L5.67 13.563c.582 1.022 1.308 1.959 2.072 2.915ZM4.968 12.09L9.16 7.32L5.9 4.08a7.57 7.57 0 0 0-1.552 4.572c0 1.305.232 2.425.62 3.438"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2 dark:text-white">Địa điểm</span>
          </div>
          <span className="top-15 left-15 font-semibold text-3xl absolute dark:text-white">
            Hồ Chí Minh
          </span>
          <div className="h-10 w-px bg-gray-300 absolute right-1/2 bottom-8 dark:bg-gray-700"></div>
          <div className="flex items-center rounded relative transform -translate-y-12 translate-x-122">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <rect width={14} height={0} x={5} y={5} fill="currentColor">
                <animate
                  fill="freeze"
                  attributeName="height"
                  begin="0.6s"
                  dur="0.2s"
                  values="0;3"
                ></animate>
              </rect>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path
                  strokeDasharray={64}
                  strokeDashoffset={64}
                  d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="64;0"
                  ></animate>
                </path>
                <path
                  strokeDasharray={4}
                  strokeDashoffset={4}
                  d="M7 4v-2M17 4v-2"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.6s"
                    dur="0.2s"
                    values="4;0"
                  ></animate>
                </path>
                <path strokeDasharray={12} strokeDashoffset={12} d="M7 11h10">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.8s"
                    dur="0.2s"
                    values="12;0"
                  ></animate>
                </path>
                <path strokeDasharray={8} strokeDashoffset={8} d="M7 15h7">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.2s"
                    values="8;0"
                  ></animate>
                </path>
              </g>
            </svg>
            <span className="ml-2 dark:text-white">Thời gian</span>
            <span className="top-8 left-8 font-semibold text-2xl dark:text-white absolute">
              21h00, 30/9/2025 - 01/10/2025
            </span>
          </div>
          <div className="flex items-center rounded relative transform -translate-y-17 translate-x-218">
            <button className="bg-green-500 text-white font-semibold px-3 py-5 rounded-2xl hover:bg-green-600 cursor-pointer">
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
