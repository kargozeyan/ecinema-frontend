import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import $api from "../api/api";

function id2YTUrl(id) {
    return `https://www.youtube.com/watch?v=${id}`
}


const DetailsPage = (props) => {
    const tabs = {
        1: {
            title: "Trailer",
        },
        2: {
            title: "Movie"
        }
    }
    const {movieId} = useParams()
    const [details, setDetails] = useState()
    const [selectedTab, setSelectedTab] = useState(1)
    useEffect(() => {
        $api.get(`http://localhost:8080/movies/${movieId}`)
            .then(res => {
                setDetails(res.data)
            })
    }, [])
    if (!details) {
        return null
    }
    console.log(details);
    tabs[1].url = id2YTUrl(details.trailer)
    tabs[2].url = details.url
    return (<div className="container">
        <div className="right is-flex is-align-items-center is-flex-direction-column">
            <h1 className="title is-1 has-text-light">{details.title}</h1>
            <h1 className="title is-3 has-text-light">{new Date(details.releaseDate).getFullYear()}</h1>
            <h1 className="title is-3 has-text-light">{details.genres.sort((g1, g2) => g1.id - g2.id).map(g => g.name).join("  ◦  ")}</h1>
            <p className="title is-5 has-text-light mx-6">
                {details.description}
            </p>
        </div>
        <div className="tabs is-centered">
            <ul>
                <li className={selectedTab === 1 ? "is-active" : ''} onClick={() => setSelectedTab(1)}>
                    <a>Trailer</a>
                </li>
                <li className={selectedTab === 2 ? "is-active" : ''} onClick={() => setSelectedTab(2)}>
                    <a>Movie</a>
                </li>
            </ul>
        </div>
        <div className="is-flex is-justify-content-center is-align-items-center">
            <ReactPlayer style={{width: "100%"}} url={tabs[selectedTab].url} controls={true}/>
        </div>
        <h1 className="title is-1 has-text-light mt-6">Comments</h1>
    </div>)
}

export default DetailsPage