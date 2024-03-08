import {InvestmentsItem} from "./item";
import {instrumentsLevelsMock, instrumentsMock, PRICE_MULTIPLIER} from "../../constants";
import {FC, useCallback} from "react";

type Props = {
    points: number;
    levels: number[];
}

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Investments: FC<Props> = ({ points, levels}) => {
    const getValues = useCallback((base_price: number, index: number): Values => {
        const price = Math.ceil((base_price * (PRICE_MULTIPLIER ** levels[index])));
        const isAvailable = price <= points;
        return { price, isAvailable };
    }, [points])

    return <div className={'investments-wrapper'}>
        {instrumentsMock.map((v, i) => (
            <InvestmentsItem key={v.name} data={v} level={instrumentsLevelsMock[i]} {...getValues(v.base_price, i)} />
        ))}
    </div>
}