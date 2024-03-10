import AnimatedNumber from 'animated-number-react';
import { observer } from 'mobx-react-lite';
import coin from '../../coin.png';
import { nFormatter } from '../../utils/formatters';
import './index.css';
import { useStore } from '../../store/store';
export const ScoreHeader = observer(() => {
    const {
        gameStore: { points, pointsPerSecond, isTap },
    } = useStore();
    const formatValue = (value: number) => nFormatter({ num: value, precision: points <= 1000 ? +!!pointsPerSecond : 2 });

    return (
        <div className={`score-header ${isTap ? 'score-header-light' : ''}`}>
            <div className="score-header-points">
                <img src={coin} alt="" />
                <span style={{ width: points < 1000 ? 132 : 150 }}>
                    <AnimatedNumber value={points} formatValue={formatValue} />
                </span>
            </div>
            <div className="score-header-points-second">{nFormatter({ num: pointsPerSecond })} / second</div>
        </div>
    );
});
