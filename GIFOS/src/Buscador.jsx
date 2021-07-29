import React, { useState } from "react";

function Buscador() {
  let [search, setSearch] = useState(""); //lo que sea que esté escrito en el buscador
  let [gifs, setGifs] = useState([]); // los gifs que trae la API
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  const GIF_API = `https://api.giphy.com/v1/gifs/search?api_key=IKcI1wmab6fWlbAo64uVzCnDvZKFXOEO&q=${search}&limit=12&offset=0&rating=g&lang=en`;
  const manejarEnter = (e) => {
    e.preventDefault(); //para que no refresque toda la página
    setSearch(""); // para que cuando se presiona enter o botón buscar se borre lo que sea que esté en el input de texto
  };

  let searchGif = () => {
    if (search.length > 0) {
      setLoading(true);
      fetch(GIF_API + search)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          if (result.data.length > 0) {
            console.log(result.data);
            setGifs(
              result.data.map((gif) => {
                return gif.images.fixed_height.url; //propiedades del objeto del gif
              })
            );
            setError(false);
          } else {
            setError(true);
            setGifs([]);
          }
        })
        .catch((e) => {
          setLoading(false);
          alert("algo anda mal");
          console.log(e);
        });
    }
  };

  function notFound(gifs, search) {
    if (search === "" && !error && gifs.length === 0) {
      //cuando presiono enter es igual a un ""?
      return (
        <div>
          <h1 className="renderizado-titulos">
            Para ver gifs realiza una búsqueda
          </h1>
        </div>
      );
    }
    if (error) {
      return (
        <h1 className="mensaje-error">ups! no hay gifs para tu búsqueda</h1>
      );
    }
    if (gifs.length > 0 && !error) {
      return (
        <div>
          <h1 className="renderizado-titulos">resultados de la busqueda</h1>
        </div>
      );
    }
  }

  function titulos() {
    if (gifs.length > 0) {
      return <h1 className="renderizado-titulos">Resultados de la búsqueda</h1>;
    } else {
      return (
        <div>
          <h1 className="renderizado-titulos">
            Para ver gifs realiza una búsqueda
          </h1>
        </div>
      );
    }
  }
  return (
    <div className="buscador">
      <div className="titulo-buscador">
        ¡Inspirate y busca los mejores <span>GIFS!</span>
      </div>
      <div className="container-img-personas-buscador">
        <img
          className="img-personas"
          src="../recursos/styles/ilustra_header.svg"
          alt="imagen"
          width="35%"
        />
        <div>
          <form onSubmit={manejarEnter}>
            <input
              className="input-buscador"
              type="text"
              placeholder="Buscar gifs"
              value={search}
              onChange={(e) => setSearch(e.target.value)} //Para que se vea lo que escribo en el buscador
            />
            <button onClick={searchGif} className="btn-buscar">
              <img
                src="../recursos/styles/icon-search-mod-noc.svg"
                height="15px"
                alt="icono-busqueda"
              />
            </button>
          </form>
        </div>
      </div>
      {notFound(gifs, search)}
      <div className="result">
        {(() => {
          if (loading) {
            return (
              <div className="loading">
                <div className="loader">loading...</div>
              </div>
            );
          }
          if (!loading) {
            return (
              <div className="list">
                {gifs.map((gif) => {
                  return (
                    <div className="item">
                      <img src={gif} alt="gif" />
                    </div>
                  );
                })}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default Buscador;
