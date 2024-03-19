import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './components/main-container';
import { Header } from './components/header';
import { PeopleContainer } from './components/people';
import { LootboxContainer } from './components/lootbox';
import { DOMAIN } from './constants';
import { instrumentsMock, upgradesMock, upgradesRoomMock } from './components/main-container/constants';
import { Investments } from './components/investments';
import { Upgrades } from './components/upgrade';
import './App.css';
import { Init } from './Init';
import { useStomp } from './hooks/useStomp';

function App() {
    const { client } = useStomp();

    console.log('client', client);

    return (
        <div className="App">
            <Init />
            <Header />
            <Routes>
                <Route path={DOMAIN} element={<MainContainer />} />
                <Route path={`${DOMAIN}people`} element={<PeopleContainer />} />
                <Route path={`${DOMAIN}loot`} element={<LootboxContainer />} />
                <Route path={`${DOMAIN}invest`} element={<Investments list={instrumentsMock} />} />
                <Route
                    path={`${DOMAIN}upgrades`}
                    element={<Upgrades list={upgradesMock} roomsUpgrades={upgradesRoomMock} />}
                />
            </Routes>
        </div>
    );
}

export default App;
