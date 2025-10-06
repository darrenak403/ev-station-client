"use client";
import React from "react";
import Image from "next/image";
import CountUp from "@/components/styled/CountUp/CountUp";

const AboutUs = () => {
  return (
    <section className="md:py-10 relative overflow-hidden ">
      <div className="container max-w-6xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-green-500 mb-4">
              <span className="text-sm font-semibold uppercase tracking-wide">
                Câu Chuyện Của Chúng Tôi
              </span>
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance dark:text-white">
              Hành Trình Xây Dựng Tương Lai Xanh
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed dark:text-white">
              <p>
                Được thành lập vào năm 2020, EV-Station ra đời từ niềm đam mê
                với công nghệ xanh và mong muốn góp phần giảm thiểu ô nhiễm môi
                trường tại Việt Nam. Chúng tôi nhận thấy rằng xe điện là tương
                lai, nhưng thiếu hạ tầng sạc là rào cản lớn nhất.
              </p>

              <p>
                Từ trạm sạc đầu tiên tại Hà Nội, chúng tôi đã không ngừng mở
                rộng mạng lưới trên toàn quốc. Ngày nay, với hơn 500 trạm sạc và
                đội xe điện đa dạng, chúng tôi tự hào là đối tác tin cậy của
                hàng nghìn khách hàng.
              </p>

              <p>
                Sứ mệnh của chúng tôi không chỉ dừng lại ở việc cung cấp dịch
                vụ, mà còn là xây dựng một cộng đồng người dùng xe điện, cùng
                nhau hướng tới một Việt Nam xanh và bền vững hơn.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/Images/Blog/Charging.png"
                alt="EV Station Story"
                className="w-full h-full rounded-3xl object-cover"
                layout="fill"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white border border-border rounded-xl p-6 shadow-lg flex items-center gap-4 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <CountUp
                    to={500}
                    duration={2}
                    className="text-2xl font-bold text-foreground dark:text-white"
                  />
                  <span className="text-2xl font-bold text-foreground dark:text-white">+</span>
                  <div className="text-sm text-muted-foreground dark:text-white">
                    Trạm Sạc
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
