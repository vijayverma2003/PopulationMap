import queryString from "query-string";
import { cleanHistory } from "../services/utils";
import { Favourite } from "../models/favourite";
import favouriteFillSVG from "../images/favouriteFill.svg";

interface SidebarProps {
  favourites: Favourite;
  onSettingFavourites: any;
}

function Sidebar({ favourites, onSettingFavourites }: SidebarProps) {
  const handleFavouriteDescriptionClick = (osm_id: string) => {
    window.location.search = queryString.stringify({
      osm_id,
      q: favourites[osm_id],
    });
  };

  const handleRemoveFavourite = (key: string) => {
    const userFavourites = { ...favourites };
    delete userFavourites[key];
    onSettingFavourites(userFavourites);
    localStorage.setItem("favourites", JSON.stringify(userFavourites));
  };

  const handleScreenMode = () => {
    document.body.classList.toggle("fullscreen-mode");
    if (document.body.classList.contains("fullscreen-mode"))
      localStorage.setItem("fullScreenMode", "on");
    else localStorage.setItem("fullScreenMode", "");
  };

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <h2>Favourites</h2>
        </div>

        {Object.keys(favourites).length > 0 ? (
          Object.keys(favourites).map((key) => (
            <div key={key} className="favourite">
              <button
                onClick={() => handleFavouriteDescriptionClick(key)}
                className="favourite-description"
              >
                {favourites[key]}
              </button>
              <button onClick={() => handleRemoveFavourite(key)}>
                <img src={favouriteFillSVG} alt="Star" />
              </button>
            </div>
          ))
        ) : (
          <div className="favourite">
            <p>No Favourites Found</p>
          </div>
        )}
      </div>

      <div>
        <button onClick={handleScreenMode} className="btn">
          Toggle Screen Mode
        </button>
        <button onClick={cleanHistory} className="btn-clean">
          Clear Search History
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
