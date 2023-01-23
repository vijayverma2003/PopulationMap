import React from "react";
import Header from "./Header";
import MapDataContainer from "./MapDataContainer";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <main>
      <Header />
      <MapDataContainer />
      <Sidebar />
    </main>
  );
}

export default Home;
