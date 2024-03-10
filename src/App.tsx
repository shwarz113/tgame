import React, { useEffect } from 'react';
import { MainContainer } from './main-container';
import './App.css';
import { Header } from './header';

// @ts-ignore
const tg = window.Telegram.WebApp;

function App() {
    console.log('tg', tg);
    useEffect(() => {
        tg?.expand();
    }, []);

    return (
        <div className="App" style={{ height: tg?.viewportHeight || 'auto' }}>
            <Header />
            <MainContainer />
        </div>
    );
}

export default App;
