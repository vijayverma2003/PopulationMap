import { LookupResult } from "../models/nominatim";
import { useEffect } from "react";

import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View.js";

function MapCanvas({ result }: { result: LookupResult | null }) {
  useEffect(() => {
    if (result) {
      console.log(result);
      let zoom = 6;

      if (
        result.extratags.border_type === "city" ||
        result.extratags.place === "city"
      )
        zoom = 10;

      if (result.extratags.linked_place === "state") zoom = 5;
      if (result.extratags.border_type?.startsWith("nation")) zoom = 2;

      const view = new View({
        center: fromLonLat([parseFloat(result.lon), parseFloat(result.lat)]),
        zoom,
      });

      const map = new Map({
        view,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map",
      });

      const url = `${process.env.REACT_APP_API_URL}lookup?osm_ids=${
        result.osm_type[0].toUpperCase() + result.osm_id
      }&format=geojson&polygon_geojson=1`;

      const baseVector = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url,
        }),
        style: {
          "fill-color": "rgba(255, 255, 255, 0.3)",
          "stroke-color": "rgba(200, 33, 0, 0.9)",
          "stroke-width": 2,
        },
      });

      map.addLayer(baseVector);
    }
  }, []);
  return (
    <div id="map" className="map-container">
      <button className="icon-box add-to-favourite-icon">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2875 9.79333L16.0442 9.33833L13.9967 4.5175C13.6284 3.64 12.3717 3.64 12.0034 4.5175L9.95585 9.34917L4.72335 9.79333C3.77002 9.86917 3.38002 11.0608 4.10585 11.6892L8.08168 15.1342L6.89002 20.2475C6.67335 21.1792 7.68085 21.9158 8.50418 21.4175L13 18.7092L17.4958 21.4283C18.3192 21.9267 19.3267 21.19 19.11 20.2583L17.9184 15.1342L21.8942 11.6892C22.62 11.0608 22.2408 9.86917 21.2875 9.79333ZM13 16.6833L8.92668 19.1425L10.01 14.5058L6.41335 11.3858L11.1584 10.9742L13 6.60833L14.8525 10.985L19.5975 11.3967L16.0009 14.5167L17.0842 19.1533L13 16.6833Z"
            fill="#FFE600"
          />
        </svg>
      </button>
    </div>
  );
}

export default MapCanvas;
