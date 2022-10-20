import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ReactPlayer from "react-player";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {getComments, getDetails} from "../api/movie-service";
import {Context} from "../index";
import {postComment} from "../api/user-service";
import {observer} from "mobx-react-lite";

function id2YTUrl(id) {
    return `https://www.youtube.com/watch?v=${id}`
}

const Comment = ({comment}) => {
    return (<article className="media">
        <figure className="media-left">
            <p className="image is-64x64">
                <AccountCircleIcon style={{width: "48px", height: "48px"}}/>
            </p>
        </figure>
        <div className="media-content">
            <div className="content">
                <p>
                    <strong>{comment.firstName} {comment.lastName} </strong>
                    <small>{comment.date.replace("T", ' at ')}</small>
                    <br/>
                    {comment.content}
                </p>
            </div>
        </div>
    </article>)
}
const tabs = {
    1: {
        title: "Trailer",
    },
    2: {
        title: "Movie"
    }
}
const DetailsPage = (props) => {
    const {store} = useContext(Context)
    const {movieId} = useParams()
    const [details, setDetails] = useState()
    const [selectedTab, setSelectedTab] = useState(1)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    function writeComment() {
        if (!store.isAuth) {
            return null;
        }
        let contains = false;
        store.movies.forEach(m => {
            if (m.id == movieId) {
                contains = true;
            }
        })
        if (!contains) {
            return null;
        }
        return (<article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                    </p>
                </figure>
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea className="textarea" value={comment} placeholder="Add a comment..."
                                      onChange={e => setComment(e.target.value)}></textarea>
                        </p>
                    </div>
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <button className="button is-primary" onClick={() => {
                                    postComment(movieId, comment)
                                    const {firstName, lastName} = store.user
                                    const newComment = {firstName, lastName, content: comment, date: 'now'}
                                    setComment("")
                                    setComments([newComment, ...comments])
                                }}>Submit
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </article>
        )
    }

    useEffect(() => {
        getDetails(movieId)
            .then(res => {
                setDetails(res.data)
            })

        getComments(movieId)
            .then(res => {
                setComments(res.data)
            })
    }, [])
    if (!details) {
        return null
    }
    console.log(details);
    tabs[1].url = id2YTUrl(details.trailer)
    tabs[2].url = details.url
    return (<div className="container" style={{height: "100vh"}}>
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
            {comments.map(comment => <Comment key={comment.text + comment.date} comment={comment}/>)}
            {writeComment()}
        </div>
    )
}

export default observer(DetailsPage)