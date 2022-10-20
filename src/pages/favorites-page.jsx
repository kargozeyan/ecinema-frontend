import MoviesPage from "./movies-page";
import {getFavorites} from "../api/user-service";
import {useContext} from "react";
import {Context} from "../index";

const FavoritesPage = () => {
    const {store} = useContext(Context)
    return (<MoviesPage title={"Favorites"} source={store.favorites}/>);
}
export default FavoritesPage