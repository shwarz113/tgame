import { InvestmentItem } from '../../main-container/types';
import { FC } from 'react';
import { nFormatter } from '../../../utils/formatters';

type Props = {
    data: InvestmentItem;
    level: number;
    price: number;
    isAvailable: boolean;
    handleBuy: (name: string, price: number) => void;
    postSymbol?: string;
};
export const InvestmentsItem: FC<Props> = ({
    data: { name, pic, base_income },
    level,
    price,
    isAvailable,
    handleBuy,
    postSymbol,
}) => {
    const onClick = () => handleBuy(name, price);
    return (
        <div className={'investments-item'}>
            <div className="investments-item-img">
                <img src={pic} alt={name} />
            </div>
            <div className={'investments-item-content'}>
                <div>{name}</div>
                <div>
                    <div className="investments-item-content-info">
                        {level ? (
                            <div>
                                +{nFormatter({ num: base_income * level })}
                                {postSymbol || ''}
                            </div>
                        ) : (
                            <div> </div>
                        )}
                        <div className={'investments-item-content-info-level'}>
                            <div style={{ width: `${(level % 10) * 10}%` }}></div>
                            <div>{level} level</div>
                        </div>
                    </div>
                    <div className={`investments-item-content-buy ${isAvailable ? 'available' : ''}`}>
                        <div onClick={onClick}>{nFormatter({ num: price })}</div>
                        <div>
                            +{nFormatter({ num: base_income })}
                            {postSymbol || ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
