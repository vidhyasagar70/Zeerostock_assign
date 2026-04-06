import type { SearchResult } from "../types/inventory";

interface SearchResultsTableProps {
  results: SearchResult[];
}

export const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.supplierName}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
