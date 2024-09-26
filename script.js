let APIKey = "17f8307a";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (movie) => {
    try {
        

        let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${movie}`);
        let jsonData = await fetchData.json();

        console.log(jsonData);
        document.querySelector(".card").innerHTML = "";
        searchInput.value = "";

        if (jsonData.Response === "True") {
            jsonData.Search.forEach(movie => {
                let div = document.createElement("div");
                div.classList.add("movieCard");
                div.innerHTML = `
                <img src=${movie.Poster} alt="${movie.Title} Poster">
                <div class="cardText">
                    <h1>${movie.Title}</h1>
                    <p>Year: <span>${movie.Year}</span></p>
                    <a href="#" class="movieLink" data-id="${movie.imdbID}">View Details</a>
                </div>
                `;
                document.querySelector(".card").appendChild(div);
            });
            
            
            document.querySelectorAll(".movieLink").forEach(link => {
                link.addEventListener("click", async (event) => {
                    event.preventDefault();
                    let imdbID = event.target.getAttribute("data-id");
                    getMovieDetails(imdbID);
                });
            });

        } else {
            document.querySelector(".card").innerHTML = "<h1>No Movies Found</h1>";
        }
    } catch (error) {
        document.querySelector(".card").innerHTML = "<h1>Error fetching data. Please try again later.</h1>";
    }
};

const getMovieDetails = async (imdbID) => {
    try {
       
        let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=${imdbID}&plot=full`);
        let jsonData = await fetchData.json();

        console.log(jsonData);
        document.querySelector(".card").innerHTML = "";
        
        let div = document.createElement("div");
        div.classList.add("movieCard");
        div.innerHTML = `
        <img src=${jsonData.Poster} alt="${jsonData.Title} Poster">
        <div class="cardText">
            <h1>${jsonData.Title}</h1>
            <p>Year: <span>${jsonData.Year}</span></p>
            <p>Rating: <span>${jsonData.Ratings[0]?.Value || "N/A"}</span></p>
            <p>Genre: <span>${jsonData.Genre}</span></p>
            <p>Release: <span>${jsonData.Released}</span></p>
            <p>Duration: <span>${jsonData.Runtime}</span></p>
            <p>Description: <span>${jsonData.Plot}</span></p>
            <p>Director: <span>${jsonData.Director}</span></p>
            <p>Actors: <span>${jsonData.Actors}</span></p>
            <p>Writer(s): <span>${jsonData.Writer}</span></p>
            <p>Language: <span>${jsonData.Language}</span></p>
            <p>Country: <span>${jsonData.Country}</span></p>
        </div>
        `;
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        document.querySelector(".card").innerHTML = "<h1>Error fetching details. Please try again later.</h1>";
    }
};

searchBtn.addEventListener("click", function () {
    let movieName = searchInput.value;
    if (movieName !== "") {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>Please enter a movie name to search.</h1>";
    }
});