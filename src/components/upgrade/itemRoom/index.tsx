import { InvestmentItem } from '../../main-container/types';
import { FC } from 'react';
import './index.css';
import { nFormatter } from '../../../utils/formatters';

type Props = {
    data: InvestmentItem;
    isAvailable: boolean;
    handleBuy: (name: string, price: number) => void;
};
export const UpgradeRoomItem: FC<Props> = ({
    data: { name, pic, base_price, description = '' },
    isAvailable,
    handleBuy,
}) => {
    const onClick = () => handleBuy(name, base_price);
    return (
        <div className={'investments-item'}>
            <div className="investments-item-img">
                <img src={pic} alt={name} />
            </div>
            <div className={'investments-item-content'}>
                <div>{name}</div>
                <div>
                    <div className="investments-item-content-description">{description}</div>
                    <div className={`investments-item-content-buy ${isAvailable ? 'available' : ''}`}>
                        <div onClick={onClick}>{nFormatter({ num: base_price })}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
