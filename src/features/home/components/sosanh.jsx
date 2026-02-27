
export default function SoSanh3Pha() {
  return (
    <div className="relative w-full">
      {/* MOBILE */}
      <div className="w-full pb-5 md:hidden">
        <div className="mx-auto max-w-[846px]">
          <h3 className="text-left font-[600] text-[23px] leading-[29px] text-[#2B2B2B]">
            So sánh điện mặt trời 3 pha
            <br />
            áp thấp - áp cao
          </h3>

          <div className="mt-5 grid grid-cols-2 text-left text-[16px] leading-[24px] text-[#4B4B4B]">
            <div>
              <h4 className="font-[600] text-[18px] leading-[28px] text-[#2B2B2B]">3 pha Áp Thấp</h4>
              <div className="mt-3">
                <p>Biến tần áp thấp</p>
                <p>Max công suất 15 kW</p>
              </div>
              <div className="mt-3">
                <p>Pin lithium áp thấp</p>
                <p>Max công suất 30 kW</p>
              </div>
              <p className="mt-3">Sạc xả kém hơn</p>
              <p className="mt-3 leading-[24px]">
                Hiệu suất chuyển đổi
                <br />
                thấp hơn
              </p>
            </div>

            <div>
              <h4 className="font-[600] text-[18px] leading-[28px] text-[#2B2B2B]">3 pha Áp Cao</h4>
              <div className="mt-3">
                <p>Biến tần áp cao</p>
                <p>Max công suất 50 kW</p>
              </div>
              <div className="mt-3">
                <p>Pin lithium áp cao</p>
                <p>Công suất không giới hạn</p>
              </div>
              <p className="mt-3">Sạc xả nhanh hơn</p>
              <p className="mt-3 leading-[24px]">
                Hiệu suất chuyển đổi cao hơn
              
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP - GIU NGUYEN */}
      <div className="hidden w-full flex-col gap-6 px-4 py-6 md:flex">
        <div className="max-w-[846px] mx-auto flex flex-col gap-6">
          <h3
            className="
              text-center font-[600] text-[18px] md:text-[21px] leading-[100%]
              text-black
            "
          >
            So sánh điện mặt trời 3 pha áp thấp - áp cao
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:justify-items-center text-black text-[16px] md:text-[16px]">
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
