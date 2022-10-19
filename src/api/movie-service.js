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
                size: 17
            }
        })
}