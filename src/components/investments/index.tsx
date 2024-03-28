import { FC, useCallback } from 'react';
import { InvestmentsItem } from './item';
import { getPriceValue } from '../../utils/getPriceValue';
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/store";
import {action} from "mobx";
import './index.css';
import {MobXAppStore} from "../../store/MobXStore";
import {investPicById} from "./img";

type Props = {
    app: MobXAppStore;
};

type Values = {
    price: number;
    isAvailable: boolean;
};
export const Investments: FC<Props> = observer(({ app }) => {
    const { gameStore } = useStore();
    const { investments, levelsByName } = gameStore;
    const getValues = useCallback(
        (name: string, base_price: number): Values => {
            const price = getPriceValue({ base_price, level: levelsByName[name] });
            const isAvailable = price <= app.balance;
            return { price, isAvailable };
        },
        [app.balance]
    );

    const handleBuy = action((id: string) => {
        app.handleBuyInvest(id)
    });

    return (
        <div className={'investments-wrapper'}>
            {app.investments.map((v) => (
                <InvestmentsItem
                    key={v.id}
                    data={v}
                    handleBuy={handleBuy}
                    isAvailable={app.balance > v.price}
                    pic={investPicById[v.id]}
                />
            ))}
        </div>
    );
});
