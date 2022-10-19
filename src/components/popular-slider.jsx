import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import React from "react";

// boxShadow: "2px 2px 2px 2px white"
const Slide = (movie) => {
    return <SplideSlide
        className={"container"}
        style={{
            width: "100%",
            textAlign: "center",
            position: "relative"
        }}
        onClick={() => {
            console.log(movie.title)
        }}
        key={movie.id}
    >
        <Link to={`/movie/${movie.id}`}>

            <img
                style={{
                    borderRadius: "1rem",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    objectFit: "fill",
                    cursor: "pointer"
                }}
                src={movie.backdropUrl}/>
        </Link>
    </SplideSlide>
}
const PopularSlider = ({movies}) => {
    if (movies.length === 0) return null
    return (
        <Splide
            style={{padding: 0}}
            options={{
                width: "100%",
                height: "30vw",
                arrows: false,
                pagination: false,
                type: 'loop',
                autoplay: 'playing',
                interval: 3000,
                perPage: 1,
                padding: {left: "15%", right: "15%"},
                gap: "48px",
                // waitForTransition: true,
                // wheel: true,
                // direction: "ltr"
            }}>
            {movies.map((movie) => Slide(movie))}
        </Splide>
    )
}

export default PopularSlider