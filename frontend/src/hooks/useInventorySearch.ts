import { useCallback, useMemo, useState } from "react";
import type { SearchFilters, SearchResult } from "../types/inventory";
import { fetchSearchResults } from "../api/searchApi";

const initialFilters: SearchFilters = {
  q: "",
  category: "",
  minPrice: "",
  maxPrice: ""
};

export const useInventorySearch = () => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFilters = useMemo(
    () => Boolean(filters.q.trim() || filters.category || filters.minPrice || filters.maxPrice),
    [filters]
  );

  const setFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
  };

  const validatePriceRange = (): string | null => {
    const min = filters.minPrice ? Number(filters.minPrice) : undefined;
    const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;

    if ((filters.minPrice && Number.isNaN(min)) || (filters.maxPrice && Number.isNaN(max))) {
      return "Price values must be numeric.";
    }

    if (min !== undefined && max !== undefined && min > max) {
      return "Invalid price range. Ensure minPrice is less than or equal to maxPrice.";
    }

    return null;
  };

  const runSearch = useCallback(async (): Promise<void> => {
    const validationMessage = validatePriceRange();
    setError("");

    if (validationMessage) {
      setResults([]);
      setError(validationMessage);
      return;
    }

    setLoading(true);

    try {
      const response = await fetchSearchResults(filters);
      setResults(response);
    } catch (requestError) {
      setResults([]);
      setError(requestError instanceof Error ? requestError.message : "Unexpected error while searching.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const resetFilters = (): void => {
    setFilters(initialFilters);
    setResults([]);
    setError("");
  };

  return {
    filters,
    results,
    loading,
    error,
    hasFilters,
    setFilter,
    runSearch,
    resetFilters
  };
};
