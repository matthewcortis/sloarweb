const toneStyles = {
  rose: {
    wrapper: "bg-[#FDECEC] border-[#F4C7C7]",
  },
  mint: {
    wrapper: "bg-[#EAF7F1] border-[#58B890]",
  },
  sky: {
    wrapper: "bg-[#E9F2FF] border-[#8BB6FF]",
  },
};

export default function PvOutCard({ title, months = [], average, tone = "rose" }) {
  const styles = toneStyles[tone] ?? toneStyles.rose;
  const groups = [];

  for (let i = 0; i < months.length; i += 4) {
    groups.push(months.slice(i, i + 4));
  }

  return (
    <div
      className={[
        "w-[252px] md:w-[290px] rounded-[12px] border px-[12px] py-[10px] flex-shrink-0",
        styles.wrapper,
      ].join(" ")}
    >
      <div className="text-[12px] md:text-[13px] font-semibold text-center text-[#111111]">
        {title}
      </div>

      <div className="mt-2 flex flex-col gap-2 text-[10px] md:text-[11px] text-[#1F2933]">
        {groups.map((group, groupIndex) => (
          <div key={`${title}-group-${groupIndex}`} className="grid grid-cols-4 gap-y-1">
            {group.map((item) => (
              <div
                key={`${title}-${item.label}-label`}
                className="text-center font-semibold"
              >
                {item.label}
              </div>
            ))}
            {group.map((item) => (
              <div
                key={`${title}-${item.label}-value`}
                className="text-center"
              >
                {item.value}
              </div>
            ))}
          </div>
        ))}
      </div>

      {average ? (
        <div className="mt-2 border-t border-black/10 pt-2 text-[10px] md:text-[11px] font-semibold text-center text-[#111111]">
          {average}
        </div>
      ) : null}
    </div>
  );
}
