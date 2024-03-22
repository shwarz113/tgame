import AnimatedNumber from 'animated-number-react';
import {FC} from "react";
import coin from '../../../coin.png';
import {nFormatter, toFixed} from '../../../utils/formatters';
import './index.css';

type Props = {
    points: number;
    pointsPerSecond: number;
    isTap: boolean;
}
export const ScoreHeader: FC<Props> = ({ points, pointsPerSecond, isTap}) => {
    const formatValue = (value: number) => +value < 10000 ? toFixed(value, 1): nFormatter({ num: value, precision: points <= 1000 ? +!!pointsPerSecond : 2 });

    return (
        <div className={`score-header ${isTap ? 'score-header-light' : ''}`}>
            <div className="score-header-points">
                <img src={coin} alt="" />
                <span style={{ width: points < 1000 ? 132 : 150 }}>
                    <AnimatedNumber value={points} formatValue={formatValue} />
                </span>
            </div>
            <div className="score-header-points-second">{nFormatter({ num: pointsPerSecond })} / sec</div>
        </div>
    );
};
