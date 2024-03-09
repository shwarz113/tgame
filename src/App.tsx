import React, {useEffect} from 'react';
import { MainContainer } from './main-container';
import {ScoreHeader} from "./header/score";
import './App.css';

// @ts-ignore
const tg = window.Telegram.WebApp;

function App() {
    console.log('tg', tg);
    useEffect(() => {
        tg?.expand();
    }, []);

    return (
        <div className="App">
            <div className="App-header">
                {/*<div>Hello, {tg.initDataUnsafe?.user?.first_name || 'cryptoBRO'}!</div>*/}
                <ScoreHeader />
            </div>
            <MainContainer />
        </div>
    );
}

export default App;
