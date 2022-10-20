import $api from './api'

export async function getNewestMovies() {
    return $api.get(
        "/movies",
        {
            params: {
                page: 0,
                size: 5,
                sort: 'releaseDate,desc'
            }
        })

}

export async function getMoviesByGenres() {
    return $api.get(
        "/movies/by-genres",
        {
            params: {
                page: 0,
                size: 18
            }
        })
}

export async function getGenres() {
    return $api.get("/movies/genres")
}

export async function searchForMovies(term, genres, sort) {
    return $api.get("/movies/search", {
        params: {
            term, genres: genres.map(g => g.id).join("::"), sort
        }
    })
}

export async function getComments(movieId) {
    return $api.get(`/movies/${movieId}/comments`)
}

export async function getDetails(movieId) {
    return $api.get(`/movies/${movieId}`)
}