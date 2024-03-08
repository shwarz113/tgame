import {InvestmentItem} from "../../../types";
import {FC} from "react";
import {PRICE_MULTIPLIER} from "../../../constants";
import './index.css'
import {nFormatter} from "../../../../utils/formatters";

type Props = {
    data: InvestmentItem;
    level: number;
    price: number;
    isAvailable: boolean;
}
export const InvestmentsItem: FC<Props> = ({ data: { name, pic, base_income }, level, price, isAvailable }) => {
    return (
        <div className={'investments-item'}>
            <div className="investments-item-img">
                <img src={pic} alt={name} />
            </div>
            <div className={'investments-item-content'}>
                <div className="investments-item-content-info">
                    <div>{name}</div>
                    <div className={'investments-item-content-info-level'}>
                        <div style={{width: `${(level % 10) * 10}%`}}></div>
                        <div>{level} level</div>
                    </div>
                </div>
                <div className={`investments-item-content-buy ${isAvailable ? 'available' : ''}`}>
                    <div>{nFormatter({ num: price })}</div>
                    <div>+{nFormatter({ num: base_income })}/s</div>
                </div>
            </div>
        </div>
    );
}