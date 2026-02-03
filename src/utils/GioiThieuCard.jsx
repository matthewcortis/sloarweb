const InfoCard = ({ image, text }) => {
  const hasImage = !!image;
  const hasText = !!text;

  return (
    <div
      className="
        w-full
        min-h-[140px]
        bg-[#F6F6F6]
        rounded-[12px]
        p-4
        flex
        items-center
        justify-center

        sm:w-[266px]
        sm:h-[156px]
      "
    >
      <div
        className={`
          w-full
          flex flex-col
          items-center
          text-center
          gap-3
          ${hasImage && hasText ? "justify-start" : "justify-center"}
        `}
      >
        {hasImage && (
          <img
            src={image}
            alt=""
            className="w-[42px] h-[42px] object-contain shrink-0"
          />
        )}

        {hasText && (
          <p className="
            text-[#48484D]
            text-sm
            leading-snug
            whitespace-pre-line
            break-words
          ">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
