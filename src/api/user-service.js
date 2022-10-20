import $api from "./api";

export async function getMyMovies() {
    return $api.get("/me/movies/purchased")
}

export async function getFavorites() {
    return $api.get("/me/movies/favorites")
}

export async function postComment(movieId, content) {
    return $api.post("/me/comments", {movieId, content})
}

export async function markFavorite(movieId) {
    return $api.post("/me/movies/favorites", {}, {params: {movieId}})
}

export async function buyMovie(movieId) {
    return $api.post("/me/movies/purchased", {}, {params: {movieId}})
}

export async function removeFavorite(movieId) {
    return $api.delete("/me/movies/favorites", {params: {movieId}})
}

export async function refillBalance(amount) {
    return $api.put("/me/balance", null, {params: {amount}})
}