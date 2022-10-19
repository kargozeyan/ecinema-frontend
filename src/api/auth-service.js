import $api from "./api";

export async function login(email, password) {
    return $api.post("/auth/login", {email, password})
}

export async function register(firstName, lastName, email, password) {
    return $api.post("/auth/register", {firstName, lastName, email, password})
}

export async function refresh() {
    return $api.get('/auth/refresh')
}