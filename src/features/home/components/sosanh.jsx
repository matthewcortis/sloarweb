
export default function SoSanh3Pha() {
    return (
        <div className="relative w-full">


            <div className="w-full flex flex-col gap-6 px-4 py-6">


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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:justify-items-center text-black font-sans text-[14px] md:text-[16px]">

                        {/* Left */}
                        <div className="flex flex-col gap-4 items-center text-center bg-white rounded-[12px] p-6 w-full md:w-[411px] md:h-[274px] leading-[24px]">
                            <h4 className="font-[600] text-[16px] md:text-[18px] leading-[24px]">3 pha Áp Thấp</h4>
                            <div className="flex flex-col gap-1">
                                <p>Biến tần áp thấp</p>
                                <p>Max công suất 15 kW</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Pin lithium áp thấp</p>
                                <p>Max công suất 30 kW</p>
                            </div>
                            <p>Sạc xả kém hơn</p>
                            <p>Hiệu suất chuyển đổi thấp hơn</p>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col gap-4 items-center text-center bg-white rounded-[12px] p-6 w-full md:w-[411px] md:h-[274px] leading-[24px]">
                            <h4 className="font-[600] text-[16px] md:text-[18px] leading-[24px]">3 pha Áp Cao</h4>
                            <div className="flex flex-col gap-1">
                                <p>Biến tần áp cao</p>
                                <p>Max công suất 50 kW</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Pin lithium áp cao</p>
                                <p>Công suất không giới hạn</p>
                            </div>
                            <p>Sạc xả nhanh hơn</p>
                            <p>Hiệu suất chuyển đổi cao hơn</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
