import React, {useEffect, useState} from "react";
import PopularSlider from "../components/popular-slider";
import MovieSlider from "../components/movie-slider";
import {getMoviesByGenres, getNewestMovies} from '../api/movie-service'

const GenreSlider = (genre, movies) => {
    return (
        <React.Fragment key={genre}>
            <h1 className="title is-3 has-text-white mt-6">{genre} ›</h1>
            <MovieSlider movies={movies}/>
        </React.Fragment>
    )
}

function HomePage() {
    const [newest, setNewest] = useState([])
    const [moviesByGenres, setMoviesByGenres] = useState([])

    useEffect(() => {
        getNewestMovies()
            .then((res) => {
                console.log(res);
                setNewest(res.data)
            })
            .catch(e => console.log(e))

        getMoviesByGenres()
            .then(res => {
                console.log(res);
                setMoviesByGenres(res.data)
            })
    }, [])
    return (
        <React.Fragment>
            <PopularSlider movies={newest}></PopularSlider>
            <div className={"has-background-black pb-6"}>
                <div className="container">
                    {moviesByGenres.map(moviesByGenre => {
                        return GenreSlider(moviesByGenre.genre.name, moviesByGenre.movies)
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomePage