import MoviesPage from "./movies-page";
import {getMyMovies} from "../api/user-service";
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const UserMoviesPage = () => {
    const {store} = useContext(Context)
    return (<MoviesPage title={"My Movies"} source={store.movies}/>);
}

export default observer(UserMoviesPage)