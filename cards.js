const contenedor = document.getElementById("card--container");
const selectGeneros = document.getElementById("genresSelect");
const searchInput = document.getElementById("search_input");
const detailsButton = document.getElementById("details_button");
const $ctn = document.getElementById("card--container");
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
const URL = "https://moviestack.onrender.com/api/movies";

var filteredMovies = [];
var template = "";
let movies = [];
let moviesCards = [];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
localStorage.setItem("favoritos", JSON.stringify(favoritos));

const renderizarCards = (pelis) => {
  contenedor.innerHTML = "";
  template = "";
  pelis.map((movie) => {
    template += generarCard(movie);
  });

  contenedor.innerHTML = template;
};

const toggleColorAFavs = (id) => {
  const buttonMeGusta = document.querySelector(`[ data-id="${id}"]`);
  if (favoritos.includes(id)) {
    buttonMeGusta.classList.add("like_active");
  } else {
    buttonMeGusta.classList.remove("like_active");
  }
};

fetch(URL, {
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    movies = data.movies;
    renderizarCards(movies);
    agregarGeneros(movies);
    moviesCards = Array.prototype.slice.call(
      document.getElementsByClassName("like_button")
    );
    moviesCards.forEach((card) => {
      console.log("🚀 ~ .then ~ card:", card);
      toggleColorAFavs(card.dataset.id);
    });
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud fetch:", error);
  });

function toggleFavorito(id) {
  const index = favoritos.indexOf(id);
  if (index === -1) {
    favoritos.push(id);
    toggleColorAFavs(id)
  } else {
    favoritos.splice(index, 1);
    toggleColorAFavs(id)
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

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
            <div class="flex justify-between">
            <a href="./details.html?id=${movie.id}" class="card_action" id="details_button">detalles</a>
            <button class="like_button card_action" data-id="${movie.id}">me gusta</button>
            </div>
        </div>
    </div>
    `;
}

function filtrarPeliculasPorGenero() {
  const selectedGenre = selectGeneros.value;
  let search = searchInput.value;

  filteredMovies = movies.filter((pelicula) => {
    return pelicula.genres.includes(selectedGenre);
  });
  const filtradoPorNombreYGenero = filteredMovies.filter((peli) => {
    return peli.title.toLowerCase().includes(search.toLowerCase());
  });

  if (search) {
    renderizarCards(filtradoPorNombreYGenero);
  } else {
    renderizarCards(filteredMovies);
  }
}
selectGeneros.addEventListener("change", filtrarPeliculasPorGenero);

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

function agregarGeneros(arrayDePelis) {
  const generos = arrayDePelis?.map((movie) => {
    return movie.genres;
  });

  let generosUnicos = [...new Set(generos?.flat())];

  if (selectGeneros) {
    generosUnicos?.forEach(function (elemento) {
      var opcion = document.createElement("option");
      opcion.text = elemento;
      opcion.value = elemento;
      selectGeneros.appendChild(opcion);
    });
  } else {
    console.error(
      "El elemento select con ID '" + selectId + "' no fue encontrado."
    );
  }
}

agregarGeneros();

$ctn.addEventListener("click", ({ target }) => {
  if (target.dataset.id) {
    toggleFavorito(target.dataset.id);
  }
});
