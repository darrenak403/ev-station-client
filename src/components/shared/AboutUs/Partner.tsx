"use client"

import { Icon } from "@iconify/react"

const partners = [
  { name: "VinFast", logo: "mdi:car-electric" },
  { name: "EVN", logo: "mdi:lightning-bolt" },
  { name: "Vingroup", logo: "mdi:domain" },
  { name: "Thaco", logo: "mdi:factory" },
  { name: "Hyundai", logo: "mdi:car" },
  { name: "Tesla", logo: "mdi:car-electric-outline" },
]

const Partner = () => {
  return (
    <section className="py-20 overflow-hidden relative">
      <div className="container flex flex-col mx-auto px-4 gap-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-green-600 mb-4">
            <Icon icon="mdi:handshake" className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Đối Tác</span>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Đối Tác Chiến Lược</h2>

          <p className="text-lg text-muted-foreground text-pretty">
            Hợp tác cùng các thương hiệu hàng đầu để mang đến trải nghiệm tốt nhất
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card border border-border text-green-600 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-500 hover:shadow-lg transition-all duration-300 group aspect-square"
            >
              <Icon
                icon={partner.logo}
                className="w-12 h-12 text-muted-foreground group-hover:text-green-500 transition-colors mb-3"
              />
              <div className="text-sm font-medium text-foreground text-center">{partner.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 bg-green-500 text-green-50 px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
            <Icon icon="mdi:briefcase" className="w-5 h-5" />
            Trở Thành Đối Tác
          </button>
        </div>
      </div>
    </section>
  )
}
export default Partner;
