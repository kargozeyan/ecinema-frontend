import MoviesPage from "./movies-page";
import {getFavorites} from "../api/user-service";

const FavoritesPage = () => {
    return (<MoviesPage title={"Favorites"} source={getFavorites}/>);
}
export default FavoritesPage