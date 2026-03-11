import checkWhite from "../../../assets/icons/check_write.svg";
import checkRed from "../../../assets/icons/check_red.svg";
import checkGreen from "../../../assets/icons/check_green.svg";

const SavingBadge = ({
  value,
  bgColor = "#E6F4ED",
  textColor = "#059549",
  iconColor = "#37AA6D",
}) => {
  const normalizedIconColor = `${iconColor ?? ""}`.trim().toUpperCase();
  const iconSrc =
    normalizedIconColor === "#EE4037"
      ? checkRed
      : normalizedIconColor === "#FFFFFF"
      ? checkWhite
      : checkGreen;

  return (
    <div
      className="
        flex items-center
        gap-[11px]
        px-4 py-2
        rounded-[12px]
        opacity-100
      "
      style={{ backgroundColor: bgColor }}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="w-[18px] h-[18px] shrink-0"
      />

      {/* Text */}
      <span
        className="
          font-normal
          text-[16px]
          leading-[19px]
          tracking-[0%]
          w-[243px]
          h-[19px]
          font-['SF_Pro_Display']
        "
        style={{ color: textColor }}
      >
        {value}
      </span>
    </div>
  );
};

export default SavingBadge;
