import $api from "./api";

export function getMyMovies() {
    return $api.get("/me//movies/purchased")
}

export function getFavorites() {
    return $api.get("/me/movies/favorites")
}

export function editUser(firstName, lastName, email, oldPassword, newPassword) {
    return $api.put("/me", {firstName, lastName, email, oldPassword, newPassword})
}