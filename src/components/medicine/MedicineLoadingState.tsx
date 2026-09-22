/**
 * MedicineLoadingState — Skeleton loading preview cards
 * Preserved faithfully from Stitch medicine_database design.
 */

export default function MedicineLoadingState({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`loading-skeleton-${i}`}
          className="p-space-lg rounded-xl bg-surface-container-lowest animate-pulse flex flex-col gap-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="h-6 w-36 bg-surface-container-high rounded"></div>
            <div className="h-5 w-14 bg-surface-container rounded-full"></div>
          </div>
          <div className="h-4 w-28 bg-surface-container rounded"></div>
          <div className="h-20 bg-surface-container-low rounded-lg"></div>
          <div className="h-8 w-24 bg-surface-container-high rounded"></div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-10 bg-surface-container rounded-lg"></div>
            <div className="h-10 bg-surface-container rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
