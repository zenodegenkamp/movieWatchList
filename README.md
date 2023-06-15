Certainly! Here's an example of a README file for the provided code:

# Movie Watchlist Web Application

This is a web application that allows users to search for movies using the OMDB API and create a watchlist of their favorite movies.

## Features

- Search for movies by title using the search box.
- Display a list of search results with movie details, including title, runtime, rating, genre, and plot.
- Add movies to the watchlist.
- Remove movies from the watchlist.
- View and manage the watchlist, including clearing all movies.

## Technologies Used

- HTML
- CSS
- JavaScript

## Setup and Usage

1. Clone the repository to your local machine.
2. Open `index.html` in a web browser to access the movie search functionality.
3. Open `watchlist.html` in a web browser to view and manage your watchlist.

## Dependencies

- [FontAwesome](https://fontawesome.com) - Used for icons.
- [Normalize.css](https://necolas.github.io/normalize.css/) - Used to normalize CSS styles across different browsers.
- [Google Fonts](https://fonts.google.com) - Used for font styles.

## API Key

The application uses the OMDB API to fetch movie data. You will need to obtain an API key from the [OMDB website](http://www.omdbapi.com/) and replace the placeholder API key in the JavaScript code with your own API key.

```javascript
fetch(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${inputMovie.value}`)
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

