import React from "react";

function Header(props) {
  return (
    <div className="header">
      <div className="contenedor-styles-header">
        <div>
          {props.isDarkMode === true ? (
            <img
              src="../recursos/styles/logo-mobile-modo-noct.svg"
              height="40px"
              alt="dark"
            />
          ) : (
            <img
              src="../recursos/styles/logo-desktop.svg"
              height="40px"
              alt="light"
            />
          )}
        </div>
        <button onClick={props.setIsDarkMode} className="btn-modo-dark">
          MODO {props.isDarkMode ? "LIGHT" : "DARK"}
        </button>
      </div>
    </div>
  );
}

export default Header;
