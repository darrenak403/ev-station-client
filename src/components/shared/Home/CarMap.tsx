"use client"

import { Icon } from "@iconify/react"
import { Card } from "@heroui/react"
import { Button } from "@heroui/react"
import Image from "next/image"

const vehicles = [
  {
    name: "VinFast VF e34",
    type: "SUV điện",
    range: "300 km",
    seats: "5 chỗ",
    price: "800.000",
    image: "/Images/Car/Car1.png",
  },
  {
    name: "Tesla Model 3",
    type: "Sedan cao cấp",
    range: "450 km",
    seats: "5 chỗ",
    price: "1.500.000",
    image: "/Images/Car/Car2.png",
  },
  {
    name: "Hyundai Kona Electric",
    type: "Crossover",
    range: "380 km",
    seats: "5 chỗ",
    price: "900.000",
    image: "/Images/Car/Car3.png",
  },
]

const CarMap = () => {
  return (
    <section className="md:py-10 relative overflow-hidden min-h-screen">
      <div className="container flex flex-col mx-auto px-4 gap-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            <Icon icon="mdi:car-electric" className="h-4 w-4" />
            Thuê xe điện
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Xe điện đa dạng
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Nhiều mẫu xe điện từ sedan đến SUV, đáp ứng mọi nhu cầu di chuyển của bạn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {vehicles.map((vehicle, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group dark:bg-gray-900"
            >
              <div className="relative h-56 overflow-hidden bg-muted">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-700 text-green-100 px-3 py-1 rounded-full text-sm font-bold">
                  Có sẵn
                </div>
              </div>

              <div className="flex flex-col px-9 gap-4 py-6">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-1">{vehicle.name}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50">
                    <Icon icon="mdi:speedometer" className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-muted-foreground">Phạm vi</span>
                    <span className="text-sm font-semibold text-foreground">{vehicle.range}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50">
                    <Icon icon="mdi:seat-passenger" className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-muted-foreground">Chỗ ngồi</span>
                    <span className="text-sm font-semibold text-foreground">{vehicle.seats}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50">
                    <Icon icon="mdi:lightning-bolt" className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-muted-foreground">Sạc nhanh</span>
                    <span className="text-sm font-semibold text-foreground">30p</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 gap-1 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Từ</p>
                    <p className="text-2xl font-bold text-green-600">
                      {vehicle.price}đ<span className="text-sm text-muted-foreground">/ngày</span>
                    </p>
                  </div>
                  <Button className="bg-green-700 text-green-100 hover:bg-green-600">
                    Thuê ngay
                    <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="border-green-700 text-green-700 hover:bg-green-600/10 bg-transparent"
          >
            Xem tất cả xe điện
            <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
export default CarMap;
