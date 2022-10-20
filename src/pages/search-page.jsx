import React, {Fragment, useEffect, useState} from "react";
import {getGenres, searchForMovies} from "../api/movie-service";
import Select from "react-select";
import Navbar from "../components/navbar";
import MovieCard from "../components/movie-card";

const sortOptions = [
    {
        label: "Title ▲",
        value: "title,asc"
    },
    {
        label: "Title ▼",
        value: "title,desc"
    },
    {
        label: "price ▲",
        value: "price,asc"
    },
    {
        label: "Price ▼",
        value: "price,desc"
    },
    {
        label: "Release Date ▲",
        value: "releaseDate,asc"
    },
    {
        label: "Release Date ▼",
        value: "releaseDate,desc"
    }
]

const Checkbox = ({genre}) => {
    const [checked, setChecked] = useState(!!genre.isChecked)
    return <li>
        <label className='checkbox'>
            <input type='checkbox' checked={checked} onChange={() => {
                setChecked(!checked)
                genre.isChecked = !genre.isChecked;
            }
            }/>
            {` `}{genre.name}
        </label>
    </li>
}
const SearchPage = ({genre, term}) => {
    const [genres, setGenres] = useState([])
    const [selectedOption, setSelectedOption] = useState(sortOptions[0])
    const [movies, setMovies] = useState([])
    useEffect(() => {
        getGenres().then(res => setGenres(res.data.map(g => {
            g.isChecked = true
            return g
        })))
    }, [])

    function searchClick(term) {
        searchForMovies(term, genres.filter(g => g.isChecked), selectedOption.value).then(res => {
            console.log("search")
            setMovies(res.data)
        })
    }

    return (<Fragment>
            <Navbar searchClick={searchClick}/>
            <div style={{height: "100vh", overflow: "scroll", backgroundColor: "hsl(0, 0%, 7%)"}}>
                <div className="container">
                    <p className="title is-4 has-text-light">Search Results</p>
                </div>
                <div style={{height: "1px"}} className="has-background-light my-3"></div>
                <section className="main-content columns is-fullheight">
                    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                        <p className="title is-4 is-hidden-touch">Sort</p>
                        <Select options={sortOptions} defaultValue={selectedOption} onChange={setSelectedOption}/>

                        <p className="title is-4 is-hidden-touch mt-6">Genres</p>
                        <ul>
                            {genres.map(g => <Checkbox key={g.id} genre={g}/>)}
                        </ul>
                    </aside>

                    <div className="container column is-10">
                        <div className="section">
                            <div className="movies-container">
                                {movies.map(m => <MovieCard key={m.id} movie={m}/>)}
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </Fragment>

    )
}

export default SearchPage