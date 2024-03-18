import React, {FC} from 'react';
import thunder from '../../../thunder.png';
import './index.css';

type Props = {
    accum: number;
    accumCapacity: number;
}
export const Accum: FC<Props> = ({ accum, accumCapacity }) => {
    const width = 100 * (+(accum/accumCapacity).toFixed(2).slice(0, -1));
    return (
        <div className={'header-accum'}>
            <div>
                <img src={thunder} alt="energy"/> {accum}
            </div>
            <div className={'header-accum-bar'}><div style={{ width: `${width}%` }}></div></div>
        </div>
    );
}
