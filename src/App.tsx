import "./styles/styles.css";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("fullScreenMode")) {
      document.body.classList.add("fullscreen-mode");
    }
  }, []);

  return <Home />;
}

export default App;
