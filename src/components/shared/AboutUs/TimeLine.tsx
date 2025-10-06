"use client"
import Image from "next/image"

const timeline = [
  {
    year: "2020",
    title: "Khởi Đầu",
    description: "Thành lập công ty và khai trương trạm sạc đầu tiên tại Hà Nội",
    image: "/Images/Blog/StartUp.png",
  },
  {
    year: "2021",
    title: "Mở Rộng",
    description: "Mở rộng ra 10 tỉnh thành với 50 trạm sạc và ra mắt dịch vụ thuê xe",
    image: "/Images/Blog/Cover.png",
  },
  {
    year: "2022",
    title: "Phát Triển",
    description: "Đạt mốc 200 trạm sạc và 10,000 khách hàng, nhận đầu tư Series A",
    image: "/Images/Blog/GrowthUp.png",
  },
  {
    year: "2023",
    title: "Dẫn Đầu",
    description: "Trở thành nền tảng xe điện số 1 Việt Nam với 400 trạm sạc",
    image: "/Images/Blog/FirstChoice.png",
  },
  {
    year: "2024",
    title: "Vươn Xa",
    description: "Vượt mốc 500 trạm sạc và chuẩn bị mở rộng ra Đông Nam Á",
    image: "/Images/Blog/Asia.png",
  },
]

const TimeLine = () => {
  return (
    <section className="md:py-20 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 mb-4">
            <span className="text-sm font-semibold uppercase tracking-wide">Hành Trình</span>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Dấu Mốc Phát Triển</h2>

          <p className="text-lg text-muted-foreground text-pretty">
            Từng bước tiến của chúng tôi trong việc xây dựng hệ sinh thái xe điện
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-3xl font-bold text-green-500 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-4 border-background shadow-lg z-10">
                    <span className="text-sm font-bold text-white">{item.year.slice(-2)}</span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TimeLine;