import React, { useEffect } from 'react';
import { MainContainer } from './main-container';
import './App.css';
import { Header } from './header';
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PeopleContainer} from "./people";
import {LootboxContainer} from "./lootbox";

// @ts-ignore
const tg = window.Telegram.WebApp;
function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log('tg', tg);
    const BackButton = tg.BackButton;
    BackButton.onClick(function() {
        navigate('/');
    });

    useEffect(() => {
        tg?.expand();

    }, []);

    useEffect(() => {
        if (pathname === '/') {
            BackButton.hide();
        } else {
            BackButton.show();
        }
    }, [pathname])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path={'/'} element={<MainContainer />}/>
                <Route path={'people'} element={<PeopleContainer />}/>
                <Route path={'loot'} element={<LootboxContainer />}/>
            </Routes>
        </div>
    );
}

export default App;
