import { FC } from 'react';
import './index.css';
import { nFormatter } from '../../../utils/formatters';
import { Investment } from '../../../hooks/type';

type Props = {
    pic: string;
    data: Investment;
    isAvailable: boolean;
    handleBuy: (name: string) => void;
};
export const InvestmentsItem: FC<Props> = ({
    data: { id, level, price, powerUpGrowth, powerUpAmount },
    isAvailable,
    handleBuy,
    pic,
}) => {
    const onClick = () => handleBuy(id);
    return (
        <div className={'investments-item'}>
            <div className="investments-item-img">
                <img src={pic} alt={id} />
            </div>
            <div className={'investments-item-content'}>
                <div>{id}</div>
                <div>
                    <div className="investments-item-content-info">
                        {level ? <div>+{nFormatter({ num: powerUpAmount })}/s</div> : <div> </div>}
                        <div className={'investments-item-content-info-level'}>
                            <div style={{ width: `${(level % 10) * 10}%` }}></div>
                            <div>{level} level</div>
                        </div>
                    </div>
                    <div className={`investments-item-content-buy ${isAvailable ? 'available' : ''}`}>
                        <div onClick={onClick}>{nFormatter({ num: price })}</div>
                        <div>+{nFormatter({ num: powerUpGrowth })}/s</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
