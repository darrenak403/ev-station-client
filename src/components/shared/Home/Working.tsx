import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    icon: "mdi:map-search-outline",
    title: "Tìm kiếm",
    description:
      "Chọn vị trí bạn muốn đến",
  },
  {
    number: "02",
    icon: "mdi:car-electric-outline",
    title: "Chọn xe",
    description: "Chọn xe điện phù hợp",
  },
  {
    number: "03",
    icon: "mdi:credit-card-outline",
    title: "Thanh toán",
    description:
      "Thanh toán an toàn và nhanh chóng",
  },
  {
    number: "04",
    icon: "mdi:car-electric-outline",
    title: "Trải nghiệm",
    description:
      "Nhận xe và tận hưởng",
  },
];

const Working = () => {
  return (
    <section className="md:py-10 relative overflow-hidden min-h-150 bg-gray-100 dark:bg-gray-950">
        <div className="container flex flex-col mx-auto px-4 gap-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
              <Icon icon="mdi:information-outline" className="h-4 w-4" />
              Cách thức hoạt động
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
              Chỉ 4 bước đơn giản
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Trải nghiệm dịch vụ của chúng tôi dễ dàng và nhanh chóng chỉ trong
              vài phút
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 mx-auto">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-green-to-r from-green-100 via-green-500 to-green-200" />
            {steps.map((step, index) => {
              const imgNames = ['FindTheCar', 'ChooseTheCar', 'Payment', 'Enjoy'];
              const imgSrc = `/Images/booking/${imgNames[index]}.png`;
              return (
                <div key={index}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className=" rounded-full overflow-hidden">
                        <Image src={imgSrc} alt={step.title} width={150} height={150} className="object-contain" />
                      <div className="absolute top-0 right-8 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </section>
  );
};

export default Working;
