import React, { useCallback, useEffect, useRef } from 'react';
import AnimatedNumber from 'animated-number-react';
import { action } from 'mobx';
import rocket from '../rocket.png';
import thunder from '../thunder.png';
import store from './store.png';
import upgrade from './upgrade.png';
import './index.css';
import { Popup } from './popups';
import { Investments } from './popups/investments';
import { useStore } from '../store/store';
import {ACCUM, ACCUM_MULTIPLIER, DEFAULT_INC_TAP_VALUE, TURBO_MULTIPLIER_TAP, TURBO_TIME} from '../store/constants';
import { observer } from 'mobx-react-lite';
import { PopupsEnum } from '../store/GameStore';
import {Upgrades} from "./popups/upgrade";
import {instrumentsMock, upgradesMock} from "./constants";
import {UpgradesEnum} from "./types";

export const MainContainer = observer(() => {
    const { gameStore } = useStore();
    const { points, accum, incTapValue, isTurboTapMode, levelsByName, investments, activePopup, accumCapacity } = gameStore;

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
        gameStore.activePopup = PopupsEnum.INVESTMENTS;
    });

    const openUpgradesPopup = action(() => {
        gameStore.activePopup = PopupsEnum.UPGRADES;
    });

    const closePopup = action(() => {
        gameStore.activePopup = undefined;
    });
    const handleAccumClick = action(() => {
        if (accum !== ACCUM) {
            gameStore.accum = accumCapacity;
        }
    });

    const handleBuyAction = action((name: string, points: number, isUpgrades = false) => {
        gameStore.points = points;
        gameStore.levelsByName = { ...gameStore.levelsByName, [name]: (gameStore.levelsByName?.[name] || 0) + 1 };
        console.log({ name, isUpgrades })
        if (isUpgrades) {
            if (name === upgradesMock[0].name) gameStore.incTapValue += DEFAULT_INC_TAP_VALUE;
            if (name === upgradesMock[1].name) gameStore.accumCapacity = Math.ceil(accumCapacity * ACCUM_MULTIPLIER);
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

    const incPointsPerPeriod = action(() => {
        gameStore.points += gameStore.pointsPerSecond;
        setTimeout(incPointsPerPeriod, 1000);
    });

    const formatTimerValue = (v: number) => ((TURBO_TIME - v) / 1000).toFixed(2);

    useEffect(() => {
        incPointsPerPeriod();
    }, []);

    return (
        <div className={'main-container'}>
            {isTurboTapMode ? (
                <div className="main-container-turbo-timer">
                    <div>CLICK! X5 PROFIT!</div>
                    <AnimatedNumber value={TURBO_TIME} formatValue={formatTimerValue} duration={TURBO_TIME} />
                </div>
            ) : null}
            <div className="main-container-bg" onTouchStart={handleCoinClick} onClick={handleCoinClick}>
                <div></div>
            </div>
            <div>&#8593;tap on the man!&#8593;</div>
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
                <div id="turbo" onClick={switchOnTurboClickMode}>
                    <img src={rocket} alt="turbo" />
                    Turbo (x{TURBO_MULTIPLIER_TAP})
                </div>
                <span className="devider"></span>
                <div id="accum" onClick={handleAccumClick}>
                    <img src={thunder} alt="energy" />
                    Energy
                </div>
            </div>
            {activePopup === PopupsEnum.INVESTMENTS && (
                <Popup title={PopupsEnum.INVESTMENTS} onClose={closePopup}>
                    <Investments points={points} levels={levelsByName} handleBuy={handleBuy} list={instrumentsMock} />
                </Popup>
            )}
            {activePopup === PopupsEnum.UPGRADES && (
                <Popup title={PopupsEnum.UPGRADES} onClose={closePopup}>
                    <Upgrades points={points} levels={levelsByName} handleBuy={handleBuyUpgrades} list={upgradesMock} />
                </Popup>
            )}
        </div>
    );
});
