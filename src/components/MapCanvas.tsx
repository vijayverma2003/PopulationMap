import { useEffect } from "react";
import { createOSMId, getGeoJSONUrl } from "../services/location";
import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import { LookupResult } from "../models/nominatim";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View.js";

interface MapCanvasProps {
  result: LookupResult | null;
}

function MapCanvas({ result }: MapCanvasProps): JSX.Element {
  useEffect(() => {
    if (result?.extratags) {
      let zoom = 6;

      const { border_type, place, linked_place } = result.extratags;

      if (border_type === "city" || place === "city") zoom = 10;
      else if (linked_place === "state") zoom = 5;
      else if (border_type?.startsWith("nation")) zoom = 2;

      const coordinates = [parseFloat(result.lon), parseFloat(result.lat)];

      const map = new Map({
        view: new View({ center: fromLonLat(coordinates), zoom }),
        layers: [new TileLayer({ source: new OSM() })],
        target: "map",
      });

      const baseVector = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: getGeoJSONUrl(createOSMId(result)),
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
