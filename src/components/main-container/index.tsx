import React, {FC, useCallback, useRef, useState} from 'react';
import AnimatedNumber from 'animated-number-react';
import { action } from 'mobx';
import store from './store.png';
import upgrade from './upgrade.png';
import people from './people.png';
import box from './box.png';
import { useStore } from '../../store/store';
import { TURBO_TIME } from '../../store/constants';
import { observer } from 'mobx-react-lite';
import {useNavigate} from "react-router-dom";
import {Task} from "./task";
import {DOMAIN, PagesEnum} from "../../constants";
import './index.css';
import {MobXAppStore} from "../../store/MobXStore";

type Props = {
    app: MobXAppStore;
}
export const MainContainer: FC<Props> = observer(({ app }) => {
    const [points, setPoints] = useState<string[]>([]);
    const { gameStore } = useStore();
    const navigate = useNavigate();
    const {
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
            setPoints([]);
        }, 1000);
    }
    const animatePoints = useCallback(() => {
        const key = Math.floor(Math.random() * 3) + 1 + Math.random().toFixed(6);
        const p = points.length > 30 ? [...points.slice(25), key]: [...points, key];
        setPoints(p);
    }, [points.length])

    const handleCoinClick = action((e: any) => {
        if (app.battery) {
            gameStore.isTap = true;
            app.handleTap();
            handleDebounceClick();
            animatePoints();
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
                // onTouchStart={handleCoinClick}
                onClick={handleCoinClick}
            >
                <img src={roomUpgrades.main} />
                <div className="fake-scroll"></div>
                {points.map((v) => (
                    <div key={v} className={`coin-wrapper anim${v[0]}`}>
                        <div>+{app.commonInfo?.coinPerTap.currentValue || 1}</div>
                    </div>
                ))}
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
