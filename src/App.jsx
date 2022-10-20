import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import HomePage from "./pages/home-page";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import DetailsPage from "./pages/details-page";
import SearchPage from "./pages/search-page";
import {observer} from "mobx-react-lite";
import ProfilePage from "./pages/profile-page";
import FavoritesPage from "./pages/favorites-page";
import UserMoviesPage from "./pages/user-movies-page";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div>
            <Router >
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            <HomePage/>
                        </React.Fragment>}
                    />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/search" element={<React.Fragment>
                        <SearchPage/>
                    </React.Fragment>}/>
                    <Route path="/movie/:movieId" element={
                        <React.Fragment>
                            <Navbar hideSearch/>
                            <DetailsPage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/profile" element={
                        <React.Fragment>
                            <Navbar hideSearch/>
                            <ProfilePage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/movies" element={
                        <React.Fragment>
                            <Navbar hideSearch/>
                            <UserMoviesPage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/favorites" element={
                        <React.Fragment>
                            <Navbar hideSearch/>
                            <FavoritesPage/>
                        </React.Fragment>
                    }/>
                </Routes>
            </Router>
            <Toaster toastOptions={{duration: 3000}}/>
        </div>

    );
}

export default observer(App);
