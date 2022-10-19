import {Link} from "react-router-dom";

const MovieCard = ({movie, style}) => {
    const isFree = movie.price == 0;

    return (
        <div className="movie-card" style={{...style}}>
            <Link to={`/movie/${movie.id}`}>
                <img style={{width: "100%", borderRadius: "0.5rem", cursor: "pointer"}} src={movie.posterUrl}/>
                <p className="title is-6 has-text-light  has-text-right mt-2 movie-name">{movie.title}</p>
                <p className={`title is-6 ${isFree ? 'has-text-info' : 'has-text-danger'} has-text-right mt-2 movie-price`}>{isFree ? 'Free' : `${movie.price} $`}</p>
            </Link>
        </div>
    )
}

export default MovieCard