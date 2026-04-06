import type { FormEvent } from "react";
import type { SearchFilters as SearchFiltersType } from "../types/inventory";

const categoryOptions = [
  "",
  "Tools",
  "Safety",
  "Lighting",
  "Logistics",
  "Packaging",
  "Storage",
  "Electronics"
];

interface SearchFiltersProps {
  filters: SearchFiltersType;
  loading: boolean;
  onFilterChange: <K extends keyof SearchFiltersType>(key: K, value: SearchFiltersType[K]) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
}

export const SearchFilters = ({
  filters,
  loading,
  onFilterChange,
  onSubmit,
  onReset
}: SearchFiltersProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <label>
        Product Name
        <input
          type="text"
          placeholder="e.g. gloves"
          value={filters.q}
          onChange={(event) => onFilterChange("q", event.target.value)}
        />
      </label>

      <label>
        Category
        <select
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          {categoryOptions.map((item) => (
            <option value={item} key={item || "all"}>
              {item || "All categories"}
            </option>
          ))}
        </select>
      </label>

      <label>
        Min Price
        <input
          type="number"
          min={0}
          step="0.01"
          value={filters.minPrice}
          onChange={(event) => onFilterChange("minPrice", event.target.value)}
          placeholder="0"
        />
      </label>

      <label>
        Max Price
        <input
          type="number"
          min={0}
          step="0.01"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange("maxPrice", event.target.value)}
          placeholder="500"
        />
      </label>

      <div className="actions">
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <button type="button" className="secondary" onClick={onReset} disabled={loading}>
          Reset
        </button>
      </div>
    </form>
  );
};
