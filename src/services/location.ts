import axios from "axios";
import { SearchResult } from "../models/nominatim";

const searchResultsLimit = 10;

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function getSearchResults(query: string, format = "json") {
  const response = await http.get(
    `search?q=${query}&format=${format}&limit=${searchResultsLimit}`
  );
  return response.data.filter(
    (result: SearchResult) => result.type === "administrative"
  );
}

export async function getLocationData(osm_ids: string) {
  const response = await http.get(
    `lookup?osm_ids=${osm_ids}&format=json&extratags=1&polygon_geojson=1`
  );
  return response.data;
}
