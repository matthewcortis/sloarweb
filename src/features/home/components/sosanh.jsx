export default function HybridSolarThreePhase() {
    return (
        <div className="relative w-full">

            {/* Nút góc phải */}
            <button
                className="
      absolute right-4 top-4
      text-[14px] md:text-[16px] font-medium text-[#E74444]
      hover:underline
    "
            >
                Tìm hiểu thêm
            </button>

            <div className="w-full flex flex-col gap-6 px-4 py-6">


                {/* Frame tiêu đề */}
                <div className="max-w-[846px] mx-auto flex flex-col gap-6">

                    {/* Title */}
                    <h2
                        className="
            text-center font-[600] text-[24px] md:text-[32px] leading-[120%] text-black
          "
                    >
                        Điện mặt trời Hy-Brid (Có pin lưu trữ) cho nguồn điện 3 pha
                    </h2>

                    {/* Subtitle */}
                    <p
                        className="
            text-center font-[400] text-[14px] md:text-[16px] leading-[22px] text-black
          "
                    >
                        Hệ thống điện mặt trời Hy-Brid, có bao gồm lithium nên có thể vận hành độc lập với nguồn lưới điện.
                        Giải pháp phù hợp với hóa đơn tiền điện trên 3 triệu/tháng. Đối với nguồn điện 3 pha, SolarMax cung cấp
                        giải pháp biến tần và pin lưu trữ điện áp thấp và áp cao
                    </p>
                </div>

                {/* Frame so sánh */}
                <div className="max-w-[846px] mx-auto flex flex-col gap-6">

                    {/* So sánh tiêu đề */}
                    <h3
                        className="
            text-center font-[600] text-[18px] md:text-[21px] leading-[100%]
            text-black
          "
                    >
                        So sánh điện mặt trời 3 pha áp thấp - áp cao
                    </h3>

                    {/* Nội dung so sánh */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-sans text-[14px] md:text-[16px] p-2 md:p-6">

                        {/* Left */}
                        <div className="flex flex-col gap-2 items-center text-center">
                            <h4 className="font-[600] text-[16px] md:text-[18px] mb-2">3 pha Áp Thấp</h4>
                            <p>Biến tần áp thấp</p>
                            <p>Max công suất 15 kW</p>
                            <p>Pin lithium áp thấp</p>
                            <p>Max công suất 30 kW</p>
                            <p>Sạc xả kém hơn</p>
                            <p>Hiệu suất chuyển đổi thấp hơn</p>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col gap-2 items-center text-center">
                            <h4 className="font-[600] text-[16px] md:text-[18px] mb-2">3 pha Áp Cao</h4>
                            <p>Biến tần áp cao</p>
                            <p>Max công suất 50 kW</p>
                            <p>Pin lithium áp cao</p>
                            <p>Công suất không giới hạn</p>
                            <p>Sạc xả nhanh hơn</p>
                            <p>Hiệu suất chuyển đổi cao hơn</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>  
    );
}
