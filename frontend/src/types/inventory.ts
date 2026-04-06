export interface SearchFilters {
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

export interface SearchResult {
  id: string;
  productName: string;
  category: string;
  price: number;
  supplierName: string;
}

export interface ApiErrorPayload {
  message?: string;
}
