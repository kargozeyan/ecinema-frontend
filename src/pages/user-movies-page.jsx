import MoviesPage from "./movies-page";
import {getMyMovies} from "../api/user-service";

const UserMoviesPage = () => {
    return (<MoviesPage title={"My Movies"} source={getMyMovies}/>);
}

export default UserMoviesPage