import { InvestmentsItem } from './item';
import React, { FC, useCallback } from 'react';
import { getPriceValue } from '../../utils/getPriceValue';
import { Investments as InvestmentsType } from '../main-container/types';
import {UpgradeRoomItem} from "./itemRoom";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/store";
import {action} from "mobx";
import {upgradesMock, upgradesRoomMock} from "../main-container/constants";
import {ACCUM, ACCUM_MULTIPLIER, DEFAULT_INC_TAP_VALUE, TURBO_MULTIPLIER_TAP, TURBO_TIME} from "../../store/constants";
import bg2 from "../main-container/bg-rich.png";
import styles from './index.module.css';
import rocket from '../../rocket.png';
import thunder from '../../thunder.png';
import {useNavigate} from "react-router-dom";
import {DOMAIN} from "../../constants";

type Props = {
    list: InvestmentsType;
    roomsUpgrades: InvestmentsType;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Upgrades: FC<Props> = observer(({ list, roomsUpgrades }) => {
    const { gameStore } = useStore();
    const { points, accumCapacity, levelsByName, isTurboTapMode, accum } = gameStore;
    const navigate = useNavigate();
    const getValues = useCallback(
        (name: string, base_price: number): Values => {
            const price = getPriceValue({ base_price, level: levelsByName[name] });
            const isAvailable = price <= points;
            return { price, isAvailable };
        },
        [points]
    );

    const handleBuyAction = action((name: string, points: number) => {
        gameStore.points = points;
        gameStore.levelsByName = { ...gameStore.levelsByName, [name]: (gameStore.levelsByName?.[name] || 0) + 1 };
        if (name === upgradesMock[0].name) gameStore.incTapValue += DEFAULT_INC_TAP_VALUE;
        if (name === upgradesMock[1].name) gameStore.accumCapacity = Math.ceil(accumCapacity * ACCUM_MULTIPLIER);
        if (upgradesRoomMock[0].name === name) gameStore.roomUpgrades.main = bg2;
    });

    const handleBuy = useCallback(
        (name: string, price: number) => {
            if (price <= points) {
                handleBuyAction(name, points - price);
            }
        },
        [points]
    );

    const switchOffTurboClickMode = action(() => {
        gameStore.incTapValue /= TURBO_MULTIPLIER_TAP;
        gameStore.isTurboTapMode = false;
    });

    const switchOnTurboClickMode = action(() => {
        if (!isTurboTapMode) {
            navigate(DOMAIN)
            setTimeout(() => switchOffTurboClickMode(), TURBO_TIME);
            gameStore.incTapValue *= TURBO_MULTIPLIER_TAP;
            gameStore.isTurboTapMode = true;
        }
    });

    const handleAccumClick = action(() => {
        if (accum !== ACCUM) {
            gameStore.accum = accumCapacity;
        }
    });

    return (
        <div className={'investments-wrapper'}>
            <div>Boosters</div>
            <div className={styles.boosters}>
                <div className={styles.booster} onClick={switchOnTurboClickMode}>
                    <div>
                        <img src={rocket} alt="turbo" />
                    </div>
                    <div className={styles.boosterContent}>
                        <div>
                            Get <b>x{TURBO_MULTIPLIER_TAP}</b> points/tap!
                        </div>
                        <div>free daily - 3</div>
                    </div>
                </div>
                <span className="devider"></span>
                <div className={styles.booster} onClick={handleAccumClick}>
                    <div>
                        <img src={thunder} alt="energy" />
                    </div>
                    <div className={styles.boosterContent}>
                        <div>Restore your Tap-Energy!</div>
                        <div>free daily - 3</div>
                    </div>
                </div>
            </div>
            <div>Productivity</div>
            {list.map((v, i) => (
                <InvestmentsItem
                    key={v.name}
                    data={v}
                    level={levelsByName[v.name]}
                    handleBuy={handleBuy}
                    {...getValues(v.name, v.base_price)}
                    postSymbol={i === 0 ? '/tap' : '%'}
                />
            ))}
            <div>Room</div>
            {roomsUpgrades.map((v, i) => (
                <UpgradeRoomItem key={v.name} data={v} handleBuy={handleBuy} isAvailable={points >= v.base_price} />
            ))}
        </div>
    );
});
