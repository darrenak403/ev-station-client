"use client"

import { Icon } from "@iconify/react"
import { Card } from "@heroui/react";
import { Button } from "@heroui/react"

const plans = [
  {
    name: "Cơ bản",
    price: "0",
    description: "Dành cho người dùng thử nghiệm",
    features: ["Tìm kiếm trạm sạc", "Đặt lịch sạc cơ bản", "Đặt xe giới hạn", "Thanh toán theo lượt", "Hỗ trợ email", "Lịch sử giao dịch"],
    icon: "mdi:account-outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "299.000",
    description: "Dành cho người dùng thường xuyên",
    features: [
      "Tất cả tính năng Cơ bản",
      "Giảm 15% phí sạc",
      "Đặt lịch ưu tiên",
      "Thuê xe điện giảm 10%",
      "Hỗ trợ 24/7",
      "Tích điểm thưởng",
    ],
    icon: "mdi:star-circle-outline",
    popular: true,
  },
  {
    name: "Doanh nghiệp",
    price: "Liên hệ",
    description: "Giải pháp cho doanh nghiệp",
    features: [
      "Tất cả tính năng Pro",
      "Quản lý đội xe",
      "Báo cáo chi tiết",
      "API tích hợp",
      "Tài khoản quản trị",
      "Hỗ trợ riêng biệt",
    ],
    icon: "mdi:office-building-outline",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="md:py-20 min-h-screen">
      <div className="container flex flex-col mx-auto px-4 gap-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            <Icon icon="mdi:tag-outline" className="h-4 w-4" />
            Bảng giá
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">Chọn gói phù hợp với bạn</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Linh hoạt từ miễn phí đến gói doanh nghiệp, phù hợp với mọi nhu cầu sử dụng
          </p>
        </div>

        <div className="flex flex-col items-center ">
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-8">
            {plans.map((plan, index) => (
            <Card
              key={index}
              className={` p-8 bg-card border hover:shadow-2xl transition-all duration-300 relative ${
                plan.popular ? "ring-2 ring-green-600 scale-105" : ""
              } dark:bg-gray-900`}
            >
              {plan.popular && (
                <div className="absolute top-0 w-full rounded-tl rounded-tr text-center left-1/2 -translate-x-1/2 bg-green-600 text-green-100 text-sm font-bold">
                  Phổ biến nhất
                </div>
              )}

              <div className="space-y-6 h-full flex flex-col gap-4">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                    <Icon icon={plan.icon} className="h-7 w-7 text-green-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Liên hệ" && <span className="text-muted-foreground">đ/tháng</span>}
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-green-600 text-green-100 hover:bg-green-500"
                      : "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700"
                  }`}
                  size="lg"
                >
                  {plan.price === "Liên hệ" ? "Liên hệ ngay" : "Bắt đầu ngay"}
                </Button>

                <div className="space-y-3 pt-6 border-t border-border">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
