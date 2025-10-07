"use client";
import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:lightning-bolt-circle",
    title: "Sạc nhanh chóng",
    description:
      "Trạm sạc công suất cao, sạc đầy pin chỉ trong 30-45 phút với công nghệ DC Fast Charging",
    color: "text-green-600",
  },
  {
    icon: "mdi:map-search",
    title: "Dễ dàng tìm kiếm",
    description:
      "Tìm trạm sạc gần nhất với bản đồ thông minh, xem tình trạng hoạt động real-time",
    color: "text-green-600",
  },
  {
    icon: "mdi:car-electric-outline",
    title: "Đa dạng xe điện",
    description:
      "Hơn 200+ xe điện từ các thương hiệu hàng đầu, phù hợp mọi nhu cầu di chuyển",
    color: "text-green-600",
  },
  {
    icon: "mdi:shield-check",
    title: "An toàn & bảo mật",
    description:
      "Hệ thống thanh toán bảo mật, bảo hiểm toàn diện cho mọi chuyến đi",
    color: "text-green-600",
  },
  {
    icon: "mdi:calendar-check",
    title: "Đặt lịch linh hoạt",
    description:
      "Đặt trước trạm sạc hoặc thuê xe theo giờ, ngày, tuần với giá ưu đãi",
    color: "text-green-600",
  },
  {
    icon: "mdi:headset",
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ mọi lúc mọi nơi",
    color: "text-green-600",
  },
];
const BenefitBooking = () => {
  return (
    <section className="md:py-10 bg-gray-100 relative overflow-hidden min-h-screen dark:bg-gray-950">
      <div className="container flex flex-col mx-auto px-4 gap-8 ">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            <Icon icon="mdi:star-four-points" className="h-4 w-4" />
            Tính năng nổi bật
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Chúng tôi mang đến trải nghiệm tốt nhất với
            công nghệ hiện đại và dịch vụ chuyên nghiệp
          </p>
        </div>
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transform transition-all ease-out duration-300 hover:-translate-y-1 bg-card border-border group dark:bg-gray-900"
            >
              <div className="space-y-4 flex flex-col gap-4">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 ${feature.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon icon={feature.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold m-0">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitBooking;
