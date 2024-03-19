import { FC, useCallback } from 'react';
import { InvestmentsItem } from './item';
import { getPriceValue } from '../../utils/getPriceValue';
import { Investments as InvestmentsType } from '../main-container/types'
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/store";
import {action} from "mobx";
import './index.css';

type Props = {
    list: InvestmentsType;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Investments: FC<Props> = observer(({ list }) => {
    const { gameStore } = useStore();
    const { points, investments, levelsByName } = gameStore;
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
        gameStore.pointsPerSecond += investments.find(({ name: v }) => v === name)?.base_income || 0;
    });

    const handleBuy = useCallback(
        (name: string, price: number, isUpgrades = false) => {
            if (price <= points) {
                handleBuyAction(name, points - price);
            }
        },
        [points]
    );

    return (
        <div className={'investments-wrapper'}>
            {list.map((v, i) => (
                <InvestmentsItem
                    key={v.name}
                    data={v}
                    level={levelsByName[v.name]}
                    handleBuy={handleBuy}
                    {...getValues(v.name, v.base_price)}
                />
            ))}
        </div>
    );
});
