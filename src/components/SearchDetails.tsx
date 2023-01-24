import React, { useEffect, useState } from "react";

interface SearchDetailsProps {
  inputDetailsRef: React.RefObject<HTMLDivElement>;
  onSubmit: (e: React.FormEvent, q: string) => void;
}

function SearchDetails({
  inputDetailsRef,
  onSubmit,
}: SearchDetailsProps): JSX.Element {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    let historyString = localStorage.getItem("history");
    if (historyString && typeof historyString === "string") {
      let history = JSON.parse(historyString);
      setHistory(history);
    }
  }, []);

  return history.length > 0 ? (
    <div ref={inputDetailsRef} className="input-details">
      <div className="input-details-content">
        <div className="search-result">
          <h4>Search History</h4>
          <ul className="search-result-list">
            {history.map((query, index) => (
              <li key={index} className="search-result-list-item">
                <button
                  className="search-result-button"
                  type="button"
                  onClick={(e) => onSubmit(e, query)}
                >
                  {query}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default SearchDetails;
