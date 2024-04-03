import movies from "./data.js";

function generarCard(movie) {
  return `
    <div class="h-64 w-1/5 p-2 border-solid	border-black border-2 ">
        <img src="${movie.image}" class="card-img-top" alt="main_image_movie">
        <div class="card-body">
            <h5 class=" text-base">${movie.title}</h5>
            <p class="card-text">${movie.tagline}</p>
            <p class="card-text">${movie.overview}</p>
        </div>
    </div>
    `;
}

var contenedor = document.getElementById("card--container");

movies.map((movie) => {
  var card = generarCard(movie);
  contenedor.innerHTML += card;
});
