import banertext from '../../../../assets/banertext.png';
import banner from '../../../../assets/baner.png';

export default function BannerSolar() {
  return (
    <div className="w-full mt-[50px] px-[16px] xl:px-[80px]">
      <div className="flex justify-center">
        <div className="flex flex-col-reverse lg:flex-row max-w-[1280px] w-full">

          {/* Khối bên trái */}
          <div
            className="
              lg:w-[737px] lg:h-[542px]
              w-full h-auto
              rounded-b-[12px] lg:rounded-l-[12px] lg:rounded-b-none
              p-4 lg:p-8
              bg-white
              flex flex-col gap-6
            "
          >
            <img
              src={banertext}
              alt="banner-left"
              className="
                w-full
                h-auto lg:h-full
                object-cover
                rounded-b-[12px] lg:rounded-l-[12px]
              "
            />
          </div>

          {/* Khối bên phải */}
          <div
            className="
              lg:w-[542px] lg:h-[542px]
              w-full h-auto
              rounded-t-[12px] lg:rounded-r-[12px] lg:rounded-t-none
              overflow-hidden
            "
          >
            <img
              src={banner}
              alt="banner-right"
              className="
                w-full
                h-auto lg:h-full
                object-cover
                rounded-t-[12px] lg:rounded-r-[12px]
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}
