import {useSwiper} from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import MovieCard from "./movie-card";

const SwiperButton = ({children, next}) => {
    const swiper = useSwiper()
    return <button style={{}
    } onClick={() => {
        next ? swiper.slideNext() : swiper.slidePrev()
    }}>{children}</button>
}

const Slide = (movie) => {
    return <SplideSlide key={movie.id}>
            <MovieCard movie={movie}/>
    </SplideSlide>
}

const MovieSlider = ({movies}) => {
    return (
        <Splide
            style={{padding: 0}}
            options={{
                perPage: 6,
                gap: "48px",
                pagination: false,
            }}
        >
            {movies.map((movie) => Slide(movie))}
        </Splide>
        // <Swiper
        //     slidesPerView={6}
        //     spaceBetween={48}
        //     slidesPerGroup={6}
        //     navigation
        //     modules={[Navigation, Pagination]}
        // >
        //     {movies.map((movie) => Slide(movie))}
        // </Swiper>
    )

}

export default MovieSlider