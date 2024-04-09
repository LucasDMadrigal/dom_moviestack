import movies from "./data.js";

let url = new URLSearchParams(location.search);
let id = url.get("id");

const Personaje = (arr, key) => arr.find((obj) => obj.id === key);

function generarPaginaDetalles(pelicula) {
  return `
        <div>
            <h1>${pelicula.title}</h1>
            <p>${pelicula.overview}</p>
        </div>
    `;
}

const movieDetails = generarPaginaDetalles(Personaje(movies, id));
const bannerContainer = document.getElementById("banner_container");
const urlImageBanner = Personaje(movies, id).image;
bannerContainer.style.backgroundImage = `url('${urlImageBanner}')`;
const contenido = document.getElementById("movie_details--container");
contenido.innerHTML = movieDetails;
