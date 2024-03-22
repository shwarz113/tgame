import { observer } from 'mobx-react-lite';
import React, {FC, useEffect} from 'react';
import { useStore } from '../../store/store';
import { ScoreHeader } from './score';
import { Accum } from './accum';
import './index.css';
import { action } from 'mobx';
// import {MobXApp} from "../../store/MobXStore";

type Props = {
    app: any;
}
export const Header: FC<Props> = observer(({ app }) => {
    const { gameStore } = useStore();
    const { accum, accumCapacity, points, pointsPerSecond, isTap } = gameStore;

    const handleIncPointsAction = action(() => {
        setTimeout(() => {
            if (gameStore.pointsPerSecond) gameStore.points += gameStore.pointsPerSecond;
            handleIncPointsAction();
        }, 1000);
    });

    useEffect(() => {
        handleIncPointsAction();
    }, []);

    console.log('app.points', app.points);

    return (
        <div className="header">
            <ScoreHeader points={app.points} pointsPerSecond={pointsPerSecond} isTap={isTap} />
            <Accum accum={accum} accumCapacity={accumCapacity} />
        </div>
    );
});
