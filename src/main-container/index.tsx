import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import AnimatedNumber from 'animated-number-react';
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

    const timerDebounceRef = useRef<any>();

    const handleTapAction = action((v: boolean) => {
        gameStore.isTap = v;
    })

    function handleDebounceClick(){
        // Если ID таймена установлено - сбрасываем таймер
        if(timerDebounceRef.current){
            clearTimeout(timerDebounceRef.current);
        }
        // Запускаем таймер, возвращаемое ID таймера
        // записываем в timerDebounceRef
        timerDebounceRef.current = setTimeout(() => {
            // Вызываем увеличение счётчика кол-ва
            // выполнения бизнес логики приложения с Debounce
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
            gameStore.incTapValue += TURBO_MULTIPLIER_TAP;
            gameStore.isTurboTapMode = true;
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

    const formatTimerValue = (v: number) =>((TURBO_TIME - v) / 1000).toFixed(2);

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
            <div className="main-container-bg" onTouchStart={handleCoinClick}>
                <div></div>
            </div>
            <div>&#8593;tap on the man!&#8593;</div>
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
