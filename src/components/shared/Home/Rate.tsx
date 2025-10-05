"use client";
import CountUp from "@/components/styled/CountUp/CountUp";
import { Icon } from "@iconify/react";
const Rate = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            <Icon icon="mdi:account-heart-outline" className="h-4 w-4" />
            Khách hàng nói gì
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Hơn 10,000+ khách hàng hài lòng
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Đánh giá thực tế từ khách hàng đã sử dụng dịch vụ của chúng tôi
          </p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-8 p-8 rounded-2xl bg-muted/50">
            <div className="text-center">
              <div>
                <CountUp
                  to={10000}
                  duration={2}
                  className="text-7xl font-bold text-green-500"
                />
                <span className="text-7xl font-bold text-green-500">+</span>
              </div>
              <p className="text-2xl text-muted-foreground mt-1">
                Khách hàng hài lòng
              </p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <CountUp
                to={500}
                duration={2}
                className="text-7xl font-bold text-green-500"
              />
              <p className="text-2xl text-muted-foreground mt-1">Trạm sạc</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div>
                <CountUp
                  to={4.9}
                  duration={2}
                  className="text-7xl font-bold text-green-500"
                />
                <span className="text-7xl font-bold text-green-500">/5</span>
              </div>

              <p className="text-2xl text-muted-foreground mt-1">
                Đánh giá tích cực
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Rate;
