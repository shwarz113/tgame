import React, { FC, useCallback, useEffect, useState } from 'react';
import { action } from 'mobx';
import rocket from '../rocket.png';
import thunder from '../thunder.png';
import store from './store1.png';
import './index.css';
import { Popup } from './popups';
import { Investments } from './popups/investments';
import { useStore } from '../store/store';
import { ACCUM, TURBO_MULTIPLIER_TAP, TURBO_TIME } from '../store/constants';
import { observer } from 'mobx-react-lite';

export const MainContainer = observer(() => {
    const { gameStore } = useStore();
    const { points, accum, incTapValue, isTurboTapMode, levelsByName, investments } = gameStore;
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handleCoinClick = action((e: any) => {
        e?.preventDefault();
        if (accum) {
            gameStore.points += incTapValue;
            gameStore.accum -= 1;
        }
    });

    const switchOffTurboClickMode = action(() => {
        gameStore.incTapValue /= TURBO_MULTIPLIER_TAP;
    });

    const switchOnTurboClickMode = action(() => {
        if (!isTurboTapMode) {
            setTimeout(() => switchOffTurboClickMode(), TURBO_TIME);
            gameStore.incTapValue += TURBO_MULTIPLIER_TAP;
        }
    });

    const handleStoreClick = () => {
        setIsOpenPopup(true);
    };
    const handleAccumClick = action(() => {
        if (accum !== ACCUM) {
            gameStore.accum = ACCUM;
        }
    });

    const handleBuyAction = action((name: string, points: number) => {
        gameStore.points = points;
        gameStore.levelsByName = { ...gameStore.levelsByName, [name]: (gameStore.levelsByName?.[name] || 0) + 1 };
        gameStore.pointsPerSecond += investments.find(({ name: v }) => v === name)?.base_income || 0;
    });

    const handleBuy = useCallback(
        (name: string, price: number) => {
            if (price <= points) {
                handleBuyAction(name, points - price);
            }
        },
        [points]
    );

    const incPointsPerPeriod = action(() => {
        gameStore.points += gameStore.pointsPerSecond;
        setTimeout(incPointsPerPeriod, 1000);
    });

    useEffect(() => {
        incPointsPerPeriod();
    }, []);

    return (
        <div className={'main-container'} onTouchMove={(e) => e.preventDefault()}>
            <div className="main-container-bg" onClick={handleCoinClick}>
                <div></div>
            </div>
            <div className={'instruments'}>
                <div id="store" onClick={handleStoreClick}>
                    <img src={store} alt="store" />
                    <div>Investments</div>
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
            {isOpenPopup && (
                <Popup title={'INVESTMENTS'} onClose={() => setIsOpenPopup(false)}>
                    <Investments points={points} levels={levelsByName} handleBuy={handleBuy} />
                </Popup>
            )}
        </div>
    );
});
