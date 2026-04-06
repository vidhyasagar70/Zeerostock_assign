import type { SearchResult } from "../types/inventory";

interface SearchSummaryProps {
  results: SearchResult[];
}

export const SearchSummary = ({ results }: SearchSummaryProps) => {
  if (results.length === 0) {
    return null;
  }

  const totalItems = results.length;
  const minPrice = Math.min(...results.map((item) => item.price));
  const maxPrice = Math.max(...results.map((item) => item.price));
  const averagePrice =
    results.reduce((sum, current) => sum + current.price, 0) / totalItems;

  return (
    <section className="summary-grid" aria-label="Search summary">
      <article className="summary-card">
        <h3>Total Matches</h3>
        <p>{totalItems}</p>
      </article>
      <article className="summary-card">
        <h3>Min Price</h3>
        <p>${minPrice.toFixed(2)}</p>
      </article>
      <article className="summary-card">
        <h3>Max Price</h3>
        <p>${maxPrice.toFixed(2)}</p>
      </article>
      <article className="summary-card">
        <h3>Avg Price</h3>
        <p>${averagePrice.toFixed(2)}</p>
      </article>
    </section>
  );
};
