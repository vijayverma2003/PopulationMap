import React, { useEffect, useState } from "react";

interface SearchDetailsProps {
  inputDetailsRef: React.RefObject<HTMLDivElement>;
}

interface SearchHistory {
  [osm_id: string]: string;
}

function SearchDetails({ inputDetailsRef }: SearchDetailsProps) {
  const [history, setHistory] = useState<SearchHistory>({});

  useEffect(() => {
    let historyString = localStorage.getItem("history");
    if (historyString && typeof historyString === "string") {
      let history = JSON.parse(historyString);
      setHistory(history);
    } else localStorage.setItem("history", "{}");
  }, []);

  const handleClick = (key: string) => {
    window.location.search = `osm_id=${key}`;
  };

  return (
    <div ref={inputDetailsRef} className="input-details">
      <div className="input-details-content">
        <div className="search-result">
          <h4>Search History</h4>
          <ul className="search-result-list">
            {Object.keys(history).map((key, index) => {
              return (
                index < 5 && (
                  <li key={index} className="search-result-list-item">
                    <button
                      className="search-result-button"
                      type="button"
                      onClick={() => handleClick(key)}
                    >
                      {history[key]}
                    </button>
                  </li>
                )
              );
            })}
          </ul>
          <h4 className="text-primary link-chevron">View Search History</h4>
        </div>
      </div>
    </div>
  );
}

export default SearchDetails;
