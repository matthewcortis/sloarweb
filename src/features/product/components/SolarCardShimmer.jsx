export default function SolarCardShimmer() {
  return (
    <div className="w-[302px] h-[699px] rounded-[12px] bg-white shadow overflow-hidden">
      {/* shimmer overlay */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

        <div className="relative z-10">
          {/* Title */}
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-[278px] bg-gray-200 rounded-[12px]" />
          </div>

          {/* Save */}
          <div className="px-3 py-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>

          {/* Price */}
          <div className="py-4 flex flex-col items-center gap-2">
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
          </div>

          {/* Info */}
          <div className="px-3 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between gap-4">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
              </div>
            ))}

            <div className="mt-4 flex gap-2">
              <div className="h-[44px] bg-gray-200 rounded flex-1" />
              <div className="h-[44px] bg-gray-200 rounded flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
