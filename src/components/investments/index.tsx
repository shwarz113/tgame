import { FC, useCallback } from 'react';
import { InvestmentsItem } from './item';
import { getPriceValue } from '../../utils/getPriceValue';
import { Investments as InvestmentsType } from '../main-container/types'

type Props = {
    points: number;
    levels: Record<string, number>;
    handleBuy: (name: string, price: number) => void;
    list: InvestmentsType;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Investments: FC<Props> = ({ points, levels, handleBuy, list }) => {
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
            {list.map((v, i) => (
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
