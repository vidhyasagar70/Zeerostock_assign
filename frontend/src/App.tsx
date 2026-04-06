import { useEffect } from 'react'
import { SearchFeedback } from './components/SearchFeedback'
import { SearchFilters } from './components/SearchFilters'
import { SearchResultsTable } from './components/SearchResultsTable'
import { SearchSkeleton } from './components/SearchSkeleton'
import { SearchSummary } from './components/SearchSummary'
import { useInventorySearch } from './hooks/useInventorySearch'
import './App.css'

function App() {
  const { filters, results, loading, error, hasFilters, setFilter, runSearch, resetFilters } =
    useInventorySearch()

  useEffect(() => {
    void runSearch()
  }, [runSearch])

  return (
    <div className="page">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <main className="search-card">
        <header className="header">
          <h1>Zeerostock Inventory Search</h1>
          <p>Find surplus inventory from multiple suppliers with combined filters.</p>
        </header>

        <SearchFilters
          filters={filters}
          loading={loading}
          onFilterChange={setFilter}
          onSubmit={runSearch}
          onReset={resetFilters}
        />

        <SearchFeedback
          error={error}
          hasFilters={hasFilters}
          loading={loading}
          resultCount={results.length}
        />

        <SearchSummary results={results} />

        {loading ? <SearchSkeleton /> : null}

        {!loading ? <SearchResultsTable results={results} /> : null}
      </main>
    </div>
  )
}

export default App
