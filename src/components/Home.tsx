import { useEffect, useState } from "react";
import { Favourite } from "../models/favourite";
import Header from "./Header";
import MapDataContainer from "./MapDataContainer";
import Sidebar from "./Sidebar";

function Home() {
  const [favourites, setFavourites] = useState<Favourite>({});

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") as string);
    if (favourites) setFavourites(favourites);
  }, []);

  return (
    <main>
      <Header />
      <MapDataContainer onSettingFavourites={setFavourites} />
      <Sidebar favourites={favourites} onSettingFavourites={setFavourites} />
    </main>
  );
}

export default Home;
