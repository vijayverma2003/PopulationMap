import queryString from "query-string";
import { useEffect, useState } from "react";

interface Favourite {
  [osm_id: string]: string;
}

function Sidebar() {
  const [favourites, setFavourites] = useState<Favourite>({});

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") as string);
    setFavourites(favourites);
  }, []);

  const handleFavouriteDescriptionClick = (osm_id: string) => {
    window.location.search = queryString.stringify({
      osm_id,
      q: favourites[osm_id],
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Favourites</h2>
      </div>
      <div className="favourite">
        {Object.keys(favourites).map((key) => (
          <button
            key={key}
            onClick={() => handleFavouriteDescriptionClick(key)}
            className="favourite-description"
          >
            {favourites[key]}
          </button>
        ))}

        <button>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1938 7.91L12.9588 7.5425L11.305 3.64875C11.0075 2.94 9.99253 2.94 9.69503 3.64875L8.04128 7.55125L3.81503 7.91C3.04503 7.97125 2.73003 8.93375 3.31628 9.44125L6.52753 12.2238L5.56503 16.3538C5.39003 17.1063 6.20378 17.7012 6.86878 17.2987L10.5 15.1112L14.1313 17.3075C14.7963 17.71 15.61 17.115 15.435 16.3625L14.4725 12.2238L17.6838 9.44125C18.27 8.93375 17.9638 7.97125 17.1938 7.91Z"
              fill="#F7DF08"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
