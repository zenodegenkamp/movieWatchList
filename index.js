let currentMovie = 'lord of the rings'
const searchBtn = document.getElementById('btnMovie')
const inputMovie = document.getElementById('inputMovie')
const scrollContainer = document.getElementById('scroll-container')
const watchlistBtn = document.getElementById('watchlist-btn')
const seeWatchListBtn = document.getElementById('see-movie-list-btn')
const body = document.getElementById('body')
let movieHtml = ``
let test = ''
let movieInformationArray = []
let watchList = []

searchBtn.addEventListener('click', searchAllMovies)
inputMovie.addEventListener('change', searchAllMovies)

// Starts by showing list of examples movies ("lord") when user visits the page
function renderExampleMovies() {

    fetch(`http://www.omdbapi.com/?apikey=b3f5c0c7&s=lord`)
        .then(res => res.json())
        .then(data => {

            for (let movie of data.Search) {

                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=b3f5c0c7&s=`)
                    .then(res => res.json())
                    .then(data => {

                        movieInformationArray.unshift(data)
                        renderMovies()
                    })

            }
        })
}

renderExampleMovies()

// Searches for the movies with the title as inputted by the user and returns string with corresponding movies
function searchAllMovies() {
    if (inputMovie.value) {

        fetch(`http://www.omdbapi.com/?apikey=b3f5c0c7&s=${inputMovie.value}`)
            .then(res => res.json())
            .then(data => {

                if (data.Response === "False") {
                    console.log("No movies found")
                }

                searchIndividualMovie(data.Search)
            })
            .catch(error => {
                scrollContainer.innerHTML = `
            <div id='error-section'>   
            <div>
            <i class="fa-solid fa-circle-exclamation fa-2xl" id='error-icon' style="color: #3f5efb;"></i>
            </div>
                <div id='error-text'>
                    <h1 id='error-title'>Something went wrong!</h1>
                    <p>Please search for a valid movie title by using at least 3 letters from the alphabet.</p>    
                </div>
            </div>        
            `
            })
    }
}


// Uses the Movie array to retreive extra information per movie with the API
function searchIndividualMovie(movieArray) {

    movieInformationArray = []

    for (let movie of movieArray) {
        if (movieArray.length > 10)

            movieArray.length = 10

        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=b3f5c0c7&s=`)
            .then(res => res.json())
            .then(data => {

                movieInformationArray.unshift(data)
                renderMovies()
            })

    }
}

// Uses the movie information to generate the HTML for the page
function renderMovies() {

    movieHtml = movieInformationArray.map(function (movie) {

        let btn = ''
        let runTime = ''
        let movieRating = ''
        let moviePoster = ''
        const watchlist = JSON.parse(localStorage.getItem("watchlist"))


        // Logic to check whether btn should add or remove movies
        if (watchlist != null && watchlist.includes(movie.imdbID)) {

            btn = btn = `<button class='watchlist-btn-remove' data-action='remove' data-movieid='${movie.imdbID}' data-movietitle='${movie.Title}' >Remove</button>`
        }
        else {
            btn = `<button class='watchlist-btn' data-action='add' data-movieid='${movie.imdbID}' data-movietitle='${movie.Title}' >Add</button>`
        }


        // Checks if run time of the movie is known
        if (movie.Runtime === 'N/A') {
            runTime = ''
        }
        else {
            runTime = movie.Runtime
        }

        // Checks if movie has reviews
        if (movie.Ratings.length != 0) {
            movieRating = movie.Ratings[0].Value
        }

        // Puts a fixed image for movies without poster
        if (movie.Poster === 'N/A') {
            moviePoster = `<img src='images/template.jpg'></img>`
        }
        else {
            moviePoster = `<img src=${movie.Poster}>`
        }

        return `

         <div class='background-img' style="background-image: url(${movie.Poster}&filter=blurgaussian&smooth=1);">
            <div class='movie'>    
                <div class='movie-img'>
                    ${moviePoster}
                </div>
                <div class='movie-text'>
                    <h1>${movie.Title} ${runTime}</h1>
                    <h3><i class="fa-solid fa-star" style="color: #fbd40e;"></i> ${movieRating}</h3> 
                    ${btn}
                    <p>${movie.Genre}</p>
                    <p>${movie.Plot}</p>
                </div> 
                
                
            </div>
        </div>
      
        `

    }).join('')

    scrollContainer.innerHTML = movieHtml
}


body.addEventListener('click', setLocalStorage)

// User adds to local storage when action is add and movie not already in local storage
function setLocalStorage(e) {

    if (e.target.dataset.action === 'add') {


        const watchList = JSON.parse(localStorage.getItem("watchlist"))

        if (!watchList.includes(e.target.dataset.movieid)) {
            
            watchList.unshift(e.target.dataset.movieid)
            
            localStorage.setItem("watchlist", JSON.stringify(watchList))
            
            renderMovies()
        }
    // otherwise remove from local storage
    } else if (e.target.dataset.action === 'remove') {

        const watchList = JSON.parse(localStorage.getItem("watchlist"))

        const index = watchList.indexOf(e.target.dataset.movieid)
        
        watchList.splice(index, 1)
        
        localStorage.setItem("watchlist", JSON.stringify(watchList))
        
        renderMovies()
    }

}









