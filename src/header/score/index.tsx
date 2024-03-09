import coin from '../../coin.png';
import {nFormatter} from "../../utils/formatters";
import './index.css'
import {useStore} from "../../store/store";
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import {action} from "mobx";

export const ScoreHeader = observer(() => {
    const { gameStore } = useStore();
    const throttleInProgress = useRef<boolean>();

    // const incPointsPerPeriod = action(() => {
    //     setTimeout(() => {
    //         if(!throttleInProgress.current) {
    //             console.log('here228')
    //             throttleInProgress.current = true;
    //             gameStore.points += gameStore.pointsPerSecond;
    //         }
    //         incPointsPerPeriod();
    //         throttleInProgress.current = false;
    //     }, 1000);
    //
    //     incPointsPerPeriod();
    // })
    //
    // useEffect(() => {
    //     incPointsPerPeriod();
    // }, [])

    return (
        <div className="score-header">
            <div className="score-header-points">
                <img src={coin} alt=""/>
                <span>{nFormatter({ num: gameStore.points })}</span>
            </div>
            <div className="score-header-points-second">{nFormatter({ num: gameStore.pointsPerSecond })} / second</div>
        </div>
    )
});