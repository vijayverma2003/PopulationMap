export interface SearchResult {
  boundingBox: number[];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: number;
  license: string;
  lon: number;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
}

export interface LookupResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  geojson?: {
    [key: string]: any;
  };
  address: {
    [key: string]: string;
  };
  extratags: {
    [key: string]: string;
  };
  boundingbox: string[];
}
