const searchForm = document.querySelector(".search-container form"); // Fixed selector
const movieContainer = document.querySelector(".moive-container"); // Corrected class name
const moviePosterElement=document.querySelector(".movie-poster");
const inputBox = document.querySelector(".inputBox");

// Function to fetch movie details
const getMovieDetails = async (movie) => {
    try {
        const myApiKey = "795c15c4";
        const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch data");
        }
        const data = await response.json();
        console.log(data); // Log the data received from the API
        showMovieData(data);
    } catch (error) {
      /// console.error(error);
        showErrorMessage("No movie found!");
    }
}

const showMovieData = (data) => {
    movieContainer.innerHTML = ""; // Empty the previous movie
    movieContainer.classList.remove("noBackground");

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data; // Array destructuring assignment to extract properties from data object

    // Create movie info element
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2>
                             <p><strong>Rating :&#11088;</strong>${imdbRating}</p>`;

    // Create movie genre element
    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element.trim(); // Trim the genre name to remove extra whitespace
        movieGenreElement.appendChild(p);
    });

    // Append movie genre element to movie info element
    movieElement.appendChild(movieGenreElement);

    // Append additional movie details
    movieElement.innerHTML += `<p><strong> Released Date  :</strong>${Released}</p>  
                            <p><strong> Duration  :</strong>${Runtime}</p>
                            <p><strong> Cast :</strong>${Actors}</p>
                            <p><strong> Plot  :</strong>${Plot}</p>`;

    // Create and append movie poster
    const moviePosterElement = document.createElement("div"); // Changed variable name
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement);

    // Append movie info element to movie container
    movieContainer.appendChild(movieElement);
}

// Function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add("noBackground");
}

// Function to handle form submit
const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent auto submission
    const movieName = inputBox.value.trim(); // Trim input value to remove extra spaces
   // console.log(movieName);
    if (movieName !== "") {
        showErrorMessage("Fetching movie information......"); // If data delay to occur
        getMovieDetails(movieName);
    } else {
        showErrorMessage("Enter the movie to get information");
    }
}

// Adding event listener for search bar
searchForm.addEventListener("submit", handleFormSubmit);
