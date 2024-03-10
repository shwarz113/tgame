import AnimatedNumber from "animated-number-react";
import {observer} from "mobx-react-lite";
import coin from '../../coin.png';
import {nFormatter} from "../../utils/formatters";
import './index.css'
import {useStore} from "../../store/store";
import {useMemo} from "react";
export const ScoreHeader = observer(() => {
    const { gameStore: { points, pointsPerSecond } } = useStore();
    const formatValue = (value: number) => nFormatter({ num: value, precision: points <= 1000 ? 0 : 3 });
    console.log('points', points)
    return (
        <div className="score-header">
            <div className="score-header-points">
                <img src={coin} alt="" />
                <span>
                    <AnimatedNumber
                        value={points}
                        formatValue={formatValue}
                    />
                    {/*{nFormatter({ num: number })}*/}
                </span>
            </div>
            <div className="score-header-points-second">{nFormatter({ num: pointsPerSecond })} / second</div>
        </div>
    )
});