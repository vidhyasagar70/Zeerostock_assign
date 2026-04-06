import { apiClient } from "./httpClient";
import type { SearchFilters, SearchResult } from "../types/inventory";

const toQueryParams = (filters: SearchFilters): Record<string, string> => {
  const params: Record<string, string> = {};

  if (filters.q.trim()) {
    params.q = filters.q.trim();
  }

  if (filters.category) {
    params.category = filters.category;
  }

  if (filters.minPrice) {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice) {
    params.maxPrice = filters.maxPrice;
  }

  return params;
};

export const fetchSearchResults = async (filters: SearchFilters): Promise<SearchResult[]> => {
  const response = await apiClient.get<SearchResult[]>("/search", {
    params: toQueryParams(filters)
  });

  return response.data;
};
