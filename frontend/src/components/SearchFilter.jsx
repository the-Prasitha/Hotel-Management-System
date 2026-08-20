function SearchFilter({
  title,
  minPrice,
  maxPrice,
  onTitleChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="search-filter">
      <div className="filter-field">
        <label>Search by title</label>

        <input
          type="text"
          placeholder="Search hotels..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="filter-field">
        <label>Min Price</label>

        <input
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
        />
      </div>

      <div className="filter-field">
        <label>Max Price</label>

        <input
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button onClick={onSearch}>
          Search
        </button>

        <button onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;