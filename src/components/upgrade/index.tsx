import { InvestmentsItem } from './item';
import { FC, useCallback } from 'react';
import { getPriceValue } from '../../utils/getPriceValue';
import { Investments as InvestmentsType } from '../main-container/types';
import {UpgradeRoomItem} from "./itemRoom";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/store";
import {action} from "mobx";
import {upgradesMock, upgradesRoomMock} from "../main-container/constants";
import {ACCUM_MULTIPLIER, DEFAULT_INC_TAP_VALUE} from "../../store/constants";
import bg2 from "../main-container/bg-rich.png";

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
    const { points, accumCapacity, levelsByName } = gameStore;
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

    return (
        <div className={'investments-wrapper'}>
            <div>Productivity</div>
            {list.map((v, i) => (
                <InvestmentsItem
                    key={v.name}
                    data={v}
                    level={levelsByName[v.name]}
                    handleBuy={handleBuy}
                    {...getValues(v.name, v.base_price)}
                    postSymbol={i===0 ? '/tap': '%'}
                />
            ))}
            <div>Room</div>
            {roomsUpgrades.map((v, i) => (
                <UpgradeRoomItem
                    key={v.name}
                    data={v}
                    handleBuy={handleBuy}
                    isAvailable={points >= v.base_price}
                />
            ))}
        </div>
    );
});
