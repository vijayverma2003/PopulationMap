import { getLocationData } from "../services/location";
import { LookupResult } from "../models/nominatim";
import { useEffect, useState } from "react";
import copySVG from "../images/copy.svg";
import MapCanvas from "./MapCanvas";
import markerSVG from "../images/marker.svg";
import queryString from "query-string";

function MapDataContainer() {
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
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(
      window.location.search
        ? window.location.toString() + "&shared=true"
        : window.location.toString() + "?shared=true"
    );
  };

  return (
    <div className="map-data">
      {currentLocation && <MapCanvas result={currentLocation} />}
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
            <p>{currentLocation?.extratags["population"] ?? "Not available"}</p>
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
  );
}

export default MapDataContainer;
