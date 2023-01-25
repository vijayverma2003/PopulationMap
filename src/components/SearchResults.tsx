import { SearchResult } from "../models/nominatim";
import queryString from "query-string";
import React from "react";
import { createOSMId } from "../services/location";

interface SearchResultsProps {
  searchResults: SearchResult[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResults({
  searchResults,
  visible,
  setVisible,
}: SearchResultsProps) {
  const handleSubmit = (e: React.FormEvent, result: SearchResult) => {
    e.preventDefault();

    const q = queryString.stringify({
      q: result.display_name,
      osm_id: createOSMId(result),
    });

    window.location.search = q;
  };

  return (
    <dialog open={visible} className="search-results">
      <div className="search-results-header">
        <h3>Search Results</h3>
        <button onClick={() => setVisible(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
              fill="#555555"
            />
          </svg>
        </button>
      </div>
      <ul className="search-result-list">
        {searchResults?.map((result: SearchResult) => (
          <li key={result.place_id} className="search-result-list-item">
            <button
              className="search-result-button"
              type="button"
              onClick={(e) => handleSubmit(e, result)}
            >
              {result.display_name}
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export default SearchResults;
