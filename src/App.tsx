import React, { useEffect } from 'react';
import { MainContainer } from './main-container';
import './App.css';
import { Header } from './header';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PeopleContainer} from "./people";
import {LootboxContainer} from "./lootbox";
export const DOMAIN = process.env.NODE_ENV === 'production' ? '/tgame/': '/' ;
// @ts-ignore
const tg = window.Telegram.WebApp;
function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log('tg', tg);
    const BackButton = tg.BackButton;
    BackButton.onClick(function() {
        navigate(DOMAIN);
    });
    tg.offEvent((e: any) => {
        console.log('offEvent', e);
    })

    useEffect(() => {
        tg?.expand();
        tg?.colorScheme === "dark";
    }, []);

    useEffect(() => {
        if (pathname === DOMAIN) {
            BackButton.hide();
        } else {
            BackButton.show();
        }
    }, [pathname])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path={DOMAIN} element={<MainContainer />}/>
                <Route path={`${DOMAIN}people`} element={<PeopleContainer />}/>
                <Route path={`${DOMAIN}loot`} element={<LootboxContainer />}/>
            </Routes>
        </div>
    );
}

export default App;
