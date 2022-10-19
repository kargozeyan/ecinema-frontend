import {makeAutoObservable} from "mobx";
import {login, register} from "../api/auth-service";
import {BASE_URL} from "../api/api";
import axios from "axios";

class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(isAuth) {
        this.isAuth = isAuth
    }

    setUser(user) {
        this.user = user
    }

    login = async (email, password) => {
        const res = await login(email, password);
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        this.setAuth(true)
        this.setUser(res.data.user)
    }

    register = async (firstName, lastName, email, password) => {
        let res = await register(firstName, lastName, email, password);

        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        this.setAuth(true)
        this.setUser(res.data.user)
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
            const response = await axios.post(`${BASE_URL}/auth/refresh`, localStorage.getItem("refreshToken"))
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}

export default Store