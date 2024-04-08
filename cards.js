import movies from "./data.js";

function generarCard(movie) {
  return `
    <div class="h-64 w-1/5 p-2 border-solid	border-black border-2 ">
        <img src="${movie.image}" class="card-img-top" alt="main_image_movie">
        <div class="card-body">
            <h5 class=" text-base">${movie.title}</h5>
            <p class="card-text">${movie.tagline}</p>
        </div>
    </div>
    `;
}

const contenedor = document.getElementById("card--container");
const select = document.getElementById("genresSelect");

var template = "";

movies.map((movie) => {
  template += generarCard(movie);
});

contenedor.innerHTML = template;

function filtrarPeliculasPorGenero() {
  const selectedGenre = select.value;
  contenedor.innerHTML = "";
  template = ""
  // contenedor.remove()

  const peliculasFiltradas = movies.filter((pelicula) => {
    return pelicula.genres.includes(selectedGenre);
  });
  console.log(peliculasFiltradas);

  peliculasFiltradas.forEach((movie) => {
    template += generarCard(movie);
  });

  contenedor.innerHTML = template;
}

select.addEventListener("change", filtrarPeliculasPorGenero);

// Horror
// Mystery
// Thriller
// Adventure
// Fantasy
// Action
// Science Fiction
// Drama
// Comedy
// Crime
// Animation
// Family
// Romance
// Music
// Documentary
// History
// War
// Western
// TV Movie
