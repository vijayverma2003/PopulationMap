import { LookupResult } from "../models/nominatim";
import { useEffect, useState } from "react";
import queryString from "query-string";

import { copyAddress } from "../services/utils";
import { createOSMId, getLocationData } from "../services/location";
import copySVG from "../images/copy.svg";
import favouriteSVG from "../images/favourite.svg";
import LoadingScreen from "./common/LoadingScreen";
import MapCanvas from "./MapCanvas";
import markerSVG from "../images/marker.svg";

interface MapDataContainerProps {
  onSettingFavourites: any;
}

function MapDataContainer({
  onSettingFavourites,
}: MapDataContainerProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<LookupResult | null>(
    null
  );

  useEffect(() => {
    const { osm_id } = queryString.parse(window.location.search);

    if (typeof osm_id === "string") {
      fetchAndSetLocationData(osm_id);
    } else fetchAndSetLocationData("R2315704");
  }, []);

  const fetchAndSetLocationData = async (osm_id: string) => {
    const result = await getLocationData(osm_id);
    setCurrentLocation(result[0]);
    setLoading(false);
  };

  const handleAddToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites") as string);
    const favourite = {
      [createOSMId(currentLocation!)]: currentLocation!.display_name,
    };
    if (!favourites) {
      localStorage.setItem("favourites", JSON.stringify(favourite));
      onSettingFavourites(favourite);
    } else {
      favourites = { ...favourite, ...favourites };
      localStorage.setItem("favourites", JSON.stringify(favourites));
      onSettingFavourites(favourites);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="map-data">
        <div className="map-container">
          {currentLocation && <MapCanvas result={currentLocation} />}
          <button
            onClick={handleAddToFavourites}
            className="icon-box add-to-favourite-icon"
          >
            <img src={favouriteSVG} alt="Add to favourites" />
          </button>
        </div>

        <header className="map-data-header">
          <div className="map-location">
            <img src={markerSVG} alt="Marker" />
            <h2>{currentLocation?.display_name}</h2>
          </div>
          <button onClick={copyAddress} className="icon-box">
            <img src={copySVG} alt="" />
          </button>
        </header>

        {currentLocation?.extratags && (
          <div className="location-data">
            <div>
              <h4 className="text-primary">Population</h4>
              <p>
                {currentLocation?.extratags["population"] ?? "Not available"}
              </p>
            </div>
            <div>
              <h4 className="text-primary">Census</h4>
              <p>
                {currentLocation?.extratags["census:population"] ??
                  "Not available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MapDataContainer;
