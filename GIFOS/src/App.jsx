import "./styles.css";
import { useState } from "react";
import Header from "./Header";
import Buscador from "./Buscador";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const manejarClick = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Header setIsDarkMode={manejarClick} isDarkMode={isDarkMode} />
      <Buscador />
    </div>
  );
}
