import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { getSearchResults } from "../services/location";
import { SearchResult } from "../models/nominatim";
import { storeHistory } from "../services/utils";
import SearchDetails from "./SearchDetails";
import SearchResults from "./SearchResults";
import searchIcon from "../images/search.svg";

function SearchInput(): JSX.Element {
  const inputDetailsRef = useRef<HTMLDivElement>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>();

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

  const handleSubmit = async (e: React.FormEvent, q = query) => {
    e.preventDefault();

    storeHistory(q);

    let results = await getSearchResults(q.toLowerCase());
    setSearchResults(results);
    setModalVisible(true);
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
        setVisible={setModalVisible}
      />
    </div>
  );
}

export default SearchInput;
