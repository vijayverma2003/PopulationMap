import { SearchResult } from "../models/nominatim";
import queryString from "query-string";
import React from "react";
import { createOSMId } from "../services/location";

interface SearchResultsProps {
  searchResults: SearchResult[];
  visible: boolean;
}

function SearchResults({ searchResults, visible }: SearchResultsProps) {
  const handleSubmit = (e: React.FormEvent, result: SearchResult) => {
    e.preventDefault();

    const q = queryString.stringify({
      q: result.display_name,
      osm_id: createOSMId(result),
    });

    window.location.search = q;
  };

  window.addEventListener("click", (e): void => {
    const dialog = document.querySelector("dialog");
    if (!(e.target instanceof HTMLDialogElement) && dialog?.open)
      document.querySelector("dialog")?.close();
  });

  return (
    <dialog open={visible} className="search-results">
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
