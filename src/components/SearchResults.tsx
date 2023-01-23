import { SearchResult } from "../models/nominatim";
import queryString from "query-string";
import React from "react";

interface SearchResultsProps {
  searchResults: SearchResult[];
  visible: boolean;
}

function SearchResults({ searchResults, visible }: SearchResultsProps) {
  const handleSubmit = (e: React.FormEvent, result: SearchResult) => {
    e.preventDefault();

    const osm_id = result.osm_type[0].toUpperCase() + result.osm_id;

    const q = queryString.stringify({
      q: result.display_name,
      osm_id,
    });

    window.location.search = q;
  };

  const handleBlur = () => {
    console.log("hello");
    const modal = document.querySelector("dialog");
    modal?.close();
  };

  return (
    <dialog onBlur={handleBlur} open={visible} className="search-results">
      <h3>Search Results</h3>
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
