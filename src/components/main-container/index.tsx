import React, {FC, useRef} from 'react';
import AnimatedNumber from 'animated-number-react';
import {Client} from "@stomp/stompjs";
import { action } from 'mobx';
import store from './store.png';
import upgrade from './upgrade.png';
import people from './people.png';
import box from './box.png';
import './index.css';
import { useStore } from '../../store/store';
import { TURBO_TIME } from '../../store/constants';
import { observer } from 'mobx-react-lite';
import {useNavigate} from "react-router-dom";
import {Task} from "./task";
import {DOMAIN, PagesEnum} from "../../constants";
import {useStomp} from "../../hooks/useStomp";

type Props = {
    client?: Client;
}
export const MainContainer: FC<Props> = observer(({ client }) => {
    // @ts-ignore
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.username || 'это тест (значит username не считался)'
    const { gameStore } = useStore();
    const navigate = useNavigate();
    const {
        accum,
        incTapValue,
        isTurboTapMode,
        roomUpgrades,
    } = gameStore;

    const tapTimerDebounceRef = useRef<any>();

    const handleTapAction = action((v: boolean) => {
        gameStore.isTap = v;
    });

    function handleDebounceClick() {
        if (tapTimerDebounceRef.current) {
            clearTimeout(tapTimerDebounceRef.current);
        }
        tapTimerDebounceRef.current = setTimeout(() => {
            handleTapAction(false);
        }, 1000);
    }

    const handleCoinClick = action((e: any) => {
        e?.preventDefault();
        if (accum) {
            gameStore.points += incTapValue;
            gameStore.accum -= 1;
            gameStore.isTap = true;
            console.log('client', client);
            client?.publish({ destination: '/user/tap', body: userId });
            handleDebounceClick();
        }
    });

    const openInvestmentsPopup = action(() => {
        navigate(`${DOMAIN}${PagesEnum.INVEST}`);
    });

    const openUpgradesPopup = action(() => {
        navigate(`${DOMAIN}${PagesEnum.UPGRADES}`);
    });

    const openPeoplePage = () => {
        navigate(`${DOMAIN}${PagesEnum.PEOPLE}`);
    };
    const openLootboxPage = () => {
        navigate(`${DOMAIN}${PagesEnum.LOOT}`);
    };

    const formatTimerValue = (v: number) => ((TURBO_TIME - v) / 1000).toFixed(2);

    return (
        <div className={'main-container'}>
            {isTurboTapMode ? (
                <div className="main-container-turbo-timer">
                    <div>CLICK! X5 PROFIT!</div>
                    <AnimatedNumber value={TURBO_TIME} formatValue={formatTimerValue} duration={TURBO_TIME} />
                </div>
            ) : null}
            <div
                className="main-container-bg"
                style={{ backgroundImage: roomUpgrades.main }}
                onTouchStart={handleCoinClick}
                onClick={handleCoinClick}
            >
                <img src={roomUpgrades.main} />
                <div className="fake-scroll"></div>
                <div></div>
            </div>
            <div>&#8593;tap on the man!&#8593;</div>
            <Task />
            <div className={'instruments'}>
                <div id="store" onClick={openInvestmentsPopup}>
                    <img src={store} alt="store" />
                    <div>Investments</div>
                </div>
                <span className="devider"></span>
                <div id="upgrade" onClick={openUpgradesPopup}>
                    <img src={upgrade} alt="upgrade" />
                    <div>Upgrades</div>
                </div>
                <span className="devider"></span>
                <div id="lootbox" onClick={openLootboxPage}>
                    <img src={box} alt="box" />
                    <div>Lootbox</div>
                </div>
                <span className="devider"></span>
                <div id="people" onClick={openPeoplePage}>
                    <img src={people} alt="people" />
                    <div>People</div>
                </div>
            </div>
        </div>
    );
});
