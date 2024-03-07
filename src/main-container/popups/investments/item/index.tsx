import {InvestmentItem} from "../../../types";
import {FC} from "react";
import {PRICE_MULTIPLIER} from "../../../constants";
import './index.css'

type Props = {
    data: InvestmentItem;
    level: number;
}
export const InvestmentsItem: FC<Props> = ({ data: { name, pic, base_price, base_income }, level }) => {
    return (
        <div className={'investments-item'}>
            <div className="investments-item-img">
                <img src={pic} alt={name} />
            </div>
            <div className={'investments-item-content'}>
                <div className="investments-item-content-info">
                    <div>{name}</div>
                    <div>{level} level</div>
                </div>
                <div className="investments-item-content-buy">
                    <div>{Math.ceil((base_price * (PRICE_MULTIPLIER ** level))).toFixed(0)}</div>
                    <div>+{base_income} points</div>
                </div>
            </div>
        </div>
    );
}