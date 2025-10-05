"use client";
import CountUp from "@/components/styled/CountUp/CountUp";
const Rate = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
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
              <p className="text-2xl text-muted-foreground mt-1">Khách hàng hài lòng</p>
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
              <CountUp
                to={4.9}
                duration={2}
                className="text-7xl font-bold text-green-500"
              />
              <p className="text-2xl text-muted-foreground mt-1">Đánh giá tích cực</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Rate;
