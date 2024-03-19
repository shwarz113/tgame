import React, { useEffect, useRef } from 'react';
import AnimatedNumber from 'animated-number-react';
import { action } from 'mobx';
import rocket from '../rocket.png';
import thunder from '../thunder.png';
import store from './store.png';
import upgrade from './upgrade.png';
import people from './people.png';
import box from './box.png';
import './index.css';
import { useStore } from '../../store/store';
import { ACCUM, TURBO_MULTIPLIER_TAP, TURBO_TIME } from '../../store/constants';
import { observer } from 'mobx-react-lite';
import {useNavigate} from "react-router-dom";
import {Task} from "./task";
import {DOMAIN} from "../../constants";

export const MainContainer = observer(() => {
    const { gameStore } = useStore();
    const navigate = useNavigate();
    const {
        accum,
        incTapValue,
        isTurboTapMode,
        accumCapacity,
        roomUpgrades,
    } = gameStore;

    const timerDebounceRef = useRef<any>();

    const handleTapAction = action((v: boolean) => {
        gameStore.isTap = v;
    });

    function handleDebounceClick() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            handleTapAction(false);
        }, 1000);
    }

    const handleCoinClick = action((e: any) => {
        e?.preventDefault();
        if (accum) {
            gameStore.points += incTapValue;
            gameStore.accum -= 1;
            gameStore.isTap = true;
            handleDebounceClick();
        }
    });

    const switchOffTurboClickMode = action(() => {
        gameStore.incTapValue /= TURBO_MULTIPLIER_TAP;
        gameStore.isTurboTapMode = false;
    });

    const switchOnTurboClickMode = action(() => {
        if (!isTurboTapMode) {
            setTimeout(() => switchOffTurboClickMode(), TURBO_TIME);
            gameStore.incTapValue *= TURBO_MULTIPLIER_TAP;
            gameStore.isTurboTapMode = true;
        }
    });

    const openInvestmentsPopup = action(() => {
        navigate(`${DOMAIN}invest`);
    });

    const openUpgradesPopup = action(() => {
        navigate(`${DOMAIN}upgrades`);
    });

    const openPeoplePage = () => {
        navigate(`${DOMAIN}people`);
    };
    const openLootboxPage = () => {
        navigate(`${DOMAIN}loot`);
    };
    const handleAccumClick = action(() => {
        if (accum !== ACCUM) {
            gameStore.accum = accumCapacity;
        }
    });

    const incPointsPerPeriod = action(() => {
        gameStore.points += gameStore.pointsPerSecond;
        setTimeout(incPointsPerPeriod, 1000);
    });

    const formatTimerValue = (v: number) => ((TURBO_TIME - v) / 1000).toFixed(2);

    useEffect(() => {
        incPointsPerPeriod();
        document.querySelector('.main-container-bg')?.addEventListener('touchmove', (e) => {
            e.preventDefault();
        })
    }, []);

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
                {/*<div id="turbo" onClick={switchOnTurboClickMode}>*/}
                {/*    <img src={rocket} alt="turbo" />*/}
                {/*    Turbo (x{TURBO_MULTIPLIER_TAP})*/}
                {/*</div>*/}
                {/*<span className="devider"></span>*/}
                {/*<div id="accum" onClick={handleAccumClick}>*/}
                {/*    <img src={thunder} alt="energy" />*/}
                {/*    Energy*/}
                {/*</div>*/}
            </div>
        </div>
    );
});
