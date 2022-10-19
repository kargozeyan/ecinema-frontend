import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import Store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'ECinema'

const store = new Store()
store.checkAuth()
export const Context = createContext({store})
root.render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>
    // <React.StrictMode>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
