import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './components/main-container';
import { Header } from './components/header';
import { PeopleContainer } from './components/people';
import { LootboxContainer } from './components/lootbox';
import { DOMAIN, PagesEnum } from './constants';
import { instrumentsMock, upgradesMock, upgradesRoomMock } from './components/main-container/constants';
import { Investments } from './components/investments';
import { Upgrades } from './components/upgrade';
import './App.css';
import { Init } from './Init';
import app from './store/MobXStore';
import { Loader } from './components/loader';
import {observer} from "mobx-react-lite";

function App() {
    console.log('app', app);

    if (app.isLoading) {
        return (
            <div className="App">
                <Loader />
            </div>
        )
    }

    return (
        <div className="App">
            <Init />
            <Header app={app} />
            <Routes>
                <Route path={DOMAIN} element={<MainContainer app={app} />} />
                <Route path={`${DOMAIN}${PagesEnum.PEOPLE}`} element={<PeopleContainer />} />
                <Route path={`${DOMAIN}${PagesEnum.LOOT}`} element={<LootboxContainer />} />
                <Route path={`${DOMAIN}${PagesEnum.INVEST}`} element={<Investments app={app} />} />
                <Route
                    path={`${DOMAIN}${PagesEnum.UPGRADES}`}
                    element={<Upgrades list={upgradesMock} roomsUpgrades={upgradesRoomMock} />}
                />
            </Routes>
        </div>
    );
}

export default observer(App);
