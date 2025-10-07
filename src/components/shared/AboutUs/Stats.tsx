"use client"
import Image from "next/image"
const stats = [
  {
    image: "/Images/Blog/Charger.png",
    value: "500+",
    label: "Trạm Sạc",
    description: "Trên toàn quốc",
  },
  {
    image: "/Images/Blog/Car-EV.png",
    value: "200+",
    label: "Xe Điện",
    description: "Đa dạng mẫu mã",
  },
  {
    image: "/Images/Blog/Customer.png",
    value: "50K+",
    label: "Khách Hàng",
    description: "Tin tưởng sử dụng",
  },
  {
    image: "/Images/Blog/CO2.png",
    value: "2M+",
    label: "Kg CO₂",
    description: "Đã giảm thiểu",
  },
]

const Stats = () => {
  return (
    <section className="md:py-20 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container flex flex-col gap-8 mx-auto px-4 relative dark:text-white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold mb-6 text-balance">Con Số Ấn Tượng</h2>

          <p className="text-lg text-primary-foreground/90 text-pretty">
            Những thành tựu chúng tôi đạt được trong hành trình xây dựng tương lai xanh
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex flex-col gap-1 group">
              <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden mb-4 group-hover:bg-white/20 transition-colors">
                <Image
                  src={stat.image || "/placeholder.svg"}
                  alt={stat.label}
                  fill
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="text-5xl font-bold">{stat.value}</div>

              <div className="text-xl font-semibold">{stat.label}</div>

              <div className="text-sm text-primary-foreground/80">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Stats;
