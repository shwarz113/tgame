import { InvestmentsItem } from './item';
import { instrumentsMock } from '../../constants';
import { FC, useCallback } from 'react';
import {getPriceValue} from "../../../utils/getPriceValue";

type Props = {
    points: number;
    levels: Record<string, number>;
    handleBuy: (name: string, price: number) => void;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Investments: FC<Props> = ({ points, levels, handleBuy }) => {
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
            {instrumentsMock.map((v, i) => (
                <InvestmentsItem
                    key={v.name}
                    data={v}
                    level={levels[v.name]}
                    handleBuy={handleBuy}
                    {...getValues(v.name, v.base_price)}
                />
            ))}
        </div>
    );
};
