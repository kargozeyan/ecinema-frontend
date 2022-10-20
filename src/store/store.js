import {makeAutoObservable} from "mobx";
import {login, register} from "../api/auth-service";
import {BASE_URL} from "../api/api";
import axios from "axios";
import {getFavorites, getMyMovies} from "../api/user-service";

class Store {
    user = {};
    isAuth = false;
    movies = []
    favorites = []

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(isAuth) {
        this.isAuth = isAuth
    }

    setUser(user) {
        this.user = user
    }

    setMovies(movies) {
        this.movies = movies
    }

    setFavorites(movies) {
        this.favorites = movies
    }

    login = async (email, password) => {
        let res = await login(email, password);
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        this.setAuth(true)
        this.setUser(res.data.user)

        await this.getMovies()

    }

    register = async (firstName, lastName, email, password) => {
        let res = await register(firstName, lastName, email, password);

        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        this.setAuth(true)
        this.setUser(res.data.user)


        await this.getMovies()

    }

    logout = async () => {
        try {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            this.setAuth(false)
            this.setUser({})

        } catch (e) {
            console.log(e)
        }
    }

    refresh = async () => {
        try {

        } catch (e) {

        }
    }

    checkAuth = async () => {
        if (!localStorage.getItem("refreshToken")) {
            this.setAuth(false)
            this.setUser({})
            return
        }
        try {
            let response = await axios.post(`${BASE_URL}/auth/refresh`, localStorage.getItem("refreshToken"))
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            await this.getMovies()
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    getMovies = async () => {
        console.log(localStorage.getItem("accessToken"));
        let response = await getMyMovies();
        this.setMovies(response.data)
        response = await getFavorites()
        this.setFavorites(response.data)
    }
}

export default Store