import MoviesPage from "./movies-page";
import {removeFavorite} from "../api/user-service";
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const FavoritesPage = () => {
    const {store} = useContext(Context)
    return (<MoviesPage title={"Favorites"} source={store.favorites} onRemove={(movie) => {
        removeFavorite(movie.id).then()
        store.setFavorites(
            store.favorites.filter(f => f.id !== movie.id)
        )
    }
    }/>);
}
export default observer(FavoritesPage)