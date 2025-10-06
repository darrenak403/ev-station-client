"use client"
import Image from "next/image"
const OurMission = () => {
  return (
    <section className="md:py-20 bg-green-50 overflow-hidden relative dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Sứ Mệnh & Tầm Nhìn</span>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
            Định Hình Tương Lai Di Chuyển Bền Vững
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <div className="bg-white border border-border rounded-2xl p-8 overflow-hidden relative">
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image src="/Images/Blog/Missions.png" alt="Our Mission" width={400} height={200} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">Sứ Mệnh</h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Cung cấp giải pháp di chuyển điện toàn diện, tiện lợi và giá cả phải chăng, giúp mọi người dễ dàng chuyển
              đổi sang phương tiện xanh, góp phần bảo vệ môi trường và xây dựng tương lai bền vững cho thế hệ mai sau.
            </p>

            <ul className="space-y-3">
              {[
                "Mở rộng mạng lưới trạm sạc toàn quốc",
                "Cung cấp dịch vụ thuê xe điện chất lượng",
                "Giáo dục cộng đồng về xe điện",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-white border border-border rounded-2xl p-8 overflow-hidden relative">
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image src="/Images/Blog/Vision.png" alt="Our Vision" width={400} height={200} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">Tầm Nhìn</h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Trở thành nền tảng hàng đầu Đông Nam Á về hệ sinh thái xe điện, nơi mọi người có thể dễ dàng tiếp cận, sử
              dụng và tận hưởng lợi ích của công nghệ xanh, góp phần tạo nên một thế giới sạch hơn, tốt đẹp hơn.
            </p>

            <ul className="space-y-3">
              {[
                "Dẫn đầu thị trường xe điện Việt Nam",
                "Mở rộng ra khu vực Đông Nam Á",
                "Đạt 100% năng lượng tái tạo",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0 mt-0.5 text-green-600">★</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
export default OurMission;