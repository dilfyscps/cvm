import type { ReactNode } from "react";

type BrowsePanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  filter: string;
  onFilterChange: (value: string) => void;
  count: number;
  countLabel?: string;
  extraSlot?: ReactNode;
};

export default function BrowsePanel({
  search,
  onSearchChange,
  searchPlaceholder,
  filter,
  onFilterChange,
  count,
  countLabel = "Packs available",
  extraSlot,
}: BrowsePanelProps) {
  return (
    <section className="container-app pb-6">
      <div className="glass-card p-4 sm:p-6">
        <div className="glass-content browse-panel-grid">
          <div className="min-w-0">
            <p className="text-label mb-2">Search</p>
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="search-input !pl-4"
              enterKeyHint="search"
            />
          </div>
          <div className="min-w-0">
            <p className="text-label mb-2">Filter</p>
            <div className="segmented-control">
              {[
                ["ALL", "All"],
                ["SFW", "SFW"],
                ["NSFW", "NSFW+"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  data-active={filter === value ? "true" : undefined}
                  onClick={() => onFilterChange(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="stat-glass min-w-[7rem]">
            <p className="stat-glass__value">{count}</p>
            <p className="text-label mt-1">{countLabel}</p>
          </div>
        </div>
        {extraSlot && <div className="glass-content mt-4">{extraSlot}</div>}
      </div>
    </section>
  );
}
