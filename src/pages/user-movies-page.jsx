import MoviesPage from "./movies-page";
import {getMyMovies} from "../api/user-service";
import {useContext} from "react";
import {Context} from "../index";

const UserMoviesPage = () => {
    const {store} = useContext(Context)
    console.log(store.movies)
    return (<MoviesPage title={"My Movies"} source={store.movies}/>);
}

export default UserMoviesPage