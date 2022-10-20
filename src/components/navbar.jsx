import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginRegister = () => (
    <React.Fragment>
        <Link className="button is-primary my-auto mr-3" to="/login">Login</Link>
        <Link className="button is-primary is-outlined my-auto" to="/register">Register</Link>
    </React.Fragment>
)

const DropDown = (logoutHandler) => (
    <div className="navbar-item has-dropdown is-hoverable">
        <AccountCircleIcon className="m-auto" style={{width: "24px", height: "24px"}}/>

        <div className="navbar-dropdown is-right">
            <Link className="navbar-item" to="/my/movies">
                My movies
            </Link>
            <Link className="navbar-item" to="/my/favorites">
                Favorites
            </Link>
            <hr className="navbar-divider"/>
            <a className="navbar-item" onClick={logoutHandler}>
                Log out
            </a>
        </div>
    </div>
)
const Navbar = ({hideSearch, searchClick}) => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");

    if (!searchClick) {
        searchClick = (search) => {
        }
    }

    function getSearch() {
        if (hideSearch) {
            return null;
        }

        return (<div className="my-auto mr-3 has">
            <p className="control has-icons-right has-text-light">
                <input style={{background: "transparent", color: "white"}}
                       className="input is-light" type="text" placeholder="Search..." defaultValue={searchTerm}
                       onChange={e => setSearchTerm(e.target.value)}/>
                <span className="is-clickable icon is-small is-right is-clickable"
                      onClick={() => searchClick(searchTerm)}>
                                <SearchIcon sx={{color: "white"}}/>
                            </span>
            </p>
        </div>)
    }

    return (
        <nav className="container navbar is-black mb-6" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28"/>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    {/*<Link className="navbar-item">*/}
                    {/*    Newest*/}
                    {/*</Link>*/}
                    {/*<a className="navbar-item">*/}
                    {/*    Popular*/}
                    {/*</a>*/}

                    {/*<a className="navbar-item">*/}
                    {/*    Highest Rated*/}
                    {/*</a>*/}

                </div>
                {getSearch()}
                <div className="navbar-end">
                    {store.isAuth ? DropDown(async () => {
                        await store.logout()
                        navigate('/')
                    }) : LoginRegister()}
                </div>
            </div>
        </nav>
    )
}

export default observer(Navbar)