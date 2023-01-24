import { createOSMId } from "../services/location";
import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import { LookupResult } from "../models/nominatim";
import { useEffect } from "react";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View.js";

function MapCanvas({ result }: { result: LookupResult | null }) {
  useEffect(() => {
    if (result?.extratags) {
      let zoom = 6;

      if (
        result.extratags.border_type === "city" ||
        result.extratags.place === "city"
      )
        zoom = 10;
      else if (result.extratags.linked_place === "state") zoom = 5;
      else if (result.extratags.border_type?.startsWith("nation")) zoom = 2;

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

      const url = `${process.env.REACT_APP_API_URL}lookup?osm_ids=${createOSMId(
        result
      )}&format=geojson&polygon_geojson=1`;

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
  }, [result]);

  return <div id="map" />;
}

export default MapCanvas;
