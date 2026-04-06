interface SearchFeedbackProps {
  error: string;
  hasFilters: boolean;
  loading: boolean;
  resultCount: number;
}

export const SearchFeedback = ({ error, hasFilters, loading, resultCount }: SearchFeedbackProps) => {
  if (error) {
    return <p className="feedback error">{error}</p>;
  }

  if (!loading && resultCount === 0) {
    return (
      <p className="feedback empty">
        {hasFilters
          ? "No results found."
          : "No inventory available right now. Try again after adding items."}
      </p>
    );
  }

  return null;
};
