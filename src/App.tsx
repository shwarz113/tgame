import React, { useState } from 'react';
import pic from './pic.png';
import rocket from './rocket.png';
import thunder from './thunder.png';
import './App.css';
import { Miner } from './miners-container/miner';
import { MainContainer } from './main-container';
import {MinersContainer} from "./miners-container";

// @ts-ignore
const tg = window.Telegram.WebApp;

function App() {
    const [points, setPoints] = useState(0);
    console.log('tg', tg);

    return (
        <div className="App">
            <div className="App-header">
                <div>Hello, {tg.initDataUnsafe?.user?.first_name || 'cryptoBRO'}!</div>
                <div>COINS: {points}</div>
            </div>
            <MainContainer points={points} setPoints={setPoints} />
            {/*<MinersContainer />*/}
        </div>
    );
}

export default App;
