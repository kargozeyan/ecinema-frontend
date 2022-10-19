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
            <Router>
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            <Navbar/>
                            <HomePage/>
                        </React.Fragment>}
                    />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/search" element={<React.Fragment>
                        <Navbar/>
                        <SearchPage/>
                    </React.Fragment>}/>
                    <Route path="/movie/:movieId" element={
                        <React.Fragment>
                            <Navbar/>
                            <DetailsPage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/profile" element={
                        <React.Fragment>
                            <Navbar/>
                            <ProfilePage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/movies" element={
                        <React.Fragment>
                            <Navbar/>
                            <UserMoviesPage/>
                        </React.Fragment>
                    }/>
                    <Route path="/my/favorites" element={
                        <React.Fragment>
                            <Navbar/>
                            <FavoritesPage/>
                        </React.Fragment>
                    }/>
                </Routes>
            </Router>
            <Toaster toastOptions={{
            }}/>
        </div>

    );
}

export default observer(App);
