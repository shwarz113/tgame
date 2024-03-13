import { InvestmentsItem } from './item';
import { FC, useCallback } from 'react';
import { getPriceValue } from '../../../utils/getPriceValue';
import { Investments as InvestmentsType } from '../../types';
import {UpgradeRoomItem} from "./itemRoom";

type Props = {
    points: number;
    levels: Record<string, number>;
    handleBuy: (name: string, price: number) => void;
    list: InvestmentsType;
    roomsUpgrades: InvestmentsType;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Upgrades: FC<Props> = ({ points, levels, handleBuy, list, roomsUpgrades }) => {
    const getValues = useCallback(
        (name: string, base_price: number): Values => {
            const price = getPriceValue({ base_price, level: levels[name] });
            const isAvailable = price <= points;
            return { price, isAvailable };
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
                    level={levels[v.name]}
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
};
