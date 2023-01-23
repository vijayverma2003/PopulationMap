import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";

import { getSearchResults } from "../services/location";
import { SearchResult } from "../models/nominatim";
import SearchDetails from "./SearchDetails";
import SearchResults from "./SearchResults";

import searchIcon from "../images/search.svg";

function SearchInput() {
  const inputDetailsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>();
  const [modalVisible, setModelVisible] = useState(false);

  useEffect(() => {
    const { q, shared } = queryString.parse(window.location.search);
    if (!shared && typeof q === "string") setQuery(q);
  }, []);

  const handleInputDetails = () => {
    inputDetailsRef.current?.classList.toggle("input-details-expanded");
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent, q = query) => {
    e.preventDefault();

    if (!localStorage.getItem("history")) {
      const history = [q];
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      let history = JSON.parse(localStorage.getItem("history") as string);
      if (!history.includes(q)) history = [q, ...history];
      localStorage.setItem("history", JSON.stringify(history));
    }

    setTimeout(async () => {
      let results = await getSearchResults(q.toLowerCase());
      setSearchResults(results);
      setModelVisible(true);
    }, 200);
  };

  return (
    <div onFocus={handleInputDetails} onBlur={handleInputDetails}>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-box">
            <img src={searchIcon} alt="Search Icon" />
            <input
              value={query}
              id="search"
              type="search"
              placeholder="Search location"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </form>
      <SearchDetails
        onSubmit={handleSubmit}
        inputDetailsRef={inputDetailsRef}
      />
      <SearchResults
        searchResults={searchResults as SearchResult[]}
        visible={modalVisible}
      />
    </div>
  );
}

export default SearchInput;
