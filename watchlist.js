const watchList = document.getElementById('movie-watch-list')
let watchListArray = []
let watchListInformationArray = []
let watchListHtml = ''

// Checks the local storage and if nothing found error message otherwise 
// call API based on ID, call next function with this information
function seeLocalStorage() {

    watchListArray = JSON.parse(localStorage.getItem("watchlist"))

    if (watchListArray === null || watchListArray.length === 0) {
        
        watchList.innerHTML = `
        <div id='error-section'>   
        <div>
        <i class="fa-solid fa-circle-exclamation fa-2xl" id='error-icon' style="color: #3f5efb;"></i>
        </div>
            <div id='error-text'>
                <h1 id='error-title'>Your Watchlist is empty</h1>
                <p>you can add movies to your watchlist <span><a id='link-to-home' href='index.html'>Here</a></span></p>    
            </div>
        </div>        
        `
        
    }
    else {

        for (let movie of watchListArray) {

            fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b3f5c0c7&s=`)
                .then(res => res.json())
                .then(data => {

                    watchListInformationArray.unshift(data)
                    renderLocalStorage()
                })
        }
    }
}
seeLocalStorage()

// Create the HTML based on several checks and render it on the page
function renderLocalStorage() {

    let runTime = ''
    watchListHtml = ''
    let movieRating = ''
    let moviePoster = ''

    for (let movie of watchListInformationArray) {
        
        // Checks if run time of the movie is known
        if (movie.Runtime === 'N/A'){
            runTime = ''
        }
        else {
            runTime = movie.Runtime
        }

        // Checks if movies has reviews
        if(movie.Ratings.length != 0){
            movieRating = movie.Ratings[0].Value
        } 

        // Puts a fixed image for movies without poster
        if(movie.Poster === 'N/A'){
            moviePoster = `<img src='images/template.jpg'></img>`
        }
        else {
            moviePoster = `<img src=${movie.Poster}>`
        }

        watchListHtml += `

        <div class='background-img' style="background-image: url(${movie.Poster}&filter=blurgaussian&smooth=1);">
           <div class='movie'>    
               <div class='movie-img'>
                   ${moviePoster}
               </div>
               <div class='movie-text'>
                   <h1>${movie.Title} ${runTime}</h1>
                   <h3><i class="fa-solid fa-star" style="color: #fbd40e;"></i> ${movieRating}</h3> 
                   <button class='watchlist-btn-remove' data-action='remove' data-movieid='${movie.imdbID}' data-movietitle='${movie.Title}')'>Remove</button>
                   <p>${movie.Genre}</p>
                   <p>${movie.Plot}</p>
               </div>   
           </div>
       </div>
     `

    }
    
    
    watchList.innerHTML = watchListHtml

}

// Clears all local storage when user clears watchlist 
document.getElementById('clear-local').addEventListener('click', clearAllStorage)

function clearAllStorage(){
    
    watchListArray = []
    
    watchListInformationArray = []
    
    localStorage.clear()
    
    seeLocalStorage()
}


document.getElementById('watchlist-body').addEventListener('click', removeMovieWatchlist)

// Removes specific movie from the local storage
function removeMovieWatchlist(e){

    if (e.target.dataset.action === 'remove'){    
        
        watchListInformationArray = []

        watchListArray = JSON.parse(localStorage.getItem("watchlist"))


        const index = watchListArray.indexOf(e.target.dataset.movieid)
        
        watchListArray.splice(index, 1)
        
    
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
        
        seeLocalStorage()
    }
}
