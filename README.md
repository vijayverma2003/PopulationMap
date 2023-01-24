# Population & Map

![Population Map displaying boston on map and it's population!](https://github.com/vijayverma2003/PopulationMap/blob/main/src/images/app.png)

Population Map is a web application that allows users to view maps and population data for any location in the world. The app is built using TypeScript, React and OpenLayers, and utilizes the Nominatim API for geocoding and reverse geocoding.

## Installation

To run the app, you will need to have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository to your local machine:

```console
git clone https://github.com/vijayverma2003/PopulationMap.git
```

2. Navigate to the project directory:

```console
cd granular
```

3. Install the dependencies:

```console
npm install
```

4. Create a .env file in the root directory with Nominatim API base link.

```env
REACT_APP_API_URL=https://nominatim.openstreetmap.org/
```

5. Start the development server

```console
npm start
```

The app will be running at **http://localhost:3000/**




## Usage

1. Search for any location in the world by typing it in the search bar and press enter.

2. Click on any search result, then app will show that location on the map and will display population data. 

3. You can add the location to favourites and share the link by clicking the copy button.

4. For adding location to favourites click on the **Star** icon on the top right corner of the map.

5. You can zoom in and out, pan around on the map view.

6. You can also view your recent searches and clear them using **Clean History** button.


## Limitations

1. The Nominatim API has usage limits, please make sure to not exceed them.

2. The population data is based on Nominatim API, which may not be accurate for certain locations.

3. Population data for every location is not available.
