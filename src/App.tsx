import React, { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import {
    StompSessionProvider,
} from "react-stomp-hooks";
import { Client } from '@stomp/stompjs';
import { MainContainer } from './components/main-container';
import { Header } from './components/header';
import { PeopleContainer } from './components/people';
import { LootboxContainer } from './components/lootbox';
import './App.css';
import { SOCKET_URL } from './constants';
import { action } from 'mobx';
import { instrumentsMock, upgradesMock, upgradesRoomMock } from './components/main-container/constants';
import { ACCUM_MULTIPLIER, DEFAULT_INC_TAP_VALUE } from './store/constants';
import bg2 from './components/main-container/bg-rich.png';
import { useStore } from './store/store';
import { Investments } from './components/investments';
import { Upgrades } from './components/upgrade';

// Object.assign(global, { WebSocket });

export const DOMAIN = process.env.NODE_ENV === 'production' ? '/tgame/' : '/';
// @ts-ignore
const tg = window.Telegram.WebApp;
function App() {
    const { gameStore } = useStore();
    const { accumCapacity, points, investments, levelsByName } = gameStore;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log('tg', tg);
    const BackButton = tg.BackButton;
    BackButton.onClick(function () {
        navigate(DOMAIN);
    });

    const handleBuyAction = action((name: string, points: number, isUpgrades = false) => {
        gameStore.points = points;
        gameStore.levelsByName = { ...gameStore.levelsByName, [name]: (gameStore.levelsByName?.[name] || 0) + 1 };
        if (isUpgrades) {
            if (name === upgradesMock[0].name) gameStore.incTapValue += DEFAULT_INC_TAP_VALUE;
            if (name === upgradesMock[1].name) gameStore.accumCapacity = Math.ceil(accumCapacity * ACCUM_MULTIPLIER);
            if (upgradesRoomMock[0].name === name) gameStore.roomUpgrades.main = bg2;
        } else {
            gameStore.pointsPerSecond += investments.find(({ name: v }) => v === name)?.base_income || 0;
        }
    });

    const handleBuy = useCallback(
        (name: string, price: number, isUpgrades = false) => {
            if (price <= points) {
                handleBuyAction(name, points - price, isUpgrades);
            }
        },
        [points]
    );

    const handleBuyUpgrades = (name: string, price: number) => handleBuy(name, price, true);

    // const client = new Client({
    //     brokerURL: SOCKET_URL,
    //     onConnect: () => {
    //         console.log('herer');
    //         client.subscribe('/topic/user', (message) => console.log(`Received: ${message.body}`));
    //         client.publish({ destination: '/ws/user', body: 'shwarz777' });
    //     },
    // });
    // console.log('client', client);

    useEffect(() => {
        tg?.expand();
        tg?.setHeaderColor('#000');
        // client.activate();
    }, []);

    useEffect(() => {
        if (pathname === DOMAIN) {
            BackButton.hide();
        } else {
            BackButton.show();
        }
    }, [pathname]);

    return (
        <div className="App">
            {/*<SockJsClient url={SOCKET_URL} topics={['/topic/user']}*/}
            {/*              onMessage={(msg: any) => { console.log(msg); }}*/}
            {/*/>*/}
            <StompSessionProvider
                url={SOCKET_URL}
                onConnect={() => console.log('connect!!')}
                debug={(str) => {
                    console.log(str);
                }}
                //All options supported by @stomp/stompjs can be used here
            >
                <Header />
            </StompSessionProvider>
            <Routes>
                <Route path={DOMAIN} element={<MainContainer />} />
                <Route path={`${DOMAIN}people`} element={<PeopleContainer />} />
                <Route path={`${DOMAIN}loot`} element={<LootboxContainer />} />
                <Route
                    path={`${DOMAIN}invest`}
                    element={
                        <Investments
                            points={points}
                            levels={levelsByName}
                            handleBuy={handleBuy}
                            list={instrumentsMock}
                        />
                    }
                />
                <Route
                    path={`${DOMAIN}upgrades`}
                    element={
                        <Upgrades
                            points={points}
                            levels={levelsByName}
                            handleBuy={handleBuyUpgrades}
                            list={upgradesMock}
                            roomsUpgrades={upgradesRoomMock}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
