import {Link} from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MovieCard = ({movie, style, onRemove}) => {
    const isFree = movie.price == 0;
    const isRemovable = !!onRemove;

    function removeBtn() {
        if (!isRemovable) {
            return null;
        }
        return (<span>
                <HighlightOffIcon style={{position: "absolute", top: 0, right: 0}} sx={{color: "red"}}
                                  className="is-clickable" onClick={() => {
                    onRemove(movie)
                }}/>
            </span>)
    }

    return (
        <div className="movie-card" style={{...style, position: "relative"}}>
            <Link to={`/movie/${movie.id}`}>
                <img style={{width: "100%", borderRadius: "0.5rem", cursor: "pointer"}} src={movie.posterUrl}/>
            </Link>
            <p className="title is-6 has-text-light  has-text-right mt-2 movie-name">{movie.title}</p>
            <p className={`title is-6 ${isFree ? 'has-text-info' : 'has-text-danger'} has-text-right mt-2 movie-price`}>{isFree ? 'Free' : `${movie.price} $`}</p>
            {removeBtn()}
        </div>
    )
}

export default MovieCard