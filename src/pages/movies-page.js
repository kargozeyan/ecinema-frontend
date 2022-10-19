import {useEffect, useState} from "react";
import MovieCard from "../components/movie-card";

const MoviesPage = ({title, source}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        source().then(res => {
            console.log(res)
            setMovies(res.data)
        })
    }, [])
    return (
        <div className="container pb-6">
            <p className="title is-4 has-text-light">{title}</p>
            <div style={{height: "1px"}} className="has-background-light mb-6"></div>
            <div className="movies-container">
                {movies.map(m => <MovieCard key={m.id} movie={m}/>)}
            </div>
        </div>
    )
}

export default MoviesPage