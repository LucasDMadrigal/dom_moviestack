const contenedor = document.getElementById("card--container");
const select = document.getElementById("genresSelect");
const searchInput = document.getElementById("search_input");
const detailsButton = document.getElementById("details_button");

const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
const URL = "https://moviestack.onrender.com/api/movies";

var filteredMovies = [];
var template = "";
let movies = [];
const renderizarCards = (pelis) => {
  contenedor.innerHTML = "";
  template = "";
  pelis.map((movie) => {
    template += generarCard(movie);
  });

  contenedor.innerHTML = template;
};
fetch(URL, {
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    movies = data.movies;
    console.log("🚀 ~ data:", data);
    console.log("🚀 ~ movies:", movies);
    renderizarCards(movies);
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud fetch:", error);
  });

function toggleFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const index = favoritos.indexOf(id);
  if (index === -1) {
    favoritos.push(id);
    console.log("Elemento agregado a favoritos:", id);
  } else {
    favoritos.splice(index, 1);
    console.log("Elemento eliminado de favoritos:", id);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

document.getElementById("elemento").addEventListener("click", function () {
  let id = this.getAttribute("data-id");
  toggleFavorito(id);
});

function generarCard(movie) {
  return `
    <div class="card h-64 p-2 border-solid	border-black border-2 ">
    <picture class"w-full flex justify-center ">
    <img src="https://moviestack.onrender.com/static/${movie.image}" class="card-img-top h-1/2" alt="main_image_movie">
    </picture>
        <div class=" h-1/2 card-body flex flex-col justify-between">

        <div class="">
            <h5 class=" text-base">${movie.title}</h5>
            <p class="card-text">${movie.tagline}</p>
          </div>
            <div>
            <a href="./details.html?id=${movie.id}" id="details_button">DETAILS</a>
            </div>
        </div>
    </div>
    `;
}

function filtrarPeliculasPorGenero() {
  const selectedGenre = select.value;

  filteredMovies = movies.filter((pelicula) => {
    return pelicula.genres.includes(selectedGenre);
  });

  renderizarCards(filteredMovies);
}

select.addEventListener("change", filtrarPeliculasPorGenero);

searchInput.addEventListener("input", () => {
  let search = searchInput.value;

  if (filteredMovies.length > 0) {
    const filter = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    renderizarCards(filter);
  } else {
    const filter = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    renderizarCards(filter);
  }
});
