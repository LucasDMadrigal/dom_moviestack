import movies from "./data.js";
const contenedor = document.getElementById("card--container");
const select = document.getElementById("genresSelect");
const searchInput = document.getElementById("search_input");

var filteredMovies = [];
var template = "";

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

const renderizarCards = (pelis) => {
  contenedor.innerHTML = "";
  template = "";
  pelis.map((movie) => {
    template += generarCard(movie);
  });

  contenedor.innerHTML = template;
};

renderizarCards(movies);

function filtrarPeliculasPorGenero() {
  const selectedGenre = select.value;
  // contenedor.remove()

  filteredMovies = movies.filter((pelicula) => {
    return pelicula.genres.includes(selectedGenre);
  });
  console.log(filteredMovies);

  renderizarCards(filteredMovies);
}


select.addEventListener("change", filtrarPeliculasPorGenero);

searchInput.addEventListener("input", () => {
  let search = searchInput.value
  console.log("🚀 ~ searchInput.addEventListener ~ search:", search)

  if (filteredMovies.length > 0) {
    const filter = filteredMovies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
    renderizarCards(filter)
  }
  else{
    const filter = movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
    renderizarCards(filter)
  }
});

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
