import $api from "./api";

export function getMyMovies() {
    return $api.get("/me/movies/purchased")
}

export function getFavorites() {
    return $api.get("/me/movies/favorites")
}

export function postComment(movieId, content) {
    return $api.post("/me/comments", {movieId, content})
}